import React, { Component } from 'react';
import ApplicationWrap from 'containers/applicationWrap';
import ServiceClassify from 'containers/serviceClassify';

class Application extends Component {
  render() {
    return (
      <ApplicationWrap name="$i18n{index.js0}$i18n-end">
        <ServiceClassify />
      </ApplicationWrap>
    );
  }
}

export default Application;
