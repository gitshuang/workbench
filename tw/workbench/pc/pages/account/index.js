import React, { Component } from 'react';
import { getHost, getContext } from '@u';
import IFrame from 'components/iframe';

class Account extends Component {
  render() {
    const { locale } = getContext();
    
    return (
      <div>
          <IFrame title="帳號管理" url={`${getHost('euc')}/diuser?locale=${locale === "zh_TW" ? "zh_HK" : locale}`} />
        </div>
    );
  }
}

export default Account;
