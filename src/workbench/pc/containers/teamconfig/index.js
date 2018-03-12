import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import EnterOption from 'containers/enterOption'
import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';

import TeamManagerModal from 'containers/teamManagerModal';
import TeamRemoveModal from 'containers/teamRemoveModal';
import TeamUpgradeModal from 'containers/teamUpgradeModal';
import TeamTransferModal from 'containers/teamTransferModal';
// import TeamDismissModal from 'containers/teamDismissModal';
// import TeamExitModal from 'containers/teamExitModal';

import CreateTeam from './createTeam';
import Checkbox from 'bee/checkbox';
import Button from 'bee/button';
import BeeIcon from 'bee/icon';
import Icon from 'components/icon';
import Tabs from 'bee/tabs';
import Dropdown from 'bee/dropdown';
import Menu from 'bee/menus';
import Radio from 'bee/radio';
import Select from 'bee/select';
import Pagination from 'bee/pagination'
const { TabPane } = Tabs;
const { Item } = Menu;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

const { requestStart, requestSuccess, requestError } = rootActions;
const {
  getTeamInfo,
  uploadApplication,
  createTeam,
  userToAdmin,            // 用户升级管理员
  adminToUser,            // 管理员降级用户
  openManagerModal,       
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
  memberTit,
  memberBtns,
  memberLists,
  search,
  search_label,
  team_cont,
  option_sele,
  table_title,
  table_permise,
  user_name,
} from './index.css';

@withRouter
@connect(
  mapStateToProps(
    'teamData',
    'managerModal',
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
    openManagerModal,       // 打开升级管理员弹窗
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

class CreateTeamContent extends Component {
  constructor(props) {
    super(props);
    this.clickValue = "";
    this.tenantName = "";
    this.state = {

      imgWarning: "",         // 团队头像警告格式
      imgUrl: "",             // 基础设置  选择头像回显

      tenantId: "",           // 团队id  直接取出来存到这里
      value: "",              // 基础设置团队名称
      logo: "",               // 上传成功后返回的url
      //searchAvalible: "",     // 搜索可见
      allowExit: "",          // 允许用户是否退出空间
      invitePermission: "1",  // 邀请成员权限
      joinPermission: "1",    // 加入权限

      btnType: "web",         // 团队应用当前按钮
      currMemberId: "",     // 选择删除成员的ID
      webApplication: [],     //  web端应用
      mobApplication: [],     //  移动端应用
      cliApplication: [],     //  client 应用
      currApplication: [],    // 当前渲染的是哪个类别的应用列表

      newUserList: [],        // 当前用户列表
      searchVal: "",          // 用户列表搜索关键字
      onlyAdmin: false,       // 是否只显示管理员
    }
  }

  componentWillMount() {
    this.queryBasicConfig();
    this.queryApplication();
    this.queryUser();
  }

  componentDidMount() {

  }

  // 查询基础设置
  queryBasicConfig = () => {
    const { getTeamInfo, requestError, requestSuccess } = this.props;
    getTeamInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      this.setState({
        tenantId: payload.tenantId,
        value: payload.tenantName,
        logo: payload.logo,
        //searchAvalible: payload.searchAvalible,
        invitePermission: payload.invitePermission,
        joinPermission: payload.joinPermission,
        allowExit: payload.allowExit
      });
      // 将默认的团队名称赋值变量
      this.tenantName = payload.tenantName;
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
      const currApplication = webApplication;
      this.setState({
        webApplication,
        mobApplication,
        cliApplication,
        currApplication
      })
      requestSuccess();
    });
  }

  // 查询用户列表
  queryUser = ( keyword = "", onlyAdmin = false, page = 1, size = 10 ) => {
    const { getUserList, changePage, requestError, requestSuccess } = this.props;
    const param = {
      page,
      size,
      keyword,
      onlyAdmin
    }
    getUserList( param ).then(({error, payload}) => {
      if(error){
        requestError(payload);
        return false;
      }
      this.setState({
        newUserList: payload.content
      })
      changePage(page);
      requestSuccess();
    });
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

  // // 基础设置  图片更改
  // imgChange = (e) => {
  //   if (e.target.value.trim().length === 0) {
  //     return false;
  //   }
  //   const { uploadApplication, requestStart, requestSuccess, requestError } = this.props;
  //   let val = e.target.value && e.target.value.substr(e.target.value.lastIndexOf("."));
  //   if (val && !val.match(/.jpg|.gif|.png|.bmp|.svg/i)) {
  //     this.setState({
  //       imgWarning: "必须是一个图片"
  //     });
  //     return false;
  //   }
  //   let obj = this.refs.btn_file.files[0];
  //   let imgUrl = window.URL.createObjectURL(obj);
  //   this.setState({
  //     imgUrl
  //   });
  //   const form = new FormData();
  //   form.append('btn_file', obj);

  //   requestStart();
  //   uploadApplication(form).then(({ error, payload }) => {
  //     if (error) {
  //       requestError(payload);
  //     }
  //     const logo = payload.url;
  //     this.setState({
  //       logo: logo
  //     });
  //     requestSuccess();
  //   });
  // }
  // 基础设置  搜索可见是否
  // handleRadioChange1 = (value) => {
  //   this.setState({ searchAvalible: value });
  // }
  // 基础设置    邀请成员权限
  // handleChange1 = value => {
  //   console.log(`selected ${value}`);
  //   this.setState({
  //     invitePermission: value
  //   });
  // };
  //  // 基础设置加入权限
  // handleChange2 = value => {
  //   console.log(`selected ${value}`);
  //   this.setState({
  //     joinPermission: value
  //   });
  // };
  // 基础设置  用户退空间 是否允许
  // handleRadioChange2 = (value) => {
  //   this.setState({ allowExit: value });
  // }

  // // 基础设置  保存
  // create = () => {
  //   const { createTeam, requestStart, requestSuccess, requestError } = this.props;
  //   const {
  //     tenantId,
  //     value,
  //     logo,
  //     //searchAvalible,  //搜索可见
  //     allowExit,  //允许用户是否退出空间
  //     invitePermission,       //邀请成员权限
  //     joinPermission,        //加入权限
  //   } = this.state;
  //   if (!value) {
  //     alert("请输入团队名称");
  //     return false;
  //   }
  //   console.log(this.props)
  //   let data = {
  //     tenantName: value,
  //     tenantId: tenantId,
  //     logo: logo,
  //     //searchAvalible: searchAvalible,
  //     invitePermission: invitePermission,
  //     joinPermission: joinPermission,
  //     allowExit: allowExit
  //   };
  //   requestStart();
  //   createTeam(data).then(({ error, payload }) => {
  //     requestSuccess();
  //     if (error) {
  //       requestError(payload);
  //       return;
  //     }
  //     const tenantId = payload.tenantId;
  //     //localStorage.setItem('create', "1");
  //     window.location.href = "/?tenantId=" + tenantId + "&switch=true";
  //   });

  // }


  // // 基础设置
  // baseConfig = () => {
  //   const { value, logo, imgWarning, invitePermission, joinPermission } = this.state;
  //   return (
  //     <div className={box}>
  //       <div className={item + " um-box"}>
  //         <label>团队名称<span>*</span></label>
  //         <input
  //           placeholder="最多60个字符"
  //           value={value}
  //           onChange={(e) => { this.onChange(e) }}
  //         />
  //       </div>
  //       <div className={item + " um-box"}>
  //         <label>团队头像</label>
  //         <div className={image}>
  //           {logo ? <img ref="imgSrc" src={logo} /> : null}
  //           <div>
  //             <Icon type="copyreader" />
  //             <input type="file" ref="btn_file" onChange={(e) => { this.imgChange(e) }} />
  //           </div>
  //         </div>
  //       </div> 
  //       <div className={item + " um-box"}>
  //         <label>邀请成员权限</label>
  //         <div>
  //           <Select
  //             value={invitePermission}
  //             style={{ width: 200, marginRight: 6 }}
  //             onChange={this.handleChange1}
  //           >
  //             <Option value="1">全员邀请</Option>
  //             <Option value="0">全员禁止</Option>
  //           </Select>
  //         </div>
  //       </div>
  //       <div className={item + " um-box"}>
  //         <label>加入权限</label>
  //         <div>
  //           <Select
  //             value={joinPermission}
  //             style={{ width: 200, marginRight: 6 }}
  //             onChange={this.handleChange2}
  //           >
  //             <Option value="1">所有用户都可申请加入</Option>
  //             <Option value="0">禁止用户申请加入</Option>
  //           </Select>
  //         </div>
  //       </div>
  //       <div className={item + " um-box"}>
  //         <label>允许用户退出空间</label>
  //         <div className="um-box-vc">
  //           <Radio.RadioGroup
  //             name="yssorno"
  //             selectedValue={this.state.allowExit}
  //             onChange={this.handleRadioChange2}
  //           >
  //             <Radio value="0">禁止</Radio>
  //             <Radio value="1">允许</Radio>
  //           </Radio.RadioGroup>
  //         </div>
  //       </div>
  //       <div className={footer}>
  //         <Button onClick={this.create}>保存</Button>
  //       </div>
  //     </div>
  //   )
  // }


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

  // 是否渲染还有多少天到期
  esitTime = (time) => {
    const currTime = new Date().getTime();
    if( currTime > time ){
      return "已过期"
    }
    const timeDiff = (time - currTime) / 1000 / 60 / 60 / 24;
    if(timeDiff > 30){
      return false;
    }
    return "还有"+Math.ceil(timeDiff)+"日过期"
  }
  // 续费按钮
  esitXufei = (time) => {
    const currTime = new Date().getTime();
    const timeDiff = (time - currTime) / 1000 / 60 / 60 / 24;
    if(timeDiff > 30){
      return false;
    }
    // if( currTime > time ){
    //   return true;
    // }
    return true;
  }

  openXufei = (id) => {
    const { history } = this.props;
    history.push('/renew/'+ id);
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
          {/*<Button colors="danger">添加应用</Button>*/}
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
                      {
                        this.esitXufei(item.expired) ? <Button onClick={()=>{this.openXufei(item.applicationId)}}>续费</Button> : null
                      }

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
    const { userToAdmin, adminToUser, requestError,requestSuccess } = this.props;
    let { newUserList } = this.state;
    this.setState({
      currMemberId: id
    });
    if(value == "deleteMember"){
      const {openRemoveModal} = this.props;
      openRemoveModal();
      return false;
    }
    if (value == "manage"){
      const { openManagerModal } = this.props;
      openManagerModal();
      return false;
    }
    adminToUser( id ).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      newUserList.forEach((item,index) => {
        if (item.userId == id){
          item.admin = false
        }
      });
      this.setState({
        newUserList
      });
      requestSuccess();
    });

  };
  // 更改search 内容
  changeSearchFn = (e) => {
    let searchVal = e.target.value;
    this.setState({
      searchVal
    });
  }
  // 清空输入框的value
  clearSearchFn =()=>{
    const { onlyAdmin } = this.state;
    this.setState({
      searchVal: ""
    });
    this.clickValue = "";
    this.queryUser( "", onlyAdmin );
  }
  // sousuo
  searchFn = () =>{
    // 点击搜索之后设置点击为true  从而判断点击分页是查询整还是搜索结果
    const { searchVal, onlyAdmin } = this.state;
    this.clickValue = searchVal;
    this.queryUser( searchVal, onlyAdmin );
  }
  // 点击只显示管理员
  changeCheck = (value) => {
    console.log(value);

    this.setState({
      onlyAdmin: value
    });
    this.queryUser( this.clickValue, value );
  }
  // 邀请成员
  inviteMember = () => {
    const { history } = this.props;
    history.push("/invitation");
  }

  // 点击分页
  handleSelect = (eventKey)=> {
    const { activePage } = this.props;
    const { onlyAdmin } = this.state;
    if( eventKey == activePage ){
      return false;
    }
    // 增加此判断是为了  用户输入框输入信息  但是并没有点击查询   点击过查询的才会搜索之后的列表
    if (this.clickValue){
      this.queryUser( this.clickValue, onlyAdmin, eventKey );
    }else{
      this.queryUser( "", onlyAdmin, eventKey );
    }
  }


  // 设置团队成员
  teamMember = () => {
    const { newUserList } = this.state;
    const {
      userInfo: {
        admin,
        currentTeamConfig:{invitePermission}
      },
      userList, activePage
    } = this.props;
    
    let _invitePermission = false;
    if(invitePermission == "0"){
      _invitePermission = admin;
    }else if(invitePermission == "1"){
      _invitePermission = true;
    }

    return (
      <div className={box3}>
        <div className = {memberTit+" um-box" }>
          <div className={search + " um-box um-box-vc"}>
            <div style={{position:"relative"}}>
              <input
                className="form-control"
                type="text"
                placeholder="姓名、手机号码、邮箱"
                value={this.state.searchVal}
                onChange={(e)=>{this.changeSearchFn(e)}}
              />
              {
                this.state.searchVal.length ? <span className="um-input-clear icon-error3" onClick={this.clearSearchFn}></span> : null
              }

            </div>

            <div
              className="um-bf1"
              style={{textAlign:"center",cursor:"pointer" }}
              onClick={this.searchFn}
            >
              <BeeIcon type="uf-search">
                <span className={search_label}>搜索</span>
              </BeeIcon>
            </div>
          </div>
          <div className={memberBtns + " um-bf1 um-box-vc"}>
            <Checkbox colors="info" onChange={this.changeCheck}>只显示管理员</Checkbox>
            {
              _invitePermission?<Button colors="danger" onClick={this.inviteMember}>邀请成员</Button>:null
            }
          </div>
        </div>
            
        <div className={table_title}>
          <div>当前人数{userList.totalElements}人</div>
          <div className={table_permise}>成员权限</div>
        </div>
        <div className={memberLists}>
          <ul>
            {
              newUserList.map((item,index)=>{
                return (
                  <li className="um-box um-box-vc" key={index}>
                    <div>
                      {
                        item.userAvator?<img style={{display:"block",height:"100%"}} src = {item.userAvator} />:<Icon type="staff" />
                      }
                    </div>
                    <div>
                      <p className={user_name}>{item.userName}</p>
                    </div>
                    <div>
                      <p>{item.userEmail}</p>
                    </div>
                    <div className={`${option_sele} um-bf1  um-box-vc `}>
                      <Select
                        dropdownClassName="teamselect"
                        value={ item.admin ? "manage" : "member" }
                        style={{ width: 88, marginRight: 6 }}
                        onChange={ (e) => {this.handleChange3(e,item.userId)} }
                      >
                        <Option value="manage">管理员</Option>
                        <Option value="member">成员</Option>
                        <Option value="deleteMember">删除成员</Option>
                      </Select>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="um-box-center" style={{paddingBottom:"20px"}}>
          <Pagination
            first
            last
            prev
            next
            boundaryLinks
            gap={true}
            items={userList.totalPages}
            maxButtons={10}
            activePage={activePage}
            onSelect={this.handleSelect.bind(this)}
          />
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

  onSelectDrop = ({ key }) => {
    const { openTransferModal,openDismissModal,openExitModal } = this.props;
    if( key == "2" ){
      openDismissModal();
    }else{
      openExitModal();
    }
  }

  render() {
    // const menu1 = (
    //   <Menu onClick={this.onSelectDrop}> 
    //     <Item key="2">解散团队</Item>
    //     <Item key="3">退出团队</Item>
    //   </Menu>
    // );
    const { managerModal, removeModal, upgradeModal, transferModal, dismissModal, exitModal, userInfo } = this.props;
    return (
      <div className={wrap}>
        <div className={header}>
          <h2>{this.tenantName}</h2>
          <div className="um-box um-box-center">
            <div>
              <Button onClick={this.openUpgradeModal}>升级为企业</Button>
            </div>
            <div>
              {/* <Dropdown
                trigger={['click']}
                overlay={menu1}
                animation="slide-up"
                onVisibleChange={this.onVisibleChange}
              >
                <Button className="um-box-vc um-box-center">相关操作<Icon type="pull-down" /></Button>
              </Dropdown> */}

               <EnterOption data={[
                {id:"aa",name:"解散团队",value:"2",serverApi:"team/remove",msg:"解散后，当期团队下的应用将不能再使用，相应的数据也将被删除，请确认数据已备份"},
                {id:"allowExit",name:"退出团队",value:"3",serverApi:"team/leave",msg:"退出后，您在当前团队下的应用将不能再使用，相应的数据也将被删除，请确认数据已备份"},
              ]}  type="团队" />

            </div>
          </div>
        </div>
        <div className={content}>
          <Tabs
            defaultActiveKey="1"
          >
            <TabPane tab='基础设置' key="1">
              <div >
                <CreateTeam />
              </div>
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
          managerModal ? <TeamManagerModal
            currMemberId = { this.state.currMemberId }
            queryUser = { ()=>{this.queryUser()} }
          /> : null
        }
        {
          removeModal ? <TeamRemoveModal
            currMemberId = { this.state.currMemberId }
            queryUser = { ()=>{this.queryUser()} }
          /> : null
        }
        {
          upgradeModal ? <TeamUpgradeModal /> : null
        }
        {
          transferModal ? <TeamTransferModal /> : null
        }
        {/* {
          dismissModal ? <TeamDismissModal /> : null
        }
        {
          exitModal ? <TeamExitModal isManage={userInfo.admin} userId={userInfo.userId} close={true}/> : null
        } */}
      </div>
    )
  }
}

export default CreateTeamContent;
