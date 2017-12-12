import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Button from 'bee-button';
import { Con, Row, Col } from 'bee-layout';

import { serverItem,item_li_top,item_footer,item_left,item_right} from './style.css'

class ServerItem extends Component {

  // 1，已存在，
  // 2，为添加，
  // 3，本次勾选
  // 4，本次取消

  constructor(props) {
      super(props);
  }

  render() {
    const {serveId, serveName,selected} = this.props.data;
    let btn = null;
    if(selected){
       btn = (<div >
          <Icon title="已添加"  type="pin" />
          <span>已添加</span>
       </div>) ;
    }else{
      btn = (<div onClick={()=>{this.props.onChange(this.props.data)}}  >
      <Icon title="未添加" type="pin2" style={{cursor:"pointer"}} /> </div>);
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
