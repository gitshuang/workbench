import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import IFrame from 'components/iframe_other';
import { bg } from './style.css';

@withRouter
class ManageTeamEnter extends Component {
  render() {
    return (
      <ApplicationWrap name="管理團隊\企業">
        <div className={`${bg} um-content um-vbox`}>
          <IFrame title="帳號管理" url={`${getHost('manageTeamEnter')}`} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default ManageTeamEnter;