import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

// 公共组件
import Icon from 'pub-comp/icon';
/*   actions   */
import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';

// 业务组件
import DropdownButton from '../dropdown';
//import Menu from './menu';
import Tabmenu from './tabs';
import Header from '../header';
import Im from '../im';
import logoUrl from 'assets/image/logo2.svg';

import { create, menu, menus, history, home, active, upward, im } from './style.css';


const { openRoot, changeRetract } = wrapActions;
const {
  requestStart,
  requestSuccess,
  requestError,
} = rootActions;


@withRouter
@connect(
  mapStateToProps(
    'activeCarrier',
    'retract',
    {
      key: 'userInfo',
      value: (wrap, ownProps, root) => {
        return root.userInfo
      }
    },
    {
      namespace: 'wrap',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    openRoot,
    changeRetract,
  },
)
class Homeheader extends Component {
  static propTypes = {
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
    // 判断是否localstorage中包含这个值
    if (localStorage.getItem('create')) {
      localStorage.removeItem('create');
    }
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
            fun: this.handleClickFn,
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

  handleClickFn = (tenantId) => {
    dispatchMessageTypeHandler({
      type: "showDialog",
      detail: {
        type: 'warning',
        title: '提示',
        msg: "点击确定后即将刷新页面，是否继续？",
        btn: [
          {
            label: "确定",
            fun: () => {
              dispatchMessageTypeHandler({
                type: "closeDialogNew",
              });
              this.changeTenant(tenantId);
            },
          },
          {
            label: "取消",
            fun: () => {
              dispatchMessageTypeHandler({
                type: "closeDialogNew",
              });
            },
          }
        ]
      }
    });
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

  changeHistory = () => {
    this.props.openHistory();
  }

  changeRetract = () => {
    const { retract, changeRetract } = this.props;
    changeRetract(retract);
  }


  render() {
    const { openRoot, activeCarrier, retract, style, openMenu } = this.props;
    const title = <a href=""><img alt="" src={logoUrl} style={{ marginTop: '8px', width: '145px' }} /></a>;
    return (
      <div className="header" id="home_header" style={style}>
        <Header
          onLeftTitleClick={this.onLeftTitleClick}
          leftContent={this.getLeftContent()}
          iconName={retract ? <Icon type='master' className="ignoreClass" onClick={openMenu} /> : "master"}
        >
          <span>{title || '首页'}</span>
        </Header>
        <div className={menus}>
          {
            retract ? null : <div className={`${menu} um-box-center`}><Icon type='master' className="ignoreClass" onClick={openMenu} /></div>
          }
          <div
            className={`${history} um-box-center`}
            onClick={() => { this.changeHistory() }}
          >
            <Icon type="record" />
          </div>
          <div
            className={`${home} tc ${activeCarrier === "home" ? active : ''}`}
            onClick={() => { openRoot() }}
          >
            <Icon type="home" />
          </div>
          <Tabmenu />
          {
            retract ? null : <Im classname={im} />
          }
          <div className={`${upward} tc`} onClick={this.changeRetract}>
            <Icon type={retract ? "upward" : "pull-down"} />
          </div>
        </div>
      </div>
    );
  }
}
export default Homeheader;
