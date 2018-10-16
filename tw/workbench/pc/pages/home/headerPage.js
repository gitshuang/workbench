import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

/*   actions   */
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Icon from 'pub-comp/icon';
import Header from 'containers/header';
import Navbar from 'components/scrollNav';
import DropdownButton from 'components/dropdown';
import Personals from './personal';
import { allBtn, btnDisable, create } from './style.css';
import logoUrl from 'assets/image/logo2.svg';


const {
  changeRequestDisplay,
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
    {
      namespace: 'home',
    },
  ),
  {
    changeRequestDisplay,
    requestStart,
    requestSuccess,
    requestError,
  },
)
class HeaderPage extends Component {
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
    list: PropTypes.arrayOf(PropTypes.object),
  };
  static defaultProps = {
    changeRequestDisplay: () => { },
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    userInfo: {},
    list: [],
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
        openMenu={this.openMenu}
        closeFun={this.closeFun}
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
        創建團隊 \ 企業
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

  closeFun = () => { }

  openMenu = () => { }

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
  render() {
    const {
      list,
    } = this.props;

    const personal = <Personals />;
    const BtnShow = this.state.btnShow ? null : btnDisable;
    const title = <a href=""><img alt="" src={logoUrl} style={{ marginTop:'8px', width: '145px' }} /></a>;
    return (
      <div className="header" id="home_header">
        <Header
          onLeftTitleClick={this.onLeftTitleClick}
          leftContent={this.getLeftContent()}
          iconName={personal}
        >
          <span>{title || '首頁'}</span>
        </Header>
        {
          list.length >= 1 ? (
            <Navbar
              items={list}
              offset={-55}
              duration={500}
              delay={0}
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
          {this.state.allBtn ? '收起' : '顯示全部'}
          <Icon type={this.state.allBtn ? 'upward' : 'pull-down'} />
        </div>
      </div>
    );
  }
}
export default HeaderPage;
