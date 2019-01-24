import React, { Component } from 'react';
import MenuBarInner from './menuInner';
//import Icon from 'pub-comp/icon';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import { menuBarPart, sideBarPanel, sideBarTitle } from './style.css'
class MenuBar extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    let { menuShow, openMenu } = this.props
    return (
      <div className={menuBarPart} style={this.props.style}>
        {/* <Icon type='master' className="ignoreClass" onClick={this.menuShow} /> */}
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
              menuShow ? (
                <div className={sideBarPanel}>
                  <span className={sideBarTitle}></span>
                  <MenuBarInner outsideClickIgnoreClass={'ignoreClass-menu'} openMenu={openMenu} />
                </div>
              ) : null
            }
          </CSSTransitionGroup>
        </TransitionGroup>
      </div>
    );
  }
}
export default MenuBar;

