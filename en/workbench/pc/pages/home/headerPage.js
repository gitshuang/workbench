import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

/*   actions   */
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import teamconfigActions from 'store/root/teamconfig/actions';

import Icon from 'pub-comp/icon';
import Header from 'containers/header';

import Navbar from 'components/scrollNav';
import DropdownButton from 'components/dropdown';
import Personals from './personal';
import { header, allBtn, btnDisable } from './style.css';


const {
  changeUserInfoDisplay,
  hideUserInfoDisplay, getUserInfo,
  changeRequestDisplay,
  getSearchEnterOrTeam,
  getWorkList,
  setCutUser,
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
  setCurrent,
} = rootActions;

const { openExitModal } = teamconfigActions;

@withRouter
@connect(
  mapStateToProps(
    'searchEnterOrTeamList',
    'userInfoDisplay',
    'userInfo',
    {
      namespace: 'home',
    },
  ),
  {
    getSearchEnterOrTeam,
    changeUserInfoDisplay,
    hideUserInfoDisplay,
    changeRequestDisplay,
    getUserInfo,
    requestStart,
    requestSuccess,
    requestError,
    getWorkList,
    setCutUser,
    openExitModal,
    setCurrent,
  },
)
class HeaderPage extends Component {
  static propTypes = {
    getSearchEnterOrTeam: PropTypes.func,
    changeUserInfoDisplay: PropTypes.func,
    hideUserInfoDisplay: PropTypes.func,
    changeRequestDisplay: PropTypes.func,
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
      allBtn: false, // englishtab
      btnShow: false,
      allowTenants: [],
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
  // setCutUserFn = () => {
  //   const { setCutUser, getWorkList } = this.props;
  //   setCutUser().then(({ error, payload }) => {
  //     if (error) {
  //       requestError(payload);
  //     } else {
  //       getWorkList().then(({ error, payload }) => {
  //         if (error) {
  //           requestError(payload);
  //         }
  //       });
  //     }
  //     requestSuccess();
  //   });
  // }

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
  changeLanguage = () => {
    const cookieVal = document.cookie;
    const langIndex = cookieVal.indexOf('langType=');
    if (langIndex === -1) { // englishtransfer
      document.cookie = 'langType="en"';
      this.props.setCurrent('en_US');
      window.location.reload();
      alert('now lang is Chinese,change to english');
    }
    const langVal = cookieVal.substring(langIndex + 10, langIndex + 12);
    if (langVal === 'en') {
      document.cookie = 'langType="cn"';
      this.props.setCurrent('zh_CN');
      window.location.reload();
      alert('now lang is en,change to chinese');
    } else if (langVal === 'cn') {
      document.cookie = 'langType="en"';
      alert('now lang is Chinese,change to english');
      this.props.setCurrent('en_US');
      window.location.reload();
    }
  }
  render() {
    const {
      list,
      headerData,
    } = this.props;

    const background = headerData && headerData.background && JSON.parse(headerData.background);
    const titleContent = headerData && headerData.title;
    const titleStyle = headerData && headerData.titleStyle && JSON.parse(headerData.titleStyle);
    const color = headerData && headerData.color;

    const personal = <Personals />;
    const BtnShow = this.state.btnShow ? null : btnDisable;

    return (
      <div className={`${header}`} style={background} id="home_header">
        <div className="panel_web" onClick={this.changeLanguage} style={{cursor:'pointer'}}>
            changelanguage
        </div>
        <Header
          onLeftTitleClick={this.onLeftTitleClick}
          leftContent={this.getLeftContent()}
          iconName={personal}
          color={color}
        >
          <span style={titleStyle}>{titleContent || 'homepage'}</span>
        </Header>
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
          {this.state.allBtn ? 'fold,showAll' : 'fold,showAll'}
          <Icon type={this.state.allBtn ? 'upward' : 'pull-down'} />
        </div>
      </div>
    );
  }
}
export default HeaderPage;
