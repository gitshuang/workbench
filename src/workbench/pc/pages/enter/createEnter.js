import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import Form from 'bee-form';
import Icon from 'components/icon';
import UploadPage from 'containers/upload';
import CitySelect from 'bee-city-select';
import {Checkbox, InputNumber, Button, FormControl,Radio,Select,Upload} from 'tinper-bee';
const FormItem = Form.FormItem;
import { page_team ,demo3} from './style.css';
import ButtonDefault,{ButtonBrand, ButtonDefaultLine,ButtonDefaultAlpha,ButtonWarning,ButtonDanger,} from 'components/button';

const { getSearchEnterList ,setCreateEnter} = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'enterList',
    {
      namespace: 'home',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getSearchEnterList,
    setCreateEnter
  }
)
class CreateTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
        enter_tax_num:'1',
        enter_type:"1",
        invoiceType:"businessTax",
        type:"LegalPerson",
        optherData:[
          {name:"scale",value:"Ten"},
          {name:"guojia",value:"jack"}
        ]
    };
  } 

  componentWillMount() {
    const {requestStart, requestSuccess, requestError, getSearchEnterList} = this.props;
    requestStart();
    const param = {
      teamName: ""
    };
    getSearchEnterList(param).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
  }

  checkForm = (flag,obj) => {
    let newData = [...obj,...this.state.optherData];
    const {setCreateEnter} = this.props;
    setCreateEnter(newData).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      //
    });
  }

    enterTaxNumOnChange=enter_tax_num=>{
        this.setState({
            enter_tax_num
        })
    }

    enterTypeOnChange=enter_type=>{
        this.setState({
            enter_type
        })
    }

  setOptherData(obj){
    let _itemData = this.state.optherData.find((da)=>da.name == obj.name);
    if(_itemData){
      _itemData.value = obj.value;
    }else{
      this.state.optherData.push(obj);
    }
    this.setState({
      ...this.state
    })
  }
 
  getUrl=(obj)=>{
    this.setOptherData(obj);
  }

   render() {
    const {  enterList  } = this.props;
    let cancel=()=>{
        return (
            <Button shape="border" className="cancel">取消</Button>
        )
    }

    return (
      <div className={demo3}> 
        <Form submitCallBack={this.checkForm} afterSubmitBtn={cancel()}>
            <FormItem showMast={true}  labelName="用户名:" isRequire={true} valuePropsName='value' errorMessage="请输入用户名" method="blur"  inline={true}>
                <FormControl name="username"  placeholder="请输入用户名,最多60个字符"/>
            </FormItem>

            <FormItem showMast={true}  labelName="企业头像:" valuePropsName='value' method="blur"  inline={true}>
              <UploadPage name='logo' getUrl={this.getUrl} />
              {/* <Upload {...props}>
                <ButtonBrand onClick={(e)=>{this.uploadImage(e)}} > <Icon type="uf-upload" />Upload</ButtonBrand>
              </Upload> */}
            </FormItem>
            
            <FormItem showMast={true}  labelName="所属规模:" isRequire={false} valuePropsName='value' errorMessage="请选择所属规模" method="blur"  inline={true}>
                <Select
                    size="lg"
                    defaultValue="Ten"
                    style={{ width: 200, marginRight: 6 }} 
                    onChange={(e)=>{this.setOptherData({name:"scale",value:e})} }
                    > 
                    <Option value="Ten">1-10人</Option>
                    <Option value="Hundred">10-100人</Option>
                    <Option value="FiveHundred">100-500人</Option>
                    <Option value="Thousand">500-1000人</Option>
                    <Option value="Thousands">1000人以上</Option>
                </Select>
            </FormItem>

            <FormItem showMast={true}  labelName="国家:" isRequire={false} valuePropsName='value' errorMessage="请选择国家" method="blur"  inline={true}>
                <Select
                    size="lg"
                    defaultValue="boyuzhou"
                    style={{ width: 200, marginRight: 6 }} 
                    onChange={(e)=>{this.setOptherData({name:"guojia",value:e})} }
                    >
                    <Option value="jack">boyuzhou</Option>
                    <Option value="lucy">renhualiu</Option>
                    <Option value="yiminghe">yuzhao</Option>
                </Select> 
            </FormItem> 

            <FormItem showMast={true} labelName="企业地址:"  method="change" isRequire={true} inline={true}>
                <CitySelect name='address'/>
            </FormItem>

            <FormItem showMast={true}  labelName="姓名:" isRequire={true} valuePropsName='value' errorMessage="请输入联系人姓名" method="blur"  inline={true}>
                <FormControl name="contactName"  placeholder="请输入联系人姓名"/>
            </FormItem>

            <FormItem showMast={true} valuePropsName='value'  labelName="邮箱:" isRequire={true} method="blur" htmlType="email" errorMessage="邮箱格式错误"  inline={true}>
                <FormControl name="contactEmail"  placeholder="请输入邮箱" />
            </FormItem>

            <FormItem inputBefore="+86" showMast={true}  valuePropsName='value'  labelName="手机号:" isRequire={true} method="blur" htmlType="tel" errorMessage="手机号格式错误"  inline={true}>
                <FormControl name="contactMobile"  placeholder="请输入手机号" />
            </FormItem>

            <FormItem showMast={true} labelName="开票类型:" isRequire={false} method="change" inline={true}>
                <Radio.RadioGroup
                    selectedValue={this.state.invoiceType}
                    onChange={(e)=>{this.setOptherData({name:"invoiceType",value:e})} }
                    name="invoiceType">
                        <Radio value="businessTax" >企业税号</Radio>
                        <Radio value="integrationCode" >统一社会信用代码</Radio>
                </Radio.RadioGroup>
            </FormItem>

            <FormItem showMast={true}  labelName="企业税号:" isRequire={true} valuePropsName='value' errorMessage="请输入企业税号" method="blur"  inline={true}>
                <FormControl name="businessTax"  placeholder="请输入企业税号"/>
            </FormItem>
            
            <FormItem showMast={true}  labelName="企业法人:" isRequire={true} valuePropsName='value' errorMessage="请输入企业法人" method="blur"  inline={true}>
                <FormControl name="legalPerson"  placeholder="请输入企业法人"/>
            </FormItem> 
            
            <FormItem showMast={true} labelName="企业类型:" isRequire={false} method="change" inline={true}>
                <Radio.RadioGroup
                   selectedValue={this.state.type} 
                   onChange={(e)=>{this.setOptherData({name:"type",value:e})} }
                    name="type">
                        <Radio value="LegalPerson" >法人企业</Radio>
                        <Radio value="IndividualPerson" >个体工商户</Radio>
                        <Radio value="ResponsePerson" >个人企业</Radio>
                        <Radio value="Other" >其他</Radio>
                </Radio.RadioGroup>
            </FormItem>
            
        </Form>
      </div>
    );
  }
}
export default CreateTeam;