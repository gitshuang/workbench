import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderContainer from 'containers/header';
import UserCenterContainer from 'containers/userCenter';
import WidgetArea from 'components/widgetArea';
import { mapStateToProps } from '@u';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
import baseStyles from 'public/base.css';

const {
  wrap,
} = baseStyles;

const {
  changeUserInfoDisplay,
  getWidgetList,
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
} = rootActions;

class Home extends Component {
  componentWillMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getWidgetList,
      widgetList,
    } = this.props;
    if (!widgetList.length) {
      requestStart();
      getWidgetList().then(
        ({ error, payload }) => {
          if (error) {
            requestError(payload);
          }
          requestSuccess();
        }
      );
    }
  }
  render() {
    const { changeUserInfoDisplay, widgetList } = this.props;
    return (
      <div className={wrap} >
        <HeaderContainer title="首页">
          <button position="left" onClick={changeUserInfoDisplay}>个人中心</button>
        </HeaderContainer>
        <WidgetArea data={widgetList} />
        <UserCenterContainer />
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps(
      'widgetList',
      {
        namespace: 'home',
      }
    ),
    {
      requestStart,
      requestSuccess,
      requestError,
      getWidgetList,
      changeUserInfoDisplay,
    }
  )(Home)
);
