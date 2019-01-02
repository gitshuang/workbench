import React, { Component } from 'react';
import Icon from 'pub-comp/icon';
import Menu, { SubMenu } from 'bee/menus';
import onClickOutside from 'react-onclickoutside';
import { sideBar, sideBarList, sideBarListItem, last_item } from './style.css';
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
const { Item } = Menu;
@onClickOutside
class MenuBarInner extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // 二级菜单
    makeSubMenus = (menus, isTop, i) => {
        ++i;
        let result = [];
        let _this = this;
        let { setSideBarAllSub } = this.props;
        menus.forEach(({ menuItemId: id, menuItemName: name, children }) => {
            setSideBarAllSub(id, name, children);
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
    // isTop:判断是否是一级菜单,一级菜单
    makeMenus = (menus, isTop, i) => {
        ++i;
        let result = [];
        let { setSideBarAllSub } = this.props;
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
                setSideBarAllSub(id, name, menuItems);
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
        if (!this.props.currentSubBar) return null;
        let {
            currentSubBar: {
                data: cur
            }
        } = this.props;
        let result = [];
        let deep = getChildrenDeep(cur, 1);
        cur.forEach(({ children, menuItemName, menuItemId, service }) => {
            // deep>1表示有4级存在
            if (deep > 1) {
                let dom = [];
                // 情况1每项都有4级；情况2有些只到3级，那么3级占位4级展示
                if (children.length > 0) {
                    children.forEach(({ menuItemName, menuItemId, service: { url } }) => {
                        dom.push(
                            <li className="bottomBar"
                                key={menuItemId}
                                onClick={e => this.props.openService(menuItemId, menuItemName, url)}
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
                            <span className="sideBarListItemName" style={{ opacity: 0, visibility: 'hidden' }}>{'default'}</span>
                            <ul className="bottomBarPanel">
                                <li className="bottomBar" onClick={e => this.props.openService(menuItemId, menuItemName, service.url)}>
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
                        onClick={e => this.props.openService(menuItemId, menuItemName, service.url)}>
                        {menuItemName}
                    </li>
                )
            }
        })
        return result;
    }

    handleClickOutside() {
        this.props.menuShow()
    }

    render() {
        let { allMenuList, openKeys, selectedKeys ,handleClick,onOpenChange,} = this.props;
        return (
            <div className={sideBar}>
                <Menu
                    onClick={handleClick.bind(this)}
                    style={{ width: '200px' }}
                    onOpenChange={onOpenChange}
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

