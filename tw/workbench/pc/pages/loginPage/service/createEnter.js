import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Form, { FormItem } from 'bee/form';
import FormControl from 'bee/form-control';
import Select from 'bee/select';
import CitySelect from 'bee/city-select';
import Progress from 'pub-comp/progress';
import 'assets/style/Form.css';
import {
  applyForm, applyBtn,
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
    return (
      <div>
        <Form submitCallBack={this.checkForm} showSubmit={false} className={applyForm}>
        <FormItem
            showMast={false}
            labelName={<span>姓名</span>}
            isRequire
            valuePropsName="value"
            errorMessage="請輸入連絡人姓名"
            method="blur"
            inline
          >
            <FormControl name="linkman" placeholder="請輸入連絡人姓名" value={linkman} onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
          </FormItem>

          <FormItem
            className="input_phone"
            showMast={false}
            valuePropsName="value"
            labelName={<span>手機號</span>}
            isRequire
            method="blur"
            htmlType="tel"
            errorMessage="手機號格式錯誤"
            inline
          >
            <FormControl name="tenantTel" placeholder="請輸入手機號" value={tenantTel} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} />
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>行業</span>}
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
            labelName={<span>規模</span>}
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
            labelName={<span>所在省市</span>}
            isRequire={false}
            valuePropsName="value"
            errorMessage="請輸入所在省市"
            method="blur"
            inline
          >
            <CitySelect name="address" onChange={this.onChange} />
          </FormItem>
        </Form>
            <div className={applyBtn}>立即申請</div>
      </div>
    );
  }
}

export default CreateEnter;
