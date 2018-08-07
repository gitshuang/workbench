import React, { Component } from 'react';
import {
  withRouter,
  Switch,
} from 'react-router-dom';
import routes from 'router';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';

@withRouter
class Es extends Component {
  render() {
    return (
      <div>
        <Switch>
          <RouteWithSubRoutes key={0} {...routes[1]} />
          <RouteWithSubRoutes key={1} {...routes[3]} />
          <RouteWithSubRoutes key={2} {...routes[9]} />
          <RouteWithSubRoutes key={3} {...routes[13]} />
        </Switch>
      </div>
    );
  }
}
export default Es;
