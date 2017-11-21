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

const {
  getUserInfo,
  hideUserInfoDisplay,
} = homeActions;

const {
  requestStart,
  requestSuccess,
  requestError,
} = rootActions;

@connect(
  mapStateToProps(
    'userInfo',
    'userInfoDisplay',
    {
      namespace: 'home',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    hideUserInfoDisplay,
    getUserInfo,
  }
)
@onClickOutside
class UserInfoContainer extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    getUserInfo: PropTypes.func,
    hideUserInfoDisplay: PropTypes.func,
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
  }

  handleClickOutside() {
    const { hideUserInfoDisplay, userInfoDisplay } = this.props;
    if(userInfoDisplay){
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
        } else {
          requestSuccess();
        }
      });
    }
  }
  // componentWillUnmount() {
  //   hideUserInfoDisplay();
  // }

  handleClick() {
    alert("谢谢")
  }

  render() {
    const { userInfo: { name, company, phone, imgsrc } } = this.props;
    return (
      <div  className={wrap} >
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
          <Button className={wrapBtn}  size="sm" onClick={ this.handleClick.bind(this) }>注销</Button>
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
  }
}

export default UserInfoContainer;
