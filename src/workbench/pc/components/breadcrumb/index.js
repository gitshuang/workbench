import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'tinper-bee';
import { breadcrumbClass,breadcrumbClassIcon,breadcrumbBack } from './style.css';

class Breadcrumbs extends Component {

  static propTypes = {
    goback: PropTypes.node,
    breadcrumb: PropTypes.node,
    data:PropTypes.array
  }

  render() {
    const { breadcrumb, goback, data} = this.props;
    
    return (
      <div className={breadcrumbClass} >
        <a href={"###"} >返回</a>
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
