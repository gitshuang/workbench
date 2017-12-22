import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Icon from 'components/icon';
import { noop, mapStateToProps } from '@u';
import actions from 'store/root/actions';
import styles from './index.css';
import SearchContainer from 'containers/search';
import { trigger } from 'public/componentTools';
const {
  lebraNavbar,
  rightBtn,
} = styles;
const {
  changeQuickServiceDisplay,
  changeQuickServiceHidden,
} = actions;

@connect(
  mapStateToProps(
    'quickServiceDisplay',
    'messageType',
  ),
  {
    changeQuickServiceHidden,
    changeQuickServiceDisplay,
  }
)
class HeaderContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  openService = () => {
    const { changeQuickServiceDisplay, quickServiceDisplay, changeQuickServiceHidden } = this.props;
    if(quickServiceDisplay){
      changeQuickServiceHidden();
    } else {
      changeQuickServiceDisplay();
    }
  }
  toggleIM = () => {
    trigger('IM', 'imToggle');
  }

  render() {
    const {
      children,
      changeQuickServiceDisplay,
      onLeftClick,
      iconName,
      leftContent,
      rightContent,
      quickServiceDisplay,
      messageType,
      color
    } = this.props;
    const rightArray = Children.toArray(rightContent);
    let appClass = quickServiceDisplay ? "active tc" : "tc"
    const rightContents = rightArray.concat(
      <SearchContainer color={color} />,
      <div className={`${appClass} ${rightBtn}`} style={{marginRight:"15px"}} onClick = {this.openService} >
        <Icon title="快捷应用" type="application" style={{"color":color}}/>
      </div>,
      <div className={`tc ${rightBtn}`} onClick={this.toggleIM}>
        <Icon title="智能通讯" type="clock" style={{"color":color}}/>
        <span className="CircleDot" style={{ display: messageType ? 'block' : 'none' }}></span>
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
          onLeftClick={ onLeftClick }>

          { children }
        </Header>
    );
  }
}

export default HeaderContainer;
