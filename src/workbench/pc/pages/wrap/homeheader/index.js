import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

// 公共组件
import Icon from 'pub-comp/icon';
/*   actions   */
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

// 业务组件
import DropdownButton from '../dropdown';
import Menu from './menu';
import Tabmenu from './tabs';
import Header from '../header';
import { menus, create } from './style.css';
import logoUrl from 'assets/image/logo2.svg';


const {
  changeRequestDisplay,
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
  openRoot,
} = rootActions;


@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'activeCarrier',
  ),
  {
    changeRequestDisplay,
    requestStart,
    requestSuccess,
    requestError,
    openRoot,
  },
)
class Homeheader extends Component {
  static propTypes = {
    changeRequestDisplay: PropTypes.func,
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      company: PropTypes.string,
      userAvator: PropTypes.string,
    }),
  };
  static defaultProps = {
    changeRequestDisplay: () => { },
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    userInfo: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      allBtn: false, // 默认显示一行tab
      btnShow: false,
    };
  }

  componentWillMount() { }

  componentDidMount() {
    const { changeRequestDisplay } = this.props;
    // 判断是否localstorage中包含这个值
    if (localStorage.getItem('create')) {
      changeRequestDisplay();
      localStorage.removeItem('create');
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.userInfo !== nextProps.userInfo) {
    //   this.setState({
    //     allowTenants: nextProps.userInfo.allowTenants,
    //   });
    // }
  }

  onLeftTitleClick = () => { }

  enterOnclick = () => {
    const {
      history,
    } = this.props;
    history.push('/establishusercenter');
  }

  getLeftContent() {
    const {
      userInfo: {
        company,
        allowTenants,
        currentTeamConfig,
      },
    } = this.props;
    const tenantId = currentTeamConfig && currentTeamConfig.tenantId;
    const dom = allowTenants && allowTenants.length
      ?
      <DropdownButton
        getPopupContainer={() => document.getElementById('home_header')}
        label={company}
        tenantId={tenantId}
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
      />
      :
      <div className={create} onClick={this.enterOnclick}>
        <Icon type="add" />
        创建团队 \ 企业
      </div>
    return dom;
  }

  changeTenant = (tenantId) => {
    const {
      location: {
        origin,
        pathname,
        hash,
      },
    } = window;
    const locationUrl = `${origin}${pathname}?tenantId=${tenantId}&switch=true${hash}`;
    window.location.replace(locationUrl);
  }

  // 点击下拉
  allBtnOnclick = () => {
    this.setState({
      allBtn: !this.state.allBtn,
    });
  }

  btnShowFn = (btnShow) => {
    this.setState({
      btnShow,
    });
  }

  changeRouter = () => {

  }


  render() {
    const { openRoot, activeCarrier } = this.props;
    const menu = <Icon type='master' />;
    const title = <a href=""><img alt="" src={logoUrl} style={{ marginTop: '8px', width: '145px' }} /></a>;
    return (
      <div className="header" id="home_header">
        <Header
          onLeftTitleClick={this.onLeftTitleClick}
          leftContent={this.getLeftContent()}
          iconName={menu}
        >
          <span>{title || '首页'}</span>
        </Header>
        <div className={menus}>
          <div
            style={{ width: '50px', textAlign: "center", lineHeight: '40px' }}
            onClick={() => { this.changeRouter() }}
          >
            <Icon type="record" />
          </div>
          <div
            onClick={() => { openRoot() }}
            style={{ background: activeCarrier === "home" ? 'red' : 'none', width: '50px', textAlign: "center", lineHeight: '40px' }}
          >
            <Icon type="home" />
          </div>
          <Tabmenu />
        </div>
      </div>
    );
  }
}
export default Homeheader;
