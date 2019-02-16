import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost } from '@u';
import IFrame from 'components/iframe';

@withRouter
class ManageTeamEnter extends Component {
  render() {
    return (
      <div>
        <IFrame title="帳號管理" url={`${getHost('manageTeamEnter')}`} />
      </div>
    );
  }
}

export default ManageTeamEnter;
