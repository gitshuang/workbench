import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
  HashRouter as Router,
  withRouter,
  Switch,
  Route
} from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from 'router';
import loginRoutes from 'router/login.js';
import loginRoutesEn from 'router/loginEn.js';//由于官方首页多语下两套设计：中繁和英文
import loginPage from './loginPage';
import store from 'store';
import IM from 'IM';  // eslint-disable-line
import { getContext, mapStateToProps } from '@u';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import componentTool from 'public/componentTools';
import { regMessageTypeHandler } from 'public/regMessageTypeHandler';
import 'public/jDiworkBridge';
import BasicDialog from 'containers/basicDialog/';
import Frame from 'components/frame/';

const {
  requestStart,
  requestSuccess,
  requestError,
  getServiceList,
  getMessage,
  getPoll,
  getPortal,
  getCurrentNot
} = rootActions;
const { getUserInfo } = homeActions;

function timer(fn, time) {
  let timerId = 0;
  function loop() {
    fn();
    timerId = setTimeout(loop, time);
  }
  loop();
  return () => {
    clearTimeout(timerId);
  };
}

const NoMatch = ({ history }) => {
  history.replace('');
  return <div />
};

@withRouter
@connect(mapStateToProps(
  'showFrame',
  'showModal',
), {
    requestStart,
    requestSuccess,
    requestError,
    getServiceList,
    getMessage,
    getPoll,
    getPortal,
    getUserInfo,
    getCurrentNot,
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
    getPoll: PropTypes.func,
    getPortal: PropTypes.func,
    getUserInfo: PropTypes.func,
  };
  static defaultProps = {
    history: {},
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getServiceList: () => { },
    getMessage: () => { },
    getPoll: () => { },
    getPortal: () => { },
    getUserInfo: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      lanAjax:false,//请求语言之后才显示页面
      defaultLan:'zh_CN',//默认是中文
    };
    // this.defaultLan ='zh_CN';//默认是中文
    this.isLogin = (window.os_fe_isLogin && window.os_fe_isLogin()) || process.env.LOCALHOST;
    // this.isLogin = true;
  }
  componentWillMount() {
    if (!this.isLogin) {
      return false;
    }
    const {
      requestStart,
      requestSuccess,
      requestError,
      getServiceList,
      getPortal,
      getUserInfo,
      getPoll
    } = this.props;
    requestStart();

    // 请求用户信息  看看是否有租户
    getUserInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      } else {
        requestSuccess();
        if (!payload.allowTenants.length) {
          this.props.history.replace('/establish');
        } else {
          // 请求快捷应用
          getServiceList().then(({ error, payload }) => {
            if (error) {
              requestError(payload);
            } else {
              requestSuccess();
            }
          });
          // 请求是否含有portal 跳转到友空间首页
          getPortal().then(({ error, payload }) => {
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
      }
    });
  }

  componentDidMount() {
    if (!this.isLogin) {
      this.getCurrentLan()
      return false;
    }
    // if(!this.isLogin) return false;
    // const { getPoll } = this.props;
    // const browser = navigator.appName;
    // if (browser !== 'Microsoft Internet Explorer') {
    //   IM(new componentTool('IM'), getContext(), { // eslint-disable-line
    //     el: 'IM',
    //   });
    // }
    // regMessageTypeHandler(this);
    // // 心跳
    // timer(getPoll, 10000);
  }

  getCurrentLan = () => {
    const { getCurrentNot } = this.props;
    getCurrentNot().then(({ error, payload }) => {
      if (error) {
        return;
      }
      this.setState({defaultLan:payload.langCode,lanAjax:true});
    });
    
  }
  render() {
    if(!this.isLogin && !this.state.lanAjax) return null;
    const { showFrame } = this.props;
    let duoyuRoutes = loginRoutes;
    if(this.state.defaultLan ==='en_US'){
      duoyuRoutes = loginRoutesEn
    }
    return (
      <div>
        <Switch>
          {
            this.isLogin ? routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />) : 
            duoyuRoutes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
          }
          <Route component={NoMatch} />
        </Switch>
        {showModal? <BasicDialog />: null}
        {showFrame ? <Frame /> : null}
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

