import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'containers/header';
import EstablishContent from 'containers/establishContent';
import Breadcrumbs from 'components/breadcrumb';

@withRouter
class EstablishUserCenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentWillMount() {
    
  }

  goHome = () => {
    this.props.history.replace('/');
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className={`um-win`} >
        <div className="um-header header">
          <Header
            iconName = "home"
            onLeftClick={this.goHome}
          >
            <div>
              <span>Create Team/Enterprise</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs data={[{ name: 'Create Team/Enterprise' }]} goback={this.goBack} />
          </div>
        </div>
        <div className="um-content content">
          <EstablishContent  />
        </div>
      </div>
    );
  }
}

export default EstablishUserCenter;
