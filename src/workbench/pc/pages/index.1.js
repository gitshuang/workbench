import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
  HashRouter as Router,
  withRouter,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from 'router';
import store from 'store';
import IM from 'IM';  // eslint-disable-line
import { getContext, mapStateToProps } from '@u';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';
import Es from 'pages/es';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import componentTool from 'public/componentTools';
import { regMessageTypeHandler } from 'public/regMessageTypeHandler';
import 'public/jDiworkBridge';

const {
  requestStart,
  requestSuccess,
  requestError,
  getServiceList,
  getMessage,
  getPoll,
  getPortal
} = rootActions;
const { getUserInfo } = homeActions;

function timer(fn, time) {
  let timerId = 0;

  function loop() {
    // const sessionId = get_cookie("Hm_lvt_yht");
    fn();
    timerId = setTimeout(loop, time);
  }
  loop();
  return () => {
    clearTimeout(timerId);
  };
}

@withRouter
@connect(mapStateToProps(),{
  requestStart,
  requestSuccess,
  requestError,
  getServiceList,
  getMessage,
  getUserInfo,
  getPoll,
  getPortal
})
class Root extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getServiceList: PropTypes.func,
    getMessage: PropTypes.func,
    getUserInfo: PropTypes.func,
    getPoll: PropTypes.func,
    getPortal: PropTypes.func,
  };
  static defaultProps = {
    history: {},
    requestStart: () => {},
    requestSuccess: () => {},
    requestError: () => {},
    getServiceList: () => {},
    getMessage: () => {},
    getUserInfo: () => {},
    getPoll: () => {},
    getPortal: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      inited: false,
    };
  }
  componentWillMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getServiceList,
      getUserInfo,
      getPoll,
      getPortal
    } = this.props;
    const { history } = this.props;
    requestStart();

    // 获取用户信息， 新用户跳转到加入组织页面，
    getUserInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      } else {
        requestSuccess();
        if (!payload.allowTenants.length) {
          history.replace('/establish');
          this.setState({
            inited: true,
          });
        } else {
          getServiceList().then(({ error, payload }) => {
            if (error) {
              requestError(payload);
            } else {
              requestSuccess();
            }
          });
          const browser = navigator.appName;
          if (browser !== 'Microsoft Internet Explorer') {
            IM(new componentTool('IM'), getContext(), { // eslint-disable-line
              el: 'IM',
            });
          }
          regMessageTypeHandler(this);
          // 心跳
          timer(getPoll, 10000);
        }
        this.setState({
          loaded: true,
        });
      }
    });

    getPortal().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      } else {
        requestSuccess();
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    if (this.state.inited) {
      return <Es />;
    }
    return (
      <div>
        <Switch>
          {
            routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
          }
        </Switch>
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

