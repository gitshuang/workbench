import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
  HashRouter as Router,
  withRouter,
  Switch,
} from 'react-router-dom';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import routes from 'router';
import store from 'store';
import IM from 'IM';
import { mapStateToProps, getContext } from '@u';
import QuickServiceContainer from 'containers/quickService';
import RouteWithSubRoutes from 'components/routeWithSubRoutes';
import UserCenterContainer from 'containers/userCenter';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import componentTool, { trigger } from 'public/componentTools';
import { regMessageTypeHandler } from 'public/regMessageTypeHandler';
import 'public/jDiworkBridge';

const {
  requestStart,
  requestSuccess,
  requestError,
  getServiceList,
  getMessage,
  hideIm,
} = rootActions;
const { getUserInfo } = homeActions;

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
    getUserInfo
  }
)
class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loaded: false,
    };
}
  componentWillMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getServiceList,
      getMessage,
      getUserInfo
    } = this.props;
    const { history } = this.props;
    this.bgColor = this.gitBackgroundIcon();
    getUserInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      } else {
        this.setState({
          loaded: true
        });
        requestSuccess();
        console.log(payload);
        if(!payload.allowTenants.length){
          history.replace('/establish');
        }
      }
    });
    
    

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
    regMessageTypeHandler(this);
  }
  clickHandler = () => {
    const {
      hideIm,
    } = this.props;
    hideIm();
  }

  randomNum(minNum,maxNum){
      switch(arguments.length){ 
          case 1: 
              return parseInt(Math.random()*minNum+1,10); 
          break; 
          case 2: 
              return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
          break; 
              default: 
                  return 0; 
              break; 
      } 
  }

  gitBackgroundIcon(){
    let _colos = ["RGBA(228, 97, 92, 1)","RGBA(117, 127, 140, 1)","RGBA(255, 196, 0, 1)","RGBA(87, 217, 163, 1)","RGBA(153, 141, 217, 1)","RGBA(0, 199, 230, 1)","RGBA(158, 161, 167, 1)"];
    let index = this.randomNum(1,7);
    return _colos[index];
  }

  render() {
    if(!this.state.loaded) return null;
    const { userInfoDisplay, quickServiceDisplay } = this.props;
    const itemQuickService = quickServiceDisplay ? (<QuickServiceContainer outsideClickIgnoreClass={'icon-application'} />) : null;
    const itemUserInfo = userInfoDisplay ? (<UserCenterContainer outsideClickIgnoreClass={'lebra-navbar-left'} bgColor={this.bgColor}/>) : null;
    return (
      <div onClick={this.clickHandler}>
        <Switch>
          {
            routes.map( (route, i) => {
              return <RouteWithSubRoutes key={i} {...route} />
            })
        }
        </Switch>
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

class Es extends Component {
  render(){
    return (
      <div>
        <Switch>
          {
            <RouteWithSubRoutes key={0} {...routes[1]} />
          }
        </Switch>
      </div>
    )
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

