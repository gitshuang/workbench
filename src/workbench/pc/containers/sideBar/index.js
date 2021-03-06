import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import actions from 'store/root/work/actions';
import Menu, { SubMenu } from 'bee/menus';
// import { Scrollbars } from 'react-custom-scrollbars';
import { mapStateToProps, findPath } from '@u';
import { sideBar ,menuItem,menuArrow,sideBarMenu,sideMainMenu} from './style.css';

const { Item } = Menu;

//isTop:判断是否是一级菜单
function makeMenus(menus,isTop) {
  let result = [];
  menus.forEach(({ children, menuItemId: id, menuItemIcon, menuItemName: name }) => {
    if (children && children.length) {
      result.push(
        <SubMenu
          className={sideBarMenu}
          key={id}
          style={{fontSize:'14px'}}
          title={
            <span>
              {isTop?<img src={menuItemIcon} className={menuItem}/>:null}
              {name}
            </span>
          }>
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
    const { openKeys, selectedKeys } = this.getOpenKeys(props);
    this.state = {
      openKeys,
      selectedKeys,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current.menuItemId !== this.props.current.menuItemId) {
      const { openKeys } = this.state;
      const { openKeys: newOpenKeys, selectedKeys } = this.getOpenKeys(nextProps);
      newOpenKeys.forEach((key) => {
        if (openKeys.indexOf(key) === -1) {
          openKeys.push(key);
        }
      });
      this.setState({
        openKeys: [...openKeys],
        selectedKeys,
      });
    }
  }
  handleClick({ key: id }) {
    const {
      history,
      menus,
      current: {
        serviceCode: curServiceCode,
      },
      match: {
        params: {
          code,
          type,
        },
      },
    } = this.props;
    const menuPath = findPath(menus, 'children', 'menuItemId', id);
    const { serviceCode } = menuPath.slice(-1)[0];
    if (serviceCode !== curServiceCode) {
      history.push(`/${type}/${code}/${serviceCode}`);
    }
  }
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
  }
  getOpenKeys(props) {
    const { menus, current: { menuItemId: id } } = props;
    const menuPath = findPath(menus, 'children', 'menuItemId', id);
    const openKeys = menuPath.slice(0, -1).map(({menuItemId}) => {
      return menuItemId;
    })
    const selectedKeys = menuPath.slice(-1).map(({menuItemId}) => {
      return menuItemId;
    })
    return {
      openKeys,
      selectedKeys,
    }
  }
  render() {
    const { menus } = this.props;
    const { openKeys, selectedKeys } = this.state;
    const isTop = true;//标识是否是一级菜单
    return (
      <div className={sideBar} >
        <Menu
          onClick={this.handleClick}
          style={{ width: '100%' }}
          onOpenChange={this.onOpenChange}
          openKeys={openKeys}
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
