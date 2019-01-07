import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';
import Homeheader from './homeheader';
import Homecontent from './homecontent';

import Pin from './pin';
@withRouter
@connect(
  mapStateToProps(
    'activeCarrier',
    'pinDisplay',
  ),
  {},
)
class Wrap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const { routes, activeCarrier, pinDisplay } = this.props;
    const vis = activeCarrier === 'home' ? 'block' : 'none';
    return (
      <div className='um-win'>
        <Homeheader />
        <div className="content">
          <div style={{ display: vis }}>
            {
              routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
            }
          </div>
          <Homecontent routes={routes} />
        </div>
        {
          pinDisplay ? <Pin /> : null
        }
      </div>
    );
  }
}
export default Wrap;

