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
  changeTitleServiceDisplay
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
    changeTitleServiceDisplay,
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

  aaa =() => {
    alert(1)
  }

  render() {
    const { changeUserInfoDisplay, widgetList, changeTitleServiceDisplay } = this.props;
    return (
      <div className="um-win">
        <div className="um-header">
          <Header onLeftClick={ changeUserInfoDisplay }>
            <span position="center" onClick={ changeTitleServiceDisplay }>首页<i className="iconfont icon-toupiao um-icon-md"></i></span>
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
