import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import {
  bg,
  frameElm,
} from './style.css';

class UserInfo extends Component {
  render() {
    let url = getHost('user')+"#/staff/personInfor-card";
    return (
      <ApplicationWrap name='员工信息'>
        <div className={bg+" um-content um-vbox"}>
          <iframe className={ frameElm } src={url} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default UserInfo;