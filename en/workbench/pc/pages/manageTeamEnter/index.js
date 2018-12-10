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
      <ApplicationWrap name="Manage Team\Enterprise">
        <div className={`${bg}  um-vbox`}>
          <IFrame title="Account Mgmt" url={`${getHost('manageTeamEnter')}`} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default ManageTeamEnter;
