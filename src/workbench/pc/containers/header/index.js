import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from 'components/navbar';
import Icon from 'components/icon';
import { noop, mapStateToProps } from '@u';
import actions from 'store/root/actions';

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
    const { children, changeQuickServiceDisplay, onLeftClick,iconName,leftContent } = this.props;
    const children2Array = Children.toArray(children);
    /*const leftContent = children2Array.filter(
      (v) => v.props.position === 'left'
    );*/
    const rightContent = children2Array.filter(
      (v) => v.props.position === 'right'
    ).concat(<Icon type="quanzi" onClick={ (e) =>{this.openService(e)} }/>);

    let centerContent = children2Array.filter(
      (v) => v.props.position === 'center'
    );
    /*
    centerContent = centerContent.reduce((result, item) => {
      if (item.props.icon) {
        return result.concat( <Icon type= {item.props.icon} />)
      }
      return result;
    }, centerContent);
  */
    return (
      <div className="header">
        <NavBar
          mode="light"
          iconName={ iconName }
          leftContent={ leftContent }
          rightContent={
            rightContent.map((child, i) => cloneElement(child, { key: i }))
          }
          onLeftClick={ onLeftClick }>
          { centerContent.map((child, i) => cloneElement(child, { key: i })) }
        </NavBar>
      </div>
    );
  }
}

export default connect(mapStateToProps(
  'quickServiceDisplay'
),
  {
    changeQuickServiceDisplay,
  }
)(HeaderContainer);
