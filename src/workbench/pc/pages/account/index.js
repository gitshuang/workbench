import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost, getContext } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import IFrame from 'components/iframe_other';
import { bg } from './style.css';

@withRouter
class Account extends Component {
  render() {
    const { locale } = getContext();
    
    return (
      <ApplicationWrap name="帐号管理">
        <div className={`${bg} um-content um-vbox`}>
          <IFrame title="帐号管理" url={`${getHost('euc')}/diuser?locale=${locale === "zh_TW" ? "zh_HK" : locale}`} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default Account;
