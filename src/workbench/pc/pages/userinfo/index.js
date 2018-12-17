import React, { Component } from 'react';
import { getHost } from '@u';
import IFrame from 'components/iframe';

class UserInfo extends Component {
  render() {
    return (
      <div>
        <IFrame title="员工信息" url={`${getHost('user')}#/staff/personInfor-card`} />
      </div>
    );
  }
}

export default UserInfo;
