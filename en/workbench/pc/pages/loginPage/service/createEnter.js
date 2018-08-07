import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Form, { FormItem } from 'bee/form';
import FormControl from 'bee/form-control';
import Select from 'bee/select';
import CitySelect from 'bee/city-select';
import Progress from 'pub-comp/progress';
import 'assets/style/Form.css';
import {
  applyForm, applyBtn,
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;
const { Option } = Select;

@withRouter
@connect(
  mapStateToProps(),
  {
    requestStart,
    requestSuccess,
    requestError,
    setCreateEnter,
  },
)
class CreateEnter extends Component {
  static propTypes = {
    userInfo: PropTypes.shape({
      userName: PropTypes.string,
      userEmail: PropTypes.string,
      userMobile: PropTypes.string,
    }),
    setCreateEnter: PropTypes.func,
    updateenter: PropTypes.string,
  };
  static defaultProps = {
    userInfo: {},
    setCreateEnter: () => { },
    updateenter: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      logo: '',
      tenantIndustry: 'A',
      linkman: props.userInfo.userName,
      tenantEmail: props.userInfo.userEmail,
      tenantTel: props.userInfo.userMobile,
      // 0表示未开始，1表示开始
      processValue: 0,
      // 企业id
      tenantId: '',
    };
    this.tenantIndustry = {
      name: 'tenantIndustry',
      value: 'A',
      verify: true,
    };
    this.address = 'loginPageDefault';
    //progressbar
    this.loadingFunc = null;
    this.successFunc = null;
    this.timer = null;
  }

  onChange = (obj) => {
    this.address = obj.province + obj.city + obj.area;
  }

  

  setOptherData = (obj) => {
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state,
    });
  }

  checkForm = (flag, data) => {
    const { setCreateEnter, updateenter, requestStart, requestSuccess, requestError, } = this.props;
    const { tenantIndustry } = this.state;

    const Address = data.find(da => da.name === 'address');
    const TenantAddress = data.find(da => da.name === 'tenantAddress');
    if (Address.value && Address.value !== '') {
      TenantAddress.value = `${Address.value.province}|${Address.value.city}|${Address.value.area}|${TenantAddress.value}`;
    } else {
      TenantAddress.value = this.address + TenantAddress.value;
    }

    const TenantIndustry = data.find(da => da.name === 'tenantIndustry');
    if (!TenantIndustry.value && TenantIndustry.value === '') {
      TenantIndustry.value = tenantIndustry;
    }
    // this.setState({tenantId:"tenantId",processValue:1});//测试用的，要注销
    if (flag) {
      this.setState({
        disabled: false,
      });
      requestStart();
      const argu1 = data.reduce((obj, { value, name }) => {
        if (name) {
          obj[name] = value;
        }
        return obj;
      }, {});
      setCreateEnter(argu1, updateenter).then(({ error, payload }) => {
        if (error) {
          requestError(payload);
          return;
        }
        requestSuccess();
        this.setState({
          disabled: true,
          processValue: 1,
        });
        const { tenantId } = payload;
        localStorage.setItem('create', '1');
      });
    }
  }
  
  inputOnChange = (e, name) => {
    this.state[name] = e;
    this.setState({
      ...this.state,
    });
  }
  render() {
    const {
      logo, linkman, tenantEmail, tenantTel, processValue, tenantId,
    } = this.state;
    return (
      <div>
        <Form submitCallBack={this.checkForm} showSubmit={false} className={applyForm}>
        <FormItem
            showMast={false}
            labelName={<span>loginPageDefault</span>}
            isRequire
            valuePropsName="value"
            errorMessage="loginPageDefault"
            method="blur"
            inline
          >
            <FormControl name="linkman" placeholder="loginPageDefault" value={linkman} onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
          </FormItem>

          <FormItem
            className="input_phone"
            showMast={false}
            valuePropsName="value"
            labelName={<span>loginPageDefault</span>}
            isRequire
            method="blur"
            htmlType="tel"
            errorMessage="loginPageDefault"
            inline
          >
            <FormControl name="tenantTel" placeholder="loginPageDefault" value={tenantTel} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} />
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>loginPageDefault</span>}
            isRequire
            valuePropsName="value"
            errorMessage="loginPageDefault"
            method="blur"
            inline
          >
            <Select
              defaultValue="-loginPageDefault-"
              name="tenantIndustry"
              style={{ width: 338, marginRight: 6 }}
              onChange={(e) => { this.setOptherData({ name: 'tenantIndustry', value: e }); }}
            >
              <Option value="A">loginPageDefault</Option>
              <Option value="B">loginPageDefault</Option>
              <Option value="C">loginPageDefault</Option>
              <Option value="D">loginPageDefault</Option>
              <Option value="S">loginPageDefault</Option>
              <Option value="E">loginPageDefault</Option>
              <Option value="G">loginPageDefault</Option>
              <Option value="I">loginPageDefault</Option>
              <Option value="F">loginPageDefault</Option>
              <Option value="H">loginPageDefault</Option>
              <Option value="J">loginPageDefault</Option>
              <Option value="K">loginPageDefault</Option>
              <Option value="L">loginPageDefault</Option>
              <Option value="M">loginPageDefault</Option>
              <Option value="N">loginPageDefault</Option>
              <Option value="O">loginPageDefault</Option>
              <Option value="P">loginPageDefault</Option>
              <Option value="Q">loginPageDefault</Option>
              <Option value="R">loginPageDefault</Option>
              <Option value="T">loginPageDefault</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>loginPageDefault</span>}
            isRequire
            valuePropsName="value"
            errorMessage="loginPageDefault"
            method="blur"
            inline
          >
            <Select
              defaultValue="-loginPageDefault-"
              name="tenantSize"
              style={{ width: 338, marginRight: 6 }}
              onChange={(e) => { this.setOptherData({ name: 'tenantSize', value: e }); }}
            >
              <Option value="A">0loginPageDefault</Option>
              <Option value="B">51-100</Option>
              <Option value="C">101-200</Option>
              <Option value="D">201-500</Option>
              <Option value="E">501-1000</Option>
              <Option value="F">1001loginPageDefault</Option>
              <Option value="G">2000loginPageDefault</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>loginPageDefault</span>}
            isRequire={false}
            valuePropsName="value"
            errorMessage="loginPageDefault"
            method="blur"
            inline
          >
            <CitySelect name="address" onChange={this.onChange} />
          </FormItem>
        </Form>
            <div className={applyBtn}>loginPageDefault</div>
      </div>
    );
  }
}

export default CreateEnter;
