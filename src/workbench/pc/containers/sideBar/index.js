import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import actions from 'store/root/work/actions';
import Menu, { SubMenu } from 'bee/menus';
import Icon from 'pub-comp/icon';
// import { Scrollbars } from 'react-custom-scrollbars';
import { mapStateToProps, findPath } from '@u';
import { sideBar ,menuItem,menuArrow,sideBarMenu,sideMainMenu,item_1,item_2,item_3,item_4,last_item} from './style.css';

const { Item } = Menu;

//isTop:判断是否是一级菜单
function makeMenus(menus,isTop,i) {
  i++;
  let result = [];
  menus.forEach(({ children, menuItemId: id, menuItemIcon, menuItemName: name }) => {
    if (children && children.length) {
      result.push(
        <SubMenu
          className={sideBarMenu}
          key={id}
          style={{fontSize:'14px',background:'red'}}
          title={
            <span className={`item_${i}`}>
              <Icon type="forward2" />
              {isTop?<img src={menuItemIcon} className={menuItem}/>:null}
              {name}
            </span>
          }>
          { makeMenus(children,false,i) }
        </SubMenu>
      );
    } else {
      result.push(
        <Item key={id} style={isTop?{fontSize:'14px'}:null}>
          <span className={`item_${i} ${last_item}`}>
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
      alert('sideBar'+history.length)
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
          { makeMenus(menus,isTop,0) }
        </Menu>
      </div>
    );
  }
}

export default SideBarContainer;
