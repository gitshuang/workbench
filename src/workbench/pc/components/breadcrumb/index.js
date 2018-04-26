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
  //标配
  goBack = () => {
    this.props.history.replace('');
  }

  //需要新增一个回退函数
  enhancedGoBack = (url,i) =>{
    let {goback ,data} = this.props;
    let customBrmUrl = url;
    if(!url){
       return null;
    }else{
      let backVal = data.length-1-i;
      if(goback){
        i==-1 ? goback(i,1) :goback(i,backVal)
      }else{
        this.goBack();
      }
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
            let itemProps = {
              key: `item${i}`,
              className: '',
              children: name
            };
            if (i != data.length - 1 && url) {
              itemProps = {
                ...itemProps,
                onClick: ()=>{
                  return self.enhancedGoBack(url,i);
                },
                className: itmeHover,
              };
            }
            return (
              <Breadcrumb.Item {...itemProps}/>
            );
          })
        }
        </Breadcrumb>
      </div>
    );
  }
}

export default Breadcrumbs;
