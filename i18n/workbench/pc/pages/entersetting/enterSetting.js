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
      { value: 'F', label: '1001$i18n{enterSetting.js0}$i18n-end2000' },
      { value: 'G', label: '>2000$i18n{enterSetting.js1}$i18n-end' },
    ];

    this.tenantIndustry = [
      { value: 'A', label: '$i18n{enterSetting.js2}$i18n-end、$i18n{enterSetting.js3}$i18n-end、$i18n{enterSetting.js4}$i18n-end、$i18n{enterSetting.js5}$i18n-end' },
      { value: 'B', label: '$i18n{enterSetting.js6}$i18n-end' },
      { value: 'C', label: '$i18n{enterSetting.js7}$i18n-end' },
      { value: 'D', label: '$i18n{enterSetting.js8}$i18n-end、$i18n{enterSetting.js9}$i18n-end、$i18n{enterSetting.js10}$i18n-end' },
      { value: 'S', label: '$i18n{enterSetting.js11}$i18n-end、$i18n{enterSetting.js12}$i18n-end' },
      { value: 'E', label: '$i18n{enterSetting.js13}$i18n-end' },
      { value: 'G', label: '$i18n{enterSetting.js14}$i18n-end、$i18n{enterSetting.js15}$i18n-end' },
      { value: 'I', label: '$i18n{enterSetting.js16}$i18n-end、$i18n{enterSetting.js17}$i18n-end' },
      { value: 'F', label: '$i18n{enterSetting.js18}$i18n-end' },
      { value: 'H', label: '$i18n{enterSetting.js19}$i18n-end、$i18n{enterSetting.js20}$i18n-end' },
      { value: 'J', label: '$i18n{enterSetting.js21}$i18n-end、$i18n{enterSetting.js22}$i18n-end' },
      { value: 'K', label: '$i18n{enterSetting.js23}$i18n-end' },
      { value: 'L', label: '$i18n{enterSetting.js24}$i18n-end' },
      { value: 'M', label: '$i18n{enterSetting.js25}$i18n-end、$i18n{enterSetting.js26}$i18n-end' },
      { value: 'N', label: '$i18n{enterSetting.js27}$i18n-end、$i18n{enterSetting.js28}$i18n-end' },
      { value: 'O', label: '$i18n{enterSetting.js29}$i18n-end' },
      { value: 'P', label: '$i18n{enterSetting.js30}$i18n-end' },
      { value: 'Q', label: '$i18n{enterSetting.js31}$i18n-end、$i18n{enterSetting.js32}$i18n-end' },
      { value: 'R', label: '$i18n{enterSetting.js33}$i18n-end、$i18n{enterSetting.js34}$i18n-end、$i18n{enterSetting.js35}$i18n-end' },
      { value: 'T', label: '$i18n{enterSetting.js36}$i18n-end' },
      { value: 'E', label: '$i18n{enterSetting.js37}$i18n-end' },
      { value: 'E', label: '$i18n{enterSetting.js38}$i18n-end' },
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
      data.address = { province: '$i18n{enterSetting.js39}$i18n-end', city: '$i18n{enterSetting.js40}$i18n-end', area: '$i18n{enterSetting.js41}$i18n-end' };
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
      TenantAddress.value = `$i18n{enterSetting.js42}$i18n-end|$i18n{enterSetting.js43}$i18n-end|$i18n{enterSetting.js44}$i18n-end|${Values}`;
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
          <Progress check={this.checkProgress} tenantId={tenantId} startFlag={processValue} loadingDesc="$i18n{enterSetting.js45}$i18n-end…" />
        </div>
      );
    }
    return (
      <Form submitCallBack={this.checkForm} showSubmit={false} className={enterForm}>
        <FormItem
          showMast={false}
          labelName={<span>$i18n{enterSetting.js46}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>}
          isRequire
          valuePropsName="value"
          errorMessage="$i18n{enterSetting.js47}$i18n-end"
          method="blur"
          inline
        >
          <FormControl name="tenantName" value={tenantName || ''} onChange={(e) => { this.inputOnChange(e, 'tenantName'); }} placeholder="$i18n{enterSetting.js48}$i18n-end60$i18n{enterSetting.js49}$i18n-end" />
        </FormItem>

        <FormItem
          showMast={false}
          labelName={<span>$i18n{enterSetting.js50}$i18n-end &nbsp;&nbsp;&nbsp; </span>}
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
              labelName={<span>$i18n{enterSetting.js51}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>}
              isRequire
              valuePropsName="value"
              errorMessage="$i18n{enterSetting.js52}$i18n-end"
              method="blur"
              inline
            >
              <Select
                name="tenantIndustry"
                defaultValue="-$i18n{enterSetting.js53}$i18n-end-"
                value={tenantIndustry || '-$i18n{enterSetting.js54}$i18n-end-'}
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
              labelName={<span>$i18n{enterSetting.js55}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>}
              isRequire
              valuePropsName="value"
              errorMessage="$i18n{enterSetting.js56}$i18n-end"
              method="blur"
              inline
            >
              <Select
                name="tenantIndustry"
                defaultValue="-$i18n{enterSetting.js57}$i18n-end-"
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
              labelName={<span>$i18n{enterSetting.js58}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>}
              isRequire
              valuePropsName="value"
              errorMessage="$i18n{enterSetting.js59}$i18n-end"
              method="blur"
              inline
            >
              <Select
                name="tenantSize"
                defaultValue="-$i18n{enterSetting.js60}$i18n-end-"
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
              labelName={<span>$i18n{enterSetting.js61}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>}
              isRequire
              valuePropsName="value"
              errorMessage="$i18n{enterSetting.js62}$i18n-end"
              method="blur"
              inline
            >
              <Select
                name="tenantSize"
                defaultValue="-$i18n{enterSetting.js63}$i18n-end-"
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
              labelName={<span>$i18n{enterSetting.js64}$i18n-end&nbsp;&nbsp;</span>}
              isRequire={false}
              valuePropsName="value"
              errorMessage="$i18n{enterSetting.js65}$i18n-end"
              method="blur"
              inline
            >
              <CitySelect name="address" onChange={this.onCityChange} defaultValue={address} />
            </FormItem>
          ) : <div />
        }
        <FormItem showMast={false} isRequire={false} valuePropsName="value" errorMessage="$i18n{enterSetting.js66}$i18n-end" method="blur" inline>
          <FormControl name="tenantAddress" value={newTenantAddress || ''} onChange={(e) => { this.inputOnChange(e, 'tenantAddress'); }} placeholder="$i18n{enterSetting.js67}$i18n-end60$i18n{enterSetting.js68}$i18n-end" />
        </FormItem>

        <FormItem showMast={false} labelName={<span>$i18n{enterSetting.js69}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>} isRequire={false} valuePropsName="value" errorMessage="$i18n{enterSetting.js70}$i18n-end" method="blur" inline>
          <Select
            name="invitePermission"
            defaultValue="1"
            value={invitePermission || '1'}
            style={{ width: 338, marginRight: 6 }}
            onChange={(e) => { this.setOptherData({ name: 'invitePermission', value: e }); }}
          >
            <Option value="1">$i18n{enterSetting.js71}$i18n-end </Option>
            <Option value="2">$i18n{enterSetting.js72}$i18n-end</Option>
            <Option value="0">$i18n{enterSetting.js73}$i18n-end</Option>
          </Select>
        </FormItem>

        <FormItem showMast={false} labelName={<span>$i18n{enterSetting.js74}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>} isRequire={false} valuePropsName="value" errorMessage="$i18n{enterSetting.js75}$i18n-end" method="blur" inline>
          <Select
            name="joinPermission"
            defaultValue="1"
            value={joinPermission || '1'}
            style={{ width: 338, marginRight: 6 }}
            onChange={(e) => { this.setOptherData({ name: 'joinPermission', value: e }); }}
          >
            <Option value="0">$i18n{enterSetting.js76}$i18n-end </Option>
            <Option value="1">$i18n{enterSetting.js77}$i18n-end</Option>
          </Select>
        </FormItem>

        <FormItem showMast={false} labelName={<span>$i18n{enterSetting.js78}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>} isRequire={false} method="change" inline>
          <Radio.RadioGroup name="allowExit" onChange={this.allowExitChange} selectedValue={allowExit || '0'}>
            <Radio value="0" >$i18n{enterSetting.js79}$i18n-end</Radio>
            <Radio value="1" >$i18n{enterSetting.js80}$i18n-end</Radio>
          </Radio.RadioGroup>
        </FormItem>

        <FormItem
          showMast={false}
          labelName={<span>$i18n{enterSetting.js81}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>}
          isRequire={false}
          valuePropsName="value"
          errorMessage="$i18n{enterSetting.js82}$i18n-end"
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
            <Option value={0}>$i18n{enterSetting.js83}$i18n-end </Option>
            <Option value={1}>$i18n{enterSetting.js84}$i18n-end</Option>
          </Select>
        </FormItem>
        <FormItem showMast={false} labelName={<span>$i18n{enterSetting.js85}$i18n-end<font color="red"> &nbsp;*&nbsp;</font></span>} isRequire={false} method="change" inline>
          <Radio.RadioGroup name="isWaterMark" onChange={this.watermarkChange} selectedValue={isWaterMark}>
            <Radio value={0} >$i18n{enterSetting.js86}$i18n-end</Radio>
            <Radio value={1} >$i18n{enterSetting.js87}$i18n-end</Radio>
          </Radio.RadioGroup>
        </FormItem>

        <div className={lxrHr}>
          <hr />
        </div>

        <div className={lxrTitle}>
          $i18n{enterSetting.js88}$i18n-end
        </div>

        <FormItem showMast={false} labelName={<span>$i18n{enterSetting.js89}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>} isRequire valuePropsName="value" errorMessage="$i18n{enterSetting.js90}$i18n-end" method="blur" inline>
          <FormControl name="linkman" value={linkman || ''} placeholder="$i18n{enterSetting.js91}$i18n-end" onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
        </FormItem>

        <FormItem showMast={false} valuePropsName="value" labelName={<span>$i18n{enterSetting.js92}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>} isRequire method="blur" htmlType="email" errorMessage="$i18n{enterSetting.js93}$i18n-end" inline>
          <FormControl name="tenantEmail" value={tenantEmail || ''} onChange={(e) => { this.inputOnChange(e, 'tenantEmail'); }} placeholder="$i18n{enterSetting.js94}$i18n-end" />
        </FormItem>

        <FormItem className="input_phone" showMast={false} valuePropsName="value" labelName={<span>$i18n{enterSetting.js95}$i18n-end<font color="red">&nbsp;*&nbsp;</font></span>} isRequire method="blur" htmlType="tel" errorMessage="$i18n{enterSetting.js96}$i18n-end" inline>
          <FormControl name="tenantTel" value={tenantTel || ''} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} placeholder="$i18n{enterSetting.js97}$i18n-end" />
        </FormItem>

        {
          /*
          <FormItem
            showMast={false}
            labelName={<span>$i18n{enterSetting.js98}$i18n-end<font color="red"> *</font></span>}
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
