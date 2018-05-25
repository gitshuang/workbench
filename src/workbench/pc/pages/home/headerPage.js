import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapStateToProps, getHost, logout } from '@u';

/*   actions   */
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import teamconfigActions from 'store/root/teamconfig/actions';

import Icon from 'pub-comp/icon';
import Header from 'containers/header';
import TeamExitModal from 'containers/teamExitModal';
import Navbar from 'components/scrollNav';
import DropdownButton from 'components/dropdown';
import Personal from 'components/personal';
import { header, allBtn, btnDisable } from './style.css';


const {
  changeUserInfoDisplay,
  hideUserInfoDisplay, getUserInfo, 
  changeRequestDisplay, closeRequestDisplay,
  getSearchEnterOrTeam,
  getWorkList,
  setCutUser,
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
} = rootActions;

const { openExitModal } = teamconfigActions;

@withRouter
@connect(
  mapStateToProps(
    'searchEnterOrTeamList',
    'userInfoDisplay',
    'userInfo',
    'requestDisplay',
    {
      key: 'exitModal',
      value: (home, ownProps, root) => root.teamconfig.exitModal,
    },
    {
      namespace: 'home',
    },
  ),
  {
    getSearchEnterOrTeam,
    changeUserInfoDisplay,
    hideUserInfoDisplay,
    changeRequestDisplay,
    closeRequestDisplay,
    getUserInfo,
    requestStart,
    requestSuccess,
    requestError,
    getWorkList,
    setCutUser,
    openExitModal,
  },
)
class HeaderPage extends Component {
  static propTypes = {
    getSearchEnterOrTeam: PropTypes.func,
    changeUserInfoDisplay: PropTypes.func,
    hideUserInfoDisplay: PropTypes.func,
    changeRequestDisplay: PropTypes.func,
    closeRequestDisplay: PropTypes.func,
    getUserInfo: PropTypes.func,
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    searchEnterOrTeamList: PropTypes.arrayOf(PropTypes.object),
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      company: PropTypes.string,
      userAvator: PropTypes.string,
    }),
    userInfoDisplay: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
    headerData: PropTypes.shape({
      background: PropTypes.string,
      title: PropTypes.string,
      titleStyle: PropTypes.string,
      color: PropTypes.string,
    }),
  };
  static defaultProps = {
    getSearchEnterOrTeam: () => {},
    changeUserInfoDisplay: () => {},
    hideUserInfoDisplay: () => {},
    changeRequestDisplay: () => {},
    closeRequestDisplay: () => {},
    getUserInfo: () => {},
    requestStart: () => {},
    requestSuccess: () => {},
    requestError: () => {},
    searchEnterOrTeamList: [],
    userInfo: {},
    userInfoDisplay: false,
    list: [],
    headerData: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      allBtn: false, // 默认显示一行tab
      btnShow: false,
      allowTenants: [],
      currType: null,
      TeamData: [
        {
          id: 'allowExit', name: '退出企业', value: '3', serverApi: 'enter/leave',
          msg: '退出后，您在当前企业下的应用将不能再使用，相应的数据也将被删除，请确认数据已备份',
        },
        {
          id: 'allowExit', name: '退出团队', value: '3', serverApi: 'team/leave',
          msg: '退出后，您在当前团队下的应用将不能再使用，相应的数据也将被删除，请确认数据已备份',
        }
      ],
      routers:{
        openEntersetting: '/entersetting/home',
        openTeamconfig: '/teamconfig',
        openAccount: '/account',
        openManage: '/manage',
        openUserinfo: '/userinfo',
        openInvitation: '/invitation',
      },
      hrefs: [
        {
          href:`${getHost('org')}/download/download.html`,
          name:"下载客户端"
        },
        {
          href:`https://ticket.yonyoucloud.com/ticket/menu/router/myticket/KJ`,
          name:"问题与反馈"
        },
        {
          href:`${getHost('cloundyy')}`,
          name:"用友云官网"
        },
      ]
    };
  }

  componentWillMount() {
    this.getUserInfo();
  }

  componentDidMount() {
    const { changeUserInfoDisplay, changeRequestDisplay } = this.props;
    // 判断是否localstorage中包含这个值
    if (localStorage.getItem('create')) {
      changeUserInfoDisplay();
      changeRequestDisplay();
      localStorage.removeItem('create');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchEnterOrTeamList !== nextProps.searchEnterOrTeamList) {
      this.setState({
        allowTenants: nextProps.searchEnterOrTeamList,
      });
    }
  }

  onLeftTitleClick=() => {}

  // 切换到企业管理账户 ，好像废弃了
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

  getUserInfo() {
    const {
      userInfo: { name }, getUserInfo, requestStart, requestSuccess, requestError,
    } = this.props;
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

  getLeftContent() {
    const {
      userInfo: {
        company,
      },
    } = this.props;
    const { allowTenants } = this.state;
    return (<DropdownButton
      getPopupContainer={() => document.getElementById('home_header')}
      openMenu={this.openMenu}
      closeFun={this.closeFun}
      label={company}
      type="home"
      dataItem={
      allowTenants.map(({
        tenantId: name,
        tenantName: value,
        team: type,
      }) => ({
          name,
          value,
          type,
          fun: this.changeTenant,
        }))
    }
    />);
  }

  changeTenant = (tenantId) => {
    const {
      location: {
        origin,
        pathname,
        hash,
      },
    } = window;
    window.location.replace(`${origin || ''}${pathname || ''}?tenantId=${tenantId}&switch=true${hash}`);
  }

  closeFun = () => {
    const {
      hideUserInfoDisplay,
      userInfoDisplay,
    } = this.props;
    if (userInfoDisplay) {
      hideUserInfoDisplay();
    }
  }

  openMenu = () => {
    const { getSearchEnterOrTeam } = this.props;
    getSearchEnterOrTeam();
  }


  allBtnOnclick=() => {
    this.setState({
      allBtn: !this.state.allBtn,
    });
  }

  btnShowFn = (btnShow) => {
    this.setState({
      btnShow,
    });
  }


  // 关闭创建完成的弹出层
  closeRequestDisplay = () => {
    const { closeRequestDisplay } = this.props;
    closeRequestDisplay();
  }

  openNewRouter = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  dispatch = (action) => {
    const { routers } = this.state;
    if(routers[action]){
      this.openNewRouter(routers[action]);
    }
  }

  openExitModal = () => {
    const { openExitModal } = this.props;
    openExitModal();
  }

  getCompanyType = () => {
    const { tenantid } = window.diworkContext();
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
    return name;
  }

  render() {
    const {
      changeUserInfoDisplay,
      hideUserInfoDisplay,
      userInfoDisplay,
      list,
      headerData,
      userInfo,
      requestDisplay,
      exitModal
    } = this.props;

    // let imgIcon = null;
    // let class2 = headerData && headerData.className;
    const background = headerData && headerData.background && JSON.parse(headerData.background);
    const titleContent = headerData && headerData.title;
    const titleStyle = headerData && headerData.titleStyle && JSON.parse(headerData.titleStyle);
    const color = headerData && headerData.color;
    // if (img) {
    //   imgIcon = <img alt="" src={img} className={imgInner} />;
    // } else {
    //   imgIcon = <Icon type="staff" />;
    // }
    const { tenantid } = window.diworkContext();
    const titleType = this.getCompanyType();
    const { TeamData, hrefs } = this.state;
    const CurrData = titleType == "企业" ? TeamData[0] : TeamData[1];
    const personal = <Personal 
      userInfo = {userInfo}
      requestDisplay = {requestDisplay}
      exitModal = {exitModal}
      closeRequestDisplay = {() => { this.closeRequestDisplay(); }}
      openExitModal = {this.openExitModal}
      dispatch = { this.dispatch }
      titleType = {titleType}
      hrefs = {hrefs}
      logout = {logout}
    />;
    const BtnShow = this.state.btnShow ? null : btnDisable;


    return (
      <div className={`${header}`} style={background} id="home_header">
        <Header
          onLeftTitleClick={this.onLeftTitleClick}
          leftContent={this.getLeftContent()}
          iconName={personal}
          color={color}
        >
          <span style={titleStyle}>{titleContent || '首页'}</span>
        </Header>
        {
          exitModal ? 
          <TeamExitModal 
            type={titleType} 
            data={CurrData} 
            isManage={userInfo.admin} 
            userId={userInfo.userId} 
            close={true} 
          /> : null
        }
        {
          list.length > 1 ? (
            <Navbar
              items={list}
              offset={-55}
              duration={500}
              delay={0}
              color={color}
              allBtn={this.state.allBtn}
              btnShowFn={this.btnShowFn}
            />
          ) : null
        }
        <div
          className={`${allBtn} ${BtnShow}`}
          onClick={this.allBtnOnclick}
          onKeyDown={this.allBtnOnclick}
          role="presentation"
        >
          {this.state.allBtn ? '收起' : '显示全部'}
          <Icon type={this.state.allBtn ? 'upward' : 'pull-down'} />
        </div>
      </div>
    );
  }
}
export default HeaderPage;
