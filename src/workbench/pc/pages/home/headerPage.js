import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

/*   actions   */
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import Icon from 'pub-comp/icon';
import Header from 'containers/header';
import Navbar from 'components/scrollNav';
import DropdownButton from 'components/dropdown';
import { header, imgInner, allBtn, btnDisable } from './style.css';


const {
  changeUserInfoDisplay,
  hideUserInfoDisplay, getUserInfo, changeRequestDisplay, getSearchEnterOrTeam,
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
} = rootActions;

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
    searchEnterOrTeamList: PropTypes.array,
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
      allBtn: false, // 默认显示一行tab
      btnShow: false,
      allowTenants: [],
    };
  }

  componentDidMount() {
    this.getUserInfo();
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

  openMenu=() => {
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


  render() {
    const {
      changeUserInfoDisplay,
      hideUserInfoDisplay,
      userInfoDisplay,
      list,
      headerData,
    } = this.props;

    const img = this.props.userInfo.userAvator;
    let imgIcon = null;
    // let class2 = headerData && headerData.className;
    const background = headerData && headerData.background && JSON.parse(headerData.background);
    const titleContent = headerData && headerData.title;
    const titleStyle = headerData && headerData.titleStyle && JSON.parse(headerData.titleStyle);
    const color = headerData && headerData.color;
    if (img) {
      imgIcon = <img alt="" src={img} className={imgInner} />;
    } else {
      imgIcon = <Icon type="staff" />;
    }
    const BtnShow = this.state.btnShow ? null : btnDisable;

    return (
      <div className={`${header}`} style={background} id="home_header">
        <Header
          onLeftClick={userInfoDisplay ? hideUserInfoDisplay : changeUserInfoDisplay}
          onLeftTitleClick={this.onLeftTitleClick}
          leftContent={this.getLeftContent()}
          iconName={imgIcon}
          color={color}
        >
          <span style={titleStyle}>{titleContent || '首页'}</span>
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
          {this.state.allBtn ? '收起' : '显示全部'}
          <Icon type={this.state.allBtn ? 'upward' : 'pull-down'} />
        </div>
      </div>
    );
  }
}
export default HeaderPage;
