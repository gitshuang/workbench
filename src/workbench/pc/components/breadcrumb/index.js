import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'bee/breadcrumb';
import { breadcrumbClass,breadcrumbBack ,itmeHover} from './style.css';

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
        <a onClick={() => { goback(-1) }} >返回</a>
        <span className={breadcrumbBack}>|</span>
        <Breadcrumb>
        {
          data.map(function({name, url},i){
            return (
              <Breadcrumb.Item
               key={`item${i}`}
               className={url ? `${itmeHover}` : ''}
               onClick={url ? () => { goback(i) }: null}>
                {name}
              </Breadcrumb.Item>
            );
          })
        }
        </Breadcrumb>
      </div>
    );
  }
}

export default Breadcrumbs;
