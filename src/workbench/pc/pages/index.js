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
//TODU 此处不应该引入全局样式，会影响到其他样式的设置(jony)。
// import 'assets/style/iuapmobile.um.css';
// import 'assets/style/sidebar.css';
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
        <QuickServiceContainer outsideClickIgnoreClass={'icon-yingyong'} />
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

