import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Icon from 'components/icon';
import { noop, mapStateToProps } from '@u';
import actions from 'store/root/actions';
import styles from './index.css';
import SearchContainer from 'containers/search';
const {
  lebraNavbar,
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

  openService(event) {
    const { changeQuickServiceDisplay, quickServiceDisplay, changeQuickServiceHidden } = this.props;
    if(quickServiceDisplay){
      changeQuickServiceHidden();
    } else {
      changeQuickServiceDisplay();
    }
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
      messageType
    } = this.props;

    const rightArray = Children.toArray(rightContent);
    let appClass = quickServiceDisplay ? "active tc" : "tc"
    const rightContents = rightArray.concat(
      <SearchContainer />,
      <div className={appClass} style={{marginRight:"15px"}} onClick = {(e) =>{this.openService(e)}} ><Icon type="application" /></div>,
      <div className="tc">
        <Icon type="clock" />
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
