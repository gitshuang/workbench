import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { openWin } from 'public/regMessageTypeHandler';
import Dropdown from 'bee/dropdown';
import Menu from 'bee/menus';
import Icon from 'pub-comp/icon';
import { openMess } from 'pub-comp/notification';
import Button from 'bee/button';
import { pulldown, dropdown, pin, close, blackpage, error } from './style.css';

import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
import homeActions from 'store/root/home/actions';
const { requestError, } = rootActions;
const { closeTabs, openPin, cancelFolders, showTabs } = wrapActions;
const { getWorkList } = homeActions;

const { Item, Divider } = Menu;

@connect(
    mapStateToProps(
        'tabs',
        'currItem',
        {
            namespace: 'wrap',
        }
    ),
    {
        requestError,
        closeTabs,
        openPin,
        cancelFolders,
        getWorkList,
        showTabs
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

    handleClick = (e, item) => {
        e.stopPropagation();
        const { closeWin } = this.props;
        closeWin(item);
    }

    onSelect = (selectItem) => {
        if (selectItem.key === "close") {
            this.props.closeTabs();
            return false;
        }
        if (selectItem.key === "pin") {
            const { requestError, getWorkList, openPin, cancelFolders, currItem: { id, hasWidget } } = this.props;
            if (hasWidget) {
                cancelFolders(id).then(({ error, payload }) => {
                    if (error) {
                        requestError(payload)
                        return false;
                    }
                    openMess({
                        title: '!',
                        duration: 2,
                        type: 'success',
                        closable: false,
                    });
                    getWorkList();
                });
            } else {
                openPin();
            }
            return false;
        }
        const { item: { props: { attribute } } } = selectItem;
        openWin(attribute);
        // this.props.showTabs(attribute);
    }

    render() {
        const { tabs, currItem, items } = this.props;
        const { hasWidget, type } = currItem;
        const flag = type === "locale" || Object.keys(currItem).length === 0 ? true : false;
        const text = hasWidget ? "" : "";
        const menus = (
            <Menu
                onClick={this.onSelect}
                className={dropdown}
            >
                <Item key="pin" className={pin} disabled={flag} >{text}</Item>
                <Item key="close" className={close}></Item>
                {
                    items.length ? <Divider /> : null
                }
                
                {
                    items.length && items.map((item) => {
                        return (
                            <Item key={item.id} attribute={item}>
                                <Icon type="blank-page" className={blackpage} />
                                {item.title}
                                <Icon type="error3" className={error} onClick={(e) => this.handleClick(e, item)} />
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
                    <Button disabled={!tabs.length}><Icon type="More" /></Button>
                </Dropdown>
            </div>
        );
    }
}
export default Pulldown;