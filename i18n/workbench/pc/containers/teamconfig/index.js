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
  userToAdmin,            // $i18n{index.js0}$i18n-end
  adminToUser,            // $i18n{index.js1}$i18n-end
  openManagerModal,
  openRemoveModal,
  closeRemoveModal,
  openUpgradeModal,
  openTransferModal,
  openDismissModal,
  openExitModal,
  getAllApps,
  getUserList,
  changePage,             // $i18n{index.js2}$i18n-end
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
    'removeModal',      //  $i18n{index.js3}$i18n-end
    'upgradeModal',     //  $i18n{index.js4}$i18n-end
    'transferModal',    //  $i18n{index.js5}$i18n-end
    'dismissModal',     //  $i18n{index.js6}$i18n-end
    'exitModal',        //  $i18n{index.js7}$i18n-end
    'applicationlist',  //  $i18n{index.js8}$i18n-end
    'userList',         //  $i18n{index.js9}$i18n-end
    'activePage',       //  $i18n{index.js10}$i18n-end
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
    getTeamInfo,            // $i18n{index.js11}$i18n-end
    uploadApplication,      // $i18n{index.js12}$i18n-end
    createTeam,             // $i18n{index.js13}$i18n-end
    userToAdmin,            // $i18n{index.js14}$i18n-end
    adminToUser,            // $i18n{index.js15}$i18n-end
    openManagerModal,       // $i18n{index.js16}$i18n-end
    openRemoveModal,        // $i18n{index.js17}$i18n-end
    openUpgradeModal,       // $i18n{index.js18}$i18n-end
    openTransferModal,      // $i18n{index.js19}$i18n-end
    openDismissModal,       // $i18n{index.js20}$i18n-end
    openExitModal,          // $i18n{index.js21}$i18n-end
    getAllApps,             // $i18n{index.js22}$i18n-end
    getUserList,            // $i18n{index.js23}$i18n-end
    changePage,             // $i18n{index.js24}$i18n-end
  }
)

class CreateTeamContent extends Component {
  constructor(props) {
    super(props);
    this.clickValue = "";
    this.tenantName = "";
    this.state = {

      imgWarning: "",         // $i18n{index.js25}$i18n-end
      imgUrl: "",             // $i18n{index.js26}$i18n-end  $i18n{index.js27}$i18n-end

      tenantId: "",           // $i18n{index.js28}$i18n-endid  $i18n{index.js29}$i18n-end
      value: "",              // $i18n{index.js30}$i18n-end
      logo: "",               // $i18n{index.js31}$i18n-endurl
      //searchAvalible: "",     // 搜索可见
      allowExit: "",          // $i18n{index.js32}$i18n-end
      invitePermission: "1",  // $i18n{index.js33}$i18n-end
      joinPermission: "1",    // $i18n{index.js34}$i18n-end

      btnType: "web",         // $i18n{index.js35}$i18n-end
      currMemberId: "",     // $i18n{index.js36}$i18n-endID
      webApplication: [],     //  web$i18n{index.js37}$i18n-end
      mobApplication: [],     //  $i18n{index.js38}$i18n-end
      cliApplication: [],     //  client $i18n{index.js39}$i18n-end
      currApplication: [],    // $i18n{index.js40}$i18n-end

      newUserList: [],        // $i18n{index.js41}$i18n-end
      searchVal: "",          // $i18n{index.js42}$i18n-end
      onlyAdmin: false,       // $i18n{index.js43}$i18n-end
      
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
      return "$i18n{index.js44}$i18n-end"
    }
    const timeDiff = (time - currTime) / 1000 / 60 / 60 / 24;
    if(timeDiff > 30){
      return false;
    }
    return "$i18n{index.js45}$i18n-end"+Math.ceil(timeDiff)+"$i18n{index.js46}$i18n-end"
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
            <Button className={btnType == "web" ? active : ""} onClick={() => { this.changeDuan('web') }}>Web$i18n{index.js47}$i18n-end</Button>
            <Button className={btnType == "mob" ? active : ""} onClick={() => { this.changeDuan('mob') }}>$i18n{index.js48}$i18n-end</Button>
            <Button className={btnType == "khd" ? active : ""} onClick={() => { this.changeDuan('khd') }}>PC$i18n{index.js49}$i18n-end</Button>
          </span>
          {/*<Button colors="danger">$i18n{index.js50}$i18n-end</Button>*/}
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
                        item.expired? <p>$i18n{index.js51}$i18n-end{this.handelTime(item.expired)}</p>:""
                      }
                    </div>
                    <div>
                      <p>{this.esitTime(item.expired)}</p>
                    </div>
                    <div className="um-bf1 tr">
                      {
                        this.esitXufei(item.expired) ? <Button onClick={()=>{this.openXufei(item.applicationId)}}>$i18n{index.js52}$i18n-end</Button> : null
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
    let reg = new RegExp("$i18n{index.js53}$i18n-end\/$i18n{index.js54}$i18n-end","g");
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
                placeholder="$i18n{index.js55}$i18n-end、$i18n{index.js56}$i18n-end、$i18n{index.js57}$i18n-end"
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
              <span className={search_label}>$i18n{index.js58}$i18n-end</span>
            </div>
          </div>
          <div className={memberBtns}>
            <Checkbox colors="info" onChange={this.changeCheck}>$i18n{index.js59}$i18n-end</Checkbox>
            {
              _invitePermission?<Button colors="danger" onClick={this.inviteMember}>$i18n{index.js60}$i18n-end</Button>:null
            }
          </div>
        </div>

        <div className={table_title}>
          <div>$i18n{index.js61}$i18n-end{userList.totalElements}$i18n{index.js62}$i18n-end</div>
          <div className={table_permise}>$i18n{index.js63}$i18n-end</div>
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
                        <Option value="manage">$i18n{index.js64}$i18n-end</Option>
                        <Option value="member">$i18n{index.js65}$i18n-end</Option>
                        <Option value="deleteMember">$i18n{index.js66}$i18n-end</Option>
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
              <Button onClick={this.openUpgradeModal}>$i18n{index.js67}$i18n-end</Button>
            </div>
            <div>
              {/* <Dropdown
                trigger={['click']}
                overlay={menu1}
                animation="slide-up"
                onVisibleChange={this.onVisibleChange}
              >
                <Button className="um-box-vc um-box-center">$i18n{index.js68}$i18n-end<Icon type="pull-down" /></Button>
              </Dropdown> */}

               <EnterOption data={[
                {id:"aa",name:"$i18n{index.js69}$i18n-end",value:"2",serverApi:"team/remove",msg:"$i18n{index.js70}$i18n-end"},
                {id:"allowExit",name:"$i18n{index.js71}$i18n-end",value:"3",serverApi:"team/leave",msg:"$i18n{index.js72}$i18n-end"},
              ]}  type="$i18n{index.js73}$i18n-end" />

            </div>
          </div>
        </div>
        <div className={content}>
          <Tabs
            destroyInactiveTabPane
            defaultActiveKey="1"
          >
            <TabPane tab='$i18n{index.js74}$i18n-end' key="1">
              <div >
                <CreateTeam />
              </div>
            </TabPane>
            <TabPane tab='$i18n{index.js75}$i18n-end' key="2">
              {this.teamApplication()}
            </TabPane>
            <TabPane tab='$i18n{index.js76}$i18n-end' key="3">
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
