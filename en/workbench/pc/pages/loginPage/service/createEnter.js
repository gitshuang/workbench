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
    this.address = 'Beijing | Beijing | Dongcheng District |';
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
      <div className="applyService">
        <Form submitCallBack={this.checkForm} showSubmit={false} className={applyForm}>
        <FormItem
            showMast={false}
            labelName={<span>Name</span>}
            isRequire
            valuePropsName="value"
            errorMessage="Please enter contact name"
            method="blur"
            inline
          >
            <FormControl name="linkman" placeholder="Please enter contact name" value={linkman} onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
          </FormItem>

          <FormItem
            className="input_phone"
            showMast={false}
            valuePropsName="value"
            labelName={<span>Mobile</span>}
            isRequire
            method="blur"
            htmlType="tel"
            errorMessage="Wrong mobile No. format"
            inline
          >
            <FormControl name="tenantTel" placeholder="Please enter mobile number" value={tenantTel} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} />
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>Industry</span>}
            isRequire
            valuePropsName="value"
            errorMessage="Please choose an industry"
            method="blur"
            inline
          >
            <Select
              defaultValue="-Industry-"
              name="tenantIndustry"
              onChange={(e) => { this.setOptherData({ name: 'tenantIndustry', value: e }); }}
            >
              <Option value="A">Agriculture, Forestry, Animal Husbandry, and Fishery Industries</Option>
              <Option value="B">Mining Industry</Option>
              <Option value="C">Manufacturing</Option>
              <Option value="D">Electricity/Heating Power/Gas/Water Production and Supply Industry</Option>
              <Option value="S">Environment and Public Administration, Social Insurance, and Social Org</Option>
              <Option value="E">Construction Industry</Option>
              <Option value="G">Transportation, Warehousing and Postal Services</Option>
              <Option value="I">Info Transmission, Computer Service and Software Industry</Option>
              <Option value="F">Wholesale and Retail Trade</Option>
              <Option value="H">Accommodation and Catering Industry</Option>
              <Option value="J">Finance and Insurance Industries</Option>
              <Option value="K">Real Estate Industry</Option>
              <Option value="L">Leasing and Business Services</Option>
              <Option value="M">Scientific Research, Technical Services and Geological Prospecting</Option>
              <Option value="N">Water, Environment and Public Facilities Management Industry</Option>
              <Option value="O">Resident Services and Other Services</Option>
              <Option value="P">Education</Option>
              <Option value="Q">Health, Social Security and Social Service Industry</Option>
              <Option value="R">Culture, Sports and Recreation</Option>
              <Option value="T">International Organization</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>Size</span>}
            isRequire
            valuePropsName="value"
            errorMessage="Please choose scale"
            method="blur"
            inline
          >
            <Select
              defaultValue="-Scale-"
              name="tenantSize"
              onChange={(e) => { this.setOptherData({ name: 'tenantSize', value: e }); }}
            >
              <Option value="A">0-50</Option>
              <Option value="B">51-100</Option>
              <Option value="C">101-200</Option>
              <Option value="D">201-500</Option>
              <Option value="E">501-1000</Option>
              <Option value="F">1001-2000</Option>
              <Option value="G">2000People</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>Province/City</span>}
            isRequire={false}
            valuePropsName="value"
            errorMessage="Please enter province/city"
            method="blur"
            inline
          >
            <CitySelect name="address" onChange={this.onChange} />
          </FormItem>
        </Form>
            <div className={applyBtn}>Apply</div>
      </div>
    );
  }
}

export default CreateEnter;
