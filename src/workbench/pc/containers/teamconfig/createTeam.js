import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Form, { FormItem } from 'bee-form';
import Upload from 'containers/upload';
import FormControl from 'bee/form-control';
import Radio from 'bee/radio';
import Select from 'bee/select';
import { ButtonBrand } from 'components/button';
import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';
import CitySelect from 'bee/city-select';
import 'assets/style/Form.css';
import { enter_form,tenant_address,lxr_hr,lxr_title,lxr_hr_bottom,team_cont,form_team} from './createTeam.css';


const { requestStart, requestSuccess, requestError } = rootActions;
const {
  getTeamInfo,
  uploadApplication,
  createTeam,
  userToAdmin,            // 用户升级管理员
  adminToUser,            // 管理员降级用户
  openRemoveModal,
  closeRemoveModal,
  openUpgradeModal,
  openTransferModal,
  openDismissModal,
  openExitModal,
  getAllApps,
  getUserList,
  changePage,             // 改变用户列表页数
} = teamconfigActions;


class Nature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.defaultValue != this.defaultValue){
      this.setState({
        value: nextProps.defaultValue
      })
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
        <Radio value="0" >禁止</Radio>
        <Radio value="1" >允许</Radio>
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
        <ButtonBrand onClick={this.click} >保存</ButtonBrand>
      </div>
    );
  }
}

@withRouter
@connect(
  mapStateToProps(
    'teamData',
    'removeModal',      //  团队成员删除弹窗开关
    'upgradeModal',     //  升级为企业弹窗开关
    'transferModal',    //  移交团队弹窗开关
    'dismissModal',     //  解散团队弹窗开关
    'exitModal',        //  退出团队弹窗开关
    'applicationlist',  //  应用列表
    'userList',         //  用户列表
    'activePage',       //  用户列表页数
    {
      key: 'userInfo',
      value: (teamconfig,ownProps,root) => {
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
    getTeamInfo,            // 获取团队基础信息
    uploadApplication,      // 上传
    createTeam,             // 保存团队基本设置
    userToAdmin,            // 用户升级管理员
    adminToUser,            // 管理员降级用户
    openRemoveModal,        // 团队成员打开删除弹窗
    openUpgradeModal,       // 打开升级为企业弹窗
    openTransferModal,      // 打开移交团队弹窗
    openDismissModal,       // 打开解散团队弹窗
    openExitModal,          // 打开退出团队弹窗
    getAllApps,             // 获取全部应用
    getUserList,            // 获取用户列表
    changePage,             // 改变用户列表页数
  }
)
class CreateTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
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
    const {createTeam} = this.props;
    const {logo,tenantIndustry,tenantId,address,tenantAddress,joinPermission,invitePermission,allowExit} = this.state;
    
    let _logo = data.find((da)=>da.name == "logo");
    if(!_logo.value && _logo.value == ""){
      _logo.value = logo;
    }

    let _joinPermission = data.find((da)=>da.name == "joinPermission");
    if(!_joinPermission.value && _joinPermission.value == ""){
      _joinPermission.value = joinPermission;
    }

    let _invitePermission = data.find((da)=>da.name == "invitePermission");
    if(!_invitePermission.value && _invitePermission.value == ""){
      _invitePermission.value = invitePermission;
    }
 
    let _allowExit = data.find((da)=>da.name == "allowExit");
    if(!_allowExit.value && _allowExit.value == ""){
      _allowExit.value = allowExit;
    }
    data.push({name:"tenantId",value:tenantId});
    requestStart();
    createTeam(
      data.reduce(
        (obj, { value, name }) => {
          name?obj[name] = value:null;
          return obj;
        },
        {},
      ),"settingEnter"
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

  inputOnChange = (e,name)=>{
    this.state[name] =  e;
    this.setState({
      ...this.state
    })
  }

  setOptherData=(obj)=>{
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state
    })
  }

  allowExitChange=(value)=>{
    this.setState({
      allowExit:value
    })
  }

  onChangeUpload=(url)=>{
     this.setState({
       logo:url
     })
  }

  setUrl(name,url){
    this.state[name] = url;
    this.setState({
      ...this.state
    })
  }

  render() {
    const {tenantName,logo,tenantNature,allowExit,tenantEmail,tenantTel,tenantAddress,
      tenantIndustry,invitePermission,joinPermission,address} = this.state;
     
      let newTenantAddress = "";
      if(tenantAddress){
        let _adds = tenantAddress.split("|");
        newTenantAddress = _adds[_adds.length-1];
      }

    return (
        <div className={team_cont}> 

          <div className={form_team}>
            <Form submitCallBack={this.checkForm} showSubmit={false} className={enter_form}>
                <FormItem showMast={false}  labelName={<span>团队名称<font color='red'> *</font></span>}
                isRequire={true} valuePropsName='value' errorMessage="请输入团队名称" method="blur"
                inline={true}>
                    <FormControl name="tenantName" value={tenantName?tenantName:""} onChange={(e)=>{this.inputOnChange(e,"tenantName")}} placeholder="最多60个字符"/>
                </FormItem>

                <FormItem showMast={false}  labelName={<span>团队头像<font color='red'> *</font></span>} valuePropsName='value' method="change"  inline={true}>
                  <Upload name='logo' logo={logo?logo:""} onChange={this.onChangeUpload}  />
                </FormItem>

                <FormItem showMast={false}  labelName={<span>邀请规则<font color='red'> *</font></span>} isRequire={false} valuePropsName='value' errorMessage="请选择所属行业" method="blur"  inline={true}>
                    <Select
                        name="invitePermission"
                        defaultValue={invitePermission?invitePermission:"1"}
                        style={{ width: 338, marginRight: 6 }}
                        onChange={(e)=>{this.setOptherData({name:"invitePermission",value:e})} }
                        >
                        <Option value="1">全员邀请 </Option>
                        <Option value="2">全员禁止</Option>
                        <Option value="0">仅管理员可邀请</Option>
                    </Select>
                </FormItem>

                <FormItem showMast={false}  labelName={<span>申请权限<font color='red'> *</font></span>} isRequire={false} valuePropsName='value' errorMessage="请选择所属行业" method="blur"  inline={true}>
                    <Select
                        name="joinPermission"
                        defaultValue={joinPermission?joinPermission:"1"}
                        style={{ width: 338, marginRight: 6 }}
                        onChange={(e)=>{this.setOptherData({name:"joinPermission",value:e})} }
                        >
                        <Option value="0">全员允许 </Option>
                        <Option value="1">全员禁止</Option>
                    </Select>
                </FormItem>

                <FormItem showMast={false} labelName={<span>允许退出<font color='red'> *</font></span>} isRequire={false} method="change" inline={true}>
                  <Nature name="allowExit" defaultValue={allowExit?allowExit:"0"} onChange={this.allowExitChange}/>
                </FormItem> 
                
                <SubmitBtn isSubmit />
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