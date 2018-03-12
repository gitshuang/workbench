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

  //需要新增一个回退函数
  enhancedGoBack = (url,i) =>{
    let {goBackHistory } = this.props;
    if(url){
      this.props.goback(i)
      if(i == -1){
        JSON.stringify(goBackHistory)=='{}'? console.log("erroHistoryValue"):goBackHistory.go(-1);
      }else{
        let stateBrm = this.props.data;
        let backVal = stateBrm.length-1-i;
        JSON.stringify(goBackHistory)=='{}'? console.log("erroHistoryValue"):goBackHistory.go(-backVal);
        //this.props.goBackHistory.go(-backVal);
      }
    }else{
      return null;
    }
  }

  render() {
    const { goback, data} = this.props;
    let self = this;
    return (
      <div className={breadcrumbClass} >
        <a onClick={() => { self.enhancedGoBack('defaultUrl',-1) }} >返回</a>
        <span className={breadcrumbBack}>|</span>
        <Breadcrumb>
        {
          data.map(function({name, url},i){
            return (
              <Breadcrumb.Item
               key={`item${i}`}
               className={url ? `${itmeHover}` : ''}
               onClick={e=>self.enhancedGoBack(url,i)}>
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
