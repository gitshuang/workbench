import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import EnterOption from 'containers/enterOption'
import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';
import EnhancedPagination from 'pub-comp/enhancedPagination';

import TeamManagerModal from 'containers/teamManagerModal';
import TeamRemoveModal from 'containers/teamRemoveModal';
import TeamUpgradeModal from 'containers/teamUpgradeModal';
import TeamTransferModal from 'containers/teamTransferModal';
// import TeamDismissModal from 'containers/teamDismissModal';
// import TeamExitModal from 'containers/teamExitModal';

import CreateTeam from './createTeam';
import Checkbox from 'bee/checkbox';
import Button from 'bee/button';
import Icon from 'pub-comp/icon';
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
  userToAdmin,            // NoDictionary
  adminToUser,            // NoDictionary
  openManagerModal,
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
  nopic,
} from './index.css';

@withRouter
@connect(
  mapStateToProps(
    'teamData',
    'managerModal',
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
    getTeamInfo,            // NoDictionary
    uploadApplication,      // NoDictionary
    createTeam,             // NoDictionary
    userToAdmin,            // NoDictionary
    adminToUser,            // NoDictionary
    openManagerModal,       // NoDictionary
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

class CreateTeamContent extends Component {
  constructor(props) {
    super(props);
    this.clickValue = "";
    this.tenantName = "";
    this.state = {

      imgWarning: "",         // NoDictionary
      imgUrl: "",             // NoDictionary  NoDictionary

      tenantId: "",           // NoDictionaryid  NoDictionary
      value: "",              // NoDictionary
      logo: "",               // NoDictionaryurl
      //searchAvalible: "",     // 搜索可见
      allowExit: "",          // NoDictionary
      invitePermission: "1",  // NoDictionary
      joinPermission: "1",    // NoDictionary

      btnType: "web",         // NoDictionary
      currMemberId: "",     // NoDictionaryID
      webApplication: [],     //  webNoDictionary
      mobApplication: [],     //  NoDictionary
      cliApplication: [],     //  client NoDictionary
      currApplication: [],    // NoDictionary

      newUserList: [],        // NoDictionary
      searchVal: "",          // NoDictionary
      onlyAdmin: false,       // NoDictionary
      
      activePage:1,
      pagesize:10,
      dataPerPageNum:10,
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
        newUserList: payload.content,
        pagesize:payload.totalPages
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
    // 判断到期时间没有或者... 直接不继续
    if(!time){
      return false;
    }
    const currTime = new Date().getTime();
    if( currTime > time ){
      return "NoDictionary"
    }
    const timeDiff = (time - currTime) / 1000 / 60 / 60 / 24;
    if(timeDiff > 30){
      return false;
    }
    return "NoDictionary"+Math.ceil(timeDiff)+"NoDictionary"
  }
  // 续费按钮
  esitXufei = (time) => {
    // 判断到期时间没有或者... 直接不继续
    if(!time){
      return false;
    }
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
            <Button className={btnType == "web" ? active : ""} onClick={() => { this.changeDuan('web') }}>WebNoDictionary</Button>
            <Button className={btnType == "mob" ? active : ""} onClick={() => { this.changeDuan('mob') }}>NoDictionary</Button>
            <Button className={btnType == "khd" ? active : ""} onClick={() => { this.changeDuan('khd') }}>PCNoDictionary</Button>
          </span>
          {/*<Button colors="danger">NoDictionary</Button>*/}
        </div>
        <div className={applicationLists}>
          <ul>
            {
              currApplication.map( (item,index)=>{
                return (
                  <li className="um-box" key={index}>
                    <div className={`${item.applicationIcon ? nopic : ''}`}>
                      <img src={item.applicationIcon} />
                    </div>
                    <div>
                      <h6>{item.applicationName}</h6>
                      {
                        item.expired? <p>NoDictionary{this.handelTime(item.expired)}</p>:""
                      }
                    </div>
                    <div>
                      <p>{this.esitTime(item.expired)}</p>
                    </div>
                    <div className="um-bf1 tr">
                      {
                        this.esitXufei(item.expired) ? <Button onClick={()=>{this.openXufei(item.applicationId)}}>NoDictionary</Button> : null
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
 
  // 更换用户身份
  handleChange3 = (value,id) => { 
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
        return false;
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
    this.setState({
      activePage: eventKey
    });
    let dataSize = this.state.dataPerPageNum;
    // 增加此判断是为了  用户输入框输入信息  但是并没有点击查询   点击过查询的才会搜索之后的列表
    if (this.clickValue){
      this.queryUser( this.clickValue, onlyAdmin, eventKey ,dataSize);
    }else{
      this.queryUser( "", onlyAdmin, eventKey ,dataSize);
    }
  }

    //下面选择每页展示的数据条目数
  paginationNumSelect = (id,dataNum) =>{
    let reg = new RegExp("NoDictionary\/NoDictionary","g");
    let dataPerPageNum  = dataNum.replace(reg,"");
    const { searchVal,value, activetab, activePage}=this.state;
    this.setState({
      dataPerPageNum:dataPerPageNum
    },function () {
      if(activetab=='other'){
          this.queryUser(searchVal,5,activePage,dataPerPageNum)
      }else{
          this.queryUser(searchVal,activetab,activePage,dataPerPageNum)
      }
    })

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
        <div className = {memberTit }>
          <div className={search}>
            <div style={{position:"relative",float:"left"}}>
              <input
                className="form-control"
                type="text"
                placeholder="NoDictionary、NoDictionary、NoDictionary"
                value={this.state.searchVal}
                onChange={(e)=>{this.changeSearchFn(e)}}
              />
              {
                this.state.searchVal.length ? <span className="um-input-clear icon-error3" onClick={this.clearSearchFn}></span> : null
              }

            </div>

            <div
              style={{textAlign:"center",cursor:"pointer" }}
              onClick={this.searchFn}
            >
              <span className={search_label}>NoDictionary</span>
            </div>
          </div>
          <div className={memberBtns}>
            <Checkbox colors="info" onChange={this.changeCheck}>NoDictionary</Checkbox>
            {
              _invitePermission?<Button colors="danger" onClick={this.inviteMember}>NoDictionary</Button>:null
            }
          </div>
        </div>

        <div className={table_title}>
          <div>NoDictionary{userList.totalElements}NoDictionary</div>
          <div className={table_permise}>NoDictionary</div>
        </div>
        <div className={memberLists}>
          <ul>
            {
              newUserList.map((item,index)=>{
                // um-box um-box-vc
                return (
                  <li key={index}>
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
                        <Option value="manage">NoDictionary</Option>
                        <Option value="member">NoDictionary</Option>
                        <Option value="deleteMember">NoDictionary</Option>
                      </Select>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="um-box-center" style={{paddingBottom:"20px"}}>
          {/* <Pagination
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
          /> */}
           <EnhancedPagination
                  maxButtons={3}
                  gap={true}
                  items={this.state.pagesize}
                  activePage={this.state.activePage}
                  onDataNumSelect={this.paginationNumSelect}
                  onSelect={this.handleSelect} />
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
              <Button onClick={this.openUpgradeModal}>NoDictionary</Button>
            </div>
            <div>
              {/* <Dropdown
                trigger={['click']}
                overlay={menu1}
                animation="slide-up"
                onVisibleChange={this.onVisibleChange}
              >
                <Button className="um-box-vc um-box-center">NoDictionary<Icon type="pull-down" /></Button>
              </Dropdown> */}

               <EnterOption data={[
                {id:"aa",name:"NoDictionary",value:"2",serverApi:"team/remove",msg:"NoDictionary"},
                {id:"allowExit",name:"NoDictionary",value:"3",serverApi:"team/leave",msg:"NoDictionary"},
              ]}  type="NoDictionary" />

            </div>
          </div>
        </div>
        <div className={content}>
          <Tabs
            destroyInactiveTabPane
            defaultActiveKey="1"
          >
            <TabPane tab='NoDictionary' key="1">
              <div >
                <CreateTeam />
              </div>
            </TabPane>
            <TabPane tab='NoDictionary' key="2">
              {this.teamApplication()}
            </TabPane>
            <TabPane tab='NoDictionary' key="3">
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
