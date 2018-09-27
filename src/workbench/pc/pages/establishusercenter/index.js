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
    this.props.history.replace('');
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className={`um-win`} >
        <div className="um-header header">
          <Header
            onLeftClick={this.goHome}
          >
            <div>
              <span>创建团队/企业</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs data={[{ name: '创建团队/企业' }]} goback={this.goBack} />
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
