import React, { Component } from 'react';
import ApplicationWrap from 'containers/applicationWrap';
import ServiceClassify from 'containers/serviceClassify';

class Application extends Component {
  render() {
    return (
      <ApplicationWrap name="All Apps">
        <ServiceClassify />
      </ApplicationWrap>
    );
  }
}

export default Application;
