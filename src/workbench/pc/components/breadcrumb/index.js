import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'tinper-bee';
import { breadcrumbClass,breadcrumbBack } from './style.css';

class Breadcrumbs extends Component {

  static propTypes = {
    goback: PropTypes.func,
    data:PropTypes.array
  }
  render() {
    const { goback, data} = this.props;
    return (
      <div className={breadcrumbClass} >
        <a onClick={goback} >返回</a>
        <span className={breadcrumbBack}>|</span>
        <Breadcrumb>
        {
          data.map(function(da,i){
            return (<Breadcrumb.Item key={"item"+i}>{da.name}</Breadcrumb.Item>)
          })
        }
        </Breadcrumb>
      </div>
    );
  }
}

export default Breadcrumbs;
