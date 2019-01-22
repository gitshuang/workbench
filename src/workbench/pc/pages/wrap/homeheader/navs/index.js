import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

// 公共组件
import Icon from 'pub-comp/icon';
import Tabmenu from './tabs';
import Im from '../im';
import History from './history';
import { menus, menu, history, home, active, upward, im } from './style.css';

/*   actions   */
import wrapActions from 'store/root/wrap/actions';
const { openRoot, changeRetract } = wrapActions;

import menuImg from 'assets/image/menu2.svg';

@connect(
  mapStateToProps(
    'activeCarrier',
    'retract',
    {
      namespace: 'wrap',
    }
  ),
  {
    openRoot,
    changeRetract,
  },
)
class Navs extends Component {
  static propTypes = {
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    openMenu: PropTypes.func,
  };
  static defaultProps = {
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    openMenu: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      historyShow: false,
    };
  }


  openHistory = () => {
    this.setState({
      historyShow: !this.state.historyShow,
    });
  }

  changeRetract = () => {
    const { retract, changeRetract } = this.props;
    changeRetract(retract);
  }


  render() {
    const { openRoot, activeCarrier, retract, openMenu } = this.props;
    return (

      <div className={menus}>
        {
          retract 
          ? null 
          : <div className={`${menu} um-box-center`}>
              <img src={menuImg} className="ignoreClass" onClick={openMenu} />
            </div>
        }
        <div
          className={`${history} um-box-center`}
          onClick={() => { this.openHistory() }}
        >
          <Icon type="History" />
          <History
            historyShow={this.state.historyShow}
            openHistory={this.openHistory}
          >
          </History>
        </div>
        <div
          className={`${home} tc ${activeCarrier === "home" ? active : ''}`}
          onClick={() => { openRoot() }}
        >
          <Icon type="home-black" />
        </div>
        <Tabmenu />
        {
          retract ? null : <Im classname={im} />
        }
        <div className={`${upward} tc`} onClick={this.changeRetract}>
          <Icon type={retract ? "upward" : "pull-down"} />
        </div>
      </div>
    );
  }
}
export default Navs;
