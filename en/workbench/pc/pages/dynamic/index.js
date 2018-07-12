import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import IFrame from 'components/iframe_other';
import { bg } from './style.css';

@withRouter
class Dynamic extends Component {
  render() {
    return (
      <ApplicationWrap name="Moments">
        <div className={`${bg} um-content um-vbox`}>
          <IFrame title="Moments" url={`${getHost('dynamic')}`} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default Dynamic;
