import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import loginpageActions from 'store/root/loginpage/actions';
import rootActions from 'store/root/actions';



import Form, { FormItem } from 'bee/form';
import FormControl from 'bee/form-control';
import Select from 'bee-select';
import CitySelect from 'bee/city-select';
import { openMess } from 'pub-comp/notification';
import 'assets/style/Form.css';
import {
  applyForm, applyBtn,
} from './style.css';

const {applyService} = loginpageActions;
const { requestStart, requestSuccess, requestError } = rootActions;
const { Option } = Select;

@withRouter
@connect(
  mapStateToProps(),
  {
    requestStart,
    requestSuccess,
    requestError,
    applyService,
  },
)

class CreateEnter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      tenantIndustry: 'A',
      tenantSize:'A',//staff的范围
      linkman: '',
      companyname:'',
      tenantTel:'',
    };
    // this.address = '北京|北京|东城区|';
    this.province = 'Beijing';
    this.city = 'Beijing';
  }

  onChange = (obj) => {
    // this.address = obj.province + obj.city;
    this.province =  obj.province;
    this.city= obj.city;
  }

  

  setOptherData = (obj) => {
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state,
    });
  }
  
  inputOnChange = (e, name) => {
    this.state[name] = e;
    this.setState({
      ...this.state,
    });
  }

  submitService = () =>{
    let{tenantIndustry, tenantSize,companyname, linkman, tenantTel} = this.state;
    const { applyService, requestStart, requestSuccess, requestError, } = this.props;
    if(tenantIndustry== ''||tenantSize==''||companyname==''||linkman==''||tenantTel==''){
      return false;
    }
    let param = {
      companyName:companyname,
      contactName:linkman,
      phoneNumber:tenantTel,
      trade:tenantIndustry,
      scale:tenantSize,
      province:this.province,
      city:this.city,
    }
    this.setState({flag:true});
    requestStart()
    applyService(param).then(({ error, payload }) => {
      if (error) {
        this.setState({
          flag: false, // 可以再提交一次
        });
        requestError(payload);
        return;
      }
      this.setState({
        flag: false,
      });
      requestSuccess();
      window.location.reload();
    });

  }
  render() {
    const {
      flag,tenantIndustry, tenantSize,companyname, linkman,  tenantTel,
    } = this.state;
    let disabled = false;
    if(flag ||tenantIndustry==''||tenantSize == ''|| companyname == '' || linkman == ''|| tenantTel=='' || !(/^1[34578][0-9]{9}$/).test(tenantTel)){
      disabled = true;
    }
    return (
      <div className="applyService">
        <Form  className={applyForm} showSubmit={false}>
        <FormItem
            showMast={false}
            labelName={<span>Company Name <font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="Please enter Company Name "
            method="blur"
            inline
          >
            <FormControl ref={ref=>this.companyRef = ref}name="companyname" placeholder="Please enter Company Name " value={companyname} onChange={(e) => { this.inputOnChange(e, 'companyname'); }} />
          </FormItem>
        
          <FormItem
            showMast={false}
            labelName={<span>Industry<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="Please choose an industry"
            method="blur"
            inline
          >
            <Select
              defaultValue="-Industry-"
              name="tenantIndustry"
              style={{width:'370px'}}
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
            labelName={<span>Company Scale <font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="Please Scale Range"
            method="blur"
            inline
          >
            <Select
              defaultValue="-Scale Range-"
              name="tenantSize"
              style={{width:'370px'}}
              onChange={(e) => { this.setOptherData({ name: 'tenantSize', value: e }); }}
            >
              <Option value="A">0-50</Option>
              <Option value="B">51-100</Option>
              <Option value="C">101-200</Option>
              <Option value="D">201-500</Option>
              <Option value="E">501-1000</Option>
              <Option value="F">1001-2000</Option>
              <Option value="G">2000people</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>Province/City<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire={false}
            valuePropsName="value"
            errorMessage="Please enter province/city"
            method="blur"
            inline
          >
            <CitySelect name="address" onChange={this.onChange} />
          </FormItem>
          <FormItem
            showMast={false}
            labelName={<span>Contact<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="Please enter contact name"
            method="blur"
            inline
          >
            <FormControl name="linkman" placeholder="Please enter the contact name" value={linkman} onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
          </FormItem>

          <FormItem
            className="input_phone"
            showMast={false}
            valuePropsName="value"
            labelName={<span>Cellphone <font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            method="blur"
            htmlType="tel"
            errorMessage="Wrong mobile No. format"
            inline
          >
            <FormControl name="tenantTel" placeholder="Please enter the cellphone number" value={tenantTel} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} />
          </FormItem>

        </Form>
        {
          disabled?
          <div className={`${applyBtn} disabled`} >Apply Now</div>
          :
          <div className={applyBtn}  onClick={this.submitService}>Apply</div>

        }
            {/* <div className={applyBtn} onClick={this.submitService}>Apply</div> */}
      </div>
    );
  }
}

export default CreateEnter;
