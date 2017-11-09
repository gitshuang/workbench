import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'tinper-bee';
import { breadcrumbClass,breadcrumbClassIcon } from './style.css';

class Breadcrumbs extends Component {
  static propTypes = {
    goback: PropTypes.node,
    breadcrumb: PropTypes.node,
  }
  render() {
    const { breadcrumb, goback, } = this.props;
    return (
      <div className={breadcrumbClass} >
        <i className={`${breadcrumbClassIcon} uf uf-navmenu`} />
        <Breadcrumb>
          <Breadcrumb.Item href="#">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            Data
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}

export default Breadcrumbs;
