import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import BeeIcon from 'components/icon';
import Button from 'bee-button';
import { Con, Row, Col } from 'bee-layout';

import { serverItem,item_li_top,item_footer,item_left,item_right} from './style.css'

class ServerItem extends Component {


  constructor(props) {
      super(props);
  }
  
  render() {
    const {serveId, serveName,selected} = this.props.data;
    let btn = null;
    if(selected){
       btn = (<div onClick={()=>{this.props.onChange(this.props.data)}}  >
          <BeeIcon type="pin" />
       "已添加"</div>) ;
    }else{
      btn = (<div onClick={()=>{this.props.onChange(this.props.data)}}  >
      <BeeIcon type="pin2" /></div>);
    }

    console.log(serveId+"_"+selected)

    return (
       <div className={serverItem}>
            <div className={item_li_top}>
                <div className={item_left}>
                  <Icon type="uf-list-s-o" />
                </div>

                <div className={item_right}>
                    {serveId}
                    {serveName}
                    {selected}
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