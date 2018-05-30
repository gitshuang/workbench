import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import Icon from 'pub-comp/icon';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';
import { getStrLenSubstr, logout, getHost } from '@u';
import Button from 'bee/button';
import EnterOption from 'containers/enterOption';
import Tabs, { TabPane } from 'bee/tabs';
import onClickOutside from 'react-onclickoutside';
import img1 from 'assets/image/wgt/yonyouSpace1.png';
import img2 from 'assets/image/wgt/intelligent_logo.png';

import {
  wrap, outerContainer, active, imgUser, imgOuter, imgInner, userInfo, loginOut, tabContent, wrapBtn, userName, gloryValue, packetsValue, gloryKey, packetsKey, clearfix, userBtnList, serviceImg, serviceName, promotion,
  used, usedModule, usedTit, lastTime, usedService, tabPane1, tabPane2, module, editPortrait, gloryIcon, select, selectTit, options, recently,
  iconContainer, usedIcon, icon1, icon2, icon3, defaultPic, logOut, line_end, tenantArea, tenantPortrait, tenantName, tenantDescribe, companyType, teamBtnList, createBtnList, userSetting, userInfoPane,
  popconfirm, popconfirm_content,
  createBtn, select_li, new_name, hiden, show, linkSetting,
  enter_setting
} from './style.css';

const {
  // getUserInfo,
  hideUserInfoDisplay,
  getWorkList,
  setCutUser,
  closeRequestDisplay,
  getSearchEnterOrTeam
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
  getLatestAccessList,
  getPromotionServiceList
} = rootActions;

const {
  openExitModal,
} = teamconfigActions;

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'userInfoDisplay',
    'requestDisplay',
    'latestAccessList',
    'promotionServiceList',
    'searchEnterOrTeamList',
    {
      key: 'exitModal',
      value: (home, ownProps, root) => {
        return root.teamconfig.exitModal
      }
    },
    {
      namespace: 'home',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    hideUserInfoDisplay,
    getSearchEnterOrTeam,
    // getUserInfo,
    getWorkList,
    setCutUser,
    getLatestAccessList,
    getPromotionServiceList,
    closeRequestDisplay,
    // openExitModal
  }
)
@onClickOutside
class UserInfoContainer extends Component {
  constructor(props) {
    super(props);

    this._curTenant = null;
    this.state = {
      dataList: [],
      promotionList: [],
      allowTenants: []
    }
  }
  static propTypes = {
    userInfo: PropTypes.object,
    // getUserInfo: PropTypes.func,
    hideUserInfoDisplay: PropTypes.func,
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
  }

  componentWillMount() {
    const { getSearchEnterOrTeam, requestError, requestSuccess } = this.props;
    getSearchEnterOrTeam().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      this.setState({
        allowTenants: payload
      })
      requestSuccess();
    });
  }

  getLatestAccessList() {
    const { requestStart, requestSuccess, requestError, getLatestAccessList } = this.props;
    requestStart();
    getLatestAccessList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      this.setState({
        dataList: payload
      })
      requestSuccess();
    });
  }
  getPromotionServiceList() {
    const { requestStart, requestSuccess, requestError, getPromotionServiceList } = this.props;
    requestStart();
    getPromotionServiceList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      this.setState({
        promotionList: payload
      })
      requestSuccess();
    });
  }
  handleClickOutside(e) {
    const { hideUserInfoDisplay, userInfoDisplay, exitModal } = this.props;
    if (exitModal) {
      return;
    }
    if (userInfoDisplay) {
      hideUserInfoDisplay();
    }
  }
  editAvatar = () => {
    window.open('https://idtest.yyuap.com/usercenter/user');
  }
  handleClick = () => {
    this.setState({
      dataList: []
    })
  }
  setCutUserFn = () => {
    const { setCutUser, getWorkList } = this.props;
    setCutUser().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      } else {
        getWorkList().then(({ error, payload }) => {
          if (error) {
            requestError(payload);
          }
        });
      }
      requestSuccess();
    });
  }
  handleChange = (e) => {
    switch (e) {
      case 'language':
        alert("$i18n{index.js0}$i18n-end...");
        break;
      case 'message':
        alert("$i18n{index.js1}$i18n-end...");
        break;
      default:
        break;
    }
  }
  handleChange2 = (e) => {
    switch (e) {
      case 'accountManagement':
        window.open('https://idtest.yyuap.com/usercenter/usermng');
        break;
      case 'userInfo':
        window.open('https://idtest.yyuap.com/usercenter/user');
        break;
      case 'safetyPick':
        window.open('http://idtest.yyuap.com/usercenter/securityscore');
        break;
      case 'password':
        window.open('http://idtest.yyuap.com/usercenter/security');
        break;
      default:
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
  gotoConfig = (curTenant) => {
    if (curTenant && curTenant.type == 0) {//$i18n{index.js2}$i18n-end
      this.gotoEnter();
    } else {//$i18n{index.js3}$i18n-end
      this.gotoTeam();
    }
  }
  //设置团队
  gotoTeam = () => {
    const {
      history,
      hideUserInfoDisplay,
    } = this.props;
    history.push('/teamconfig');
    hideUserInfoDisplay();
  }
  //设置企业
  gotoEnter = () => {
    const {
      history,
      hideUserInfoDisplay,
    } = this.props;
    history.push('/entersetting/home');
    hideUserInfoDisplay();
  }

  gotoCreate = () => {
    const {
      history,
      hideUserInfoDisplay,
    } = this.props;
    history.push('/createenter/home');
    hideUserInfoDisplay();
  }
  accountManage() {
    const {
      history,
      hideUserInfoDisplay,
    } = this.props;
    history.push('/account');
    hideUserInfoDisplay();
  }

  gotoUserInfo = () => {
    const {
      history,
      hideUserInfoDisplay,
    } = this.props;
    history.push('/userinfo');
    hideUserInfoDisplay();
  }

  getUserOrder() {
    window.open('https://idtest.yyuap.com/usercenter/myapp');
  }

  getIcon = (imgsrc) => {
    if (imgsrc) {
      return (
        <img src={imgsrc} className={imgInner} />
      );
    } else {
      return (
        <div className={defaultPic} style={{ background: this.props.bgColor }}>
          <Icon type="group" />
        </div>
      );
    }
  }

  getIcon1(imgsrc) {
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

  getCompanyType() {
    const { tenantid } = window.diworkContext();
    const {
      userInfo: {
        allowTenants,
      },
    } = this.props;
    const curTenant = allowTenants.filter((tenant) => {
      return tenant.tenantId === tenantid;
    })[0];
    let type = '$i18n{index.js4}$i18n-end';
    if (curTenant && curTenant.type == 0) {
      type = '$i18n{index.js5}$i18n-end';
    }
    this._curTenant = curTenant;
    return type;
  }
  /* 邀请成员 */
  inviteMember() {
    const {
      history,
      hideUserInfoDisplay,
    } = this.props;
    history.push('/invitation');
    hideUserInfoDisplay();
  }

  // changeTenant(tenantId){
  //   const {
  //     location: {
  //       origin,
  //       pathname,
  //       hash,
  //     },
  //   } = window;
  //   window.location.replace(
  //     `${origin?origin:''}${pathname?pathname:''}?tenantId=${tenantId}&switch=true${hash}`,
  //   );
  // }

  // 关闭创建成功后的弹窗[以后再说tip的关闭]
  closeRequest = () => {
    const { closeRequestDisplay } = this.props;
    closeRequestDisplay();
  }

  gotoCreateEnter = () => {
    const {
      history,
    } = this.props;
    history.push('/establishusercenter');
  }

  // exitOnclick=()=>{
  //   const { openExitModal } = this.props;
  //   openExitModal();
  // }

  render() {
    const {
      userInfo: {
        userName: name,
        userAvator: imgsrc,
        gloriesNum: glory,
        redPacketsNum: redPackets,
        admin,
        logo,
        company,
        currentTeamConfig
      },
      requestDisplay,
      exitModal
    } = this.props;
    let allowExit = null;
    let invitePermission = null;
    if (currentTeamConfig) {
      allowExit = currentTeamConfig.allowExit;
      invitePermission = currentTeamConfig.invitePermission;
    }
    const { allowTenants } = this.state;

    let _titleType = this.getCompanyType();

    let comObj = { id: "allowExit", name: "$i18n{index.js6}$i18n-end", value: "3", serverApi: "team/leave", msg: "$i18n{index.js7}$i18n-end" };
    if (_titleType == "$i18n{index.js8}$i18n-end") {
      comObj = { id: "allowExit", name: "$i18n{index.js9}$i18n-end", value: "3", serverApi: "enter/leave", msg: "$i18n{index.js10}$i18n-end" };
    }

    let _allowExit = null;
    if (allowExit && allowExit != "0") {
      _allowExit = (<EnterOption data={[comObj]} type={_titleType} compType="userCenter" />);
    };

    // <Option value="1">全员邀请 </Option>
    // <Option value="2">全员禁止</Option>
    // <Option value="0">仅管理员可邀请</Option>
    let _invitePermission = false;
    if (invitePermission && invitePermission == "0") {
      _invitePermission = admin;
    } else if (invitePermission && invitePermission == "1") {
      _invitePermission = true;
    }

    let _class = allowTenants.length <= 0 ? hiden : show;
    return (
      <div id="modalId" className={`${wrap} ${clearfix}`} >
        <div>
          <div className={logOut} onClick={logout}>
            <Icon type="exit" />
            <span>$i18n{index.js11}$i18n-end</span>
          </div>
          <div className={userInfoPane}>
            <div className={imgUser}>
              <div className={imgOuter}>
                {this.getIcon1(imgsrc)}
              </div>
              <div className={new_name} title={name}>{name}</div>
              <div className={userSetting} onClick={this.accountManage.bind(this)}>
                <Icon type="copyreader" />
              </div>
            </div>
            {/* <div>
             <div className={userName} title={name}>{getStrLenSubstr(name,20,20)}</div>
               <ul className={`${gloryIcon} ${clearfix}`}>
                <li>
                  <div className={`${iconContainer} ${icon1}`}><Icon title="$i18n{index.js12}$i18n-end" type="glory"></Icon></div>
                </li>
                <li>
                  <div className={`${iconContainer} ${icon3}`}><Icon title="$i18n{index.js13}$i18n-end" type="Internet2"></Icon></div>
                </li>
              </ul>
            </div>*/}
          </div>

          <div className={linkSetting}>
            <a href={`${getHost('org')}/download/download.html`} target="_blank" >$i18n{index.js14}$i18n-end</a><br />
            <a href="https://ticket.yonyoucloud.com/ticket/menu/router/myticket/KJ" target="_blank">$i18n{index.js15}$i18n-end</a><br />
            <a href={`${getHost('cloundyy')}`} target="_blank">$i18n{index.js16}$i18n-end</a>
          </div>

        </div>
        <div className={`${tenantArea} ${_class}`}>
          <div className={clearfix}>
            <div className={tenantPortrait}>
              <div className={imgOuter}>
                {this.getIcon(logo)}
              </div>
            </div>
            <div className={tenantDescribe}>
              <div className={tenantName} title={company}>{company}</div>
              <div style={{ 'marginBottom': 15 }}>
                <div className={companyType}>{_titleType}</div>
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <ul className={`${teamBtnList} ${userBtnList} ${clearfix}`}>
              <li><Button shape="border" onClick={this.gotoManage.bind(this)}>
                <Icon type="record" />$i18n{index.js17}$i18n-end</Button></li>

              {
                _titleType == "$i18n{index.js18}$i18n-end" ? (<li><Button shape="border" onClick={this.gotoUserInfo}>
                  <Icon type="role-management" />$i18n{index.js19}$i18n-end</Button></li>) : null
              }

              {
                _invitePermission ? (<li><Button shape="border" size="sm" onClick={this.inviteMember.bind(this)}>
                  <Icon type="add-friends" />
                  $i18n{index.js20}$i18n-end</Button></li>) : null
              }

              {admin ? null : _allowExit}

            </ul>
            {
              requestDisplay ?
                <div className={popconfirm} style={{ position: "absolute" }}>
                  <i className="arrow"></i>
                  <div className={popconfirm_content}>
                    <p>{_titleType}$i18n{index.js21}$i18n-end</p>
                    <p>$i18n{index.js22}$i18n-end</p>
                  </div>
                  <div onClick={this.closeRequest}>$i18n{index.js23}$i18n-end</div>
                </div>
                : null
            }

          </div>

          <div className={enter_setting} title={`${_titleType}$i18n{index.js24}$i18n-end`}>
            {/* <Icon type="setting" /> */}
            {
              admin ? (<Icon type="setting" title={`${_titleType}$i18n{index.js25}$i18n-end`} onClick={() => { this.gotoConfig(this._curTenant) }} />) : null
            }
          </div>

        </div>
      </div>
    );
  }
}

export default UserInfoContainer;
