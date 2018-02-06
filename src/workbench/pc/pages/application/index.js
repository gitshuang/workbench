import React, { Component } from 'react';
import ApplicationWrap from 'containers/applicationWrap';
import ServiceClassify from 'containers/serviceClassify';

class Application extends Component {
  render() {
    return (
      <ApplicationWrap name='全部应用'>
        <ServiceClassify />
      </ApplicationWrap>
    );
  }
}

export default Application;
