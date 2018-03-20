import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import Button from 'bee/button';
import Notification from 'bee/notification';
import {page,title_cont,warning_cont,success_cont,info_cont,error_cont,_title,_close} from "./index.css";



class NotificationMess extends Component {

  // static propTypes = {
  //   notice: PropTypes.string,
  //   close: PropTypes.fun,
  //   open:PropTypes.fun,
  //   title:PropTypes.string,
  //   type:PropTypes.string,
  //   className:""
  // }
 
  constructor(props) {
    super(props);

    this.notification = Notification.newInstance({
      position: 'bottomRight',
      className:this.getTypeNotifica()
    });
  }

  getTypeNotifica=()=>{
    const {type} = this.props;
    switch(type){
      case "warning":
        return warning_cont;
      case "success":
        return success_cont;  
      case "info":
        return info_cont;
      case "error":
        return error_cont;
    }
  }

  getTypeIcon=()=>{
    const {type} = this.props;
    switch(type){
      case "warning":
        return "notice";
      case "success":
        return "succeed";  
      case "info":
        return "help-information";
      case "error":
        return "error4";
    }
  }

  open=(options)=>{
    const {title,content} = this.props;
    const key = Date.now();
    this.notification.notice({
      content:(<div className={`${page}` }>
        <div className={_title}>
          <Icon type={this.getTypeIcon()} />
          <span className={title_cont}>{title}</span>

          <Icon type="close" className={_close} onClick={this.close(this, key)} />
        </div>
        <p>{content}</p>
        {/* <Button onClick={this.close(this, key)} size="sm" style={{ position: 'absolute', right: 15, bottom: 15}}>知道了</Button> */}
      </div>),
      key,
      duration: null,
      closable: false
    });
  }

  close=()=>{
  
  }

  render() {
    return (<div >ddddd</div> );
  }
}
export default NotificationMess;


let _notification;
function openMess(options){
  _notification = new NotificationMess(options);
  _notification.open(options);
}
export {
  openMess,
  close,
};
