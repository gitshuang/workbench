import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from 'components/navbar';
import Icon from 'components/icon';
import { noop } from '@u';
import actions from 'store/root/actions';

const {
  changeQuickServiceDisplay,
} = actions;

class HeaderContainer extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
  }
  render() {
    const { children, title, changeQuickServiceDisplay } = this.props;
    const children2Array = Children.toArray(children);
    const leftContent = children2Array.filter(
      (v) => v.props.position === undefined || v.props.position === 'left'
    );
    const rightContent = children2Array.filter(
      (v) => v.props.position === 'right'
    ).concat(<Icon type="quanzi" onClick={changeQuickServiceDisplay} />);

    return (
      <div className="header">
        <NavBar
          mode="light"
          iconName={<Icon type="touxiang1" />}
          leftContent={
            leftContent.map((child, i) => cloneElement(child, { key: i }))
          }
          rightContent={
            rightContent.map((child, i) => cloneElement(child, { key: i }))
          }
        >{ title }</NavBar>
      </div>
    );
  }
}

export default connect(
  ()=>({}),
  {
    changeQuickServiceDisplay,
  }
)(HeaderContainer);
