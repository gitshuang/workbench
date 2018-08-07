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
            iconName = "computer"
            onLeftClick={this.goHome}
          >
            <div>
              <span>$i18n{index.js0}$i18n-end</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs data={[{ name: '$i18n{index.js1}$i18n-end' }]} goback={this.goBack} />
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
