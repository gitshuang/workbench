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
      <div >
        {/* <div className=" header">
          <Header
            onLeftClick={this.goHome}
          >
            <div>
              <span>創建團隊/企業</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs data={[{ name: '創建團隊/企業' }]} goback={this.goBack} />
          </div>
        </div> */}
        <div>
          <EstablishContent  />
        </div>
      </div>
    );
  }
}

export default EstablishUserCenter;
