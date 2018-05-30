import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import Button from 'bee/button';

import { serviceItem,serviceItemTitle,item_li_top,item_footer,item_footer_app,item_left,item_right,
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
    const {data:{serviceId, serviceName,selected ,serviceType,serviceIcon,extend,service} ,arrow}  = this.props;
    let btn = null;
    if(selected){
      if(selected == "1"){
        //  btn = (<div >
        //     <span>已添加</span>
        //     <Icon title="已添加"  type="pin2" style={{color:"rgba(117,127,140,1)"}} />
        //  </div>);
        {serviceType=="2"?
          btn = (<div >
                <span>$i18n{index.js0}$i18n-end</span>
                <Icon title="$i18n{index.js1}$i18n-end"  type="pin2" style={{color:"rgba(117,127,140,1)"}} />
            </div>):
          btn = (<div >
              <Icon title="$i18n{index.js2}$i18n-end"  type="pin2" style={{color:"rgba(117,127,140,1)"}} />
              <span>$i18n{index.js3}$i18n-end</span>
            </div>)};
      }else if(selected == "2"){
        btn = (<div onClick={()=>{this.props.onChange(this.props.data,"3")}}  >
        <Icon title="$i18n{index.js4}$i18n-end" type="pin" style={{cursor:"pointer"}} /> </div>);
      }else if(selected == "3"){
        btn = (<div onClick={()=>{this.props.onChange(this.props.data,"2")}}  >
        <Icon title="$i18n{index.js5}$i18n-end" type="pin2" style={{cursor:"pointer"}} /> </div>);
      }
    }else{//$i18n{index.js6}$i18n-endselected$i18n{index.js7}$i18n-end2
       btn = (<div onClick={()=>{this.props.onChange(this.props.data,"3")}}  >
        <Icon title="$i18n{index.js8}$i18n-end" type="pin" style={{cursor:"pointer"}} /> </div>);
    }

    let upIcon = serviceType=="2"?<Icon className={up_icon} type={extend?"pull-down":"upward"} title={ extend ? '$i18n{index.js9}$i18n-end' : '$i18n{index.js10}$i18n-end' } onClick={()=>{this.props.packUp(this.props.data)}}></Icon>:null;
    let _style = serviceType=="2"?null:extend?{display:"none"}:null;
    let _app = service && service.length == 0?item_footer_app:""
    return (
       <div className={serviceType=="2"?serviceItemTitle:serviceItem} style={{..._style}}>
            <div className={item_li_top}>
                <img className={icon} src={serviceIcon}/>
                <div className={item_right}>
                    {serviceName}
                </div>
            </div>
             <div className={`${item_footer} ${_app}`}>
                {btn}
             </div>
             {
               arrow?upIcon:''
             }
       </div>
    );
  }
}

export default ServiceItem;
