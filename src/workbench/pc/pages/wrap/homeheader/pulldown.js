import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { openWin } from 'public/regMessageTypeHandler';
import Dropdown from 'bee/dropdown';
import Menu from 'bee/menus';
import Icon from 'pub-comp/icon';
import Button from 'bee/button';
import { pulldown, } from './style.css'

import rootActions from 'store/root/actions';
const { closeTabs, openPin } = rootActions;

const { Item, Divider } = Menu;

@connect(
    mapStateToProps(
        'tabs',
        'activeCarrier',
        'currItem',
        'hasWidget',
    ),
    {
        closeTabs,
        openPin
    },
)
class Pulldown extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        
    }

    handleClick = (e,item) => {
        e.stopPropagation();
        const {closeWin} = this.props;
        closeWin(item);
    }

    onSelect = (selectItem) => {
        if (selectItem.key === "close") {
            this.props.closeTabs();
            return false;
        }
        if (selectItem.key === "pin") {
            const { openPin } = this.props;
            alert(111);
            openPin();
            return false;
        }
        const { key, item: { props } } = selectItem;
        const [id, title] = key.split('-');
        openWin({
            id,
            title
        });
    }

    render() {
        const { tabs, currItem, items, hasWidget } = this.props;
        const flag = currItem.type === "locale" || Object.keys(currItem).length ===0 ? true : false;
        const text = hasWidget ? "将当前页从首页移除" : "将当前页添加到首页";
        const menus = (
            <Menu
                onClick={this.onSelect}
            >
                <Item key="pin" disabled={flag} >{text}</Item>
                <Item key="close">关闭全部页签</Item>
                <Divider />
                {
                    items.length && items.map((item) => {
                        return (
                            <Item key={`${item.id}-${item.title}`}>
                                {item.title}
                                <Icon type="error3" onClick={(e) => this.handleClick(e,item)} />
                            </Item>
                        )
                    })
                }
            </Menu>
        );
        return (
            <div className={pulldown} style={{ width: this.props.width }}>
                <Dropdown
                    trigger={['click']}
                    overlay={menus}
                    animation="slide-up"
                >
                    <Button disabled={!tabs.length}><Icon type="pull-down" /></Button>
                </Dropdown>
            </div>
        );
    }
}
export default Pulldown;