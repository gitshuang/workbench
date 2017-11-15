import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { wrap, outerContainer, active, imgUser, imgInner, userInfo, loginOut, tabContent, wrapBtn} from './style.css';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';

import Button from 'bee-button';
import Tabs, { TabPane } from 'bee-tabs';
import Icon from 'components/icon';
import onClickOutside from 'react-onclickoutside';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import 'assets/style/animate.css';

const {
  getUserInfo,
  hideUserInfoDisplay,
  userInfoDisplay
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
} = rootActions;
const { INTERVAL } = 2000;
@connect(
  ()=>({}),
  {
    hideUserInfoDisplay
  }
)


@onClickOutside
class UserInfoContainer extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    userInfoDisplay: PropTypes.string,
    getUserInfo: PropTypes.func,
    hideUserInfoDisplay: PropTypes.func,
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
  }

  handleClickOutside(evt) {
    const {changeQuickServiceHidden,hideUserInfoDisplay,userInfoDisplay } = this.props;
    if(userInfoDisplay !== "userInfohidden" && userInfoDisplay === "fadeInLeftBig"){
      hideUserInfoDisplay();
    }
  }
  componentWillMount() {
    const { userInfo: { name }, getUserInfo } = this.props;
    if (!name) {
      requestStart();
      getUserInfo().then(({ error, payload }) => {
        if (error) {
          requestError(payload);
        }
        requestSuccess();
      });
    }
  }
  componentWillUnmount() {
    hideUserInfoDisplay();
  }
  handleClick() {
    alert("谢谢")
  }

  render() {
    const { userInfoDisplay, userInfo: { name, company, phone, imgsrc } } = this.props;
    const childrenComponent = (
      <div  className={`${wrap} animated ${userInfoDisplay}`}  >
        <div className={imgUser}>
          <img src={imgsrc} className={imgInner}/>
        </div>
        <div className={userInfo}>
          <ul>
            <li>{name}</li>
            <li>{phone}</li>
            <li>{company}</li>
          </ul>
        </div>
        <div className={loginOut}>
          <Button className={wrapBtn}  size="sm" onClick={ this.handleClick }>注销</Button>
        </div>

        <div className={"um-content" + ` ${tabContent}`}>

          <Tabs
            defaultActiveKey="1"
            onChange={this.callback}
            tabBarStyle="upborder"
            className="demo-tabs"
          >
            <TabPane tab='日常' key="1">
              日常
            </TabPane>
            <TabPane tab='职业发展' key="2">
              职业发展

            </TabPane>
            <TabPane tab='培训' key="4">
              培训内容

            </TabPane>
            <TabPane tab='时间线' key="3">
              时间线

            </TabPane>
          </Tabs>
        </div>
      </div>
    );
    return (
        <ReactCSSTransitionGroup
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionName="example" >
          {childrenComponent}
        </ReactCSSTransitionGroup>
    );
  }
}

export default connect(mapStateToProps(
  'userInfoDisplay',
  'userInfo',
  {
    namespace: 'home',
  },
),
{
  getUserInfo,
  hideUserInfoDisplay,
  requestStart,
  requestSuccess,
  requestError,
})(UserInfoContainer);
