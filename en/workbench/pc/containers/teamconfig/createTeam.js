import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Form, { FormItem } from 'bee/form';
import Upload from 'containers/upload';
import FormControl from 'bee/form-control';
import Radio from 'bee/radio';
import Select from 'bee/select';
import { ButtonBrand } from 'pub-comp/button';
import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';
import CitySelect from 'bee/city-select';
import 'assets/style/Form.css';
import { enter_form, tenant_address, lxr_hr, lxr_title, lxr_hr_bottom, team_cont, form_team } from './createTeam.css';


const { requestStart, requestSuccess, requestError } = rootActions;
const {
  getTeamInfo,
  uploadApplication,
  createTeam,
  userToAdmin,            // NoDictionary
  adminToUser,            // NoDictionary
  openRemoveModal,
  closeRemoveModal,
  openUpgradeModal,
  openTransferModal,
  openDismissModal,
  openExitModal,
  getAllApps,
  getUserList,
  changePage,             // NoDictionary
} = teamconfigActions;

class SubmitBtn extends Component {
  click = () => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className={'u-form-submit'}>
        {/* <ButtonBrand onClick={this.click}>NoDictionary</ButtonBrand> */}
        {
          this.props.disabled ? <ButtonBrand onClick={this.click} >NoDictionary</ButtonBrand> : <ButtonBrand disabled={true} >NoDictionary</ButtonBrand>
        }
      </div>
    );
  }
}

@withRouter
@connect(
  mapStateToProps(
    'teamData',
    'removeModal',      //  NoDictionary
    'upgradeModal',     //  NoDictionary
    'transferModal',    //  NoDictionary
    'dismissModal',     //  NoDictionary
    'exitModal',        //  NoDictionary
    'applicationlist',  //  NoDictionary
    'userList',         //  NoDictionary
    'activePage',       //  NoDictionary
    {
      key: 'userInfo',
      value: (teamconfig, ownProps, root) => {
        return root.home.userInfo
      }
    },
    {
      namespace: "teamconfig"
    },
  ),

  {
    requestStart,
    requestSuccess,
    requestError,
    getTeamInfo,            // NoDictionary
    uploadApplication,      // NoDictionary
    createTeam,             // NoDictionary
    userToAdmin,            // NoDictionary
    adminToUser,            // NoDictionary
    openRemoveModal,        // NoDictionary
    openUpgradeModal,       // NoDictionary
    openTransferModal,      // NoDictionary
    openDismissModal,       // NoDictionary
    openExitModal,          // NoDictionary
    getAllApps,             // NoDictionary
    getUserList,            // NoDictionary
    changePage,             // NoDictionary
  }
)
class CreateTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      isWaterMark: 1,
    }
  }

  componentWillMount() {
    const { getTeamInfo, requestError, requestSuccess } = this.props;
    getTeamInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      this.setState({
        ...payload
      })
      requestSuccess();
    });
  }

  checkForm = (flag, data) => {
    const { createTeam } = this.props;
    const { logo, tenantIndustry, tenantId, address, tenantAddress, joinPermission, invitePermission, allowExit, isWaterMark } = this.state;

    let _logo = data.find((da) => da.name == "logo");
    if (!_logo.value && _logo.value == "") {
      _logo.value = logo;
    }

    let _joinPermission = data.find((da) => da.name == "joinPermission");
    if (!_joinPermission.value && _joinPermission.value == "") {
      _joinPermission.value = joinPermission;
    }

    let _invitePermission = data.find((da) => da.name == "invitePermission");
    if (!_invitePermission.value && _invitePermission.value == "") {
      _invitePermission.value = invitePermission;
    }

    let _allowExit = data.find((da) => da.name == "allowExit");
    if (!_allowExit.value && _allowExit.value == "") {
      _allowExit.value = allowExit;
    }
    let _watermark = data.find((da) => da.name == "isWaterMark");
    if (!_watermark.value && _watermark.value == "") {
      _watermark.value = isWaterMark;
    }
    if (flag) {
      this.setState({
        disabled: false
      })
      data.push({ name: "tenantId", value: tenantId });
      requestStart();
      createTeam(
        data.reduce(
          (obj, { value, name }) => {
            name ? obj[name] = value : null;
            return obj;
          },
          {},
        ), "settingEnter"
      ).then(({ error, payload }) => {
        requestSuccess();
        if (error) {
          requestError(payload);
          return;
        }
        const tenantId = payload.tenantId;
        window.location.href = "/?tenantId=" + tenantId + "&switch=true";
      });
    }
  }

  inputOnChange = (e, name) => {
    this.state[name] = e;
    this.setState({
      ...this.state
    })
  }

  setOptherData = (obj) => {
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state
    })
  }

  allowExitChange = (value) => {
    this.setState({
      allowExit: value
    })
  }

  watermarkChange = (value) => {
    this.setState({
      isWaterMark : value
    })
  }

  onChangeUpload = (url) => {
    this.setState({
      logo: url
    })
  }

  setUrl(name, url) {
    this.state[name] = url;
    this.setState({
      ...this.state
    })
  }

  render() {
    const { tenantName, logo, tenantNature, allowExit, isWaterMark, tenantEmail, tenantTel, tenantAddress,
      tenantIndustry, invitePermission, joinPermission, address } = this.state;
    let newTenantAddress = "";
    if (tenantAddress) {
      let _adds = tenantAddress.split("|");
      newTenantAddress = _adds[_adds.length - 1];
    }

    return (
      <div className={team_cont}>

        <div className={form_team}>
          <Form submitCallBack={this.checkForm} showSubmit={false} className={enter_form}>
            <FormItem showMast={false} labelName={<span>NoDictionary<font color='red'> &nbsp;*&nbsp;</font></span>}
              isRequire={true} valuePropsName='value' errorMessage="NoDictionary" method="blur"
              inline={true}>
              <FormControl name="tenantName" value={tenantName ? tenantName : ""} onChange={(e) => { this.inputOnChange(e, "tenantName") }} placeholder="NoDictionary60NoDictionary" />
            </FormItem>

            <FormItem showMast={false} labelName={<span>NoDictionary<font color='red'> &nbsp; &nbsp;</font></span>} valuePropsName='value' method="change" inline={true}>
              <Upload name='logo' logo={logo ? logo : ""} onChange={this.onChangeUpload} />
            </FormItem>

            <FormItem showMast={false} labelName={<span>NoDictionary<font color='red'>&nbsp;*&nbsp;</font></span>} isRequire={false} valuePropsName='value' errorMessage="NoDictionary" method="blur" inline={true}>
              <Select
                defaultValue="1"
                name="invitePermission"
                value={invitePermission ? invitePermission : "1"}
                style={{ width: 338, marginRight: 6 }}
                onChange={(e) => { this.setOptherData({ name: "invitePermission", value: e }) }}
              >
                <Option value="1">NoDictionary</Option>
                <Option value="2">NoDictionary</Option>
                <Option value="0">NoDictionary</Option>
              </Select>
            </FormItem>

            <FormItem showMast={false} labelName={<span>NoDictionary<font color='red'> &nbsp;*&nbsp;</font></span>} isRequire={false} valuePropsName='value' errorMessage="NoDictionary" method="blur" inline={true}>
              <Select
                name="joinPermission"
                defaultValue="1"
                value={joinPermission ? joinPermission : "1"}
                style={{ width: 338, marginRight: 6 }}
                onChange={(e) => { this.setOptherData({ name: "joinPermission", value: e }) }}
              >
                <Option value="0">NoDictionary </Option>
                <Option value="1">NoDictionary</Option>
              </Select>
            </FormItem>

            <FormItem showMast={false} labelName={<span>NoDictionary<font color='red'> &nbsp;*&nbsp;</font></span>} isRequire={false} method="change" inline={true}>
              <Radio.RadioGroup name="allowExit" onChange={this.allowExitChange} selectedValue={allowExit || "0"}>
                <Radio value="0" >NoDictionary</Radio>
                <Radio value="1" >NoDictionary</Radio>
              </Radio.RadioGroup>
            </FormItem>

            <FormItem showMast={false} labelName={<span>NoDictionary<font color='red'> &nbsp;*&nbsp;</font></span>} isRequire={false} method="change" inline={true}>
              <Radio.RadioGroup name="isWaterMark" onChange={this.watermarkChange} selectedValue={isWaterMark}>
                <Radio value={0} >NoDictionary</Radio>
                <Radio value={1} >NoDictionary</Radio>
              </Radio.RadioGroup>
            </FormItem>

            <SubmitBtn isSubmit disabled={this.state.disabled} />
          </Form>
        </div>

        <div className={lxr_hr}>
          <hr />
        </div>
      </div>
    );
  }
}

export default CreateTeam;
