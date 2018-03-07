import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Form, { FormItem } from 'bee-form';
import Upload from 'containers/upload';
import FormControl from 'bee/form-control';
import Radio from 'bee/radio';
import Select from 'bee/select';
import { ButtonBrand } from 'components/button';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import CitySelect from 'bee/city-select';
import 'assets/style/Form.css';
import { enter_form,tenant_address,lxr_hr,lxr_title,lxr_hr_bottom} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter,getEnterInfo } = homeActions;

class Nature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.defaultValue != this.defaultValue){
      this.setState({
        value: nextProps.defaultValue
      })
    }
  }

  onChange = (value) => {
    this.setState({
      value
    });
    // this.props.onChange(value);
  }


  render() {
    return (
      <Radio.RadioGroup
        selectedValue={this.state.value}
        onChange={this.onChange} >
        <Radio value="0" >禁止</Radio>
        <Radio value="1" >允许</Radio>
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
        <ButtonBrand onClick={this.click} >保存</ButtonBrand>
      </div>
    );
  }
}

@withRouter
@connect(
  mapStateToProps(
    'enterInfo',
    {
      namespace: 'home',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    setCreateEnter,
    getEnterInfo,
  }
)
class CreateEnter extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // componentWillMount(){
  //   const { requestSuccess, requestError, getEnterInfo} = this.props;
  //   let param = "123";
  //   getEnterInfo(param).then(({error, payload}) => {
  //     if (error) {
  //       requestError(payload);
  //     }
  //     requestSuccess();
  //     let _tenantAddress = payload["tenantAddress"];
  //     if(_tenantAddress){
  //       let _addres = _tenantAddress.split("|");
  //       payload["address"] = {province:_addres[0]?_addres[0]:"",city:_addres[1]?_addres[1]:"",area:_addres[2]?_addres[2]:""};
  //     }
  //     this.setState({
  //       ...payload
  //     })
  //   });
  // }

  componentWillReceiveProps(nextProps){
    const {data} = nextProps; 
    if(data == null)return;
    let _tenantAddress = data["tenantAddress"];
    if(_tenantAddress){
      let _addres = _tenantAddress.split("|");
      data["address"] = {province:_addres[0]?_addres[0]:"",city:_addres[1]?_addres[1]:"",area:_addres[2]?_addres[2]:""};
    }
    this.setState({
        ...data
    })
  }

  checkForm = (flag, data) => {
    const {setCreateEnter,updateenter} = this.props;
    const {logo,tenantIndustry,tenantId,address,tenantAddress,joinPermission,invitePermission} = this.state;

    let _logo = data.find((da)=>da.name == "logo");
    if(!_logo.value && _logo.value == ""){
      _logo.value = logo;
    }

    let _tenantIndustry = data.find((da)=>da.name == "tenantIndustry");
    if(!_tenantIndustry.value && _tenantIndustry.value == ""){
      _tenantIndustry.value = tenantIndustry;
    }

    let _tenantAddress = data.find((da)=>da.name == "tenantAddress");
      _tenantAddress.value = address.province+"|"+address.city+"|"+address.area+"|"+_tenantAddress.value;

    let _joinPermission = data.find((da)=>da.name == "joinPermission");
    if(!_joinPermission.value && _joinPermission.value == ""){
      _joinPermission.value = joinPermission;
    }

    let _invitePermission = data.find((da)=>da.name == "invitePermission");
    if(!_invitePermission.value && _invitePermission.value == ""){
      _invitePermission.value = invitePermission;
    }

    let _allowExit = data.find((da)=>da.name == "allowExit");
    if(!_allowExit.value && _allowExit.value == ""){
      _allowExit.value = allowExit;
    }
    
    data.push({name:"tenantId",value:tenantId});
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
      requestSuccess();
      if (error) {
        requestError(payload);
        return;
      }
      const tenantId = payload.tenantId;
      localStorage.setItem('create', "1");
      window.location.href = "/?tenantId=" + tenantId + "&switch=true";
    });
  }

  inputOnChange = (e,name)=>{
    this.state[name] =  e;
    this.setState({
      ...this.state
    })
  }

  allowExitChange=(value)=>{
    this.setState({
      allowExit:value
    })
  }

  setOptherData=(obj)=>{
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state
    })
  }
 
  onCityChange = (obj)=>{
    // this.address = obj.province + obj.city + obj.area;
    // defaultValue:{ province:'北京',city:'北京',area:'东城区'},
    this.setState({
      address:obj
    })
  }

  setUrl(name,url){
    this.state[name] = url;
    this.setState({
      ...this.state
    })
  }

  onChangeUpload=(url)=>{
    this.setState({
      logo:url
    })
 }

  render() {
    const {tenantName,logo,tenantNature,allowExit,tenantEmail,tenantTel,tenantAddress,
      tenantIndustry,invitePermission,joinPermission,address} = this.state;
     
      let newTenantAddress = "";
      if(tenantAddress){
        let _adds = tenantAddress.split("|");
        newTenantAddress = _adds[_adds.length-1];
      }

    return (
        <Form submitCallBack={this.checkForm} showSubmit={false} className={enter_form}>
            <FormItem showMast={false}  labelName={<span>企业名称<font color='red'> *</font></span>}
            isRequire={true} valuePropsName='value' errorMessage="请输入企业名称" method="blur"
             inline={true}>
                <FormControl name="tenantName" value={tenantName?tenantName:""} onChange={(e)=>{this.inputOnChange(e,"tenantName")}} placeholder="最多60个字符"/>
            </FormItem>

            <FormItem showMast={false}  labelName={<span>企业头像<font color='red'> *</font></span>} valuePropsName='value' method="change"  inline={true}>
              <Upload name='logo' logo={logo?logo:""} onChange={this.onChangeUpload}  />
            </FormItem>
            <FormItem showMast={false}  labelName={<span>所属行业<font color='red'> *</font></span>} isRequire={false} valuePropsName='value' errorMessage="请选择所属行业" method="blur"  inline={true}>
                <Select
                    name="tenantIndustry"
                    defaultValue="A"
                    value={tenantIndustry?tenantIndustry:"A"}
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

            <FormItem showMast={false} labelName={<span>企业地址<font color='red'> *&nbsp;</font></span>} isRequire={false} valuePropsName='value' errorMessage="请输入企业地址" method="blur" inline={true}>
              <CitySelect name='address' onChange={this.onCityChange} value={address} />
            </FormItem>

            <FormItem showMast={false} labelName={<span>地址<font color='red'> *</font></span>} isRequire={true} valuePropsName='value' errorMessage="请输入企业地址" method="blur" inline={true}>
              <FormControl name="tenantAddress" value={newTenantAddress?newTenantAddress:tenantAddress} onChange={(e)=>{this.inputOnChange(e,"tenantAddress")}} placeholder="最多60个字符" />
            </FormItem>

            <FormItem showMast={false}  labelName={<span>邀请规则<font color='red'> *</font></span>} isRequire={false} valuePropsName='value' errorMessage="请选择所属行业" method="blur"  inline={true}>
                <Select
                    name="invitePermission"
                    defaultValue={invitePermission?invitePermission:"1"}
                    style={{ width: 338, marginRight: 6 }}
                    onChange={(e)=>{this.setOptherData({name:"invitePermission",value:e})} }
                    >
                    <Option value="1">全员邀请 </Option>
                    <Option value="2">全员禁止</Option>
                    <Option value="0">仅管理员可邀请</Option>
                </Select>
            </FormItem>

            <FormItem showMast={false}  labelName={<span>申请权限<font color='red'> *</font></span>} isRequire={false} valuePropsName='value' errorMessage="请选择所属行业" method="blur"  inline={true}>
                <Select
                    name="joinPermission"
                    defaultValue={joinPermission?joinPermission:"1"}
                    style={{ width: 338, marginRight: 6 }}
                    onChange={(e)=>{this.setOptherData({name:"joinPermission",value:e})} }
                    >
                    <Option value="0">全员允许 </Option>
                    <Option value="1">全员禁止</Option>
                </Select>
            </FormItem>

            <FormItem showMast={false} labelName={<span>允许退出<font color='red'> *</font></span>} isRequire={false} method="change" inline={true}>
              <Nature name="allowExit" defaultValue={allowExit?allowExit:"0"} onChange={this.allowExitChange} />
            </FormItem>

            <div className={lxr_hr}>
              <hr />
            </div>

            <div className={lxr_title}>
              联系人信息：
            </div>

            <FormItem showMast={false} valuePropsName='value'  labelName={<span>邮箱<font color='red'> *</font></span>} isRequire={true} method="blur" htmlType="email" errorMessage="邮箱格式错误"  inline={true}>
                <FormControl name="tenantEmail" value={tenantEmail?tenantEmail:""} onChange={(e)=>{this.inputOnChange(e,"tenantEmail")}} placeholder="请输入邮箱" />
            </FormItem>

            <FormItem className="input_phone" showMast={false}  valuePropsName='value'  labelName={<span>手机号<font color='red'> *</font></span>} isRequire={true} method="blur" htmlType="tel" errorMessage="手机号格式错误"  inline={true}>
                <FormControl name="tenantTel" value={tenantTel?tenantTel:""} onChange={(e)=>{this.inputOnChange(e,"tenantTel")}} placeholder="请输入手机号" />
            </FormItem>

            {/* <FormItem showMast={false} labelName={<span>企业性质<font color='red'> *</font></span>} isRequire={false} method="change" inline={true}>
              <Nature name="tenantNature" defaultValue={tenantNature?tenantNature:"LegalPerson"} />
            </FormItem> */}

            <SubmitBtn isSubmit />
        </Form>
    );
  }
}

export default CreateEnter;
