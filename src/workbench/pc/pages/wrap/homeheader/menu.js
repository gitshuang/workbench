import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import Icon from 'pub-comp/icon';
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
      <div>
        <Icon type='master' />
      </div>
    );
  }
}
export default Menu;

