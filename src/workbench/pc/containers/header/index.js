import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Icon from 'pub-comp/icon';
import { mapStateToProps, getHost } from '@u';
import actions from 'store/root/actions';
import styles from './index.css';
import SearchContainer from 'containers/search';
import { QuickApplication } from 'diwork-business-components';
import { openService } from 'public/regMessageTypeHandler';

const {
  lebraNavbar,
  rightBtn,
} = styles;
const {
  showIm,
  hideIm,
  requestError,
  requestSuccess
} = actions;

@withRouter
@connect(
  mapStateToProps(
    'messageType',
    'imShowed',
    'portalInfo',
    'serviceList',
    {
      key: 'userInfo',
      value: (home, ownProps, root) => {
        return root.home.userInfo
      }
    },
  ),
  {
    showIm,
    hideIm,
    requestError,
    requestSuccess
  }
)
class HeaderContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }
  
  static defaultProps = {
    iconName: "home",
  }

  constructor(props) {
    super(props);
    this.state = {
      quickText: {
        title: '快捷应用',
        all: '全部应用',
        more: '更多应用'
      }
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.refs.IM.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });
  }

  toggleIM = (e) => {
    e.stopPropagation();
    const {
      imShowed,
      showIm,
      hideIm,
    } = this.props;
    if (imShowed) {
      hideIm();
    } else {
      showIm();
    }
  }

  // 调用快捷应用  打开全部应用
  openAllFn = () => {
    this.props.history.push('/application');
  }
  // 调用快捷应用 点击单独每个应用
  openServiceFn = (applicationCode) => {
    openService(applicationCode, 2);
    // this.props.history.push(`/app/${applicationCode}`);
  }

  render() {
    const {
      children,
      onLeftClick,
      onLeftTitleClick,
      iconName,
      leftContent,
      rightContent,
      messageType,
      imShowed,
      portalInfo,
      serviceList,
      userInfo,
    } = this.props;
    const rightArray = Children.toArray(rightContent);
    // const { portalUrl } = portalInfo;
    const portalUrl = getHost('yzone');
    let imClass = imShowed ? "active tc" : "tc";
    const homeStyle = userInfo && userInfo.allowTenants && userInfo.allowTenants.length ? "inline-block" : 'none';
    const rightContents = rightArray.concat(
      <SearchContainer />,
      <div className={`${rightBtn}`} style= {{marginRight: "15px",display:homeStyle}}>
        <a href={portalUrl} target="_blank" style={{ "textDecoration": "none" }}>
          <Icon title="我的门户" type="Friends-space" style={{ fontSize: "18px" }} />
        </a>
      </div>,
      <QuickApplication
        quickText={this.state.quickText}
        serviceList={serviceList} 
        openAllFn={this.openAllFn} 
        openServiceFn={this.openServiceFn} 
      />,
      <div ref="IM" className={`${imClass} ${rightBtn}`} onClick={this.toggleIM}>
        <Icon title="智能通讯" type="clock" style={{  }} />
        <span className="CircleDot" style={{ display: messageType ? 'block' : 'none' }}></span>
      </div>,
    );
    return (
      <Header
        className={lebraNavbar}
        mode="light"
        iconName={iconName}
        leftContent={leftContent}
        rightContent={
          rightContents.map((child, i) => cloneElement(child, { key: i }))
        }
        onLeftTitleClick={onLeftTitleClick ? onLeftTitleClick : onLeftClick}
        onLeftClick={onLeftClick}>

        {children}
      </Header>
    );
  }
}

export default HeaderContainer;
