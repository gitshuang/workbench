import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Button from 'bee-button';
import { Con, Row, Col } from 'bee-layout';

import { serviceItem,serviceItemTitle,item_li_top,item_footer,item_left,item_right,
  icon,up_icon} from './style.css'

class ServiceItem extends Component {

  // 1，已存在，
  // 2，未添加，
  // 3，本次勾选
  // 点击 本次取消

  constructor(props) {
      super(props); 
  }

  packUp=()=>{

  }

  render() {
    // const {serviceId, serviceName,selected} = this.props.data;
    const {data:{serviceId, serviceName,selected ,serviceType,serviceIcon,extend} }  = this.props;
    let btn = null;
    if(selected){
      if(selected == "1"){
        //  btn = (<div >
        //     <span>已添加</span>
        //     <Icon title="已添加"  type="pin2" style={{color:"rgba(117,127,140,1)"}} />
        //  </div>);
        {serviceType=="2"?
          btn = (<div >
                <span>已添加</span>
                <Icon title="已添加"  type="pin2" style={{color:"rgba(117,127,140,1)"}} />
            </div>):
          btn = (<div >
              <Icon title="已添加"  type="pin2" style={{color:"rgba(117,127,140,1)"}} />
              <span>已添加</span>
            </div>)};
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

    let upIcon = serviceType=="2"?<Icon className={up_icon} type={extend?"pull-down":"upward"} title={ extend ? '展开' : '收起' } onClick={()=>{this.props.packUp(this.props.data)}}></Icon>:null;
    let _style = serviceType=="2"?null:extend?{display:"none"}:null;
    return (
       <div className={serviceType=="2"?serviceItemTitle:serviceItem} style={{..._style}}>
            <div className={item_li_top}>
                <img className={icon} src={serviceIcon}/>
                <div className={item_right}>
                    {serviceName}
                </div>
            </div>
             <div className={item_footer}>
                {btn}
             </div>
             {upIcon}
       </div>
    );
  }
}

export default ServiceItem;
