import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import Icon from 'components/icon';
import Userinfo from './userinfo';
import { gitBackgroundIcon } from './public';

import {
  personalImg,
} from './style.css';

class Personal extends Component {
  static propTypes = {
    userInfo: PropTypes.shape({
      userAvator: PropTypes.string,
    }),
  };
  static defaultProps = {
    userInfo: {},
  };
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
    } else {
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
      userInfo: {
        userAvator,
      },
    } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {
          userAvator
          ? <img
            alt={userAvator}
            src={userAvator}
            className={personalImg}
            onClick={this.handerClick}
            onKeyDown={this.handerClick}
            role="presentation"
          />
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
