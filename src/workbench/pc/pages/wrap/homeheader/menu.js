import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import MenuBarInner from './menuInner';
import Icon from 'pub-comp/icon';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';

import {sideBarPanel,sideBarTitle} from './style.css'
class MenuBar extends Component {
  static propTypes = {
    allMenuList: PropTypes.arrayOf(PropTypes.object),
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getAllMenuList: PropTypes.func,
  };
  static defaultProps = {
    allMenuList: [],
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getAllMenuList: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      menuShow: false,
    }
   
  }

  componentDidMount() {
   
  }
  // 点击菜单外面可以关闭
  handleClickOutside() {
    this.setState({
      menuShow: false,
    })
  }

  menuShow = () => {
    this.setState({
      menuShow: !this.state.menuShow
    })
  }

  render() {
    let { menuShow} = this.state;
    return (
      <div>
        <Icon type='master' className="ignoreClass" onClick={this.menuShow} />
        <TransitionGroup>
          <CSSTransitionGroup
            transitionName={{
              enter: 'animated',
              enterActive: `fadeInLeft`,
              leave: 'animated',
              leaveActive: `fadeOutLeft`,
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {
              menuShow?(
                <div className={sideBarPanel}>
                  <span className={sideBarTitle}>导航菜单</span>
                  <MenuBarInner outsideClickIgnoreClass={'ignoreClass'} menuShow={this.menuShow}/>
                </div>
              ):null
            }
          </CSSTransitionGroup>
        </TransitionGroup>
      </div>
    );
  }
}
export default MenuBar;

