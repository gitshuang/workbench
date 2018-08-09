import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import IFrame from 'components/iframe_other';
import {
  bg,
} from './style.css';

@withRouter
class UserInfo extends Component {
  render() {
    // let url = getHost('user')+"#/staff/personInfor-card";
    return (
      <ApplicationWrap name="員工資訊">
        <div className={`${bg} um-content um-vbox`}>
          <IFrame title="員工資訊" url={`${getHost('user')}#/staff/personInfor-card`} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default UserInfo;
