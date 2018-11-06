import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import loginpageActions from 'store/root/loginpage/actions';
import rootActions from 'store/root/actions';



import Form, { FormItem } from 'bee/form';
import FormControl from 'bee/form-control';
import Select from 'bee/select';
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
  mapStateToProps(
    'currLan',
  ),
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
      defaultValue:{
        province:'北京',
        city:'北京',
      }
    };
  }
  onChange = (obj) => {
    this.setState({
        defaultValue:{
          province:obj.province,
          city:obj.city,
        }
    })
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
            labelName={<span>企業名稱<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="請輸入企業名稱"
            method="blur"
            inline
          >
            <FormControl ref={ref=>this.companyRef = ref}name="companyname" placeholder="請輸入企業名稱" value={companyname} onChange={(e) => { this.inputOnChange(e, 'companyname'); }} />
          </FormItem>
        
          <FormItem
            showMast={false}
            labelName={<span>行業<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="請選擇所屬行業"
            method="blur"
            inline
          >
            <Select
              defaultValue="-所屬行業-"
              name="tenantIndustry"
              style={{width:'370px'}}
              onChange={(e) => { this.setOptherData({ name: 'tenantIndustry', value: e }); }}
            >
              <Option value="A">農、林、牧、漁業</Option>
              <Option value="B">採礦業</Option>
              <Option value="C">製造業</Option>
              <Option value="D">電力、熱力、燃氣及水的生產和供應業</Option>
              <Option value="S">環境和公共設施管理業、社會保障和社會組織</Option>
              <Option value="E">建築業</Option>
              <Option value="G">交通運輸、倉儲業和郵政業</Option>
              <Option value="I">資訊傳輸、電腦服務和軟體業</Option>
              <Option value="F">批發和零售業</Option>
              <Option value="H">住宿、餐飲業</Option>
              <Option value="J">金融、保險業</Option>
              <Option value="K">房地產業</Option>
              <Option value="L">租賃和商務服務業</Option>
              <Option value="M">科學研究、技術服務和地質勘查業</Option>
              <Option value="N">水利、環境和公共設施管理業</Option>
              <Option value="O">居民服務和其他服務業</Option>
              <Option value="P">教育</Option>
              <Option value="Q">衛生、社會保障和社會服務業</Option>
              <Option value="R">文化、體育、娛樂業</Option>
              <Option value="T">國際組織</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>規模<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="請選擇規模範圍"
            method="blur"
            inline
          >
            <Select
              defaultValue="-規模範圍-"
              name="tenantSize"
              style={{width:'370px'}}
              onChange={(e) => { this.setOptherData({ name: 'tenantSize', value: e }); }}
            >
              <Option value="A">0－50</Option>
              <Option value="B">51-100</Option>
              <Option value="C">101-200</Option>
              <Option value="D">201-500</Option>
              <Option value="E">501-1000</Option>
              <Option value="F">1001－2000</Option>
              <Option value="G">2000人</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>所在省市<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire={false}
            valuePropsName="value"
            errorMessage="請輸入所在省市"
            method="blur"
            inline
          >
            <CitySelect name="address" onChange={this.onChange} defaultValue={this.state.defaultValue} lang={this.props.currLan}/>
          </FormItem>
          <FormItem
            showMast={false}
            labelName={<span>聯繫人<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="請輸入聯繫人姓名"
            method="blur"
            inline
          >
            <FormControl name="linkman" placeholder="請輸入聯繫人姓名" value={linkman} onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
          </FormItem>

          <FormItem
            className="input_phone"
            showMast={false}
            valuePropsName="value"
            labelName={<span>手機號<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            method="blur"
            htmlType="tel"
            errorMessage="手機號格式錯誤"
            inline
          >
            <FormControl name="tenantTel" placeholder="請輸入手機號" value={tenantTel} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} />
          </FormItem>

        </Form>
        {
          disabled?
          <div className={`${applyBtn} disabled`} >立即申請</div>
          :
          <div className={applyBtn}  onClick={this.submitService}>立即申請</div>

        }
            {/* <div className={applyBtn} onClick={this.submitService}>立即申請</div> */}
      </div>
    );
  }
}

export default CreateEnter;
