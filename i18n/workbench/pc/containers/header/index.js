import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Icon from 'pub-comp/icon';
import { noop, mapStateToProps } from '@u';
import actions from 'store/root/actions';
import styles from './index.css';
import SearchContainer from 'containers/search';
import { QuickApplication } from 'diwork-business-components';

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
    'portalEnable',
    'serviceList',
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

  constructor(props) {
    super(props);
    this.state = {
    
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
    this.props.history.push(`/app/${applicationCode}`);
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
      color,
      imShowed,
      portalEnable,
      serviceList
    } = this.props;
    const rightArray = Children.toArray(rightContent);
    let imClass = imShowed ? "active tc" : "tc";
    const rightContents = rightArray.concat(
      <SearchContainer />,
      <QuickApplication 
        serviceList={serviceList} 
        openAllFn={this.openAllFn} 
        openServiceFn={this.openServiceFn} 
      />,
      <div ref="IM" className={`${imClass} ${rightBtn}`} onClick={this.toggleIM}>
        <Icon title="$i18n{index.js0}$i18n-end" type="clock" style={{ color }} />
        <span className="CircleDot" style={{ display: messageType ? 'block' : 'none' }}></span>
      </div>,
      <div className={`${rightBtn}`} style= {{marginLeft: "20px","display":portalEnable ? "inline-block": "none"}}>
        <a href={`http://ec.diwork.com/`} target="_blank" style={{ "textDecoration": "none" }}>
          <Icon title="$i18n{index.js1}$i18n-end" type="change" style={{ color }} />
        </a>
      </div>
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
