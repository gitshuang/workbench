import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import { wrap, outerContainer, active, imgUser, imgInner, userInfo, loginOut, tabContent, wrapBtn,userName,gloryValue,packetsValue,gloryKey,packetsKey,clearfix,userBtnList,serviceImg,serviceName,promotion,
  used,usedModule,usedTit,lastTime,usedService,tabPane1,tabPane2,module,editPortrait,gloryIcon,select,selectTit,options
} from './style.css';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';

import Button from 'bee-button';
import Select from 'bee-select';
import Tabs, { TabPane } from 'bee-tabs';
import Icon from 'components/icon';
import onClickOutside from 'react-onclickoutside';

import img from '../../assets/image/gloryIcon.png';
import img2 from '../../assets/image/gloryIcon2.png';

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
    alert("修改")
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
    // console.log(e);
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
        alert("注销");
        break;
      default : alert("undefined");
    }
  }
  handleChange2 =(e)=>{
    // console.log(e);
    switch(e){
      case 'account' :
        alert("账号");
        break;
      case 'safetyPick' :
        alert("安全评级");
        break;
      case 'password' :
        alert("password");
        break;
      case 'cutuser' :
        alert("切换企业帐号");
        this.setCutUserFn();
        break;
      default : alert("undefined");
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
      }
    } = this.props;
    let renderAllow = null;
    if(allowTenants && allowTenants.length){
      renderAllow =
        <Select
          defaultValue="账号管理" name="456"
          onChange={this.handleChange2}
        >
          <Option name="account"  value="account" >账号</Option>
          <Option name="safetyPick" value="safetyPick" >安全评级</Option>
          <Option name="password" value="password" >修改密码</Option>
          <Option name="cutuser" value="cutuser">切换企业帐号</Option>
        </Select>
    }else{
      renderAllow = <Select
        defaultValue="账号管理" name="456"
        onChange={this.handleChange2}
      >
        <Option name="account"  value="account" >账号</Option>
        <Option name="safetyPick" value="safetyPick" >安全评级</Option>
        <Option name="password" value="password" >修改密码</Option>
      </Select>
    }
    return (
      <div  className={`${wrap} ${clearfix}`}>
        <div className={imgUser}>
          <img src={imgsrc} className={imgInner} />
          <div className={editPortrait}>
            <Icon type="copyreader" onClick={this.handleClick.bind(this)}></Icon>
          </div>
        </div>
        <div className={userInfo}>
          <ul className={clearfix}>
            <li>
              <div className={gloryValue}>{glory}</div>
              <div className={gloryKey}>荣耀</div>
            </li>
            <li>
              <div className={packetsValue}>{redPackets}</div>
              <div className={packetsKey}>红包</div>
            </li>
          </ul>
        </div>
        <div className={userName}>{name}</div>
        <div className={gloryIcon}>
          <img src={img} style={{marginLeft : 144}}/>
          <img src={img2}/>
        </div>
        <div>
          <ul className={`${userBtnList} ${clearfix}`}>
            <li><Button shape="border" size="sm" onClick={this.gotoManage.bind(this)}>桌面管理</Button></li>
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
              <ul>
                <li>
                  <Icon type="loan"></Icon>
                  <div className={`${used} ${clearfix}`}>
                    <div className={`${usedModule} ${clearfix}`}>
                      <div className={`${module} ${clearfix}`}>
                        <div className={usedTit}>结算中心</div>
                        <div className={lastTime}>1分钟前</div>
                      </div>
                      <div className={usedService}>核算服务</div>
                    </div>
                  </div>
                </li>
                <li>
                  <Icon type="bill"></Icon>
                  <div className={`${used} ${clearfix}`}>
                    <div className={`${usedModule} ${clearfix}`}>
                      <div className={`${module} ${clearfix}`}>
                        <div className={usedTit}>新增凭证</div>
                        <div className={lastTime}>30分钟前</div>
                      </div>
                      <div className={usedService}>报账服务</div>
                    </div>
                  </div>
                </li>
              </ul>
            </TabPane>
            <TabPane tab='推广服务' key="2" className={tabPane2}>
              <ul className={`${promotion} ${clearfix}`}>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>友空间</div>
                  </div>
                </li>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>智能服务</div>
                  </div>
                </li>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>相关服务</div>
                  </div>
                </li>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>相关服务</div>
                  </div>
                </li>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>相关服务</div>
                  </div>
                </li>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>相关服务</div>
                  </div>
                </li>
              </ul>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default UserInfoContainer;
