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
const { closeTabs } = rootActions;

const { Item, Divider } = Menu;

@connect(
    mapStateToProps(
        'tabs',
        'activeCarrier',
    ),
    {
        closeTabs,
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

    onSelect = (selectItem) => {
        if (selectItem.key === "close") {
            this.props.closeTabs();
            return false;
        }
        if(selectItem.key === "pin") {
            alert(123);
            return false;
        }
        const {item: {props}} = selectItem;
        openWin({
            id: props.eventKey,
            title: props.children
        });
    }

    render() {
        const { tabs, activeCarrier, items } = this.props;
        const menus = (
            <Menu
                onClick={this.onSelect}
            >

                <Item key="pin" disabled={activeCarrier === "home" ? true : false}>将当前页添加到首页</Item>
                <Item key="close">关闭全部页签</Item>
                <Divider />
                {
                    items.length && items.map((item) => {
                        return <Item key={item.id}>{item.title}</Item>
                    })
                }
            </Menu>
        );
        return (
            <div className={pulldown} style={{width: this.props.width}}>
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