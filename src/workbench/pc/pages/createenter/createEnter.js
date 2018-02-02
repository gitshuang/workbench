import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Form, { FormItem } from 'bee-form';
import Upload from 'containers/upload';
import { FormControl, Radio } from 'tinper-bee';
import { ButtonBrand } from 'components/button';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;

class Nature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
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
  () => ({}),
  {
    requestStart,
    requestSuccess,
    requestError,
    setCreateEnter,
  }
)
class CreateTeam extends Component {
  checkForm = (flag, data) => {
    if (flag) {
      requestStart();
      setCreateEnter(
        data.reduce(
          (obj, { value, name }) => {
            obj[name] = value;
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

  render() {
    return (
        <Form submitCallBack={this.checkForm} showSubmit={false}>
            <FormItem showMast={true}  labelName="企业名称:" isRequire={true} valuePropsName='value' errorMessage="请输入企业名称" method="blur"  inline={true}>
                <FormControl name="tenantName"  placeholder="最多60个字符"/>
            </FormItem>

            <FormItem showMast={true}  labelName="企业头像:" valuePropsName='value' method="change"  inline={true}>
              <Upload name='logo'/>
            </FormItem>

            <FormItem showMast={true} labelName="地址:" isRequire={true} valuePropsName='value' errorMessage="请输入企业地址" method="blur" inline={true}>
              <FormControl name="tenantAddress" placeholder="最多60个字符" />
            </FormItem>

            <FormItem showMast={true} valuePropsName='value'  labelName="邮箱:" isRequire={true} method="blur" htmlType="email" errorMessage="邮箱格式错误"  inline={true}>
                <FormControl name="tenantEmail"  placeholder="请输入邮箱" />
            </FormItem>

            <FormItem inputBefore="+86" showMast={true}  valuePropsName='value'  labelName="手机号:" isRequire={true} method="blur" htmlType="tel" errorMessage="手机号格式错误"  inline={true}>
                <FormControl name="contactMobile"  placeholder="请输入手机号" />
            </FormItem>

            <FormItem showMast={true} labelName="企业性质:" isRequire={false} method="change" inline={true}>
              <Nature name="tenantNature" defaultValue='LegalPerson' />
            </FormItem>
            <SubmitBtn isSubmit />
        </Form>
    );
  }
}

export default CreateTeam;
