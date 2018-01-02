import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
  HashRouter as Router,
  withRouter,
} from 'react-router-dom';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import routes from 'router';
import store from 'store';
import { mapStateToProps, getContext } from '@u';
import QuickServiceContainer from 'containers/quickService';
import RouteWithSubRoutes from 'components/routeWithSubRoutes';
import UserCenterContainer from 'containers/userCenter';
import rootActions from 'store/root/actions';
import { regMessageTypeHandler } from 'public/regMessageTypeHandler';
import { initBridge } from 'public/jDiworkBridge';
import componentTool, { trigger } from 'public/componentTools';
import IM from 'IM';

const {
  requestStart,
  requestSuccess,
  requestError,
  getServiceList,
  getMessage,
  hideIm,
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
    'quickServiceDisplay',
  ), {
    requestStart,
    requestSuccess,
    requestError,
    getServiceList,
    getMessage,
    hideIm,
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
    // timer(getMessage, 10000);
    IM(new componentTool('IM'), getContext(), {
      el: 'IM',
    });
    regMessageTypeHandler.call(this);
    initBridge.call(this);
  }
  clickHandler = () => {
    const {
      hideIm,
    } = this.props;
    hideIm();
  }
  render() {
    const { userInfoDisplay, quickServiceDisplay } = this.props;
    const itemQuickService = quickServiceDisplay ? (<QuickServiceContainer outsideClickIgnoreClass={'icon-application'} />) : null;
    const itemUserInfo = userInfoDisplay ? (<UserCenterContainer outsideClickIgnoreClass={'lebra-navbar-left'}/>) : null;
    return (
      <div onClick={this.clickHandler}>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        <TransitionGroup>
          <CSSTransitionGroup
            transitionName={ {
              enter: 'animated',
              enterActive: 'fadeInLeft',
              leave: 'animated',
              leaveActive: 'fadeOutLeft',
            } }
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300} >
            { itemUserInfo }
          </CSSTransitionGroup>
          <CSSTransitionGroup
            transitionName={ {
              enter: 'animated',
              enterActive: 'fadeIn',
              leave: 'animated',
              leaveActive: 'fadeOut',
            } }
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300} >
            { itemQuickService }
          </CSSTransitionGroup>
        </TransitionGroup>
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

