import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import Icon from 'pub-comp/icon';
import Menu, { SubMenu } from 'bee/menus';
import { openService } from 'public/regMessageTypeHandler';
import onClickOutside from 'react-onclickoutside';
import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
const { requestStart, requestSuccess, requestError } = rootActions;
const { getAllMenuList } = wrapActions;
import { sideBar, sideBarList, sideBarListItem, last_item } from './style.css';
const { Item } = Menu;
// 来获取菜单的深度
export function getChildrenDeep(menuItems, initialDeep) {
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
    'allMenuList',
    {
      namespace: 'wrap',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getAllMenuList,
  },
)

@onClickOutside
class MenuBarInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
      selectedKeys: [],
    }
    this.handleClick = this.handleClick.bind(this);
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
      let deep ;
      if(payload[0].menuItems.length>0 ){
        deep = getChildrenDeep(payload[0].menuItems, 2);
      }else{
        deep = getChildrenDeep(payload[0].menuItems,1);
      }
      //解说：默认打开第一个菜单，如果deep>2则表示有三级，菜单栏才会有子节点，不然全都右边list展示
      this.setState({
        openKeys:[payload[0].menuBarId],
        selectedKeys:deep>2? [ payload[0].menuItems[0].menuItemId ]:[],
        currentSubBar: deep>2? {data:payload[0].menuItems[0].children,name:payload[0].menuItems[0].menuItemName} :{},
      })
      requestSuccess();
    });
  }
  
  // 二级菜单
  makeSubMenus = (menus, isTop, i) => {
    ++i;
    let result = [];
    let _this = this;
    // let { setSideBarAllSub } = this.props;
    menus.forEach(({ menuItemId: id, menuItemName: name, children }) => {
      this.setSideBarAllSub(id, name, children);
      result.push(
        <Item key={id} style={isTop ? { fontSize: '14px' } : null}>
          <span className={`item_${i} ${last_item}`} title={name}>
            {name}
            <Icon type='forward2' className="itemIcon"></Icon>
          </span>
        </Item>
      )
    });
    return result;
  }
  // isTop:判断是否是一级菜单,一级菜单
  makeMenus = (menus, isTop, i) => {
    ++i;
    let result = [];
    // let { setSideBarAllSub } = this.props;
    menus.forEach(({ menuItems, menuBarId: id, menuBarName: name }) => {
      let deep = menuItems.length > 0 ? getChildrenDeep(menuItems, 2) : getChildrenDeep(menuItems, 1);
      if (deep == 3 || deep == 4) {
        //有子节点
        result.push(
          <SubMenu
            key={id}
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
        // _this.sideBarAllSub[id] = {name:name,data:menuItems};
        this.setSideBarAllSub(id, name, menuItems);
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
  // 三级，四级菜单
  renderList = () => {
    if (!this.state.currentSubBar) return null;
    let {
      currentSubBar: {
        data: cur
      }
    } = this.state;
    let result = [];
    let deep = getChildrenDeep(cur, 1);
    cur.forEach(({ children, menuItemName, menuItemId, service, serviceCode }) => {
      // deep>1表示有4级存在
      if (deep > 1) {
        let dom = [];
        // 情况1每项都有4级；情况2有些只到3级，那么3级占位4级展示
        if (children.length > 0) {
          children.forEach(({ menuItemName, menuItemId, service: { url }, serviceCode }) => {
            dom.push(
              <li className="bottomBar"
                key={menuItemId}
                onClick={e => this.openService(menuItemId, menuItemName, url, serviceCode)}
              >
                {menuItemName}
              </li>
            )
          });
          result.push(
            <li className={sideBarListItem} key={menuItemId}>
              <span className="sideBarListItemName">{menuItemName}</span>
              <ul className="bottomBarPanel">{dom}</ul>
            </li>
          )
        } else {
          result.push(
            <li className={sideBarListItem} key={menuItemId}>
              {/* <span className="sideBarListItemName" style={{ opacity: 0, visibility: 'hidden' }}>{'default'}</span> */}
              <ul className="bottomBarPanel mixHasNoThree">
                <li className="bottomBar" onClick={e => this.openService(menuItemId, menuItemName, service.url, serviceCode)}>
                  {menuItemName}
                </li>
              </ul>
            </li>
          )
        }
      } else {
        //deep=1表示最多3级，3级按照bottombar展示
        result.push(
          <li className="pureBottom bottomBar"
            key={menuItemId}
            onClick={e => this.openService(menuItemId, menuItemName, service.url, serviceCode)}>
            {menuItemName}
          </li>
        )
      }
    })
    return result;
  }

  // 点击bottomBar打开页签，bottomBar是一二级菜单中二级，一二三级菜单三级，一二三四级菜单四级
  openService = (id,name,url,serviceCode) =>{
    openService(serviceCode);
    this.props.menuShow();
  }
  // 获取所有需要在三四级区域展示的数据
  setSideBarAllSub = (id,name,data) =>{
      this.sideBarAllSub[id] = {name:name,data:data}
  }

  handleClick({key}) {
    this.setState({
      selectedKeys:[key],
      currentSubBar:this.sideBarAllSub[key]
    })
  }
  
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys:openKeys.length>1?[openKeys[openKeys.length-1]]:openKeys,
    });
  }

  handleClickOutside() {
    this.props.menuShow()
  }

  render() {
    let { allMenuList } = this.props;
    if(!allMenuList) return <h1>nodata</h1>
    let { openKeys, selectedKeys} = this.state;
    return (
      <div className={sideBar}>
        <Menu
          onClick={this.handleClick}
          onOpenChange={this.onOpenChange}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          mode="inline"
        >
          {this.makeMenus(allMenuList, true, 0)}
        </Menu>
        <div className={sideBarList}>
          {this.renderList()}
        </div>
      </div>
    );
  }
}
export default MenuBarInner;

