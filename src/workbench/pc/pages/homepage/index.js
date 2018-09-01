import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps, getHost } from '@u';

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
    userInfo:{
      userAvator: '',
      userName: ''
    },
    match: {}
  };
  constructor(props) {
    super(props);
    this.userId = '';
    this.state = {
      brm: [{ name: '个人主页' }],
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

  componentWillMount(){
    const { key, userId } = this.props.match.params;
    this.getUserInfo(key, userId);
  }

  componentWillReceiveProps(nextProps) {
    // const userId = nextProps.match.params ? nextProps.match.params.userId : '';
    // const key = nextProps.match.params ? nextProps.match.params.key : '';
    // const { activetab } = this.state;
    // // 如果 新的key 和  新的userId  和之前的同时保持一致  则返回  
    // if(key === activetab && this.userId === userId) return;
    // // 如果新的key  和  当前保存的  activetab  不一致  设定为新的
    // if(this.userId === userId && key !== activetab){
    //   this.setState({
    //     activetab: key,
    //     iframeUrl: getHost(key),
    //   });
    //   return false;
    // }
    // // 当userId  发生变化  重新加载
    // if(this.userId !== userId){
    //   this.getUserInfo(key, userId);
    // }
  }

  getUserInfo = (key, userId) => {
    const { 
      getUserInfo,
      requestStart,
      requestSuccess,
      requestError,
    } = this.props;
    this.setState({
      activetab: key, 
      iframeUrl: getHost(key),
    });
    this.userId = userId;
    requestStart()
    getUserInfo(userId).then(({ error, payload }) => {
      if (error) {
        requestError(error);
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
    this.setState({
      activetab,
      iframeUrl: getHost(activetab),
    }, () => {
      this.props.history.push(`/homepage/${this.userId}/${activetab}`);
    });
  }

  renderTabs = () => {
    const { items, activetab } = this.state;
    return items.map(item =>{
      return (
        <li 
          key={item.key}
          onClick = {()=>{this.TabsClick(item.key)}}
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
        userName
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
                    <h6></h6>
                    <div>
                      <Button onClick={this.sendMessage}>发消息</Button>
                      <Button onClick={this.sendEmail}>发邮件</Button>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className={`${tabContent} um-content um-vbox`}>
              <ul>
                {this.renderTabs()}
              </ul>
              <div className="um-content">
                <IFrame title={activetab} url={`${iframeUrl}?userId=${this.userId}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
