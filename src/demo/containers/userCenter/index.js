import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { wrap } from './style.css';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';

const {
  getUserInfo,
  hideUserInfoDisplay,
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
} = rootActions;

class UserInfoContainer extends Component {
  componentWillMount() {
    const {userInfo: { name, company }, getUserInfo } = this.props;
    if (!name) {
      requestStart();
      getUserInfo().then(
        ({ error, payload }) => {
          if (error) {
            requestError(payload);
          }
          requestSuccess();
        }
      );
    }
  }
  componentWillUnmount() {
    hideUserInfoDisplay();
  }
  render() {
    const { userInfoDisplay, userInfo: { name, company } } = this.props;
    return (
      <div className={wrap} style={{display: (userInfoDisplay ? 'block' : 'none')}}>
        <ul>
          <li>{name}</li>
          <li>{company}</li>
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps(
    'userInfoDisplay',
    'userInfo',
    {
      namespace: 'home',
    },
  ),
  {
    getUserInfo,
    hideUserInfoDisplay,
    requestStart,
    requestSuccess,
    requestError,
  }
)(UserInfoContainer);
