import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
  HashRouter as Router,
  withRouter,
} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import routes from 'router';
import store from 'store';
import { mapStateToProps } from '@u';
import QuickServiceContainer from 'containers/quickService';
import RouteWithSubRoutes from 'components/routeWithSubRoutes';
import UserCenterContainer from 'containers/userCenter';
import Drag from 'containers/drag';
import rootActions from 'store/root/actions';
//<--后续样式提到组件库里面
import 'assets/style/iuapmobile.um.css';
//-->后续样式提到组件库里面
import { regMessageTypeHandler } from 'public/regMessageTypeHandler';
import { initMessage } from 'public/message';

const {
  requestStart,
  requestSuccess,
  requestError,
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
    {
      key: 'userInfoDisplay',
      value: (root) => root.home.userInfoDisplay,
    },
    'serviceList',
    'quickServiceDisplay',
  ), {
    requestStart,
    requestSuccess,
    requestError,
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
      getServiceList,
      getMessage,
    } = this.props;
    requestStart();
    getServiceList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      } else {
        requestSuccess();
      }
    });
    // timer(getMessage, 30000);
    regMessageTypeHandler.call(this);
    initMessage();
  }
  render() {
    const { userInfoDisplay, quickServiceDisplay } = this.props;
    const itemQuickService = quickServiceDisplay ? (<QuickServiceContainer outsideClickIgnoreClass={'icon-yingyong'} />) : null;
    const itemUserInfo = userInfoDisplay ? (<UserCenterContainer outsideClickIgnoreClass={'lebra-navbar-left'}/>) : null;
    return (
      <div>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'animated',
            enterActive: 'fadeInLeft',
            leave: 'animated',
            leaveActive: 'fadeOutLeft',
          } } >
          { itemUserInfo }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'animated',
            enterActive: 'fadeIn',
            leave: 'animated',
            leaveActive: 'fadeOut',
          } } >
          { itemQuickService }
        </ReactCSSTransitionGroup>
        <Drag/>
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

