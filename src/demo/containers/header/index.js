import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from 'components/header';
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
    return (
      <Header title={ title }>
        {
          Children.map(children, child => cloneElement(child))
        }
        <button position="right" onClick={changeQuickServiceDisplay}>快捷服务</button>
      </Header>
    );
  }
}

export default connect(
  ()=>({}),
  {
    changeQuickServiceDisplay,
  }
)(HeaderContainer);
