import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
  HashRouter as Router,
  withRouter,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import routes from 'router';
import store from 'store';
import IM from 'IM';  // eslint-disable-line
import { mapStateToProps, getContext } from '@u';
// import QuickServiceContainer from 'containers/quickService';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';
import UserCenterContainer from 'containers/userCenter';
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
} = rootActions;
const { getUserInfo } = homeActions;

/*
function getCookie(Name) {
  // 查询检索的值
  let search = `${Name}=`;
  // 返回值
  let returnvalue = '';
  if (document.cookie.length > 0) {
    let sd = document.cookie.indexOf(search);
    if (sd != -1) {
      sd += search.length;
      let end = document.cookie.indexOf(';', sd);
      if (end == -1)
        {end = document.cookie.length;}
      returnvalue = unescape(document.cookie.substring(sd, end));
    }
  }
  return returnvalue;
}
*/
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

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt((Math.random() * minNum) + 1, 10);
    case 2:
      return parseInt((Math.random() * ((maxNum - minNum) + 1)) + minNum, 10);
    default:
      return 0;
  }
}

function gitBackgroundIcon() {
  const Colos = ['RGBA(228, 97, 92, 1)', 'RGBA(117, 127, 140, 1)', 'RGBA(255, 196, 0, 1)', 'RGBA(87, 217, 163, 1)', 'RGBA(153, 141, 217, 1)', 'RGBA(0, 199, 230, 1)', 'RGBA(158, 161, 167, 1)'];
  const index = randomNum(1, 7);
  return Colos[index];
}

@withRouter
@connect(mapStateToProps(
  {
    key: 'userInfoDisplay',
    value: root => root.home.userInfoDisplay,
  },
  'quickServiceDisplay',
), {
  requestStart,
  requestSuccess,
  requestError,
  getServiceList,
  getMessage,
  getUserInfo,
  getPoll,
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
    userInfoDisplay: PropTypes.bool,
    quickServiceDisplay: PropTypes.bool,
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
    userInfoDisplay: false,
    quickServiceDisplay: false,
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
    } = this.props;
    const { history } = this.props;
    this.bgColor = gitBackgroundIcon();
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
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    if (this.state.inited) {
      return <Es />;
    }
    const { userInfoDisplay, quickServiceDisplay } = this.props;
    // const itemQuickService = quickServiceDisplay ? (<QuickServiceContainer outsideClickIgnoreClass="application-btn" />) : null;
    const itemUserInfo = userInfoDisplay ? (<UserCenterContainer outsideClickIgnoreClass="lebra-navbar-left" bgColor={this.bgColor} />) : null;
    return (
      <div>
        <Switch>
          {
            routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
          }
        </Switch>
        <TransitionGroup>
          <CSSTransitionGroup
            transitionName={{
              enter: 'animated',
              enterActive: 'fadeInLeft',
              leave: 'animated',
              leaveActive: 'fadeOutLeft',
            }}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            { itemUserInfo }
          </CSSTransitionGroup>
          <CSSTransitionGroup
            transitionName={{
              enter: 'animated',
              enterActive: 'fadeIn',
              leave: 'animated',
              leaveActive: 'fadeOut',
            }}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {/* { itemQuickService } */}
          </CSSTransitionGroup>
        </TransitionGroup>
      </div>
    );
  }
}

// const userinfo = '';
// { userinfo ? <Root /> : <Es /> }
const App = () => (
  <Router>
    <Provider store={store} >
      <Root />
    </Provider>
  </Router>
);

export default App;

