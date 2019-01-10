import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import MenuBarInner from './menuInner';
import Icon from 'pub-comp/icon';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
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
                <MenuBarInner outsideClickIgnoreClass={'ignoreClass'} menuShow={this.menuShow}/>
              ):null
            }
          </CSSTransitionGroup>
        </TransitionGroup>
      </div>
    );
  }
}
export default MenuBar;

