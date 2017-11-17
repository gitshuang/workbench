import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'store/root/work/actions';
import Menu, { SubMenu } from 'bee-menus';
import Icon from 'bee-icon';
// import { Scrollbars } from 'react-custom-scrollbars';
import { mapStateToProps } from '@u';
import { sideBar ,menuItem,menuArrow,sideBarMenu,aa} from './style.css';

const { Item } = Menu;
const { setCurrent } = actions;

function makeMenus(menus) {
  let result = [];
  menus.forEach(({ children, id, name }) => {
    if (children) {
      result.push(
        <SubMenu className={sideBarMenu} key={id} title={<span><Icon type="uf-rmb" className={menuItem}/>{name}</span>}>
          { makeMenus(children) }
        </SubMenu>
      );
    } else {
      result.push(
        <Item key={id}>
          <Icon type="uf-cloud-o" className={menuItem}/>
          { name }
        </Item>
      );
    }
  });
  return result;
}

const findOpenKeysById = (menus, curId, result = []) => {
  let flag = true;
  for (let i = 0, l = menus; i < l; i++) {
    const menu = menus;
    const { id, children } = menu;
    if (children && children.length) {
      result.push(id);
      result = findOpenKeysById(children, curId, result);
    } else if (id === curId) {
      flag = false;
      break;
    }
  }
  if (flag) {
    result.pop();
  }
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
    this.props.setCurrent(id);
  }
  getDefaultOpenKeys() {
    const { menus, current: { id } } = this.props;
    return {
      defaultOpenKeys: findOpenKeysById(menus, id),
      selectedKeys: [id]
    }
  }
  render() {
    const { menus } = this.props;
    const { defaultOpenKeys, selectedKeys } = this.getDefaultOpenKeys();
    return (
      <div className={sideBar} >
        <Menu
          onClick={this.handleClick}
          style={{ width: '100%' }}
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={selectedKeys}
          mode="inline" >
          { makeMenus(menus) }
        </Menu>
      </div>
    );
  }
}

export default SideBarContainer;
