import React from 'react';
import Menu from 'bee/menus';
const SubMenu = Menu.SubMenu;
import {menuListStyle} from './style.css';

export default class MenuList extends React.Component{
    
    handleClick = (e) => {
        this.props.closeMenuList(e.keyPath);
        
    }
    
    render(){
        const {menuList,menuListShow} = this.props;
        console.log(menuList,'menuList========')
        return <Menu defaultOpenKeys={["0"]} className={menuListStyle} onClick={this.handleClick} style={{display:menuListShow?"block":"none"}}>
        {menuList.map((item, index) => {
            return <SubMenu title={item.menuBarName} key={item.menuBarId} >
                {item.menuItems.map((a, g) => {
                    return <Menu.Item key={a.menuItemId} >{a.menuItemName}</Menu.Item>
                })}
            </SubMenu>
        }) }
    </Menu>
    }
}