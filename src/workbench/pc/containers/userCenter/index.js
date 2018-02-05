import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import Icon from 'components/icon';
import DropdownButton from 'components/dropdown';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
import { getStrLenSubstr } from '@u';

import Button from 'bee-button';
import Select from 'bee-select';
import Tabs, { TabPane } from 'bee-tabs';
import onClickOutside from 'react-onclickoutside';
import img1 from 'assets/image/wgt/yonyouSpace1.png';
import img2 from 'assets/image/wgt/intelligent_logo.png';

import { wrap, outerContainer, active, imgUser,imgOuter, imgInner, userInfo, loginOut, tabContent, wrapBtn,userName,gloryValue,packetsValue,gloryKey,packetsKey,clearfix,userBtnList,serviceImg,serviceName,promotion,
  used,usedModule,usedTit,lastTime,usedService,tabPane1,tabPane2,module,editPortrait,gloryIcon,select,selectTit,options,recently,
  iconContainer, usedIcon, icon1, icon2, icon3, defaultPic, logOut, line_end, tenantArea,tenantPortrait,tenantName,tenantDescribe,companyType,teamBtnList,createBtnList
} from './style.css';

const {
  getUserInfo,
  hideUserInfoDisplay,
  getWorkList,
  setCutUser
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
  getLatestAccessList,
  getPromotionServiceList
} = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'userInfoDisplay',
    'requestDisplay',
    'latestAccessList',
    'promotionServiceList',
    {
      namespace: 'home',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    hideUserInfoDisplay,
    getUserInfo,
    getWorkList,
    setCutUser,
    getLatestAccessList,
    getPromotionServiceList
  }
)
@onClickOutside
class UserInfoContainer extends Component {
  constructor(props) {
    super(props);

    this.getLatestAccessList();
    this.getPromotionServiceList();

    this.state = {
      dataList:[ ],
      promotionList:[ ]
    }
  }
  static propTypes = {
    userInfo: PropTypes.object,
    getUserInfo: PropTypes.func,
    hideUserInfoDisplay: PropTypes.func,
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
  }

  getLatestAccessList() {
    const {requestStart, requestSuccess, requestError,   getLatestAccessList} = this.props;
    requestStart();
    getLatestAccessList().then(({error, payload}) => {
        if (error) {
            requestError(payload);
        }
        this.setState({
          dataList:payload
        })
        requestSuccess();
    });
  }
  getPromotionServiceList() {
    const {requestStart, requestSuccess, requestError, getPromotionServiceList} = this.props;
    requestStart();
    getPromotionServiceList().then(({error, payload}) => {
        if (error) {
            requestError(payload);
        }
        this.setState({
          promotionList:payload
        })
        requestSuccess();
    });
  }
  handleClickOutside(e) {
    const { hideUserInfoDisplay, userInfoDisplay } = this.props;
    if (userInfoDisplay) {
      hideUserInfoDisplay();
    }
  }
  editAvatar = () => {
    window.open('https://idtest.yyuap.com/usercenter/user');
  }
  handleClick = () => {
      this.setState({
        dataList:[]
      })
  }
  setCutUserFn =() => {
    const {setCutUser,getWorkList} = this.props;
    setCutUser().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      } else {
        getWorkList().then(({error, payload}) => {
          if (error) {
            requestError(payload);
          }
        });
      }
      requestSuccess();
    });
  }
  handleChange=(e)=>{
    switch(e){
      case 'language' :
        alert("功能建设中...");
        break;
      case 'message' :
        alert("功能建设中...");
        break;
      default :
        break;
    }
  }
  handleChange2 =(e)=>{
    switch(e){
      case 'accountManagement' :
        window.open('https://idtest.yyuap.com/usercenter/usermng');
        break;
      case 'userInfo' :
        window.open('https://idtest.yyuap.com/usercenter/user');
        break;
      case 'safetyPick' :
        window.open('http://idtest.yyuap.com/usercenter/securityscore');
        break;
      case 'password' :
        window.open('http://idtest.yyuap.com/usercenter/security');
        break;
      default :
        break;
    }
  }
  gotoManage() {
    const {
      history,
      hideUserInfoDisplay,
    } = this.props;
    history.push('/manage');
    hideUserInfoDisplay();
  }
  gotoCreateTeam = () => {
    const {
      history,
      hideUserInfoDisplay,
    } = this.props;
    history.push('/createteam/home');
    hideUserInfoDisplay();
  }
  gotoCreateEnter = () => {
    const {
      history,
      hideUserInfoDisplay,
    } = this.props;
    history.push('/createenter/home');
    hideUserInfoDisplay();
  }
  accountManage(){
    window.open('https://idtest.yyuap.com/usercenter/usermng');
  }
  getUserOrder(){
    window.open('https://idtest.yyuap.com/usercenter/myapp');
  }
  getIcon(imgsrc) {
    if (imgsrc) {
      return (
        <img src={imgsrc} className={imgInner} />
      );
    } else {
      return (
        <div className={defaultPic}>
          <Icon type="staff" />
        </div>
      );
    }
  }
  getCompanyType(){
    const { tenantid } = window.diworkContext();
    const {
      userInfo: {
        allowTenants,
      },
    } = this.props;
    const curTenant = allowTenants.filter((tenant) => {
      return tenant.tenantId === tenantid;
    })[0];
    let type = '团队';
    if (curTenant && !curTenant.team) {
      type = '企业';
    }
    return type;
  }
  /* 邀请成员 */
  inviteMember(){
    const {
      history,
      hideUserInfoDisplay,
    } = this.props;
    history.push('/invitation');
    hideUserInfoDisplay();
  }
  logOut=()=>{
    window.location.href = `/logout?service=${encodeURIComponent(`${window.location.origin}/`)}`;
  }
  changeTenant(tenantId){
    const {
      location: {
        origin,
        pathname,
        hash,
      },
    } = window;
    window.location.replace(
      `${origin}${pathname}?tenantId=${tenantId}&switch=true${hash}`,
    );
  }
  render() {
    const {
      userInfo: {
        userName: name,
        userAvator: imgsrc,
        gloriesNum: glory,
        redPacketsNum: redPackets,
        allowTenants,
        admin,
        logo,
        company,
      },
      requestDisplay
    } = this.props;
    let _accountMenuDataItem =[
      {name:"userInfo",value:"个人信息",fun:this.handleChange2},
      {name:"accountManagement",value:"帐号设置",fun:this.handleChange2},
      {name:"safetyPick",value:"安全评级",fun:this.handleChange2},
      {name:"password",value:"修改密码",fun:this.handleChange2}
    ];
    let renderAllow = <DropdownButton getPopupContainer = {()=> document.getElementById("modalId")} label="帐号设置" dataItem={_accountMenuDataItem} />

    let _li = [];//最近使用列表
    this.state.dataList.forEach((da,i)=>{
      let applicationName = da.service.application.applicationName;
        _li.push(<li key={i}>
          <div className={usedIcon}><img src={img1} /></div>
          <div className={`${used} ${clearfix}`}>
            <div className={`${usedModule} ${clearfix}`}>
              <div className={`${module} ${clearfix}`}>
                <div className={usedTit}>{applicationName}</div>
                <div className={lastTime}>{da.accessTime}</div>
              </div>
              <div className={usedService}>{da.service.serviceName}</div>
            </div>
          </div>
        </li>);
    })

    let lis = [];//推广服务列表
    this.state.promotionList.forEach((item,index)=>{
      lis.push(<li key={index} className={(index+1)%4 == 0?line_end:null}>
          <div className={serviceImg}>
            <section><img src={img1}/></section>
            <div className={serviceName}>{item.serviceName}</div>
          </div>
        </li>);
    })

    let _menuDataItem =[
      {name:"language",value:"界面语言",fun:this.handleChange},
      {name:"message",value:"消息",fun:this.handleChange}
    ];

    return (
      <div id="modalId" className={`${wrap} ${clearfix}`} >
        <div>
          <div className={imgUser}>
            <div className={imgOuter}>
              {this.getIcon(imgsrc)}
            </div>
            <div className={editPortrait}  >
              <Icon type="copyreader" title="修改头像" onClick={this.editAvatar}></Icon>
            </div>
          </div>
          <div className={userName} title={name}>{getStrLenSubstr(name,20,20)}</div>
          <div className={logOut} onClick={this.logOut}>
            <Icon type="exit" />
            <span>注销</span>
          </div>

          <ul className={`${gloryIcon} ${clearfix}`}>
            <li>
              <div className={`${iconContainer} ${icon1}`}><Icon title="荣耀" type="glory"></Icon></div>
            </li>
            <li>
              <div className={`${iconContainer} ${icon3}`}><Icon title="动态" type="Internet2"></Icon></div>
            </li>
          </ul>
        </div>
        <div>
          <ul className={`${userBtnList} ${clearfix}`}>
            <li><Button shape="border" size="sm" onClick={this.accountManage.bind(this)}>账号管理</Button></li>
            <li><Button shape="border" size="sm" onClick={this.getUserOrder.bind(this)}>我的订单</Button></li>
            {/* <li>
              {renderAllow}
            </li>
            <li>
              <DropdownButton getPopupContainer = {()=> document.getElementById("modalId")}
               label="系统设置" dataItem={_menuDataItem} />
            </li> */}
          </ul>
        </div>
        <div className={tenantArea}>
          <div>
            <div className={tenantPortrait}>
              <div className={imgOuter}>
                {this.getIcon(logo)}
              </div>
              {/* <div className={editPortrait}  >
                <Icon type="copyreader" title="修改头像" onClick={this.editAvatar}></Icon>
              </div> */}
            </div>
            <div className={tenantDescribe}>
              <div className={tenantName} title={company}>{company}</div>
              <div style={{'marginBottom':15}}>
                <div className={companyType}>{this.getCompanyType()}</div>
                <DropdownButton
                    getPopupContainer={() => document.getElementById("modalId")}
                    label="切换" dataItem={
                      allowTenants.map(({
                        tenantId: name,
                        tenantName: value,
                      }) => {
                        return {
                          name,
                          value,
                          fun: this.changeTenant,
                        };
                      })
                    } />
              </div>
            </div>
          </div>
          <div style={{position:"relative"}}>
            <ul className={`${teamBtnList} ${userBtnList} ${clearfix}`}>
              <li><Button shape="border" size="sm" onClick={this.gotoManage.bind(this)}>首页编辑</Button></li>
              <li><Button shape="border" size="sm" onClick={this.gotoManage.bind(this)}>团队设置</Button></li>
              <li><Button shape="border" size="sm" onClick={this.inviteMember.bind(this)}>邀请成员</Button></li>
            </ul>
            {requestDisplay ?<div style={{position:"absolute"}}>
            团队创建成功！快点邀请成员一起好好工作吧！
            </div> : null }
            
          </div>
        </div>
        <div>
            <ul className={`${createBtnList} ${clearfix}`}>
              <li><Button shape="border" size="sm" onClick={this.gotoCreateTeam}>创建团队</Button></li>
              <li><Button shape="border" size="sm" onClick={this.gotoCreateEnter}>创建企业</Button></li>
            </ul>
          </div>
        <div className={"um-content" + ` ${tabContent}`}>

          <Tabs
            defaultActiveKey="1"
            onChange={this.callback}
            className="demo-tabs"
          >
            <TabPane tab='最近使用' key="1" className={tabPane1}>
              <ul className={recently}>
                {_li}
              </ul>
              {this.state.dataList.length != 0 ?<Button onClick={this.handleClick}>清空列表</Button>:<Button>没有数据!</Button>}
            </TabPane>
            <TabPane tab='推广服务' key="2" className={tabPane2}>
              <ul className={`${promotion} ${clearfix}`}>
                {lis}
              </ul>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default UserInfoContainer;
