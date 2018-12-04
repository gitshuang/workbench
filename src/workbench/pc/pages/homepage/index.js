import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps, getHost, getContext } from '@u';

import { trigger } from 'public/componentTools';
import { openService, openIframe } from 'public/regMessageTypeHandler';

import rootActions from 'store/root/actions';
import homepageActions from 'store/root/homepage/actions';

import Button from 'pub-comp/button';
// import Tabs, { TabPane } from 'bee/tabs';
import Header from 'containers/header';
import BreadcrumbContainer from 'components/breadcrumb';
import IFrame from 'components/iframe_other';

import { umContent, content, user, info, tabContent, active } from './style.css';
import bg from 'assets/image/homepage.png';
import userinfo from 'assets/image/userinfo.png';

const { requestStart, requestSuccess, requestError } = rootActions;
const { getUserInfo } = homepageActions;

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    {
      namespace: 'homepage',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getUserInfo,
  },
)
class HomePage extends Component {
  static propTypes = {
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getUserInfo: PropTypes.func,
    history: PropTypes.shape({
      go: PropTypes.func,
      push: PropTypes.func,
      replace: PropTypes.func,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    routes: PropTypes.arrayOf(PropTypes.object),
    userInfo: PropTypes.shape({
      userAvator: PropTypes.string,
      name: PropTypes.string,
    }),
    match: PropTypes.shape({

    }),
  };
  static defaultProps = {
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getUserInfo: () => { },
    history: {},
    location: {},
    routes: [],
    userInfo: {
      userAvator: '',
      userName: '',
    },
    match: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      isSelf: false,
      activetab: 'info',
      iframeUrl: '',
    };
    this.style = {
      height: window.innerHeight - 118, //118 80 + 37 + 1 1是为了留黑线
    };
    this.items = [
      {
        key: 'info',
        label: '资料',
      },
      {
        key: 'speak',
        label: '发言',
      },
      {
        key: 'honor',
        label: '荣耀',
      }
    ];
    this.brm = [{ name: '个人主页' }];
    this.isRe = false;
    this.historys = [];
    this.storageArr = [];
  }

  componentWillMount() {
    const { key, userId } = this.props.match.params;
    this.setState({
      activetab: key,
      iframeUrl: this.urlPack(getHost(key)),
    });
    this.getUserInfo(userId);
    // 加载页面将userId 传入
    this.storageArr.push(userId);
  }

  componentDidMount() {
    window.addEventListener('popstate', this.forbidBack);
  }

  componentWillReceiveProps(nextProps) {
    const newUserId = nextProps.match.params ? nextProps.match.params.userId : '';
    const {
      userInfo: {
        userId
      }
    } = this.props;
    // 当前窗口搜索其他人做更改
    if (userId && newUserId && newUserId !== userId && !this.isRe) {
      this.getUserInfo(newUserId);
      // 数组保证长度 -1, 所以将userid传递  为了实现倒退到最后一个直接跳出
      if (!this.storageArr.includes(newUserId)) {
        this.historys.push(userId);
        this.storageArr.push(newUserId);
      }
    }
    const key = nextProps.match.params ? nextProps.match.params.key : '';
    const { activetab } = this.state;
    // 切换用户  让地址栏和tabs 保持一致
    if (activetab && key && key !== activetab) {
      this.setState({
        activetab: key,
        iframeUrl: this.urlPack(getHost(key)),
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.forbidBack);
  }

  forbidBack = () => {
    history.pushState(null, null, document.URL);
  }

  urlPack = (url) => {
    return url.indexOf('?') > -1 ? `${url}&` : `${url}?`
  }

  getUserInfo = (userId) => {
    const {
      getUserInfo,
      requestStart,
      requestSuccess,
      requestError,
    } = this.props;
    const { userid } = getContext();
    // 判断是不是本人
    this.setState({
      isSelf: !!(userId === userid),
    });
    // 为了控制nexprops不再重复请求
    this.isRe = true;
    requestStart();
    getUserInfo(userId).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      requestSuccess();
      this.isRe = false;
    });
  }

  goBack = () => {
    const { history } = this.props;
    // 设定pop为true
    this.pop = true;
    if (this.historys.length) {
      // 将historys 去掉最后一个  并取出来
      const lastHistory = this.historys.pop();
      this.storageArr.pop();
      history.replace(`/homepage/${lastHistory}/info`);
    } else {
      history.replace('');
    }
    // this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  // 点击tabs 分类
  TabsClick = (activetab) => {
    const { userId } = this.props.userInfo;
    const { activetab: prevactivetab } = this.state;
    if (prevactivetab === activetab) {
      return false;
    }
    this.setState({
      activetab,
      iframeUrl: this.urlPack(getHost(activetab)),
    }, () => {
      this.props.history.push(`/homepage/${userId}/${activetab}`);
    });
  }

  sendMessage = () => {
    const { userId } = this.props.userInfo;
    trigger('IM', 'switchChatTo', {
      yht_id: userId,
    });
  }

  sendEmail = () => {
    openService('XTWEIYOU0000000000');
  }

  sendHonor = () => {
    // console.log(1);
    const { userId } = this.props.userInfo;
    const url = getHost("sendHonor");
    openIframe({
      id: 'honor',
      url: url,
      backdrop: true,
      pageParam: {
        name: 'malong',
        userId: userId,
      }
    });
  }

  renderTabs = () => {
    const { activetab } = this.state;
    return this.items.map(item => {
      return (
        <li
          key={item.key}
          onClick={() => { this.TabsClick(item.key) }}
          className={item.key === activetab ? active : ''}
        >
          {item.label}
        </li>
      )
    });
  }

  render() {
    const { activetab, iframeUrl } = this.state;
    const {
      userInfo: {
        userAvator,
        userName,
        company,
        userId
      },
    } = this.props;
    if (!userId) return null;
    return (
      <div className='' style={{ overflow: 'auto' }}>
        {/* <div className="header">
          <Header onLeftClick={this.goHome} >
            <div>
              <span>{`${userName}的个人主页`}</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <BreadcrumbContainer data={this.brm} goback={this.goBack} />
          </div>
        </div> */}
        <div className={`${umContent} content`}>
          <div className={`${content}`}>
            <div className={user} id='user'>
              <img src={bg} />
              <div className={info}>
                <dl className="clearfix">
                  <dt>
                    <img src={userAvator || userinfo} />
                  </dt>
                  <dd>
                    <h5>{userName}</h5>
                    <h6>{company}</h6>
                    {
                      this.state.isSelf
                        ?
                        null
                        :
                        <div>
                          <Button onClick={this.sendMessage}>发消息</Button>
                          <Button onClick={this.sendEmail}>发邮件</Button>
                          <Button onClick={this.sendHonor}>发荣耀</Button>
                        </div>
                    }
                  </dd>
                </dl>
              </div>
            </div>
            <div className={`${tabContent}`}>
              <ul>
                {this.renderTabs()}
              </ul>
              <div style={this.style}>
                {/* {this.renderIframe()} */}
                < IFrame
                  title={activetab}
                  url={`${iframeUrl}userId=${userId}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
