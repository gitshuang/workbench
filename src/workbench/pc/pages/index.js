import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
  HashRouter as Router,
  withRouter,
} from 'react-router-dom';
import routes from 'router';
import store from 'store';
import { mapStateToProps } from '@u';
import QuickServiceContainer from 'containers/quickService';
import RouteWithSubRoutes from 'components/routeWithSubRoutes';
import rootActions from 'store/root/actions';
import 'assets/style/iuapmobile.um.css';
import 'assets/style/sidebar.css';
import { regMessageTypeHandler } from 'public/regMessageTypeHandler';

const {
  requestStart,
  requestSuccess,
  requestError,
  getProductList,
  getServiceList,
  getMessage,
} = rootActions;

function timer(fn, time) {
  let timerId = 0;
  function loop () {
    fn();
    timerId = setTimeout(loop, time);
  }
  loop();
  return () => {
    clearTimeout(timerId);
  };
}

@withRouter
@connect(
  mapStateToProps(
    'productList',
    'serviceList',
  ), {
    requestStart,
    requestSuccess,
    requestError,
    getProductList,
    getServiceList,
    getMessage,
  }
)
class Root extends Component {
  componentWillMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getProductList,
      getServiceList,
      getMessage,
    } = this.props;
    requestStart();
    getProductList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
    getServiceList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
    timer(getMessage, 10000);
    regMessageTypeHandler.call(this);
  }
  render() {
    return (
      <div>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        <QuickServiceContainer />
      </div>
    );
  }
}

const App = () => (
  <Router>
    <Provider store={store} >
      <Root />
    </Provider>
  </Router>
);

export default App;

