import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Icon from 'pub-comp/icon';
import { noop, mapStateToProps } from '@u';
import actions from 'store/root/actions';
import styles from './index.css';
import SearchContainer from 'containers/search';
const {
  lebraNavbar,
  rightBtn,
} = styles;
const {
  changeQuickServiceDisplay,
  changeQuickServiceHidden,
  showIm,
  hideIm,
} = actions;

@connect(
  mapStateToProps(
    'quickServiceDisplay',
    'messageType',
    'imShowed',
  ),
  {
    changeQuickServiceHidden,
    changeQuickServiceDisplay,
    showIm,
    hideIm,
  }
)
class HeaderContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }
  componentDidMount() {
    this.refs.IM.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });
  }
  openService = () => {
    const { changeQuickServiceDisplay, quickServiceDisplay, changeQuickServiceHidden } = this.props;
    if(quickServiceDisplay){
      changeQuickServiceHidden();
    } else {
      changeQuickServiceDisplay();
    }
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
  openWay = () => {

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
    } = this.props;
    const rightArray = Children.toArray(rightContent);
    let appClass = quickServiceDisplay ? "active tc" : "tc"
    let imClass = imShowed ? "active tc" : "tc"
    const rightContents = rightArray.concat(
      <SearchContainer color={color} />,
      <div className={`application-btn ${appClass} ${rightBtn}`} style={{marginRight:"15px"}} onClick = {this.openService} >
        <Icon title="快捷应用" type="application" style={{"color":color}}/>
      </div>,
      <div ref="IM" className={`${imClass} ${rightBtn}`} style={{marginRight:"25px"}} onClick={this.toggleIM}>
        <Icon title="智能通讯" type="clock" style={{color}}/>
        <span className="CircleDot" style={{ display: messageType ? 'block' : 'none' }}></span>
      </div>,
      <div className={`${rightBtn}`} onClick={this.openWay}>
        <Icon title="我的门户" type="change" style={{color}} />
      </div>
    );
    return (
        <Header
          className={lebraNavbar}
          mode="light"
          iconName={ iconName }
          leftContent={ leftContent }
          rightContent={
            rightContents.map((child, i) => cloneElement(child, { key: i }))
          }
          onLeftTitleClick={onLeftTitleClick?onLeftTitleClick:onLeftClick}
          onLeftClick={ onLeftClick }>

          { children }
        </Header>
    );
  }
}

export default HeaderContainer;
