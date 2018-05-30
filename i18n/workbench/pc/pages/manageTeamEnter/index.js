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
      <ApplicationWrap name="$i18n{index.js0}$i18n-end\$i18n{index.js1}$i18n-end">
        <div className={`${bg} um-content um-vbox`}>
          <IFrame title="$i18n{index.js2}$i18n-end" url={`${getHost('manageTeamEnter')}`} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default ManageTeamEnter;
