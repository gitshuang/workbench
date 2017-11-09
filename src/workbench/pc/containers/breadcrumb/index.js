import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumbs  from 'components/breadcrumb';
import Icon from 'components/icon';
import { noop } from '@u';
import actions from 'store/root/actions';


class BreadcrumbContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    const { children} = this.props;
    /*const leftContent = children2Array.filter(
      (v) => v.props.position === 'left'
    );*/

    return (
      <div className="breadcrumb">
        <Breadcrumbs />
      </div>
    );
  }
}

export default connect(
  ()=>({}),
  {

  }
)(BreadcrumbContainer);
