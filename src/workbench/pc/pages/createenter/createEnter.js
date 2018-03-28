import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Form, { FormItem } from 'bee/form';
import Upload from 'containers/upload';
import FormControl from 'bee/form-control';
import Radio from 'bee/radio';
import Select from 'bee/select';
import { ButtonBrand } from 'pub-comp/button';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import 'assets/style/Form.css';
import { enter_form,tenant_address,lxr_hr,lxr_title,lxr_hr_bottom,process_loading,progress_bar} from './style.css';
import CitySelect from 'bee/city-select';
import Icon from 'pub-comp/icon';
import {check} from './checkTenantStatus'
import ProgressBar from 'bee/progressbar';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;

class Nature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    }
  }
  onChange = (value) => {
    this.setState({
      value
    });
    this.props.onChange(value);
  }
  render() {
    return (
      <Radio.RadioGroup
        selectedValue={this.state.value}
        onChange={this.onChange} >
        <Radio value="LegalPerson" >法人企业</Radio>
        <Radio value="IndividualPerson" >个体工商户</Radio>
        <Radio value="ResponsePerson" >个人企业</Radio>
        <Radio value="Other" >其他</Radio>
      </Radio.RadioGroup>
    );
  }
}
class SubmitBtn extends Component {
  click = () => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className={'u-form-submit'}>
      {
        this.props.disabled?<ButtonBrand  onClick={this.click} >创建</ButtonBrand>:<ButtonBrand disabled={true} >创建</ButtonBrand>
      }
      </div>
    );
  }
}

@withRouter
@connect(
  () => ({}),
  {
    requestStart,
    requestSuccess,
    requestError,
    setCreateEnter,
  }
)
class CreateEnter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disabled:true,
      logo:"",
      tenantIndustry:"A",
      linkman:props.userInfo.userName,
      tenantEmail:props.userInfo.userEmail,
      tenantTel:props.userInfo.userMobile,
      processValue:0
    };
    this.tenantIndustry ={
      name:"tenantIndustry",
      value:"A",
      verify:true
    }
    this.address = "北京|北京|东城区|";
  }

  checkForm = (flag, data) => {
    const {setCreateEnter,updateenter} = this.props;
    const {tenantIndustry} = this.state;

    let _address = data.find((da)=>da.name == "address");
    let _tenantAddress = data.find((da)=>da.name == "tenantAddress");
    if(_address.value && _address.value != ""){
      _tenantAddress.value = _address.value.province + "|" + _address.value.city  + "|" + _address.value.area + "|" + _tenantAddress.value;
    }else{
      _tenantAddress.value = this.address + _tenantAddress.value;
    }

    let _tenantIndustry = data.find((da)=>da.name == "tenantIndustry");
    if(!_tenantIndustry.value && _tenantIndustry.value == ""){
      _tenantIndustry.value = tenantIndustry;
    }

    if (flag) {
      this.setState({
        disabled:false
      })
      requestStart();
      setCreateEnter(
        data.reduce(
          (obj, { value, name }) => {
            name?obj[name] = value:null;
            return obj;
          },
          {},
        ),updateenter
      ).then(({ error, payload }) => {
        this.setState({
          disabled:true
        })
        requestSuccess();
        if (error) {
          requestError(payload);
          return;
        }
        const tenantId = payload.tenantId;
        localStorage.setItem('create', "1");
        // window.location.href = "/?tenantId=" + tenantId + "&switch=true";
        this.goToLoading(tenantId)
      });
    }
  }


  goToLoading = (tenantId) =>{
    var loadingInterVal = setInterval(()=> {
        const {processValue} = this.state;
        let _value = processValue === 95|| processValue === 100?95:(processValue+5);
        this.setState({
          processValue:_value
        });
    },600);
    check(tenantId,this.goToLoadingAfter,loadingInterVal,tenantId);
  }

  goToLoadingAfter = (loadingInterVal,tenantId) =>{
    ProgressBar.done();
    this.setState({processValue:100})//直接结束
    clearInterval(loadingInterVal);
    setTimeout(() => {
      window.location.href  ="/?tenantId=" + tenantId + "&switch=true";
    }, 600);
  }

  onChange = (obj)=>{
    this.address = obj.province + obj.city + obj.area;
  }

  setUrl(name,url){
    this.state[name] = url;
    this.setState({
      ...this.state
    })
  }

  setOptherData=(obj)=>{
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state
    })
  }

  inputOnChange = (e,name)=>{
    this.state[name] =  e;
    this.setState({
      ...this.state
    })
  }
  render() {
    const {logo,linkman,tenantEmail,tenantTel,processValue} = this.state;
    let _butt = processValue != 0?(<div className={progress_bar}><ProgressBar className={ process_loading } striped={false} now = {processValue} label={`${processValue}%`} ></ProgressBar><Icon type="loading" /></div>):<SubmitBtn isSubmit disabled={this.state.disabled} />
    return (<div>
        <Form submitCallBack={this.checkForm} showSubmit={false} className={enter_form}>
            <FormItem showMast={false}  labelName={<span>企业名称<font color='red'> &nbsp;*&nbsp;</font></span>}
            isRequire={true} valuePropsName='value' errorMessage="请输入企业名称" method="blur"
             inline={true}>
                <FormControl name="tenantName"  placeholder="最多60个字符"/>
            </FormItem>

            <FormItem showMast={false}  labelName={<span>企业头像<font color='red'> &nbsp; &nbsp;</font></span>} valuePropsName='value' method="change"  inline={true}>
              <Upload name='logo' logo={logo?logo:""} onChange={(e)=>{this.setUrl("logo",e)}}  tip="图片大小<=200K​" />
            </FormItem>

            <FormItem showMast={false}  labelName={<span>所属行业<font color='red'>&nbsp;*&nbsp;</font></span>} isRequire={true} valuePropsName='value' errorMessage="请选择所属行业" method="blur"  inline={true}>
                <Select
                    defaultValue="-所属行业-"
                    name="tenantIndustry"
                    style={{ width: 338, marginRight: 6 }}
                    onChange={(e)=>{this.setOptherData({name:"tenantIndustry",value:e})} }
                    >
                    <Option value="A">农、林、牧、渔业</Option>
                    <Option value="B">采矿业</Option>
                    <Option value="C">制造业</Option>
                    <Option value="D">电力、热力、燃气及水的生产和供应业</Option>
                    <Option value="S">环境和公共设施管理业、社会保障和社会组织</Option>
                    <Option value="E">建筑业</Option>
                    <Option value="G">交通运输、仓储业和邮政业</Option>
                    <Option value="I">信息传输、计算机服务和软件业</Option>
                    <Option value="F">批发和零售业</Option>
                    <Option value="H">住宿、餐饮业</Option>
                    <Option value="J">金融、保险业</Option>
                    <Option value="K">房地产业</Option>
                    <Option value="L">租赁和商务服务业</Option>
                    <Option value="M">科学研究、技术服务和地质勘查业</Option>
                    <Option value="N">水利、环境和公共设施管理业</Option>
                    <Option value="O">居民服务和其他服务业</Option>
                    <Option value="P">教育</Option>
                    <Option value="Q">卫生、社会保障和社会服务业</Option>
                    <Option value="R">文化、体育、娱乐业</Option>
                    <Option value="T">国际组织</Option>
                </Select>
            </FormItem>

             <FormItem showMast={false}  labelName={<span>规模范围<font color='red'>&nbsp;* &nbsp;</font></span>} isRequire={true} valuePropsName='value' errorMessage="请选择规模范围" method="blur"  inline={true}>
                <Select
                    defaultValue="-规模范围-"
                    name="tenantSize"
                    style={{ width: 338, marginRight: 6 }}
                    onChange={(e)=>{this.setOptherData({name:"tenantSize",value:e})} }
                    > 
                    <Option value="A">0－50</Option>
                    <Option value="B">51-100</Option>
                    <Option value="C">101-200</Option>
                    <Option value="D">201-500</Option>
                    <Option value="E">501-1000</Option>
                    <Option value="F">1001－2000</Option>
                    <Option value="G">>2000人</Option>
                </Select>
            </FormItem>

            <FormItem showMast={false} labelName={<span>企业地址<font color='red'>&nbsp;&nbsp;</font></span>} isRequire={false} valuePropsName='value' errorMessage="请输入企业地址" method="blur" inline={true}>
              <CitySelect name='address' onChange={this.onChange} />
            </FormItem>

            <FormItem className={tenant_address} showMast={false} isRequire={false} valuePropsName='value' errorMessage="请输入企业地址" method="blur" inline={true}>
              <FormControl name="tenantAddress" placeholder="最多60个字符" />
            </FormItem>

            <div className={lxr_hr}>
              <hr />
            </div>

            <div className={lxr_title}>
              联系人信息：
            </div>
            
            <FormItem showMast={false} labelName={<span>姓名<font color='red'>&nbsp;*&nbsp;</font></span>} isRequire={true} valuePropsName='value' errorMessage="请输入联系人姓名" method="blur" inline={true}>
              <FormControl name="linkman"  placeholder="请输入联系人姓名" value={linkman} onChange={(e)=>{this.inputOnChange(e,"linkman")}} />
            </FormItem>

            <FormItem showMast={false} valuePropsName='value'  labelName={<span>邮箱<font color='red'>&nbsp;*&nbsp;</font></span>} isRequire={true} method="blur" htmlType="email" errorMessage="邮箱格式错误"  inline={true}>
                <FormControl name="tenantEmail"  placeholder="请输入邮箱" value={tenantEmail} onChange={(e)=>{this.inputOnChange(e,"tenantEmail")}} />
            </FormItem>

            <FormItem inputBefore="+86" className="input_phone" showMast={false}  valuePropsName='value'  labelName={<span>手机号<font color='red'>&nbsp;*&nbsp;</font></span>} isRequire={true} method="blur" htmlType="tel" errorMessage="手机号格式错误"  inline={true}>
                <FormControl name="tenantTel"  placeholder="请输入手机号" value={tenantTel} onChange={(e)=>{this.inputOnChange(e,"tenantTel")}} />
            </FormItem>

            {/* <FormItem showMast={false} labelName={<span>企业性质<font color='red'> * </font></span>} isRequire={false} method="change" inline={true}>
              <Nature name="tenantNature" defaultValue='LegalPerson' />
            </FormItem> */}
            {/* <div className={lxr_hr_bottom}>
              <hr />
            </div> */}

            {
              _butt
            }
        </Form>
          
        </div>
    );
  }
}

export default CreateEnter;
