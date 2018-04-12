import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import Dropdown from 'bee/dropdown';
import Icon from 'pub-comp/icon';
import Menu, { Item as MenuItem, Divider, SubMenu, MenuItemGroup } from 'bee/menus';
import {dropdown_button_cont,label_cont,btn_upward,btn_pull_down,icon_style,menu_style,
  drop_MenuItem,_Menu_Item,create_ent,
  menu_item,item_ul,item_li,li_title,li_right
} from './style.css';

const propTypes = {
  label:"",
  dataItem:[]
};

@withRouter
class DropdownButton extends Component{

  constructor(props) {
    super(props);
    this.state = {
        visible: false,
        label:props.label
    }
  }

  onVisibleChange=(visible)=> {
    if(this.props.closeFun){
      this.props.closeFun();
    }
    this.setState({
        visible: visible
    })
  }

  handleShow = () => {
    this.setState({
        visible: true
    })
  }

  //todu 后续需求变更后需要遍历找到对应的事件
  handleSelect = (da) => {
   if(!da)return;
   da.fun(da.name);
    // if(this.props.dataItem[0].fun){
    //     this.props.dataItem[0].fun(da.name);
    // }
    this.setState({
        visible: false
    });
  }

  enterOnclick=()=>{
      const {
        history,
      } = this.props;
      history.push('/establishusercenter');
  }

  render(){
    let {label,dataItem,fun,type,marginLeft,lastIem,openMenu} = this.props;
    // const {label } = this.state;
    let item = [];
    if(dataItem.length != 0){
      dataItem.forEach((da,i) => {
          item.push(<div key={da.name} className={item_li}  onClick={(e)=>{this.handleSelect(da)}} >
          <div className={li_title} title={da.value}>{da.value}</div>
          <div className={li_right}>{da.type == 1?"团队":"企业"}</div>
          </div>);
      });
    }else{
      item.push(<div key="item_1001" className={item_li} >
        <div className={li_title} >数据正在加载中....</div>
      </div>);
    }
    let _marginLeft = -148;
    if(type && type == "home"){
      _marginLeft = marginLeft?marginLeft:-192;
    }
    // onSelect={(e)=>{this.handleSelect(e,fun)}}
    let _menus = (<Menu className={menu_style} style={{ marginLeft:_marginLeft,marginTop:-1}}  >
       <MenuItem className={menu_item} >
          <div className={`${item_ul} open_item`}>{item}</div>
          {lastIem?null:<div className={create_ent} onClick={this.enterOnclick} >创建团队 \ 创建企业</div>}
       </MenuItem>
    </Menu>);

    let arrard = this.state.visible?"upward":"pull-down";
    return(<div className={dropdown_button_cont} >
          <div className={`${label_cont} home_title`}>
            <label>{label}</label>
          </div>
          {/* getPopupContainer = {this.props.getPopupContainer} */}
          {/* getPopupConptainer = {()=> document.getElementById("_dropdown_popcontainer")} */}
          {/* onClick={openMenu} */}
          <div id="_dropdown_popcontainer" className={`${this.state.visible?btn_upward:btn_pull_down} home_title_down `}>
            <Dropdown overlayClassName="_btn_down"
                getPopupContainer = {this.props.getPopupContainer}
                trigger={['click']}
                overlay={_menus}
                animation="slide-up" 
                onVisibleChange={this.onVisibleChange} >
                <div><Icon type={arrard} className={icon_style} onClick={openMenu}/></div>
            </Dropdown>
          </div>
      </div>)
  }
}
DropdownButton.PropTypes = propTypes;
export default DropdownButton;
