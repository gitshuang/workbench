import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost } from '@u';
// import ApplicationWrap from 'containers/applicationWrap';
import IFrame from 'components/iframe_other';
// import { bg } from './style.css';

@withRouter
class ManageTeamEnter extends Component {
  render() {
    return (
      <div>
        <IFrame title="帐号管理" url={`${getHost('manageTeamEnter')}`} />
      </div>
      // <ApplicationWrap name="管理团队\企业">
      //   <div className={`${bg}  um-vbox`}>
      //     <IFrame title="帐号管理" url={`${getHost('manageTeamEnter')}`} />
      //   </div>
      // </ApplicationWrap>
    );
  }
}

export default ManageTeamEnter;
