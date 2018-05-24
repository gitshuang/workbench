import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import Icon from 'components/icon';
import Button from 'components/button';

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
    requestDisplay: PropTypes.bool,
    userInfoDisplay: PropTypes.bool,
    exitModal: PropTypes.bool,
    bgColor: PropTypes.string,
    closePersonalModal: PropTypes.func,
    skipRouter: PropTypes.func,
    logout: PropTypes.func,
    titleType: PropTypes.string,
    userInfo: PropTypes.shape({
      userName: PropTypes.string,
      userAvator: PropTypes.string,
      admin: PropTypes.bool,
      logo: PropTypes.string,
      company: PropTypes.string,
      currentTeamConfig: PropTypes.object,
      allowTenants: PropTypes.array,
    }),
    hrefs: PropTypes.arrayOf(PropTypes.object),
  };
  static defaultProps = {
    editType: true,
    requestDisplay: false,
    userInfoDisplay: false,
    exitModal: false,
    bgColor: 'RGBA(228, 97, 92, 1)',
    closePersonalModal: () => {},
    skipRouter: () => {},
    logout: () => {},
    titleType: '团队',
    userInfo: {},
    hrefs: [],
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  getIcon = (userAvator, type) => {
    const { bgColor } = this.props;
    if (userAvator) {
      return (
        <img alt={userAvator} src={userAvator} className={imgInner} />
      );
    }
    return (
      <div className={defaultPic} style={type ? { background: bgColor } : {}}>
        <Icon type={type ? 'group' : 'staff'} />
      </div>
    );
  }

  handleClickOutside() {
    const { closePersonalModal, userInfoDisplay, exitModal } = this.props;
    if (exitModal) {
      return;
    }
    if (userInfoDisplay) {
      closePersonalModal();
    }
  }

  gotoConfig = () => {
    const { titleType } = this.props;
    if (titleType === '企业') { // 企业
      this.skipRouter('/entersetting/home');
    } else { // 团队
      this.skipRouter('/teamconfig');
    }
  }

  skipRouter = (path) => {
    const { skipRouter } = this.props;
    skipRouter(path);
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
      hrefs,
      logout,
      editType,
      titleType,
    } = this.props;

    // 允许用户退出空间， 0:禁止;1:允许
    // 邀请权限  1全员允许/2全员禁止邀请0/只有管理员可邀请
    const { allowExit, invitePermission } = currentTeamConfig;

    let _invitePermission = false;
    if (invitePermission && invitePermission === '0') {
      _invitePermission = admin;
    } else if (invitePermission && invitePermission === '1') {
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
              <div className={userSetting} onClick={() => { this.skipRouter('/account'); }}>
                <Icon type="copyreader" />
              </div>
            </div>
          </div>
        </div>
        <div className={`${tenantArea} ${_class}`}>
          <div className={clearfix}>
            <div className={tenantPortrait}>
              <div className={imgOuter}>
                {this.getIcon(logo, true)}
              </div>
            </div>
            <div className={tenantDescribe}>
              <div className={tenantName} title={company}>{company}</div>
              <div style={{ marginBottom: 15 }}>
                <div className={companyType}>{titleType}</div>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <ul className={`${teamBtnList} ${userBtnList} ${clearfix}`}>
              {
                editType ?
                  <li>
                    <Button shape="border" onClick={() => { this.skipRouter('/manage'); }}>
                      <Icon type="record" />首页编辑
                    </Button>
                  </li>
                : null
              }
              {
                titleType == '企业' ?
                  <li>
                    <Button shape="border" onClick={() => { this.skipRouter('/userinfo'); }}>
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
              {
                admin || allowExit === '0' ? null :
                <li>
                  <Button shape="border" onClick={this.props.openExitModal} >
                    <Icon type="staff" />{`退出${titleType}`}
                  </Button>
                </li>
              }
            </ul>
            {
              requestDisplay ?
                <div className={popconfirm} style={{ position: 'absolute' }}>
                  <i className="arrow" />
                  <div className={popconfirm_content}>
                    <p>{titleType}创建成功！</p>
                    <p>快点邀请成员一起好好工作吧！</p>
                  </div>
                  <div onClick={this.props.closeRequestDisplay}>我知道了</div>
                </div>
              : null
            }
          </div>

          <div className={enter_setting} title={`${titleType}设置`}>
            {
              admin ? (<Icon type="setting" title={`${titleType}设置`} onClick={() => { this.gotoConfig(); }} />) : null
            }
          </div>

        </div>
        <div className={linkSetting}>
          <Href hrefs={hrefs} />
        </div>
      </div>
    );
  }
}

export default Userinfo;
