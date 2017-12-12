import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import actions from 'store/root/work/actions';
import Menu, { SubMenu } from 'bee-menus';
// import { Scrollbars } from 'react-custom-scrollbars';
import { mapStateToProps, findPath } from '@u';
import { sideBar ,menuItem,menuArrow,sideBarMenu,sideMainMenu} from './style.css';

const { Item } = Menu;

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
          <span>
            {isTop?<img src={menuItemIcon} className={menuItem}/>:null}
            { name }
          </span>
        </Item>
      );
    }
  });
  return result;
}

@withRouter
@connect(
  mapStateToProps(
    'menus',
    'current',
    {
      namespace: 'work',
    },
  ),
)
class SideBarContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick({ key: id }) {
    const {
      history,
      menus,
      current: {
        serveCode: curServeCode,
      },
      match: {
        params: {
          code,
          type,
        },
      },
    } = this.props;
    const menuPath = findPath(menus, 'children', 'menuItemId', id);
    const { serveCode } = menuPath.slice(-1)[0];
    if (serveCode !== curServeCode) {
      history.push(`/${type}/${code}/${serveCode}`);
    }
  }
  getDefaultOpenKeys() {
    const { menus, current: { menuItemId: id } } = this.props;
    const menuPath = findPath(menus, 'children', 'menuItemId', id);
    const defaultOpenKeys = menuPath.slice(0, -1).map(({menuItemId}) => {
      return menuItemId;
    })
    const selectedKeys = menuPath.slice(-1).map(({menuItemId}) => {
      return menuItemId;
    })
    return {
      defaultOpenKeys,
      selectedKeys,
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
