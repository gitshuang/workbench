import React, { Component } from 'react';
import PropTypes from 'prop-types';
// 公共UI组件
import Form, { FormItem } from 'bee/form';
import FormControl from 'bee/form-control';
import Radio from 'bee/radio';
import Select from 'bee/select';
import CitySelect from 'bee/city-select';
// diwork业务组件
import Progress from 'pub-comp/progress';
import Upload from './upload';
import { check } from './checkTenantStatus';

// 组件拆分
import SubmitBtn from './button';
import { tenantIndustry, tenantSizeOption } from './state';
import { enterForm, line, infoTitle, progressBar } from './style.css';

const { Option } = Select;

class CreateEnter extends Component {
  static propTypes = {
    userInfo: PropTypes.shape({
      userName: PropTypes.string,
      userEmail: PropTypes.string,
      userMobile: PropTypes.string,
    }),
    data: PropTypes.shape({}),
    handleClickFn: PropTypes.func,
    _from: PropTypes.string,
    buttonText: PropTypes.string,
    uploadApplication: PropTypes.func,
    loadingDesc: PropTypes.string,
  };
  static defaultProps = {
    userInfo: {},                 // 用户信息
    data: {},                     // data ， 企业信息，新建为空
    handleClickFn: () => { },     // 按钮点击事件
    _from: '',                     // 来源，（新建，设置，升级）
    buttonText: '',               // 按钮显示文字
    uploadApplication: () => { },          // 上传事件
    loadingDesc: '',              // 滚动条 文字提示
  };
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,                // 按钮是否可点击， true为不可点击  （todo现在反了）
      startFlag: false,                // process 0～1 
      tenantId: '',                   // 租户ID
      address: {
        province: '北京',
        city: '北京',
        area: '东城区',
      },                              // 企业地址 
      addressInput: '',               // 企业地址 (60个字输入框)

      tenantName: '',                 // 企业名称
      logo: '',                       // logo
      tenantIndustry: '',             // 选中的行业
      tenantSize: '',                 // 规模范围
      tenantAddress: '',              // 企业地址 + 60个字输入框显示

      invitePermission: '',           // 邀请规则              string类型
      joinPermission: '',             // 申请权限              string
      allowExit: '',                  // 允许用户退出           string
      subordinateType: '',            // 上下级显示             number类型
      isWaterMark: 1,                 // 通讯录是否显示水印      number类型

      linkman: '',                    // 姓名
      tenantTel: '',                  // 手机号
      tenantEmail: '',                // 邮箱
    };

    // 所属行业
    this.tenantIndustry = tenantIndustry;
    // 规模范围
    this.tenantSizeOption = tenantSizeOption;

    // progressbar
    this.loadingFunc = null;
    this.successFunc = null;
    this.timer = null;
  }

  componentDidMount() {
    const { data, userInfo, _from } = this.props;
    // 如果来自创建 ， 只做将userInfo信息灌入到组件中显示
    if (_from === 'create') {
      this.setState({
        linkman: userInfo.userName,
        tenantEmail: userInfo.userEmail,
        tenantTel: userInfo.userMobile,
      });
    } else {
      const { tenantAddress } = data;
      // 将 地址综合 赋值到 address 和 address和 addressInput 上
      if (tenantAddress) {
        const Addres = tenantAddress.split('|');
        data.address = {
          province: Addres[0] || '',
          city: Addres[1] || '',
          area: Addres[2] || '',
        };
        data.addressInput = Addres[Addres.length - 1]
      }
      this.setState({
        ...data,
      });
    }
  }

  // 切换企业地址
  onCityChange = (obj) => {
    this.setState({
      address: {
        ...obj,
      },
    });
  }

  // 上传组件设置新的logo - url， 后期需要更改为方法传递到 
  onChangeUpload = (url) => {
    this.setState({
      logo: url,
    });
  }

  // select 更改
  setOptherData = (obj) => {
    this.state[obj.name] = obj.value;
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

  // 更改输入框的值
  inputOnChange = (e, name) => {
    this.state[name] = e;
    this.setState({
      ...this.state,
    });
  }

  checkForm = (flag, data) => {
    const { handleClickFn, _from } = this.props;
    const {
      tenantId,
      address,
      addressInput,
    } = this.state;

    if (flag) {
      this.setState({
        disabled: true,
      });
      const TenantAddress = `${address.province}|${address.city}|${address.area}|${addressInput}`;
      data.push({ name: 'tenantAddress', value: TenantAddress });
      data.push({ name: 'tenantId', value: tenantId });
      const param = data.reduce((obj, { value, name }) => {
        if (name) {
          obj[name] = value;
        }
        return obj;
      }, {});


      handleClickFn(param, ({ error, payload }) => {
        // 只要是回调都将按钮的disabled 设定为false
        this.setState({
          disabled: false,
        });
        // 当请求成功才走下一步
        if (!error && _from !== "setting") {
          // 当创建企业/ 团队升级为企业   需要滚动条  并且检测 
          this.setState({
            startFlag: true,
          });
          check(payload.tenantId, this.loadingFunc, this.successFunc);
        }
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

  render() {
    const { buttonText, _from, loadingDesc } = this.props;
    const {
      address,
      startFlag,
      addressInput,

      tenantName,                 // 企业名称
      logo,                       // logo
      tenantIndustry,             // 选中的行业
      tenantSize,                 // 规模范围
      invitePermission,           // 邀请规则              string类型
      joinPermission,             // 申请权限              string
      allowExit,                  // 允许用户退出           string
      subordinateType,            // 上下级显示             number类型
      isWaterMark,                 // 通讯录是否显示水印      number类型

      linkman,                    // 姓名
      tenantTel,                  // 手机号
      tenantEmail,                // 邮箱
    } = this.state;

    return (
      <Form submitCallBack={this.checkForm} showSubmit={false} className={enterForm}>

        <FormItem
          showMast={false}
          labelName={<span>企业名称<font color="red">&nbsp;*&nbsp;</font></span>}
          isRequire
          valuePropsName="value"
          errorMessage="请输入企业名称"
          method="blur"
          inline
        >
          <FormControl name="tenantName" value={tenantName || ''} onChange={(e) => { this.inputOnChange(e, 'tenantName'); }} placeholder="最多60个字符" />
        </FormItem>

        <FormItem
          showMast={false}
          labelName={<span>企业头像 &nbsp;&nbsp;&nbsp; </span>}
          valuePropsName="value"
          method="change"
          inline
        >
          <Upload
            name="logo"
            logo={logo || ''}
            onChange={this.onChangeUpload}
            tip=""
            uploadApplication={this.props.uploadApplication}
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
            name="tenantIndustry"
            defaultValue="A"
            value={tenantIndustry || 'A'}
            style={{ width: 338, marginRight: 6 }}
            onChange={(e) => { this.setOptherData({ name: 'tenantIndustry', value: e }); }}
          >
            {
              this.tenantIndustry.map(({ label, value }) =>
                <Option key={value} value={value}>{label}</Option>)
            }
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
            name="tenantSize"
            defaultValue="A"
            value={tenantSize || "A"}
            style={{ width: 338, marginRight: 6 }}
            onChange={(e) => { this.setOptherData({ name: 'tenantSize', value: e }); }}
          >
            {
              this.tenantSizeOption.map(({ label, value }) =>
                <Option key={`${value}`} value={value}>{label}</Option>)
            }
          </Select>
        </FormItem>

        <FormItem
          showMast={false}
          labelName={<span>企业地址&nbsp;&nbsp;</span>}
          isRequire={false}
          valuePropsName="value"
          errorMessage="请输入企业地址"
          method="blur"
          inline
        >
          <CitySelect name="address" onChange={this.onCityChange} defaultValue={address} />
        </FormItem>

        <FormItem
          showMast={false}
          isRequire={false}
          valuePropsName="value"
          errorMessage="请输入企业地址"
          method="blur"
          inline
        >
          <FormControl
            name="addressInput"
            value={addressInput || ''}
            onChange={(e) => { this.inputOnChange(e, 'addressInput'); }}
            placeholder="最多60个字符"
          />
        </FormItem>

        {_from === "create" ? <div></div>
          : <div>
            <FormItem
              showMast={false}
              labelName={<span>邀请规则<font color="red">&nbsp;*&nbsp;</font></span>}
              isRequire={false}
              valuePropsName="value"
              inline
            >
              <Select
                name="invitePermission"
                defaultValue="1"
                value={invitePermission || '1'}
                style={{ width: 338, marginRight: 6 }}
                onChange={(e) => { this.setOptherData({ name: 'invitePermission', value: e }); }}
              >
                <Option value="1">全员邀请 </Option>
                <Option value="2">禁止邀请</Option>
                <Option value="0">管理员邀请</Option>
              </Select>
            </FormItem>

            <FormItem
              showMast={false}
              labelName={<span>申请权限<font color="red">&nbsp;*&nbsp;</font></span>}
              isRequire={false}
              valuePropsName="value"
              inline
            >
              <Select
                name="joinPermission"
                defaultValue="1"
                value={joinPermission || '1'}
                style={{ width: 338, marginRight: 6 }}
                onChange={(e) => { this.setOptherData({ name: 'joinPermission', value: e }); }}
              >
                <Option value="0">所有用户都可申请加入 </Option>
                <Option value="1">禁止用户申请加入</Option>
              </Select>
            </FormItem>

            <FormItem
              showMast={false}
              labelName={<span>允许用户退出<font color="red">&nbsp;*&nbsp;</font></span>}
              isRequire={false}
              inline
            >
              <Radio.RadioGroup
                name="allowExit"
                onChange={this.allowExitChange}
                selectedValue={allowExit || '0'}
              >
                <Radio value="0" >禁止</Radio>
                <Radio value="1" >允许</Radio>
              </Radio.RadioGroup>
            </FormItem>

            <FormItem
              showMast={false}
              labelName={<span>上下级显示<font color="red">&nbsp;*&nbsp;</font></span>}
              isRequire={false}
              valuePropsName="value"
              inline
            >
              <Select
                name="subordinateType"
                defaultValue={0}
                value={subordinateType || 0}
                style={{ width: 338, marginRight: 6 }}
                onChange={(e) => { this.setOptherData({ name: 'subordinateType', value: e }); }}
              >
                <Option value={0}>根据组织机构负责人显示上下级 </Option>
                <Option value={1}>根据导入的上下级关系显示上下级</Option>
              </Select>
            </FormItem>

            <FormItem
              showMast={false}
              labelName={<span>通讯录显示水印<font color="red"> &nbsp;*&nbsp;</font></span>}
              isRequire={false}
              inline
            >
              <Radio.RadioGroup
                name="isWaterMark"
                onChange={this.watermarkChange}
                selectedValue={isWaterMark}
              >
                <Radio value={0} >禁止</Radio>
                <Radio value={1} >允许</Radio>
              </Radio.RadioGroup>
            </FormItem>

          </div>
        }

        <div className={line}></div>
        <div className={infoTitle}>联系人信息：</div>

        <FormItem
          showMast={false}
          labelName={<span>姓名<font color="red">&nbsp;*&nbsp;</font></span>}
          isRequire valuePropsName="value"
          errorMessage="请输入联系人姓名"
          method="blur"
          inline
        >
          <FormControl
            name="linkman"
            value={linkman || ''}
            placeholder="请输入联系人姓名"
            onChange={(e) => { this.inputOnChange(e, 'linkman'); }}
          />
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
          <FormControl
            name="tenantEmail"
            value={tenantEmail || ''}
            onChange={(e) => { this.inputOnChange(e, 'tenantEmail'); }}
            placeholder="请输入邮箱"
          />
        </FormItem>

        <FormItem
          className="input_phone"
          showMast={false}
          valuePropsName="value"
          labelName={<span>手机号<font color="red">&nbsp;*&nbsp;</font></span>}
          isRequire method="blur"
          htmlType="tel"
          errorMessage="手机号格式错误"
          inline
        >
          <FormControl
            name="tenantTel"
            value={tenantTel || ''}
            onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }}
            placeholder="请输入手机号"
          />
        </FormItem>

        {
          startFlag ?
            <div className={progressBar}>
              <Progress
                loadingCallBack={this.loadingCallBack}
                successFunc={this.successLoading}
                startFlag={startFlag}
                loadingDesc={loadingDesc}
              />
            </div>
            : <SubmitBtn
              isSubmit
              buttonText={buttonText}
              disabled={this.state.disabled}
            />
        }
      </Form >
    );
  }
}

export default CreateEnter;
