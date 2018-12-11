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
import store from 'store';
import IM from 'IM';  // eslint-disable-line
import { getContext, mapStateToProps, IS_IE } from '@u';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';

import rootActions from 'store/root/actions';

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
  getPoll,
  setUserInfo
} = rootActions;

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
@connect(
  mapStateToProps(
    'showFrame',
    'showModal',
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getServiceList,
    getPoll,
    setUserInfo,
  }
)
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
    getPoll: PropTypes.func,
    setUserInfo: PropTypes.func,
  };
  static defaultProps = {
    history: {},
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getServiceList: () => { },
    getPoll: () => { },
    setUserInfo: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      lanAjax: false,//请求语言之后才显示页面
      defaultLan: 'zh_CN',//默认是中文
    };
    this.isLogin = (window.os_fe_isLogin && window.os_fe_isLogin()) || process.env.LOCALHOST;
    this.userInfo = window.getUserInfo && window.getUserInfo();
  }
  componentWillMount() {
    if (!this.isLogin) {
      return false;
    }
    const {
      requestError,
      getServiceList,
      getPoll,
      setUserInfo
    } = this.props;
    // 将ftl文件header中的userinfo赋值到store中
    setUserInfo(this.userInfo);

    const { tenantid } = getContext();
    if (!tenantid) {
      this.props.history.replace('/establish');
    } else {
      // 请求快捷应用
      getServiceList().then(({ error, payload }) => {
        if (error) {
          requestError(payload);
        }
      });
      IM(new componentTool('IM'), getContext(), { // eslint-disable-line
        el: 'IM',
      });
      regMessageTypeHandler(this);
      // 心跳
      timer(getPoll, 10000);
    }
  }

  componentDidMount() {
    if (!this.isLogin) {
      this.getCurrentLan();
    }
  }

  getCurrentLan = () => {
    const currentLan = window.getCurrentLangCode && window.getCurrentLangCode();
    if (currentLan) {
      // 减少ajax请求
      this.setState({ defaultLan: currentLan, lanAjax: true });
      return false;
    }
  }

  render() {
    if (!this.isLogin && !this.state.lanAjax) return null;
    const { showFrame, showModal } = this.props;
    const duoyuRoutes = this.state.defaultLan === 'en_US' ? loginRoutesEn : loginRoutes;
    return (
      <div className={`${IS_IE ? 'ie9' : 'diwork'}`}>
        <Switch>
          {
            this.isLogin
              ?
              routes.map((route, i) => {
                return <RouteWithSubRoutes key={i} {...route} />
              })
              :
              duoyuRoutes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
          }
          <Route component={NoMatch} />
        </Switch>
        {showModal ? <BasicDialog /> : null}
        {showFrame ? <Frame /> : null}
      </div>
    );
  }
}

const App = () => (
  <Provider store={store} >
    <Router>
      <Root />
    </Router>
  </Provider>
);

export default App;

