import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Form, { FormItem } from 'bee/form';
import FormControl from 'bee/form-control';
import Radio from 'bee/radio';
import Select from 'bee/select';
import CitySelect from 'bee/city-select';
import Progress from 'pub-comp/progress';
import Upload from 'containers/upload';

import 'assets/style/Form.css';
import SubmitBtn from './SubmitBtn';
import { enterForm, lxrHr, lxrTitle, progressBar } from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;
const { Option } = Select;

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'enterInfo',
    {
      namespace: 'home',
    },
  ),
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
    data: PropTypes.shape({

    }),
    setCreateEnter: PropTypes.func,
    updateenter: PropTypes.string,
    btlLabel: PropTypes.string,
  };
  static defaultProps = {
    userInfo: {},
    data: {},
    setCreateEnter: () => { },
    updateenter: '',
    btlLabel: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      disabled: true,
      processValue: 0,
      isWaterMark: 1,
    };

    this.tenantSizeOption = [
      { value: 'A', label: '0-50' },
      { value: 'B', label: '51-100' },
      { value: 'C', label: '101-200' },
      { value: 'D', label: '201-500' },
      { value: 'E', label: '501-1000' },
      { value: 'F', label: '1001NoDictionary2000' },
      { value: 'G', label: '>2000NoDictionary' },
    ];

    this.tenantIndustry = [
      { value: 'A', label: 'NoDictionary、NoDictionary、NoDictionary、NoDictionary' },
      { value: 'B', label: 'NoDictionary' },
      { value: 'C', label: 'NoDictionary' },
      { value: 'D', label: 'NoDictionary、NoDictionary、NoDictionary' },
      { value: 'S', label: 'NoDictionary、NoDictionary' },
      { value: 'E', label: 'NoDictionary' },
      { value: 'G', label: 'NoDictionary、NoDictionary' },
      { value: 'I', label: 'NoDictionary、NoDictionary' },
      { value: 'F', label: 'NoDictionary' },
      { value: 'H', label: 'NoDictionary、NoDictionary' },
      { value: 'J', label: 'NoDictionary、NoDictionary' },
      { value: 'K', label: 'NoDictionary' },
      { value: 'L', label: 'NoDictionary' },
      { value: 'M', label: 'NoDictionary、NoDictionary' },
      { value: 'N', label: 'NoDictionary、NoDictionary' },
      { value: 'O', label: 'NoDictionary' },
      { value: 'P', label: 'NoDictionary' },
      { value: 'Q', label: 'NoDictionary、NoDictionary' },
      { value: 'R', label: 'NoDictionary、NoDictionary、NoDictionary' },
      { value: 'T', label: 'NoDictionary' },
      { value: 'E', label: 'NoDictionary' },
      { value: 'E', label: 'NoDictionary' },
    ];
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo } = this.props;
    const { data } = nextProps;
    if (data == null) return;
    const TenantAddress = data.tenantAddress;
    if (TenantAddress) {
      const Addres = TenantAddress.split('|');
      data.address = { province: Addres[0] ? Addres[0] : '', city: Addres[1] ? Addres[1] : '', area: Addres[2] ? Addres[2] : '' };
    } else {
      data.address = { province: 'NoDictionary', city: 'NoDictionary', area: 'NoDictionary' };
    }

    // if(!data['tenantSize'] || data['tenantSize'] == '0'){
    //   data['tenantSize'] = '-规模范围-';
    // }
    // let b = this.tenantSizeOption.find((da)=>da.value == data['tenantSize']);
    // b?null:data['tenantSize'] = this.tenantSizeOption[0].value;

    if (!data.linkman || data.linkman === '') {
      data.linkman = userInfo.userName;
    }

    if (!data.tenantEmail || data.tenantEmail === '') {
      data.tenantEmail = userInfo.userEmail;
    }

    if (!data.tenantTel || data.tenantTel === '') {
      data.tenantTel = userInfo.userMobile;
    }
    this.setState({
      ...data,
    });
  }

  onCityChange = (obj) => {
    // this.address = obj.province + obj.city + obj.area;
    // defaultValue:{ province:'北京',city:'北京',area:'东城区'},
    this.setState({
      address: {
        ...obj,
      },
    });
  }

  onChangeUpload = (url) => {
    this.setState({
      logo: url,
    });
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
    const {
      logo,
      tenantIndustry,
      tenantId,
      address,
      joinPermission,
      subordinateType,
      invitePermission,
      allowExit,
      isWaterMark,
      tenantTel,
      tenantSize,
      linkman,
    } = this.state;

    const Logos = data.find(da => da.name === 'logo');
    if (!Logos.value && Logos.value === '') {
      Logos.value = logo;
    }

    const TenantIndustry = data.find(da => da.name === 'tenantIndustry');
    if (!TenantIndustry.value && TenantIndustry.value === '') {
      TenantIndustry.value = tenantIndustry;
    }

    const TenantAddress = data.find(da => da.name === 'tenantAddress');
    const Values = TenantAddress.value ? TenantAddress.value : '';
    if (address && address.province) {
      TenantAddress.value = `${address.province}|${address.city}|${address.area}|${Values}`;
    } else {
      TenantAddress.value = `NoDictionary|NoDictionary|NoDictionary|${Values}`;
    }

    const JoinPermission = data.find(da => da.name === 'joinPermission');
    if (!JoinPermission.value && JoinPermission.value === '') {
      JoinPermission.value = joinPermission;
    }

    const SubordinateType = data.find(da => da.name === 'subordinateType');
    if (!SubordinateType.value && SubordinateType.value === '') {
      SubordinateType.value = subordinateType;
    }

    const InvitePermission = data.find(da => da.name === 'invitePermission');
    if (!InvitePermission.value && InvitePermission.value === '') {
      InvitePermission.value = invitePermission;
    }

    const AllowExit = data.find(da => da.name === 'allowExit');
    if (!AllowExit.value && AllowExit.value === '') {
      AllowExit.value = allowExit;
    }

    const Watermark = data.find(da => da.name === 'isWaterMark');
    if (!Watermark.value && Watermark.value === '') {
      Watermark.value = isWaterMark;
    }

    const Linkman = data.find(da => da.name === 'linkman');
    if (!Linkman.value && Linkman.value === '') {
      Linkman.value = linkman;
    }

    const TenantTel = data.find(da => da.name === 'tenantTel');
    if (!TenantTel.value && TenantTel.value === '') {
      TenantTel.value = tenantTel;
    }

    const TenantSize = data.find(da => da.name === 'tenantSize');
    if (!TenantSize.value && TenantSize.value === '') {
      TenantSize.value = tenantSize;
    }
    if (flag) {
      this.setState({
        disabled: false,
      });
      data.push({ name: 'tenantId', value: tenantId });
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
        // const tenantId = tenantId;
        // localStorage.setItem('create', '1');
        if (updateenter === 'upgrade_enter') {
          this.setState({ processValue: 1 });
        } else {
          window.location.href = `/?tenantId=${tenantId}&switch=true`;
        }
      });
    }
  }

  inputOnChange = (e, name) => {
    this.state[name] = e;
    this.setState({
      ...this.state,
    });
  }

  allowExitChange = (value) => {
    this.setState({
      allowExit: value,
    });
  }

  watermarkChange = (value) => {
    this.setState({
      isWaterMark: value,
    });
  }

  checkProgress = (tenantId, loadingFunc) => {
    let count = 0;
    const loop = () => {
      if (count > 10) {
        window.location.href = `/?tenantId=${tenantId}&switch=true`;
      } else {
        count += 1;
        loadingFunc();
        setTimeout(loop, 300);
      }
    };
    loop();
  }

  render() {
    const { btlLabel, updateenter } = this.props;
    const {
      tenantName, logo, allowExit, isWaterMark, tenantEmail, tenantTel, tenantAddress,
      tenantIndustry, invitePermission, joinPermission, subordinateType, address, linkman, tenantSize,
      processValue, tenantId,
    } = this.state;

    let newTenantAddress = '';
    if (tenantAddress) {
      const adds = tenantAddress.split('|');
      newTenantAddress = adds[adds.length - 1];
    }

    const tenantSizeOptionS = [];
    this.tenantSizeOption.forEach(({ value, label }, i) => {
      tenantSizeOptionS.push(<Option key={`${value}_${i}`} value={value}>{label}</Option>);
    });
    let submitBtn = <SubmitBtn isSubmit btlLabel={btlLabel} disabled={this.state.disabled} />;
    if (processValue && updateenter === 'upgrade_enter') {
      submitBtn = (
        <div className={progressBar}>
          <Progress check={this.checkProgress} tenantId={tenantId} startFlag={processValue} loadingDesc="NoDictionary…" />
        </div>
      );
    }
    return (
      <Form submitCallBack={this.checkForm} showSubmit={false} className={enterForm}>
        <FormItem
          showMast={false}
          labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>}
          isRequire
          valuePropsName="value"
          errorMessage="NoDictionary"
          method="blur"
          inline
        >
          <FormControl name="tenantName" value={tenantName || ''} onChange={(e) => { this.inputOnChange(e, 'tenantName'); }} placeholder="NoDictionary60NoDictionary" />
        </FormItem>

        <FormItem
          showMast={false}
          labelName={<span>NoDictionary &nbsp;&nbsp;&nbsp; </span>}
          valuePropsName="value"
          method="change"
          inline
        >
          <Upload name="logo" logo={logo || ''} onChange={this.onChangeUpload} tip="" />
        </FormItem>

        {
          tenantIndustry ? (
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
                name="tenantIndustry"
                defaultValue="-NoDictionary-"
                value={tenantIndustry || '-NoDictionary-'}
                style={{ width: 338, marginRight: 6 }}
                onChange={(e) => { this.setOptherData({ name: 'tenantIndustry', value: e }); }}
              >
                {
                  this.tenantIndustry.map(({ label, value }) =>
                    <Option key={value} value={value}>{label}</Option>)
                }
              </Select>
            </FormItem>
          ) : (
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
                name="tenantIndustry"
                defaultValue="-NoDictionary-"
                style={{ width: 338, marginRight: 6 }}
                onChange={(e) => { this.setOptherData({ name: 'tenantIndustry', value: e }); }}
              >
                {
                  this.tenantIndustry.map(({ label, value }) =>
                    <Option key={value} value={value}>{label}</Option>)
                }
              </Select>
            </FormItem>
          )
        }

        {
          tenantSize ? (
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
                name="tenantSize"
                defaultValue="-NoDictionary-"
                value={tenantSize}
                style={{ width: 338, marginRight: 6 }}
                onChange={(e) => { this.setOptherData({ name: 'tenantSize', value: e }); }}
              >
                {tenantSizeOptionS}
              </Select>
            </FormItem>
          ) : (
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
                name="tenantSize"
                defaultValue="-NoDictionary-"
                style={{ width: 338, marginRight: 6 }}
                onChange={(e) => { this.setOptherData({ name: 'tenantSize', value: e }); }}
              >
                {tenantSizeOptionS}
              </Select>
            </FormItem>
          )
        }

        {
          address ? (
            <FormItem
              showMast={false}
              labelName={<span>NoDictionary&nbsp;&nbsp;</span>}
              isRequire={false}
              valuePropsName="value"
              errorMessage="NoDictionary"
              method="blur"
              inline
            >
              <CitySelect name="address" onChange={this.onCityChange} defaultValue={address} />
            </FormItem>
          ) : <div />
        }
        <FormItem showMast={false} isRequire={false} valuePropsName="value" errorMessage="NoDictionary" method="blur" inline>
          <FormControl name="tenantAddress" value={newTenantAddress || ''} onChange={(e) => { this.inputOnChange(e, 'tenantAddress'); }} placeholder="NoDictionary60NoDictionary" />
        </FormItem>

        <FormItem showMast={false} labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>} isRequire={false} valuePropsName="value" errorMessage="NoDictionary" method="blur" inline>
          <Select
            name="invitePermission"
            defaultValue="1"
            value={invitePermission || '1'}
            style={{ width: 338, marginRight: 6 }}
            onChange={(e) => { this.setOptherData({ name: 'invitePermission', value: e }); }}
          >
            <Option value="1">NoDictionary </Option>
            <Option value="2">NoDictionary</Option>
            <Option value="0">NoDictionary</Option>
          </Select>
        </FormItem>

        <FormItem showMast={false} labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>} isRequire={false} valuePropsName="value" errorMessage="NoDictionary" method="blur" inline>
          <Select
            name="joinPermission"
            defaultValue="1"
            value={joinPermission || '1'}
            style={{ width: 338, marginRight: 6 }}
            onChange={(e) => { this.setOptherData({ name: 'joinPermission', value: e }); }}
          >
            <Option value="0">NoDictionary </Option>
            <Option value="1">NoDictionary</Option>
          </Select>
        </FormItem>

        <FormItem showMast={false} labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>} isRequire={false} method="change" inline>
          <Radio.RadioGroup name="allowExit" onChange={this.allowExitChange} selectedValue={allowExit || '0'}>
            <Radio value="0" >NoDictionary</Radio>
            <Radio value="1" >NoDictionary</Radio>
          </Radio.RadioGroup>
        </FormItem>

        <FormItem
          showMast={false}
          labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>}
          isRequire={false}
          valuePropsName="value"
          errorMessage="NoDictionary"
          method="blur"
          inline
        >
          <Select
            name="subordinateType"
            defaultValue={0}
            value={subordinateType}
            style={{ width: 338, marginRight: 6 }}
            onChange={(e) => { this.setOptherData({ name: 'subordinateType', value: e }); }}
          >
            <Option value={0}>NoDictionary </Option>
            <Option value={1}>NoDictionary</Option>
          </Select>
        </FormItem>
        <FormItem showMast={false} labelName={<span>NoDictionary<font color="red"> &nbsp;*&nbsp;</font></span>} isRequire={false} method="change" inline>
          <Radio.RadioGroup name="isWaterMark" onChange={this.watermarkChange} selectedValue={isWaterMark}>
            <Radio value={0} >NoDictionary</Radio>
            <Radio value={1} >NoDictionary</Radio>
          </Radio.RadioGroup>
        </FormItem>

        <div className={lxrHr}>
          <hr />
        </div>

        <div className={lxrTitle}>
          NoDictionary
        </div>

        <FormItem showMast={false} labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>} isRequire valuePropsName="value" errorMessage="NoDictionary" method="blur" inline>
          <FormControl name="linkman" value={linkman || ''} placeholder="NoDictionary" onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
        </FormItem>

        <FormItem showMast={false} valuePropsName="value" labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>} isRequire method="blur" htmlType="email" errorMessage="NoDictionary" inline>
          <FormControl name="tenantEmail" value={tenantEmail || ''} onChange={(e) => { this.inputOnChange(e, 'tenantEmail'); }} placeholder="NoDictionary" />
        </FormItem>

        <FormItem className="input_phone" showMast={false} valuePropsName="value" labelName={<span>NoDictionary<font color="red">&nbsp;*&nbsp;</font></span>} isRequire method="blur" htmlType="tel" errorMessage="NoDictionary" inline>
          <FormControl name="tenantTel" value={tenantTel || ''} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} placeholder="NoDictionary" />
        </FormItem>

        {
          /*
          <FormItem
            showMast={false}
            labelName={<span>NoDictionary<font color="red"> *</font></span>}
            isRequire={false} method='change' inline>
              <Nature name='tenantNature' defaultValue={tenantNature?tenantNature:'LegalPerson'} />
          </FormItem>
        */
        }
        {submitBtn}
      </Form>
    );
  }
}

export default CreateEnter;
