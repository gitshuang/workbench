import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import Icon from 'pub-comp/icon';
import Menu, { SubMenu } from 'bee/menus';
const { Item } = Menu;
import rootActions from 'store/root/actions';
import menuActions from 'store/root/menubar/actions';
const { requestStart, requestSuccess, requestError } = rootActions;
const { getAllMenuList } = menuActions;

import { sideBar, sideBarList, sideBarListItem,sideMainMenu, sideBarMenu, last_item } from './style.css';
// 来获取菜单的深度
function getChildrenDeep(menuItems,initialDeep) {
  let maxDeep = initialDeep;
  let computedDeep = initialDeep;
  function loop(menuItems) {
    menuItems.forEach(({ children }) => {
      if (children.length > 0) {
        ++computedDeep;
        loop(children);
      }
    });
    if (maxDeep < computedDeep) maxDeep = computedDeep;
    computedDeep = 1;
  }
  loop(menuItems);
  return maxDeep;
}

@connect(
  mapStateToProps(
    'allMenuList'
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getAllMenuList,
  },
)
class MenuBar extends Component {
  static propTypes = {
    allMenuList: PropTypes.arrayOf(PropTypes.object),
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getAllMenuList: PropTypes.func,
  };
  static defaultProps = {
    allMenuList: [],
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getAllMenuList: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      menuShow: false,
      openKeys: [],
      selectedKeys: [],
    }
    this.sideBarAllSub = {};//所有在sideBarList展示的数据
  }

  componentDidMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getAllMenuList,
    } = this.props;
    requestStart();
    getAllMenuList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return;
      }
      this.setState({ allMenuList: payload })
      requestSuccess();
    });
  }

  //二级菜单
  makeSubMenus = (menus, isTop, i) => {
    let result = [];
    let _this = this;
    menus.forEach(({ menuItemId: id, menuItemName: name, children }) => {
      _this.sideBarAllSub[id] = {name:name,data:children};
      result.push(
        <Item key={id} style={isTop ? { fontSize: '14px' } : null}>
          <span className={`item_${i} ${last_item}`} title={name}>
            {name}
          </span>
        </Item>
      )
    });
    return result;
  }
  //isTop:判断是否是一级菜单
  makeMenus = (menus, isTop, i) => {
    let result = [];
    let _this = this;
    menus.forEach(({ menuItems, menuBarId: id, menuBarName: name }) => {
      let deep = getChildrenDeep(menuItems,2);
      if (deep == 3 || deep == 4) {
        //有子节点
        result.push(<SubMenu
          className={sideBarMenu}
          key={id}
          style={{ fontSize: '14px', background: 'red' }}
          title={
            <span className={`item_${i}`} >
              <Icon type="forward2" />
              {name}
            </span>
          }>
          {this.makeSubMenus(menuItems, false, i)}
        </SubMenu>
        )
      } else {
        _this.sideBarAllSub[id] = {name:name,data:menuItems};
        result.push(
          <Item key={id} style={isTop ? { fontSize: '14px' } : null}>
            <span className={`item_${i} ${last_item}`} title={name}>
              {name}
            </span>
          </Item>
        )
      }
    });
    return result;
  }

  renderList = () =>{
    if(!this.state.currentSubBar) return null;
    let {
      currentSubBar :{
        data:cur
      }
    } = this.state;
    let result = [];   
    let deep = getChildrenDeep(cur,1);
    cur.forEach(({children,menuItemName,menuItemId})=>{
      if(deep>1){
        // 3,4
        let dom = [];
        if(children.length>0){
          children.forEach(({children,menuItemName,menuItemId})=>{
            dom.push(
              <li className="bottomBar" key={menuItemId}>{menuItemName}</li>
            )
          });
          result.push(
            <li className={sideBarListItem} key={menuItemId}>
              <span className="sideBarListItemName">{menuItemName}</span>
              <ul className="bottomBarPanel">{dom}</ul>
            </li>
          )
        }else{
          result.push(
            <li className={sideBarListItem} key={menuItemId}>
              <span className="sideBarListItemName" style={{opacity:0,visibility:'hidden'}}>{'defaultSideBar'}</span>
              <ul className="bottomBarPanel">
                <li className="bottomBar">{menuItemName}</li>
              </ul>
            </li>
          )
        }
      }else{
        //4
        result.push(
          <li className="pureBottom bottomBar" key={menuItemId}>{menuItemName}</li>
        )
      }
    })
    return result;
  }
  menuShow = () => {
    this.setState({
      menuShow: !this.state.menuShow
    })
  }

  handleClick({key}) {
    this.setState({currentSubBar:this.sideBarAllSub[key]})
  }

  onOpenChange = (openKeys) => {
    console.log('openKeys', openKeys)
    this.setState({
      openKeys,
    });
  }

  render() {
    let { menuShow, allMenuList, openKeys, selectedKeys } = this.state;
    const isTop = true;//标识是否是一级菜单
    return (
      <div>
        <Icon type='master' onClick={this.menuShow} />
        {
          menuShow && (
            <div className={sideBar} >
              <Menu
                className={sideMainMenu}
                onClick={this.handleClick.bind(this)}
                style={{ width: '200px' }}
                onOpenChange={this.onOpenChange}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                mode="inline"
              >
                {this.makeMenus(allMenuList, isTop, 0)}
              </Menu>
              <div className={sideBarList}>
                 {this.renderList()}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
export default MenuBar;

