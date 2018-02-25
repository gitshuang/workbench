import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';

import TeamRemoveModal from 'containers/teamRemoveModal';
import TeamUpgradeModal from 'containers/teamUpgradeModal';
import TeamTransferModal from 'containers/teamTransferModal';
import TeamDismissModal from 'containers/teamDismissModal';
import TeamExitModal from 'containers/teamExitModal';


//import { Radio, Select } from 'tinper-bee';
import Checkbox from 'bee/checkbox';
import Button from 'bee/button';
import Icon from 'bee/icon';
import Tabs from 'bee/tabs';
import Dropdown from 'bee/dropdown';
import Menu from 'bee/menus';
import Radio from 'bee/radio';
import Select from 'bee/select';
const { TabPane } = Tabs;
const { Item } = Menu;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

const { requestStart, requestSuccess, requestError } = rootActions;
const { 
  getTeamInfo,
  uploadApplication, 
  createTeam, 
  changeIdentity,
  openRemoveModal,
  closeRemoveModal, 
  openUpgradeModal, 
  openTransferModal,
  openDismissModal,
  openExitModal,
  getAllApps
} = teamconfigActions;

import {
  wrap,
  header,
  content,
  box,
  box2,
  box3,
  item,
  image,
  footer,
  applicationBtns,
  active,
  applicationLists,
  memberBtns,
  memberLists,
} from './index.css';

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
    changeIdentity,         // 团队成员更换身份
    openRemoveModal,        // 团队成员打开删除弹窗
    openUpgradeModal,       // 打开升级为企业弹窗  
    openTransferModal,      // 打开移交团队弹窗
    openDismissModal,       // 打开解散团队弹窗
    openExitModal,          // 打开退出团队弹窗
    getAllApps,             // 获取全部应用
  }
)

class CreateTeamContent extends Component {
  constructor(props) {
    super(props);
    this.imgObj = {};
    this.state = {
      tenantId: "",         // 团队id  直接取出来存到这里  
      value: "",            // 基础设置团队名称
      imgWarning: "",       // 团队头像警告格式
      imgUrl: "",           //   基础设置  选择头像回显
      logo: "",          // 上传成功后返回的url
      searchAvalible: "true",  //搜索可见
      allowExit: "false",  //允许用户是否退出空间
      invitePermission: "1",       //邀请成员权限
      joinPermission: "1",        //加入权限
      btnType: "web",       // 团队应用当前按钮
      deleteMemberId: "",   // 选择删除成员的ID
      webApplication: [],     //  web端应用
      mobApplication: [],     //  移动端应用
      cliApplication: [],     //  client 应用
      currApplication: [],    // 当前渲染的是哪个类别的应用列表
    }
  }

  componentWillMount() {
    this.queryUser();
    this.queryApplication();
    this.queryBasicConfig();
  }

  componentDidMount() {
    
  }
  // 查询用户列表
  queryUser = () => {
    const { getTeamInfo } = this.props;
    getTeamInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      this.setState({
        tenantId: payload.tenantId,
        value: payload.tenantName,
        logo: payload.logo,
        searchAvalible: String(payload.searchAvalible),
        invitePermission: String(payload.invitePermission),
        joinPermission: String(payload.joinPermission),
        allowExit: String(payload.allowExit)
      });
      requestSuccess();
    });
    
  }

  // 查询团队应用
  queryApplication = () => {
    const { getAllApps, requestError, requestSuccess } = this.props;
    getAllApps().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      const webApplication = payload.filter((item)=>{
        return item.webStatus;
      });
      const mobApplication = payload.filter((item)=>{
        return item.phoneStatus;
      });
      const cliApplication = payload.filter((item)=>{
        return item.clientStatus;
      });
      let currApplication = webApplication;
      this.setState({
        webApplication,
        mobApplication,
        cliApplication,
        currApplication
      })
      requestSuccess();
    });
  }

  // 查询基础设置
  queryBasicConfig = () => {

  }


  // 基础设置  输入框改变
  onChange = (e) => {
    const value = e.target.value;
    if (value.length > 60) {
      return false;
    }
    this.setState({
      value
    })
  }

  // 基础设置  图片更改
  imgChange = (e) => {
    if (e.target.value.trim().length === 0) {
      return false;
    }
    const { uploadApplication, requestStart, requestSuccess, requestError } = this.props;
    let val = e.target.value && e.target.value.substr(e.target.value.lastIndexOf("."));
    if (val && !val.match(/.jpg|.gif|.png|.bmp|.svg/i)) {
      this.setState({
        imgWarning: "必须是一个图片"
      });
      return false;
    }
    let obj = this.refs.btn_file.files[0];
    let imgUrl = window.URL.createObjectURL(obj);
    this.setState({
      imgUrl
    });
    const form = new FormData();
    form.append('btn_file', obj);

    requestStart();
    uploadApplication(form).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      const logo = payload.url;
      this.setState({
        logo: logo
      });
      requestSuccess();
    });
  }
  // 基础设置  搜索可见是否
  handleRadioChange1 = (value) => {
    this.setState({ searchAvalible: value });
  }
  // 基础设置    邀请成员权限
  handleChange1 = value => {
    console.log(`selected ${value}`);
    this.setState({
      invitePermission: value
    });
  };
   // 基础设置加入权限
  handleChange2 = value => {
    console.log(`selected ${value}`);
    this.setState({
      joinPermission: value
    });
  };
  // 基础设置  用户退空间 是否允许
  handleRadioChange2 = (value) => {
    this.setState({ allowExit: value });
  }
  // 基础设置  保存
  create = () => {
    const { createTeam, requestStart, requestSuccess, requestError } = this.props;
    const { 
      tenantId, 
      value, 
      logo,
      searchAvalible,  //搜索可见
      allowExit,  //允许用户是否退出空间
      invitePermission,       //邀请成员权限
      joinPermission,        //加入权限
    } = this.state;
    if (!value) {
      alert("请输入团队名称");
      return false;
    }
    console.log(this.props)
    let data = {
      tenantName: value,
      tenantId: tenantId,
      logo: logo,
      searchAvalible: searchAvalible === "false" ? false : true,
      invitePermission: Number(invitePermission),
      joinPermission: Number(joinPermission),
      allowExit: allowExit === "false" ? false : true 
    };
    requestStart();
    createTeam(data).then(({ error, payload }) => {
      requestSuccess();
      if (error) {
        requestError(payload);
        return;
      }
      // getUserInfo();
      // history.replace('/');
      // changeUserInfoDisplay();
      const tenantId = payload.tenantId;
      localStorage.setItem('create', "1");
      window.location.href = "/?tenantId=" + tenantId + "&switch=true";
    });

  }

  
  // 基础设置
  baseConfig = () => {
    const { value, logo, imgWarning, invitePermission, joinPermission } = this.state;
    return (
      <div className={box}>
        <div className={item + " um-box"}>
          <label>团队名称<span>*</span></label>
          <input
            placeholder="最多60个字符"
            value={value}
            onChange={(e) => { this.onChange(e) }}
          />
        </div>
        <div className={item + " um-box"}>
          <label>团队头像</label>
          <div className={image}>
            {logo ? <img ref="imgSrc" src={logo} /> : null}
            <div>
              <Icon type="icon-copyreader" />
              <input type="file" ref="btn_file" onChange={(e) => { this.imgChange(e) }} />
            </div>
          </div>
        </div>
        <div className={item + " um-box"}>
          <label>搜索可见</label>
          <div className="um-box-vc">
            <Radio.RadioGroup
              name="searchAvalible"
              selectedValue={this.state.searchAvalible}
              onChange={this.handleRadioChange1}
            >
              <Radio value="false">否</Radio>
              <Radio value="true">是</Radio>
            </Radio.RadioGroup>
          </div>
        </div>
        <div className={item + " um-box"}>
          <label>邀请成员权限</label>
          <div>
            <Select
              defaultValue={invitePermission}
              style={{ width: 200, marginRight: 6 }}
              onChange={this.handleChange1}
            >
              <Option value="1">全员邀请</Option>
              <Option value="2">全员禁止</Option>
            </Select>
          </div>
        </div>
        <div className={item + " um-box"}>
          <label>加入权限</label>
          <div>
            <Select
              defaultValue={joinPermission}
              style={{ width: 200, marginRight: 6 }}
              onChange={this.handleChange2}
            >
              <Option value="1">所有用户都可申请加入</Option>
              <Option value="2">禁止用户申请加入</Option>
            </Select>
          </div>
        </div>
        <div className={item + " um-box"}>
          <label>允许用户退出空间</label>
          <div className="um-box-vc">
            <Radio.RadioGroup
              name="yssorno"
              selectedValue={this.state.allowExit}
              onChange={this.handleRadioChange2}
            >
              <Radio value="false">禁止</Radio>
              <Radio value="true">允许</Radio>
            </Radio.RadioGroup>
          </div>
        </div>
        <div className={footer}>
          <Button onClick={this.create}>保存</Button>
        </div>
      </div>
    )
  }


 /* &&&&& 应用设置 &&&&&   */ 
  // 点击按钮切换不同的形态
  changeDuan = (type) => {
    const { webApplication, mobApplication, cliApplication } = this.state;
    
    let currApplication = [];
    if(type == "web"){
      currApplication = webApplication
    }else if(type=="mob"){
      currApplication = mobApplication
    }else{
      currApplication = cliApplication;
    }
    this.setState({
      btnType: type,
      currApplication
    });
  }

  handelTime = (time) => {
    const date = new Date(time);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const D = date.getDate() + ' ';
    return Y + M + D;
  }

  esitTime = (time) => {
    const currTime = new Date().getTime();
    if( currTime > time ){
      return "已过期"
    }
    const timeDiff = (time - currTime) / 1000 / 60 / 60 / 24;
    // if(timeDiff > 10){
    //   return false;
    // }
    return "还有"+Math.ceil(timeDiff)+"日过期"
  }

  openXufei = () => {
    alert("续费")
  }
  // 设置团队应用
  teamApplication = () => {
    const { btnType } = this.state;
    const { currApplication } = this.state;
    return (
      <div className={box2}>
        <div className={applicationBtns}>
          <span>
            <Button className={btnType == "web" ? active : ""} onClick={() => { this.changeDuan('web') }}>Web端</Button>
            <Button className={btnType == "mob" ? active : ""} onClick={() => { this.changeDuan('mob') }}>手机端</Button>
            <Button className={btnType == "khd" ? active : ""} onClick={() => { this.changeDuan('khd') }}>PC客户端</Button>
          </span>
          <Button colors="danger">添加应用</Button>
        </div>
        <div className={applicationLists}>
          <ul>
            {
              currApplication.map( (item,index)=>{
                return (
                  <li className="um-box" key={index}>
                    <div>
                      <img src={item.applicationIcon} />
                    </div>
                    <div>
                      <h6>{item.applicationName}</h6>
                      <p>到期时间：{this.handelTime(item.expired)}</p>
                    </div>
                    <div>
                      <p>{this.esitTime(item.expired)}</p>
                    </div>
                    <div className="um-bf1 tr">
                      <Button onClick={this.openXufei}>续费</Button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }



 /* &&&&& 用户设置 &&&&&   */ 
  // 更换用户身份
  handleChange3 = (value,id) => {
    console.log(`selected ${value}`);
    if(value == "deleteMember"){
      this.deleteMember(id);
      return false;
    }
    const { changeIdentity,requestError,requestSuccess } = this.props;
    changeIdentity(value).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
  };
  // 删除用户
  deleteMember = (item) => {
    const id = item || "";
    this.setState({
      deleteMemberId: id
    });
    const {openRemoveModal} = this.props;
    openRemoveModal();
  }
  // 设置团队成员 
  teamMember = () => {
    return (
      <div className={box3}>
        <div className={memberBtns}>
          <Button colors="danger">邀请成员</Button>
        </div>
        <h5>当前人数12人</h5>
        <div className={memberLists}>
          <ul>
            <li className="um-box um-box-vc">
              <div>
                <img src="" />
              </div>
              <div>
                <p>笑笑笑</p>
              </div>
              <div>
                <p>xiao@yonyou.com</p>
              </div>
              <div className="um-bf1  um-box-vc">
                <Select
                  defaultValue="manage"
                  style={{ width: 100, marginRight: 6 }}
                  onChange={ (e) => {this.handleChange3(e,1)} }
                >
                  <Option value="manage">管理员</Option>
                  <Option value="member">成员</Option>
                  <Option value="deleteMember">删除成员</Option>
                </Select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }

                     
 /* &&&&& 公共头部那里的方法集合  &&&&&   */ 
  // 打开升级为企业弹窗
  openUpgradeModal = () => {
    const { openUpgradeModal } = this.props;
    openUpgradeModal();
  }
  onVisibleChange = (visible) => {
    console.log(visible);
  }

  onSelect = ({ key }) => {
    const { openTransferModal,openDismissModal,openExitModal } = this.props;
    if( key == "1" ){
      openTransferModal();
    }else if( key == "2" ){
      openDismissModal();
    }else{
      openExitModal();
    }
  }

  render() {
    const menu1 = (
      <Menu
        onSelect={this.onSelect}>
        <Item key="1">移交团队</Item>
        <Item key="2">解散团队</Item>
        <Item key="3">退出团队</Item>
      </Menu>
    );
    const { removeModal, upgradeModal, transferModal, dismissModal, exitModal } = this.props;
    return (
      <div className={wrap}>
        <div className={header}>
          <h2>用友网络用户体验小组</h2>
          <div className="um-box um-box-center">
            <div>
              <Button onClick={this.openUpgradeModal}>升级为企业</Button>
            </div>
            <div>
              <Dropdown
                trigger={['click']}
                overlay={menu1}
                animation="slide-up"
                onVisibleChange={this.onVisibleChange}
              >
                <Button className="um-box-vc um-box-center">相关操作<Icon type="icon-pull-down" /></Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className={content}>
          <Tabs
            defaultActiveKey="1"
          >
            <TabPane tab='基础设置' key="1">
              {this.baseConfig()}
            </TabPane>
            <TabPane tab='团队应用' key="2">
              {this.teamApplication()}
            </TabPane>
            <TabPane tab='团队成员' key="3">
              {this.teamMember()}
            </TabPane>
          </Tabs>
        </div>

        {
          removeModal ? <TeamRemoveModal
            deleteMemberId = { this.state.deleteMemberId }
            queryUser = { ()=>{this.queryUser()} }
          /> : null
        }
        {
          upgradeModal ? <TeamUpgradeModal /> : null
        }
        {
          transferModal ? <TeamTransferModal /> : null
        }
        {
          dismissModal ? <TeamDismissModal /> : null
        }
        {
          exitModal ? <TeamExitModal /> : null
        }
      </div>
    )
  }
}

export default CreateTeamContent;
