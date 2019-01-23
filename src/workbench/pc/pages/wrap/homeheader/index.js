import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import { mapStateToProps } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

// 公共组件
import Icon from 'pub-comp/icon';

// 业务组件
import DropdownButton from './dropdown';
import Header from './header';
import Navs from './navs';
import logoUrl from 'assets/image/logo3.svg';
import menuImg from 'assets/image/menu.svg';

import { create } from './style.css';

/*   actions   */
import wrapActions from 'store/root/wrap/actions';
const { openRoot, changeRetract } = wrapActions;


@connect(
  mapStateToProps(
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
    openRoot,
    changeRetract,
  },
)
class Homeheader extends Component {
  static propTypes = {
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      company: PropTypes.string,
      userAvator: PropTypes.string,
    }),
    openMenu: PropTypes.func,
    openHistory: PropTypes.func,
  };
  static defaultProps = {
    userInfo: {},
    openMenu: () => { },
    openHistory: () => { },

  };
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    // 判断是否localstorage中包含这个值
    if (localStorage.getItem('create')) {
      localStorage.removeItem('create');
    }
  }

  componentDidMount() {

  }

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

  render() {
    const { retract, style, openMenu, openHistory } = this.props;
    const title = <a href=""><img alt="" src={logoUrl} style={{ marginTop: '8px', width: '90px' }} /></a>;
    return (
      <div className="header" id="home_header" style={style}>
        <CSSTransitionGroup
          transitionName={{
            enter: 'animated',
            enterActive: `fadeIn`,
            leave: 'animated',
            leaveActive: `fadeOut`,
          }}
          transitionEnterTimeout={120}
          transitionLeaveTimeout={100}
        >
          {
            retract
              ?
              <Header
                leftContent={this.getLeftContent()}
                iconName={<img src={menuImg} className="ignoreClass" onClick={openMenu} />}
              >
                <span>{title || '首页'}</span>
              </Header>
              : null
          }
        </CSSTransitionGroup>

        <Navs openMenu={openMenu} openHistory={openHistory} />
      </div>
    );
  }
}
export default Homeheader;
