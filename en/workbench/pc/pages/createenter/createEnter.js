import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Form, { FormItem } from 'bee/form';
import Upload from 'containers/upload';
import FormControl from 'bee/form-control';
import Select from 'bee/select';
import CitySelect from 'bee/city-select';
import Progress from 'pub-comp/progress';
import 'assets/style/Form.css';
import { check } from './checkTenantStatus';
import SubmitBtn from './SubmitBtn';
import {
  enterForm, tenantAddress, lxrHr, lxrTitle,
  enterUpload, progressBar,
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;
const { Option } = Select;
/*
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
        <Radio value="LegalPerson" >NoDictionary</Radio>
        <Radio value="IndividualPerson" >NoDictionary</Radio>
        <Radio value="ResponsePerson" >NoDictionary</Radio>
        <Radio value="Other" >NoDictionary</Radio>
      </Radio.RadioGroup>
    );
  }
}
*/

@withRouter
@connect(
  () => ({}),
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
    this.address = 'NoDictionary}|北京|NoDictionary|';
  }

  onChange = (obj) => {
    this.address = obj.province + obj.city + obj.area;
  }

  setUrl(name, url) {
    this.state[name] = url;
    this.setState({
      ...this.state,
    });
  }

  setOptherData = (obj) => {
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state,
    });
  }

  checkForm = (flag, data) => {
    const { setCreateEnter, updateenter } = this.props;
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
        this.setState({
          disabled: true,
        });
        requestSuccess();
        if (error) {
          requestError(payload);
          return;
        }
        const { tenantId } = payload;
        this.setState({ tenantId, processValue: 1 });
        localStorage.setItem('create', '1');
        // window.location.href = "/?tenantId=" + tenantId + "&switch=true";
        // this.goToLoading(tenantId)
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
    const Butt = processValue !== 0
      ?
      (<div className={progressBar}><Progress check={check} tenantId={tenantId} startFlag={processValue} loadingDesc="NoDictionary…" /></div>)
      :
      <SubmitBtn isSubmit disabled={this.state.disabled} />;
    return (
      <div>
        <Form submitCallBack={this.checkForm} showSubmit={false} className={enterForm}>
          <FormItem
            showMast={false}
            labelName={<span>NoDictionary<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="NoDictionary"
            method="blur"
            inline
          >
            <FormControl name="tenantName" placeholder="NoDictionary" />
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>NoDictionary<font color="red"> &nbsp; &nbsp;</font></span>}
            valuePropsName="value"
            method="change"
            inline
          >
            <Upload
              className={enterUpload}
              name="logo"
              logo={logo || ''}
              onChange={(e) => { this.setUrl('logo', e); }}
              tip=""
            />
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="NoDictionary"
            method="blur"
            inline
          >
            <Select
              defaultValue="-NoDictionary-"
              name="tenantIndustry"
              style={{ width: 338, marginRight: 6 }}
              onChange={(e) => { this.setOptherData({ name: 'tenantIndustry', value: e }); }}
            >
              <Option value="A">NoDictionary</Option>
              <Option value="B">NoDictionary</Option>
              <Option value="C">NoDictionary</Option>
              <Option value="D">NoDictionary</Option>
              <Option value="S">NoDictionary</Option>
              <Option value="E">NoDictionary</Option>
              <Option value="G">NoDictionary</Option>
              <Option value="I">NoDictionary</Option>
              <Option value="F">NoDictionary</Option>
              <Option value="H">NoDictionary</Option>
              <Option value="J">NoDictionary</Option>
              <Option value="K">NoDictionary</Option>
              <Option value="L">NoDictionary</Option>
              <Option value="M">NoDictionary</Option>
              <Option value="N">NoDictionary</Option>
              <Option value="O">NoDictionary</Option>
              <Option value="P">NoDictionary</Option>
              <Option value="Q">NoDictionary</Option>
              <Option value="R">NoDictionary</Option>
              <Option value="T">NoDictionary</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="NoDictionary"
            method="blur"
            inline
          >
            <Select
              defaultValue="-NoDictionary-"
              name="tenantSize"
              style={{ width: 338, marginRight: 6 }}
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
            labelName={<span>NoDictionary<font color="red">&nbsp;&nbsp;</font></span>}
            isRequire={false}
            valuePropsName="value"
            errorMessage="NoDictionary"
            method="blur"
            inline
          >
            <CitySelect name="address" onChange={this.onChange} />
          </FormItem>

          <FormItem
            className={tenantAddress}
            showMast={false}
            isRequire={false}
            valuePropsName="value"
            errorMessage="NoDictionary"
            method="blur"
            inline
          >
            <FormControl name="tenantAddress" placeholder="NoDictionary" />
          </FormItem>

          <div className={lxrHr}>
            <hr />
          </div>

          <div className={lxrTitle}>
            NoDictionary
          </div>

          <FormItem
            showMast={false}
            labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="NoDictionary"
            method="blur"
            inline
          >
            <FormControl name="linkman" placeholder="NoDictionary" value={linkman} onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
          </FormItem>

          <FormItem
            showMast={false}
            valuePropsName="value"
            labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            method="blur"
            htmlType="email"
            errorMessage="NoDictionary"
            inline
          >
            <FormControl name="tenantEmail" placeholder="NoDictionary" value={tenantEmail} onChange={(e) => { this.inputOnChange(e, 'tenantEmail'); }} />
          </FormItem>

          <FormItem
            inputBefore="+86"
            className="input_phone"
            showMast={false}
            valuePropsName="value"
            labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            method="blur"
            htmlType="tel"
            errorMessage="NoDictionary"
            inline
          >
            <FormControl name="tenantTel" placeholder="NoDictionary" value={tenantTel} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} />
          </FormItem>

          { /*
            <FormItem
              showMast={false}
              labelName={<span>NoDictionary<font color='red'> * </font></span>}
              isRequire={false} method="change" inline={true}
            >
              <Nature name="tenantNature" defaultValue='LegalPerson' />
            </FormItem> ]
            */
          }
          { /*
            <div className={lxrHrBottom}>
              <hr />
            </div>
            */
          }

          {
            Butt
          }
        </Form>

      </div>
    );
  }
}

export default CreateEnter;
