import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'store/root/work/actions';
import Menu, { SubMenu } from 'bee-menus';
import Icon from 'bee-icon';
// import { Scrollbars } from 'react-custom-scrollbars';
import { mapStateToProps } from '@u';
import { sideBar ,menuItem,menuArrow,sideBarMenu,sideMainMenu} from './style.css';

const { Item } = Menu;
const { setCurrent } = actions;

//isTop:判断是否是一级菜单
function makeMenus(menus,isTop) {
  let result = [];
  menus.forEach(({ children, menuItemId: id, menuItemIcon, menuItemName: name }) => {
    if (children) {
      result.push(
        <SubMenu
          className={sideBarMenu}
          key={id}
          style={{fontSize:'14px'}}
          title={<span><img src={menuItemIcon} className={menuItem}/>{name}</span>}>
          { makeMenus(children) }
        </SubMenu>
      );
    } else {
      result.push(
        <Item key={id} style={isTop?{fontSize:'14px'}:null}>
          {isTop?<Icon type="uf-cloud-o" className={menuItem}/>:null}
          { name }
        </Item>
      );
    }
  });
  return result;
}

const findMenuById = (menus, curId) => {
  let result;
  for (let i = 0, l = menus.length; i < l; i++) {
    const menu = menus[i];
    const { menuItemId: id, children } = menu;
    if (children && children.length) {
      result = findMenuById(children, curId);
    }
    if (result) {
      break;
    }
    if (id === curId) {
      result = menu;
      break;
    }
  }
  return result;
}

const findOpenKeysById = (menus, curId) => {
  let finded = false;
  const result = [];
  const loop = (list) => {
    if (finded) {
      return;
    }
    for (let i = 0, l = list.length; i < l; i++) {
      const item = list[i];
      const { serveId: id, menuItemId, children } = item;
      if (id === curId) {
        finded = true;
        break;
      }
      if (children && children.length) {
        result.push(menuItemId);
        loop(children);
      }
    }
    if (!finded) {
      result.pop();
    }
  }
  loop(menus);
  return result;
}

@connect(
  mapStateToProps(
    'menus',
    'current',
    {
      namespace: 'work',
    },
  ),
  {
    setCurrent,
  },
)
class SideBarContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick({ key: id }) {
    // const { menus } = this.props;
    // const cur = findMenuById(menus, id);
    this.props.setCurrent(id);
  }
  getDefaultOpenKeys() {
    const { menus, current: { menuItemId: id } } = this.props;
    const menu = findMenuById(menus, id);
    return {
      defaultOpenKeys: findOpenKeysById(menus, id),
      selectedKeys: menu && [menu.menuItemId]
    }
  }
  render() {
    const { menus } = this.props;
    const isTop = true;//标识是否是一级菜单
    const { defaultOpenKeys, selectedKeys } = this.getDefaultOpenKeys();
    return (
      <div className={sideBar} >
        <Menu
          onClick={this.handleClick}
          style={{ width: '100%' }}
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={selectedKeys}
          mode="inline"
          className={sideMainMenu}>
          { makeMenus(menus,isTop) }
        </Menu>
      </div>
    );
  }
}

export default SideBarContainer;
