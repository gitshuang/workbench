import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { wrap, outerContainer, active, imgUser, imgInner, userInfo, loginOut } from './style.css';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
import Button from 'bee-button';

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
  static propTypes = {
    userInfo: PropTypes.object,
    userInfoDisplay: PropTypes.bool,
    getUserInfo: PropTypes.func,
    hideUserInfoDisplay: PropTypes.func,
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
  }
  componentWillMount() {
    const { userInfo: { name }, getUserInfo } = this.props;
    if (!name) {
      requestStart();
      getUserInfo().then(({ error, payload }) => {
        if (error) {
          requestError(payload);
        }
        requestSuccess();
      });
    }
  }
  componentWillUnmount() {
    hideUserInfoDisplay();
  }
  handleClick() {
    alert("谢谢")
  }

  render() {
    const { userInfoDisplay, userInfo: { name, company, phone, imgsrc } } = this.props;
    return (
      <div className={`${wrap} ${outerContainer}`  +  (userInfoDisplay ? ` ${active}` : '') } style={{ display: (userInfoDisplay ? 'block' : 'none') }} >
        <div className={imgUser}>
          <img src={imgsrc} className={imgInner}/>
        </div>
        <div className={userInfo}>
          <ul>
            <li>{name}</li>
            <li>{company}</li>
            <li>{phone}</li>
          </ul>
        </div>
        <div className={loginOut}>
          <button colors="primary" onclick={ this.handleClick }>注销</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps(
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
})(UserInfoContainer);
