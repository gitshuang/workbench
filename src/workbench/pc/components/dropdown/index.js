import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import Dropdown from 'bee/dropdown';
import Icon from 'components/icon';
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
        visible: false
    }
  }

  onVisibleChange=(visible)=> {
    if(this.props.closeFun()){
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
  handleSelect = (e) => {
    if(e.key == "td_2001"){ 
        const {
          history, 
        } = this.props;
        history.push('/establishusercenter'); 
      return;
    }
    if(this.props.dataItem[0].fun){
        this.props.dataItem[0].fun(e.key);
    }
    this.setState({
        visible: false
    });
  }
  
  
  render(){
    let {label,dataItem,fun,type} = this.props;

    let item = [];
    dataItem.forEach((da,i) => {
        item.push(<div key={da.name} className={item_li}>
        <div className={li_title}title={da.value}>{da.value}</div>
        <div className={li_right}>{da.type == 1?"团队":"企业"}</div>
        </div>);
    });
    let _marginLeft = -148;
    if(type && type == "home"){
      _marginLeft = -183;
    }
    let _menus = (<Menu className={menu_style} style={{ marginLeft:_marginLeft,marginTop:-1}} onSelect={(e)=>{this.handleSelect(e,fun)}} >
       <MenuItem className={menu_item} > 
          <div className={item_ul}>{item}</div>
          <div key="td_2001" className={create_ent} >创建团队 \ 创建企业</div>
       </MenuItem>
    </Menu>);

    let arrard = this.state.visible?"upward":"pull-down";
    return(<div className={dropdown_button_cont} >
          <div className={`${label_cont} home_title`}>
            <label>{label}</label>
          </div>
          {/* getPopupContainer = {this.props.getPopupContainer} */}
          {/* getPopupConptainer = {()=> document.getElementById("_dropdown_popcontainer")} */}
          <div id="_dropdown_popcontainer" className={`${this.state.visible?btn_upward:btn_pull_down} home_title_down `}>
            <Dropdown overlayClassName="_btn_down"
                getPopupContainer = {this.props.getPopupContainer}
                trigger={['click']}
                overlay={_menus}
                animation="slide-up"
                onVisibleChange={this.onVisibleChange} >
                <div><Icon type={arrard} className={icon_style} /></div>
            </Dropdown>
          </div>
      </div>)
  }
}
DropdownButton.PropTypes = propTypes;
export default DropdownButton;
