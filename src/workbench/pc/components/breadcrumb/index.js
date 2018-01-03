import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'bee-breadcrumb';
import { breadcrumbClass,breadcrumbBack ,itme_hover} from './style.css';

/**
 * data:{name:"",url:""}
 */
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
            let itme = da.url?<Breadcrumb.Item className={itme_hover} key={"item"+i} href={da.url} >{da.name}</Breadcrumb.Item>:<Breadcrumb.Item key={"item"+i} >{da.name}</Breadcrumb.Item>
            return (itme);
          })
        }
        </Breadcrumb>
      </div>
    );
  }
}

export default Breadcrumbs;
