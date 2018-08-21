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
    this.address = '北京|北京|東城區|';
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
      (<div className={progressBar}><Progress loadingCallBack={this.loadingCallBack} tenantId={tenantId} startFlag={processValue} successFunc={this.successLoading} loadingDesc="正在配置企業資訊…" /></div>)
      :
      <SubmitBtn isSubmit disabled={this.state.disabled} />;
    return (
      <div>
        <Form submitCallBack={this.checkForm} showSubmit={false} className={enterForm}>
          <FormItem
            showMast={false}
            labelName={<span>企業名稱<font color="red"> &nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="請輸入企業名稱"
            method="blur"
            inline
          >
            <FormControl maxLength="10" name="tenantName" placeholder="最多60個字元" />
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>企業頭像<font color="red"> &nbsp; &nbsp;</font></span>}
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
            labelName={<span>所屬行業<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="請選擇所屬行業"
            method="blur"
            inline
          >
            <Select
              defaultValue="-所屬行業-"
              name="tenantIndustry"
              style={{ width: 338, marginRight: 6 }}
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
            labelName={<span>規模範圍<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="請選擇規模範圍"
            method="blur"
            inline
          >
            <Select
              defaultValue="-規模範圍-"
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
            labelName={<span>企業地址<font color="red">&nbsp;&nbsp;</font></span>}
            isRequire={false}
            valuePropsName="value"
            errorMessage="請輸入企業位址"
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
            errorMessage="請輸入企業位址"
            method="blur"
            inline
          >
            <FormControl name="tenantAddress" placeholder="最多60個字元" />
          </FormItem>

          <div className={lxrHr}>
            <hr />
          </div>

          <div className={lxrTitle}>
            連絡人信息：
          </div>

          <FormItem
            showMast={false}
            labelName={<span>姓名<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            valuePropsName="value"
            errorMessage="請輸入連絡人姓名"
            method="blur"
            inline
          >
            <FormControl name="linkman" placeholder="請輸入連絡人姓名" value={linkman} onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
          </FormItem>

          <FormItem
            showMast={false}
            valuePropsName="value"
            labelName={<span>郵箱<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            method="blur"
            htmlType="email"
            errorMessage="郵箱格式錯誤"
            inline
          >
            <FormControl name="tenantEmail" placeholder="請輸入郵箱" value={tenantEmail} onChange={(e) => { this.inputOnChange(e, 'tenantEmail'); }} />
          </FormItem>

          <FormItem
            inputBefore="+86"
            className="input_phone"
            showMast={false}
            valuePropsName="value"
            labelName={<span>手機號<font color="red">&nbsp;*&nbsp;</font></span>}
            isRequire
            method="blur"
            htmlType="tel"
            errorMessage="手機號格式錯誤"
            inline
          >
            <FormControl name="tenantTel" placeholder="請輸入手機號" value={tenantTel} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} />
          </FormItem>

          { /*
            <FormItem
              showMast={false}
              labelName={<span>企業性質<font color='red'> * </font></span>}
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
