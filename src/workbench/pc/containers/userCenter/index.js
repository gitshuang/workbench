import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { wrap, outerContainer, active, imgUser, imgInner, userInfo, loginOut, tabContent, wrapBtn,userName,gloryValue,packetsValue,gloryKey,packetsKey,clearfix,userBtnList,serviceImg,serviceName,promotion,
  used,usedModule,usedTit,lastTime,usedService,tabPane1,tabPane2,module,editPortrait
} from './style.css';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';

import Button from 'bee-button';
import Select from 'bee-select';
import Tabs, { TabPane } from 'bee-tabs';
import Icon from 'bee-icon';
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

  handleMouseEnter=() => {
    let portrait = this.refs.portrait;
    portrait.style.display ="block";
  }

  handleMouseLeave=() => {
    let portrait = this.refs.portrait;
    portrait.style.display ="none";
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
    alert("修改")
  }

  render() {
    const { userInfo: { name, company, phone, imgsrc ,glory ,redPackets} } = this.props;
    return (
      <div  className={`${wrap} ${clearfix}`}>
        <div className={imgUser}>
          <img src={imgsrc} className={imgInner} onMouseEnter={() => this.handleMouseEnter()} />
          <div className={editPortrait} ref="portrait" onMouseLeave={() => this.handleMouseLeave()}>
            <Icon type="uf-pencil-s" onClick={()=>this.handleClick()}></Icon>
          </div>
        </div>
        <div className={userInfo}>
          <ul className={clearfix}>
            <li>
              <div className={gloryValue}>{glory}</div>
              <div className={gloryKey}>荣耀</div>
            </li>
            <li>
              <div className={packetsValue}>{redPackets}</div>
              <div className={packetsKey}>红包</div>
            </li>
          </ul>
        </div>
        <div className={userName}>{name}</div>
        {/*<div className={userInfo}>
          <ul>
            <li>{name}</li>
            <li>{phone}</li>
            <li>{company}</li>
          </ul>
        </div>
        <div className={loginOut}>
          <Button className={wrapBtn}  size="sm" onClick={ this.handleClick.bind(this) }>注销</Button>
        </div>
        */}
        <div>
          <ul className={`${userBtnList} ${clearfix}`}>
            <li><Button shape="border" size="sm">桌面管理</Button></li>
            <li><Button shape="border" size="sm">切换账号</Button></li>
            <li>
              <Select
                defaultValue="系统设置"
                onChange={this.handleChange}
              >
                <Option value="account">账号</Option>
                <Option value="language">界面语言</Option>
                <Option value="message">消息</Option>
                <Option value="Cancel">注销</Option>
              </Select>
            </li>
          </ul>
        </div>
        <div className={"um-content" + ` ${tabContent}`}>

          <Tabs
            defaultActiveKey="1"
            onChange={this.callback}
            className="demo-tabs"
          >
            <TabPane tab='最近使用' key="1" className={tabPane1}>
              <ul>
                <li>
                  <Icon type="uf-rmb-s-o-2"></Icon>
                  <div className={`${used} ${clearfix}`}>
                    <div className={`${usedModule} ${clearfix}`}>
                      <div className={`${module} ${clearfix}`}>
                        <div className={usedTit}>结算中心</div>
                        <div className={lastTime}>1分钟前</div>
                      </div>
                      <div className={usedService}>核算服务</div>
                    </div>
                  </div>
                </li>
                <li>
                  <Icon type="uf-rmb-s-o-2"></Icon>
                  <div className={`${used} ${clearfix}`}>
                    <div className={`${usedModule} ${clearfix}`}>
                      <div className={`${module} ${clearfix}`}>
                        <div className={usedTit}>新增凭证</div>
                        <div className={lastTime}>30分钟前</div>
                      </div>
                      <div className={usedService}>报账服务</div>
                    </div>
                  </div>
                </li>
              </ul>
            </TabPane>
            <TabPane tab='推广服务' key="2" className={tabPane2}>
              <ul className={`${promotion} ${clearfix}`}>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>友空间</div>
                  </div>
                </li>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>智能服务</div>
                  </div>
                </li>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>相关服务</div>
                  </div>
                </li>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>相关服务</div>
                  </div>
                </li>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>相关服务</div>
                  </div>
                </li>
                <li>
                  <div className={serviceImg}>
                    <img/>
                    <div className={serviceName}>相关服务</div>
                  </div>
                </li>
              </ul>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default UserInfoContainer;
