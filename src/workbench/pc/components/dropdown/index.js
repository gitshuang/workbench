import React, { Component } from 'react';
import PropTypes from "prop-types";
import Dropdown from 'bee-dropdown';
import Icon from 'components/icon';
import Menu, { Item as MenuItem, Divider, SubMenu, MenuItemGroup } from 'bee-menus';
// import {ButtonBrand,ButtonWarning,ButtonDefaultAlpha} from 'components/button';
import {dropdown_button_cont,label_cont,btn,icon_style,menu_style} from './style.css';

const propTypes = {
  label:"",
  dataItem:[]
};

class DropdownButton extends Component{

  constructor(props) {
    super(props);
    this.state = {
        visible: false
    }
  }

  onVisibleChange=(visible)=> {
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
    if(this.props.dataItem[0].fun){
        this.props.dataItem[0].fun(e.key);
    }
    this.setState({
        visible: false
    });
  }

  render(){
    let {label,dataItem,fun} = this.props;
    let item = [];
    dataItem.forEach((da,i) => {
        item.push(<MenuItem key={da.name} >{da.value}</MenuItem>);
    });
    let _menus = <Menu className={menu_style} style={{ marginLeft:-85,marginTop:7,marginRight:-7}} onSelect={(e)=>{this.handleSelect(e,fun)}} >{item}</Menu>;
    let arrard = this.state.visible?"upward":"pull-down";
    return(<div className={dropdown_button_cont} >
         <div className={label_cont}>
            <label>{label}</label>
         </div>
          <div className={btn}>
            <Dropdown
                getPopupContainer = {this.props.getPopupContainer}
                trigger={['click']}
                overlay={_menus}
                animation="slide-up"
                onVisibleChange={this.onVisibleChange} >
                <Icon type={arrard} className={icon_style} />
            </Dropdown>
          </div>
      </div>)
  }
}
DropdownButton.PropTypes = propTypes;
export default DropdownButton;
