import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

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
    this.address = '北京|北京|东城区|';
    //progressbar
    this.loadingFunc = null;
    this.successFunc = null;
    this.timer = null;
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
        this.setState({ tenantId: tenantId }, () => {
          clearInterval(this.timer);
          check(tenantId, this.loadingFunc, this.successFunc);
        });//把processValue变成1.那么就开是走progress
      });
    }
  }
  successLoading = () => {
    const { tenantId } = this.state;
    window.location.href = `/?tenantId=${tenantId}&switch=true`;
  }

  loadingCallBack = (loadingFunc, successFunc) => {
    this.timer = setInterval(loadingFunc, 500);
    this.loadingFunc = loadingFunc;
    this.successFunc = successFunc;
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
      (<div className={progressBar}><Progress loadingCallBack={this.loadingCallBack} tenantId={tenantId} startFlag={processValue} successFunc={this.successLoading} loadingDesc="正在配置企业信息…" /></div>)
      :
      <SubmitBtn isSubmit disabled={this.state.disabled} />;
    return (
      <div>
        <Form submitCallBack={this.checkForm} showSubmit={false} className={enterForm}>
          <FormItem
            showMast={false}
            labelName={<span>企业名称<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="请输入企业名称"
            method="blur"
            inline
          >
            <FormControl maxLength="60" name="tenantName" placeholder="最多60个字符" />
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>企业头像<font color="red"> &nbsp; &nbsp;</font></span>}
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
            labelName={<span>所属行业<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="请选择所属行业"
            method="blur"
            inline
          >
            <Select
              defaultValue="-所属行业-"
              name="tenantIndustry"
              style={{ width: 338, marginRight: 6 }}
              onChange={(e) => { this.setOptherData({ name: 'tenantIndustry', value: e }); }}
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

          <FormItem
            showMast={false}
            labelName={<span>规模范围<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="请选择规模范围"
            method="blur"
            inline
          >
            <Select
              defaultValue="-规模范围-"
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
            labelName={<span>企业地址<font color="red">&nbsp;&nbsp;</font></span>}
            isRequire={false}
            valuePropsName="value"
            errorMessage="请输入企业地址"
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
            errorMessage="请输入企业地址"
            method="blur"
            inline
          >
            <FormControl name="tenantAddress" placeholder="最多60个字符" />
          </FormItem>

          <div className={lxrHr}>
            <hr />
          </div>

          <div className={lxrTitle}>
            联系人信息：
          </div>

          <FormItem
            showMast={false}
            labelName={<span>姓名<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="请输入联系人姓名"
            method="blur"
            inline
          >
            <FormControl name="linkman" placeholder="请输入联系人姓名" value={linkman} onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
          </FormItem>

          <FormItem
            showMast={false}
            valuePropsName="value"
            labelName={<span>邮箱<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            method="blur"
            htmlType="email"
            errorMessage="邮箱格式错误"
            inline
          >
            <FormControl name="tenantEmail" placeholder="请输入邮箱" value={tenantEmail} onChange={(e) => { this.inputOnChange(e, 'tenantEmail'); }} />
          </FormItem>

          <FormItem
            inputBefore="+86"
            className="input_phone"
            showMast={false}
            valuePropsName="value"
            labelName={<span>手机号<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            method="blur"
            htmlType="tel"
            errorMessage="手机号格式错误"
            inline
          >
            <FormControl name="tenantTel" placeholder="请输入手机号" value={tenantTel} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} />
          </FormItem>

          { /*
            <FormItem
              showMast={false}
              labelName={<span>企业性质<font color='red'> * </font></span>}
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
