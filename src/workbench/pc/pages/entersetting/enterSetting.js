import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Form, { FormItem } from 'bee-form';
import Upload from 'containers/upload';
import { FormControl, Radio,Select } from 'tinper-bee';
import { ButtonBrand } from 'components/button';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import 'assets/style/Form.css';
import { enter_form} from './style.css';

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
        <ButtonBrand onClick={this.click} >创建</ButtonBrand>
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
    this.tenantIndustry ={
      name:"tenantIndustry",
      value:"A",
      verify:true,
    }
  }

  componentWillMount(){ 
    const { requestSuccess, requestError, getEnterInfo} = this.props;
    let param = "123";
    getEnterInfo(param).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
      console.log("6666666",payload);
      this.setState({
        ...payload
      })
    });
  }
  
  checkForm = (flag, data) => {
    const {setCreateEnter} = this.props;
    data.push(this.tenantIndustry);
    if (flag) {
      requestStart();
      setCreateEnter(
        data.reduce(
          (obj, { value, name }) => {
            name?obj[name] = value:null;
            return obj;
          },
          {},
        ),
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
  }


  setOptherData(obj){
    this.tenantIndustry.value = obj.value;
  }

  render() {
    const {tenantName,logo,tenantNature,tenantEmail,tenantTel,tenantAddress} = this.state;
    // tenantNature
    return (
        <Form submitCallBack={this.checkForm} showSubmit={false} className={enter_form}>
            <FormItem showMast={false}  labelName={<span>企业名称<font color='red'> *</font></span>} 
            isRequire={true} valuePropsName='value' errorMessage="请输入企业名称" method="blur" 
             inline={true}>
                <FormControl name="tenantName" value={tenantName?tenantName:""}  placeholder="最多60个字符"/>
            </FormItem>

            <FormItem showMast={false}  labelName={<span>企业头像<font color='red'> *</font></span>} valuePropsName='value' method="change"  inline={true}>
              <Upload name='logo' logo={logo?logo:""}/>
            </FormItem>

            <FormItem showMast={false} labelName={<span>地址<font color='red'> *</font></span>} isRequire={true} valuePropsName='value' errorMessage="请输入企业地址" method="blur" inline={true}>
              <FormControl name="tenantAddress" value={tenantAddress?tenantAddress:""} placeholder="最多60个字符" />
            </FormItem>

            <FormItem showMast={false} valuePropsName='value'  labelName={<span>邮箱<font color='red'> *</font></span>} isRequire={true} method="blur" htmlType="email" errorMessage="邮箱格式错误"  inline={true}>
                <FormControl name="tenantEmail" value={tenantEmail?tenantEmail:""} placeholder="请输入邮箱" />
            </FormItem>

            <FormItem showMast={false}  labelName={<span>所属行业<font color='red'> *</font></span>} isRequire={false} valuePropsName='value' errorMessage="请选择所属行业" method="blur"  inline={true}>
                <Select
                    size="lg"
                    defaultValue="A"
                    style={{ width: 200, marginRight: 6 }} 
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

            <FormItem inputBefore="+86" className="input_phone" showMast={false}  valuePropsName='value'  labelName={<span>手机号<font color='red'> *</font></span>} isRequire={true} method="blur" htmlType="tel" errorMessage="手机号格式错误"  inline={true}>
                <FormControl name="tenantTel" value={tenantTel?tenantTel:""} placeholder="请输入手机号" />
            </FormItem>

            <FormItem showMast={false} labelName={<span>企业性质<font color='red'> *</font></span>} isRequire={false} method="change" inline={true}>
              <Nature name="tenantNature" defaultValue={tenantNature?tenantNature:"LegalPerson"} />
            </FormItem>
            <SubmitBtn isSubmit />
        </Form>
    );
  }
}

export default CreateEnter;
