import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


import Icon from 'pub-comp/icon';
import Header from 'containers/header';
import EstablishContent from 'containers/establishContent';
import Breadcrumbs from 'components/breadcrumb';

import { pageHome, appBreadcrumb, imgInner } from './style.css';


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

  render() {
    return (
      <div className={`um-win ${pageHome}`} >
        <div className="um-header" style={{ background: 'white' }}>
          <Header
            iconName = "computer"
            onLeftClick={this.goHome}
          >
            <div>
              <span>创建团队/企业</span>
            </div>
          </Header>
        </div>
        <div className="um-content">
          <div className={appBreadcrumb}>
            <Breadcrumbs data={[{ name: '创建团队/企业' }]} goback={this.goHome} />
          </div>
          <EstablishContent  />
        </div>
      </div>
    );
  }
}

export default EstablishUserCenter;
