import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import { connect } from 'react-redux';

import Button from 'pub-comp/button';
import Icon from 'pub-comp/icon';
import EnterOption from 'containers/enterOption';

import Href from './href';


import {
  wrap, imgUser, imgOuter, imgInner, clearfix, userBtnList,
  defaultPic, logOut, tenantArea, tenantPortrait, tenantName,
  tenantDescribe, companyType, teamBtnList, userSetting, userInfoPane,
  popconfirm, popconfirm_content, new_name, hiden, show, linkSetting, enter_setting,
} from './style.css';


@onClickOutside
class Userinfo extends Component {
  static propTypes = {
    editType: PropTypes.bool,
  };
  static defaultProps = {
    editType: true
  };
  constructor(props) {
    super(props);
    this.currType = null;
    this.state = {
     
    };
  }

  componentWillMount() {

  }

  handleClickOutside(e) {
    const { closePersonalModal, userInfoDisplay, exitModal } = this.props;
    if (exitModal) {
      return;
    }
    if (userInfoDisplay) {
      closePersonalModal();
    }
  }

  gotoConfig = () => {
    if (this.currType === 0) { // 企业
      this.skipRouter('/entersetting/home');
    } else { // 团队
      this.skipRouter('/teamconfig');
    }
  }

  skipRouter = (path) => {
    const { skipRouter } = this.props;
    skipRouter(path);
  }

  // 判断是企业还是团队
  getCompanyType = () => {
    const { tenantid } = this.props;
    const {
      userInfo: {
        allowTenants,
      },
    } = this.props;
    const curTenant = allowTenants.filter(tenant => tenant.tenantId === tenantid)[0];
    let name = '团队';
    if (curTenant && curTenant.type == 0) {
      name = '企业';
    }
    this.currType = curTenant && curTenant.type;
    return name;
  }

  getIcon = (userAvator,type) => {
    const { bgColor } = this.props;
    if (userAvator) {
      return (
        <img src={userAvator} className={imgInner} />
      );
    }
    return (
      <div className={defaultPic} style={type ? { background:bgColor } : {} }>
        <Icon type={type ? "group" : "staff"} />
      </div>
    );
  }

  render() {
    const {
      userInfo: {
        userName,
        userAvator,
        admin,
        logo,
        company,
        currentTeamConfig,
        allowTenants,
      },
      requestDisplay,
      skipRouter,
      hrefs,
      logout,
      editType,
    } = this.props;

    // 允许用户退出空间， 0:禁止;1:允许
    let allowExit = null;
    // 邀请权限  1全员允许/2全员禁止邀请0/只有管理员可邀请
    let invitePermission = null;
    if (currentTeamConfig) {
      allowExit = currentTeamConfig.allowExit;
      invitePermission = currentTeamConfig.invitePermission;
    }

    // 团队或者企业 
    const _titleType = this.getCompanyType();
    let comObj = null;
    if (_titleType === '企业') {
      comObj = {
        id: 'allowExit', name: '退出企业', value: '3', serverApi: 'enter/leave',
        msg: '退出后，您在当前企业下的应用将不能再使用，相应的数据也将被删除，请确认数据已备份',
      };
    }else{
      comObj = {
        id: 'allowExit', name: '退出团队', value: '3', serverApi: 'team/leave',
        msg: '退出后，您在当前团队下的应用将不能再使用，相应的数据也将被删除，请确认数据已备份',
      };
    }

    let _allowExit = null;
    if (allowExit && allowExit != '0') {
      _allowExit = <EnterOption data={[comObj]} type={_titleType} compType="userCenter" />;
    }
    debugger;
    let _invitePermission = false;
    if (invitePermission && invitePermission == '0') {
      _invitePermission = admin;
    } else if (invitePermission && invitePermission == '1') {
      _invitePermission = true;
    }

    const _class = allowTenants.length <= 0 ? hiden : show;
    return (
      <div id="modalId" className={`${wrap} ${clearfix}`} >
        <div>
          <div className={logOut} onClick={logout}>
            <Icon type="exit" />
            <span>注销</span>
          </div>
          <div className={userInfoPane}>
            <div className={imgUser}>
              <div className={imgOuter}>
                {this.getIcon(userAvator)}
              </div>
              <div className={new_name} title={userName}>{userName}</div>
              <div className={userSetting} onClick={() => { this.skipRouter('/account') }}>
                <Icon type="copyreader" />
              </div>
            </div>
          </div>
        </div>
        <div className={`${tenantArea} ${_class}`}>
          <div className={clearfix}>
            <div className={tenantPortrait}>
              <div className={imgOuter}>
                {this.getIcon(logo,true)}
              </div>
            </div>
            <div className={tenantDescribe}>
              <div className={tenantName} title={company}>{company}</div>
              <div style={{ marginBottom: 15 }}>
                <div className={companyType}>{_titleType}</div>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <ul className={`${teamBtnList} ${userBtnList} ${clearfix}`}>
              {
                editType ?
                <li>
                  <Button shape="border" onClick={() => { this.skipRouter('/manage') }}>
                    <Icon type="record" />首页编辑
                  </Button>
                </li>
                : null
              }
              {
                _titleType == '企业' ?
                <li>
                  <Button shape="border" onClick={() => { this.skipRouter('/userinfo') }}>
                    <Icon type="role-management" />员工信息
                  </Button>
                </li>
                : null
              }
              {
                _invitePermission ?
                <li>
                  <Button shape="border" size="sm" onClick={() => { this.skipRouter('/invitation'); }}>
                    <Icon type="add-friends" />邀请成员
                  </Button>
                </li>
                : null
              }
              {admin ? null : _allowExit}
            </ul>
            {
              requestDisplay ?
              <div className={popconfirm} style={{ position: 'absolute' }}>
                <i className="arrow" />
                <div className={popconfirm_content}>
                  <p>{_titleType}创建成功！</p>
                  <p>快点邀请成员一起好好工作吧！</p>
                </div>
                <div onClick={this.props.closeRequestDisplay}>我知道了</div>
              </div>
              : null
            }
          </div>

          <div className={enter_setting} title={`${_titleType}设置`}>
            {
              admin ? (<Icon type="setting" title={`${_titleType}设置`} onClick={() => { this.gotoConfig(); }} />) : null
            }
          </div>

        </div>
        <div className={linkSetting}>
          <Href hrefs = {hrefs} />
        </div>
      </div>
    );
  }
}

export default Userinfo;
