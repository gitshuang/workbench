import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from 'containers/header';
import UserCenterContainer from 'containers/userCenter';
import WidgetArea from 'components/widgetArea';
import { mapStateToProps } from '@u';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
import baseStyles from 'public/base.css';
// import Tab from 'containers/homeTabs';

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

@withRouter
@connect(
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
)
export default class Home extends Component {
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
      getWidgetList().then(({ error, payload }) => {
        if (error) {
          requestError(payload);
        }
        requestSuccess();
      });
    }
  }
  render() {
    const { changeUserInfoDisplay, widgetList } = this.props;
    return (
      <div className="um-win">
        <div className="um-header">
          <Header title="首页">
            <button position="left" onClick={changeUserInfoDisplay} >个人中心</button>
          </Header>
          {/* <Tab /> */}
        </div>
        <div className="um-content">
          <WidgetArea data={widgetList} />
        </div>
        <UserCenterContainer />
      </div>
    );
  }
}
