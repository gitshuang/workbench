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

import Tabs, { TabPane } from 'bee-tabs';

// import Tab from 'containers/homeTabs';

const {wrap, } = baseStyles;

const {changeUserInfoDisplay, getWidgetList, } = homeActions;

const {requestStart, requestSuccess, requestError, } = rootActions;

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

class Home extends Component {

    constructor(props) {
        super(props);
        // this.callback = this.callback.bind(this);

    }

    componentWillMount() {
        const {requestStart, requestSuccess, requestError, getWidgetList, widgetList, } = this.props;
        if (!widgetList.length) {
            requestStart();
            getWidgetList().then(({error, payload}) => {
                if (error) {
                    requestError(payload);
                }
                requestSuccess();
            });
        }
    }

    callback = (e) => {


    }

  render() {
    const { changeUserInfoDisplay, widgetList, changeTitleServiceDisplay } = this.props;
    return (
      <div className="um-win">
        <div className="um-header">
          <Header onLeftClick={ changeUserInfoDisplay }>
            <span position="center" onClick={ changeTitleServiceDisplay }>首页<i className="iconfont icon-toupiao um-icon-md"></i></span>
          </Header>
          { /* <Tab /> */ }
        </div>
        <div className="um-content">

              <Tabs
            defaultActiveKey="1"
            onChange={this.callback}
            tabBarStyle="upborder"
            className="demo-tabs"
            >
               <TabPane tab='待办' key="1">
                  <WidgetArea data={widgetList} />
               </TabPane>

               <TabPane tab='HR相关' key="2">
                   HR相关内容

               </TabPane>

               <TabPane tab='我的日常' key="3">
                   我的日常内容

               </TabPane>

               <TabPane tab='公司新闻' key="4">
                   公司新闻内容

               </TabPane>

            </Tabs>

         
        </div>
        <UserCenterContainer />
      </div>
        );
    }
}

export default Home;
