import React, { Component } from 'react';
import IFrame from 'components/iframe';
class Account extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* <IFrame title="应用市场" url='http://localhost:3005' /> */}
        <IFrame title="應用市場" url="/diwork-market/appMarket" />
      </div>
    );
  }
}

export default Account;
