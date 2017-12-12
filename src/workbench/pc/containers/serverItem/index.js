import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Button from 'bee-button';
import { Con, Row, Col } from 'bee-layout';

import { serverItem,item_li_top,item_footer,item_left,item_right} from './style.css'

class ServerItem extends Component {

  // 1，已存在，
  // 2，未添加，
  // 3，本次勾选
  // 4，本次取消

  constructor(props) {
      super(props);
  }

  render() {
    const {serveId, serveName,selected} = this.props.data;
    console.log("=====ServerItem========this.props.data============");
    console.log(this.props.data);
    let btn = null;
    if(selected){
      if(selected == "1"){
         btn = (<div >
            <Icon title="已添加"  type="pin2" style={{color:"rgba(117,127,140,1)"}} />
            <span>已添加</span>
         </div>);
      }else if(selected == "2"){
        btn = (<div onClick={()=>{this.props.onChange(this.props.data,"3")}}  >
        <Icon title="未添加" type="pin" style={{cursor:"pointer"}} /> </div>);
      }else if(selected == "3"){
        btn = (<div onClick={()=>{this.props.onChange(this.props.data,"2")}}  >
        <Icon title="添加" type="pin2" style={{cursor:"pointer"}} /> </div>);
      }
    }else{//如果没有selected，就显示2
       btn = (<div onClick={()=>{this.props.onChange(this.props.data,"3")}}  >
        <Icon title="未添加" type="pin" style={{cursor:"pointer"}} /> </div>);
    }
    

    return (
       <div className={serverItem}>
            <div className={item_li_top}>


                <div className={item_right}>
                    {serveName}
                </div>
            </div>
             <div className={item_footer}>
                {btn}
             </div>
       </div>
    );
  }
}

export default ServerItem;
