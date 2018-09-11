import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps, getHost, getContext } from '@u';

import { trigger } from 'public/componentTools';
import { openService, openIframe, getPageParam } from 'public/regMessageTypeHandler';

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
      brm: [{ name: '个人主页' }],
      isSelf: false,
      activetab: 'info',
      iframeUrl: '',
      items: [
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
      ],
    };
  }

  componentWillMount() {
    const { key, userId } = this.props.match.params;
    this.setState({
      activetab: key,
      iframeUrl: getHost(key),
    });
    this.getUserInfo(userId);
  }

  componentWillReceiveProps(nextProps) {
    const newUserId = nextProps.match.params ? nextProps.match.params.userId : '';
    const key = nextProps.match.params ? nextProps.match.params.key : '';
    const { activetab } = this.state;
    const {
      userInfo: {
        userId
      }
    } = this.props;

    // 当前窗口搜索其他人做更改
    if (userId && newUserId && newUserId !== userId) {
      this.getUserInfo(newUserId);
    }
    // 点击返回按钮  让地址栏和tabs 保持一致
    if (activetab && key && key !== activetab) {
      this.setState({
        activetab: key,
        iframeUrl: getHost(key),
      });
    }
  }

  getUserInfo = (userId) => {
    const {
      getUserInfo,
      requestStart,
      requestSuccess,
      requestError,
    } = this.props;
    const { userid } = getContext();
    this.setState({
      isSelf: !!(userId === userid),
    });
    requestStart();
    getUserInfo(userId).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      requestSuccess();
    });
  }

  goBack = () => {
    this.props.history.goBack();
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
      iframeUrl: getHost(activetab),
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
    const { items, activetab } = this.state;
    return items.map(item => {
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
    const { brm, activetab, iframeUrl } = this.state;
    const {
      userInfo: {
        userAvator,
        userName,
        company,
        userId
      },
    } = this.props;
    return (
      <div className="um-win">
        <div className="um-header header">
          <Header onLeftClick={this.goHome} iconName="computer" >
            <div>
              <span>{`${userName}的个人主页`}</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <BreadcrumbContainer data={brm} goback={this.goBack} />
          </div>
        </div>
        <div className={`${umContent} content um-vbox um-content`}>
          <div className={`${content} um-vbox um-content`}>
            <div className={user}>
              <img src={bg} />
              <div className={info}>
                <dl className="clearfix">
                  <dt>
                    <img src={userAvator || userinfo} alt />
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
            <div className={`${tabContent} um-content um-vbox`}>
              <ul>
                {this.renderTabs()}
              </ul>
              <div className="um-content">
                <IFrame title={activetab} url={`${iframeUrl}?userId=${userId}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
