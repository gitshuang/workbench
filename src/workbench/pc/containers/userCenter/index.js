import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import { wrap, outerContainer, active, imgUser,imgOuter, imgInner, userInfo, loginOut, tabContent, wrapBtn,userName,gloryValue,packetsValue,gloryKey,packetsKey,clearfix,userBtnList,serviceImg,serviceName,promotion,
  used,usedModule,usedTit,lastTime,usedService,tabPane1,tabPane2,module,editPortrait,gloryIcon,select,selectTit,options,recently,
  iconContainer,usedIcon,icon1,icon2,icon3
} from './style.css';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';

import Button from 'bee-button';
import Select from 'bee-select';
import Tabs, { TabPane } from 'bee-tabs';
import Icon from 'components/icon';
import onClickOutside from 'react-onclickoutside';
import img1 from 'assets/image/wgt/yonyouSpace.png';
import img2 from 'assets/image/wgt/intelligent_logo.png';
import img3 from 'assets/image/wgt/goldInstitute.png';
import img4 from 'assets/image/wgt/salary_logo.png';
import img5 from 'assets/image/wgt/relation.png';

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
} = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'userInfoDisplay',
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
    setCutUser
  }
)
@onClickOutside
class UserInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      dataList:[
        {"id":"1001","name":"结算中心","icon":"loan","usedService":"核算服务","lastTime":"1分钟前"},
        {"id":"1001","name":"新增凭证","icon":"bill","usedService":"报账服务","lastTime":"30分钟前"}
      ],
      promotionList:[
        {"src":img1,"promotion_tit":"友空间"},
        {"src":img2,"promotion_tit":"智能服务"},
        {"src":img3,"promotion_tit":"友金所"},
        {"src":img4,"promotion_tit":"新福社"},
        {"src":img5,"promotion_tit":"相关服务"}
      ]
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

  handleClickOutside(e) {
    //在面板中操作不要关闭面板
    if(event.target.getAttribute("class") == "u-select-dropdown-menu-item-active u-select-dropdown-menu-item"){
      return;
    }
    const { hideUserInfoDisplay, userInfoDisplay } = this.props;
    if(userInfoDisplay){
      hideUserInfoDisplay();
    }
  }
  componentWillMount() {
    const { userInfo: { name }, getUserInfo } = this.props;
    if (!name) {
      requestStart();
      getUserInfo().then(({ error, payload }) => {
        if (error) {
          requestError(payload);
        } else {
          requestSuccess();
        }
      });
    }
  }

  // componentWillUnmount() {
  //   hideUserInfoDisplay();
  // }

  handleClick() {
      this.setState({
        dataList:[]
      })
  }
  setCutUserFn =() => {
    const {setCutUser,getWorkList} = this.props;
    setCutUser().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      getWorkList().then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        debugger;
        requestSuccess();
      });
    });
  }

  handleChange=(e)=>{
    switch(e){
      case 'account' :
        alert("账号");
        break;
      case 'language' :
        alert("界面语言");
        break;
      case 'message' :
        alert("消息");
        break;
      case 'cancel' :
        window.location.href = `/workbench/logout?SAMLRequest=true&service=${encodeURIComponent(`${window.location.origin}/workbench/`)}`;
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
      case 'cutuser' :
        this.setCutUserFn();
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
  render() {
    const {
      userInfo: {
        userName: name,
        userAvator: imgsrc,
        gloriesNum: glory,
        redPacketsNum: redPackets,
        allowTenants,
        admin
      }
    } = this.props;
    let renderAllow = null;
    if(admin){
      renderAllow =
        <Select
          defaultValue="账号管理" name="456"
          onChange={this.handleChange2}
        >
          <Option name="accountManagement" value="accountManagement" >帐号管理</Option>
          <Option name="userInfo" value="userInfo" >个人信息</Option>
          <Option name="safetyPick" value="safetyPick" >安全评级</Option>
          <Option name="password" value="password" >修改密码</Option>
          <Option name="cutuser" value="cutuser">切换企业帐号</Option>
        </Select>
    }else{
      renderAllow = <Select
        defaultValue="账号管理" name="456"
        onChange={this.handleChange2}
      >
        <Option name="safetyPick" value="safetyPick" >安全评级</Option>
        <Option name="password" value="password" >修改密码</Option>
      </Select>
    }

    let _li = [];//最近使用列表
    this.state.dataList.forEach((da,i)=>{
        _li.push(<li key={i}>
          <div className={usedIcon}><Icon type={da.icon}></Icon></div>
          <div className={`${used} ${clearfix}`}>
            <div className={`${usedModule} ${clearfix}`}>
              <div className={`${module} ${clearfix}`}>
                <div className={usedTit}>{da.name}</div>
                <div className={lastTime}>{da.lastTime}</div>
              </div>
              <div className={usedService}>{da.usedService}</div>
            </div>
          </div>
        </li>);
    })

    let lis = [];//推广服务列表
    this.state.promotionList.forEach((item,index)=>{
      lis.push(<li key={index}>
          <div className={serviceImg}>
            <section><img src={item.src}/></section>
            <div className={serviceName}>{item.promotion_tit}</div>
          </div>
        </li>);
    })

    return (
      <div className={`${wrap} ${clearfix}`} >
        <div>
          <div className={imgUser}>
            <div className={imgOuter}><img src={imgsrc} className={imgInner} /></div>
            <div className={editPortrait}>
              <Icon type="copyreader" onClick={this.handleClick.bind(this)}></Icon>
            </div>
          </div>
          <div className={userName}>{name}</div>
          <ul className={`${gloryIcon} ${clearfix}`}>
            <li>
              <div className={`${iconContainer} ${icon1}`}><Icon type="glory"></Icon></div>
              <span>荣耀</span>
            </li>
            <li>
              <div className={`${iconContainer} ${icon2}`}><Icon type="favorite"></Icon></div>
              <span>个人空间</span>
            </li>
            <li>
              <div className={`${iconContainer} ${icon3}`}><Icon type="Internet2"></Icon></div>
              <span>动态</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className={`${userBtnList} ${clearfix}`}>
            <li><Button shape="border" size="sm" onClick={this.gotoManage.bind(this)}>首页个性化</Button></li>
            <li>
              {renderAllow}
            </li>
            <li>
              <Select
                defaultValue="系统设置" name="123"
                onChange={this.handleChange}
              >
                <Option name="account"  value="account" >账号</Option>
                <Option name="language" value="language" >界面语言</Option>
                <Option name="message" value="message" >消息</Option>
                <Option name="cancel" value="cancel">注销</Option>
              </Select>
            </li>
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
