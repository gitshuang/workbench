import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Icon from 'pub-comp/icon';
import { noop, mapStateToProps } from '@u';
import actions from 'store/root/actions';
import styles from './index.css';
import SearchContainer from 'containers/search';
import QuickApplication from 'containers/quickApplication';

const {
  lebraNavbar,
  rightBtn,
} = styles;
const {
  changeQuickServiceDisplay,
  changeQuickServiceHidden,
  showIm,
  hideIm,
  getPortal,
  requestError,
  requestSuccess
} = actions;

@connect(
  mapStateToProps(
    'quickServiceDisplay',
    'messageType',
    'imShowed',
    'portalEnable',
    'serviceList',
  ),
  {
    changeQuickServiceHidden,
    changeQuickServiceDisplay,
    showIm,
    hideIm,
    getPortal,
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
    const { getPortal, requestError, requestSuccess } = this.props;
    getPortal().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      } else {
        requestSuccess();
      }
    });
  }

  componentDidMount() {
    this.refs.IM.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });
  }

  // openService = () => {
  //   const { changeQuickServiceDisplay, quickServiceDisplay, changeQuickServiceHidden } = this.props;
  //   if (quickServiceDisplay) {
  //     changeQuickServiceHidden();
  //   } else {
  //     changeQuickServiceDisplay();
  //   }
  // }

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

  render() {
    const {
      children,
      changeQuickServiceDisplay,
      onLeftClick,
      onLeftTitleClick,
      iconName,
      leftContent,
      rightContent,
      quickServiceDisplay,
      messageType,
      color,
      imShowed,
      portalEnable,
      serviceList
    } = this.props;
    const rightArray = Children.toArray(rightContent);
    let appClass = quickServiceDisplay ? "active tc" : "tc";
    let imClass = imShowed ? "active tc" : "tc";
    const rightContents = rightArray.concat(
      <SearchContainer />,
      <QuickApplication serviceList={serviceList} />,
      <div ref="IM" className={`${imClass} ${rightBtn}`} style={{ marginRight: "25px" }} onClick={this.toggleIM}>
        <Icon title="智能通讯" type="clock" style={{ color }} />
        <span className="CircleDot" style={{ display: messageType ? 'block' : 'none' }}></span>
      </div>,
      <div className={`${rightBtn}`} style= {{"display":portalEnable ? "block": "none"}}>
        <a href={`http://ec.diwork.com/`} target="_blank" style={{ "textDecoration": "none" }}>
          <Icon title="我的门户" type="change" style={{ color }} />
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
