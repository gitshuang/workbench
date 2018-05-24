import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import Icon from 'components/icon';
import Userinfo from './userinfo';

import {
  personalImg,
} from './style.css';

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt((Math.random() * minNum) + 1, 10);
    case 2:
      return parseInt((Math.random() * ((maxNum - minNum) + 1)) + minNum, 10);
    default:
      return 0;
  }
}

function gitBackgroundIcon() {
  const Colos = ['RGBA(228, 97, 92, 1)', 'RGBA(117, 127, 140, 1)', 'RGBA(255, 196, 0, 1)', 'RGBA(87, 217, 163, 1)', 'RGBA(153, 141, 217, 1)', 'RGBA(0, 199, 230, 1)', 'RGBA(158, 161, 167, 1)'];
  const index = randomNum(1, 7);
  return Colos[index];
}

class Personal extends Component {
  constructor(props) {
    super(props);
    this.bgColor = gitBackgroundIcon();
    this.state = {
      userInfoDisplay: false,
    };
  }

  handerClick = () => {
    const { userInfoDisplay } = this.state;
    if (userInfoDisplay) {
      this.closePersonalModal();
    }else {
      this.openPersonalModal();
    }
  }

  openPersonalModal = () => {
    this.setState({
      userInfoDisplay: true,
    });
  }

  closePersonalModal = () => {
    this.setState({
      userInfoDisplay: false,
    });
  }

  render() {
    const { userInfoDisplay } = this.state;
    const { 
      userInfo:{
        userAvator
      }
    } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {
          userAvator
          ? <img alt="" src={userAvator} className={personalImg} onClick={this.handerClick} />
          : <Icon type="staff" className={personalImg} onClick={this.handerClick} />
        }
        <TransitionGroup>
          <CSSTransitionGroup
            transitionName={{
              enter: 'animated',
              enterActive: 'fadeInLeft',
              leave: 'animated',
              leaveActive: 'fadeOutLeft',
            }}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {
              userInfoDisplay
              ? <Userinfo
                bgColor={this.bgColor}
                userInfoDisplay={userInfoDisplay}
                closePersonalModal={this.closePersonalModal}
                outsideClickIgnoreClass={personalImg}
                {...this.props}
              />
              : null
            }
          </CSSTransitionGroup>
        </TransitionGroup>
      </div>
    );
  }
}

export default Personal;
