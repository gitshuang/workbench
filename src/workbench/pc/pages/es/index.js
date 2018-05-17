import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import routes from 'router';
import { mapStateToProps } from '@u';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';
import UserCenterContainer from 'containers/userCenter';

@withRouter
@connect(mapStateToProps({
  key: 'userInfoDisplay',
  value: root => root.home.userInfoDisplay,
}), {

})

class Es extends Component {
  static propTypes = {
    userInfoDisplay: PropTypes.bool,
  };
  static defaultProps = {
    userInfoDisplay: false,
  };
  componentWillMount() {
  }

  render() {
    const { userInfoDisplay } = this.props;
    const itemUserInfo = userInfoDisplay ? (<UserCenterContainer outsideClickIgnoreClass="lebra-navbar-left" bgColor={this.bgColor} />) : null;
    return (
      <div>
        <Switch>
          <RouteWithSubRoutes key={0} {...routes[1]} />
          <RouteWithSubRoutes key={1} {...routes[3]} />
          <RouteWithSubRoutes key={2} {...routes[9]} />
          <RouteWithSubRoutes key={3} {...routes[13]} />
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
        </TransitionGroup>
      </div>
    );
  }
}
export default Es;
