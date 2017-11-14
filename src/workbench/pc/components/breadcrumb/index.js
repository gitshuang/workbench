import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'tinper-bee';
import { breadcrumbClass,breadcrumbClassIcon,breadcrumbBack } from './style.css';

class Breadcrumbs extends Component {
  static propTypes = {
    goback: PropTypes.node,
    breadcrumb: PropTypes.node,
  }
  render() {
    const { breadcrumb, goback, } = this.props;
    return (
      <div className={breadcrumbClass} >
        <a href={"###"} >返回</a>
        <span className={breadcrumbBack}>|</span>
        <Breadcrumb>
          <Breadcrumb.Item>
            财务报表
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            新增凭证
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}

export default Breadcrumbs;
