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
      <ApplicationWrap name="Employee Info">
        <div className={`${bg}  um-vbox`}>
          <IFrame title="Employee Info" url={`${getHost('user')}#/staff/personInfor-card`} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default UserInfo;
