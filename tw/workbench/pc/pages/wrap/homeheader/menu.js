import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

@connect(
  mapStateToProps(),
  {},
)
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div />
    );
  }
}
export default Menu;

