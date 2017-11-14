import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from 'components/navbar';
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
} = actions;

class HeaderContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  openService(event) {

    const { changeQuickServiceDisplay, quickServiceDisplay } = this.props;
    if( !quickServiceDisplay ){
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
      searchDisplay,
      messageType
    } = this.props;

    /*
    const children2Array = Children.toArray();
    const leftContent = children2Array.filter(
      (v) => v.props.position === 'left'
    );
    let centerContent = children2Array.filter(
     (v) => v.props.position === 'center'
    );
    centerContent = centerContent.reduce((result, item) => {
      if (item.props.icon) {
        return result.concat( <Icon type= {item.props.icon} />)
      }
      return result;
    }, centerContent);
    const rightContent = children2Array.filter(
      (v) => v.props.position === 'right'
    ).concat(
      <div className="tc" style={{marginRight:"15px"}}><Icon type="search" /></div>,
    );
    */
    const rightArray = Children.toArray(rightContent);
    let appClass = quickServiceDisplay ? "active tc" : "tc"
    const rightContents = rightArray.concat(
      <SearchContainer />,
      <div className={appClass} style={{marginRight:"15px"}} onClick = {(e) =>{this.openService(e)}} ><Icon type="yingyong" /></div>,
      <div className="tc">
        <Icon type="xiaoxi" />
        <span className="CircleDot" style={{ display: messageType ? 'block' : 'none' }}></span>
      </div>
    );
    return (
        <NavBar
          className={lebraNavbar}
          mode="light"
          iconName={ iconName }
          leftContent={ leftContent }
          rightContent={
            rightContents.map((child, i) => cloneElement(child, { key: i }))
          }
          onLeftClick={ onLeftClick }>
          { children }
        </NavBar>
    );
  }
}

export default connect(mapStateToProps(
  'quickServiceDisplay',
  'searchDisplay',
  'messageType',
),
  {
    changeQuickServiceDisplay,
  }
)(HeaderContainer);
