import React, { Component } from 'react';
import PopDialog from 'pub-comp/pop';
import { manager_save_pop } from './style.css';

export default class PopDialogComp extends Component{
  constructor(props){
    super(props);
  }

  static defaultProps = {}

  render(){
    const pop_btn = [
        {label:"确认",fun:this.props.batchDelectFn,className:""},
        {label:"取消",fun:this.props.popClose,className:""}
      ]
      const pop_btn2 = [
        {label:"不保存",fun:this.props.cancel,type:"defaultAlpha"},
        {label:"保存",fun:this.props.save,type:"warning"},
        {label:"取消",fun:this.props.popCloseCancel,type:"defaultAlpha"}
      ]
    return (
      <div>
        <PopDialog className="pop_dialog_delete" type="delete" show = { this.props.showModal } close={this.props.popClose} btns={pop_btn} >
          <div>
            <span>您确认要批量删除吗?</span>
          </div>
        </PopDialog>
        <PopDialog  className={ manager_save_pop } type="warning" show = { this.props.showCancelModal } close={this.props.popCloseCancel} btns={pop_btn2} title={"是否保存最新修改？"} >
          <div>
            <span>点击不保存，则最新修改将丢失</span>
          </div>
        </PopDialog>
      </div> 
    )
  } 
}




