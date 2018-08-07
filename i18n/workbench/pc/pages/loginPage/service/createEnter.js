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
    this.address = '$i18n{createEnter.js0}$i18n-end';
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
            labelName={<span>$i18n{createEnter.js1}$i18n-end</span>}
            isRequire
            valuePropsName="value"
            errorMessage="$i18n{createEnter.js2}$i18n-end"
            method="blur"
            inline
          >
            <FormControl name="linkman" placeholder="$i18n{createEnter.js3}$i18n-end" value={linkman} onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
          </FormItem>

          <FormItem
            className="input_phone"
            showMast={false}
            valuePropsName="value"
            labelName={<span>$i18n{createEnter.js4}$i18n-end</span>}
            isRequire
            method="blur"
            htmlType="tel"
            errorMessage="$i18n{createEnter.js5}$i18n-end"
            inline
          >
            <FormControl name="tenantTel" placeholder="$i18n{createEnter.js6}$i18n-end" value={tenantTel} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} />
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>$i18n{createEnter.js7}$i18n-end</span>}
            isRequire
            valuePropsName="value"
            errorMessage="$i18n{createEnter.js8}$i18n-end"
            method="blur"
            inline
          >
            <Select
              defaultValue="-$i18n{createEnter.js9}$i18n-end-"
              name="tenantIndustry"
              style={{ width: 338, marginRight: 6 }}
              onChange={(e) => { this.setOptherData({ name: 'tenantIndustry', value: e }); }}
            >
              <Option value="A">$i18n{createEnter.js10}$i18n-end</Option>
              <Option value="B">$i18n{createEnter.js11}$i18n-end</Option>
              <Option value="C">$i18n{createEnter.js12}$i18n-end</Option>
              <Option value="D">$i18n{createEnter.js13}$i18n-end</Option>
              <Option value="S">$i18n{createEnter.js14}$i18n-end</Option>
              <Option value="E">$i18n{createEnter.js15}$i18n-end</Option>
              <Option value="G">$i18n{createEnter.js16}$i18n-end</Option>
              <Option value="I">$i18n{createEnter.js17}$i18n-end</Option>
              <Option value="F">$i18n{createEnter.js18}$i18n-end</Option>
              <Option value="H">$i18n{createEnter.js19}$i18n-end</Option>
              <Option value="J">$i18n{createEnter.js20}$i18n-end</Option>
              <Option value="K">$i18n{createEnter.js21}$i18n-end</Option>
              <Option value="L">$i18n{createEnter.js22}$i18n-end</Option>
              <Option value="M">$i18n{createEnter.js23}$i18n-end</Option>
              <Option value="N">$i18n{createEnter.js24}$i18n-end</Option>
              <Option value="O">$i18n{createEnter.js25}$i18n-end</Option>
              <Option value="P">$i18n{createEnter.js26}$i18n-end</Option>
              <Option value="Q">$i18n{createEnter.js27}$i18n-end</Option>
              <Option value="R">$i18n{createEnter.js28}$i18n-end</Option>
              <Option value="T">$i18n{createEnter.js29}$i18n-end</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>$i18n{createEnter.js30}$i18n-end</span>}
            isRequire
            valuePropsName="value"
            errorMessage="$i18n{createEnter.js31}$i18n-end"
            method="blur"
            inline
          >
            <Select
              defaultValue="-$i18n{createEnter.js32}$i18n-end-"
              name="tenantSize"
              style={{ width: 338, marginRight: 6 }}
              onChange={(e) => { this.setOptherData({ name: 'tenantSize', value: e }); }}
            >
              <Option value="A">0$i18n{createEnter.js33}$i18n-end</Option>
              <Option value="B">51-100</Option>
              <Option value="C">101-200</Option>
              <Option value="D">201-500</Option>
              <Option value="E">501-1000</Option>
              <Option value="F">1001$i18n{createEnter.js34}$i18n-end</Option>
              <Option value="G">2000$i18n{createEnter.js35}$i18n-end</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>$i18n{createEnter.js36}$i18n-end</span>}
            isRequire={false}
            valuePropsName="value"
            errorMessage="$i18n{createEnter.js37}$i18n-end"
            method="blur"
            inline
          >
            <CitySelect name="address" onChange={this.onChange} />
          </FormItem>
        </Form>
            <div className={applyBtn}>$i18n{createEnter.js38}$i18n-end</div>
      </div>
    );
  }
}

export default CreateEnter;
