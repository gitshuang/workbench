import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const { changeSiderState, getAllMenuList, updateCheckedCardList } = manageActions;
import rootActions from 'store/root/actions';
const { requestStart, requestSuccess, requestError } = rootActions;

import { add_item, sider_container, toggleBar, selectService, selectServiceArea } from './style.css'
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import MenuList from './menuList';
import Card from './card'
import Icon from "pub-comp/icon";
import { hasCardContainInGroups } from '../utils'
import CardsList from './cardList';


@connect(
    mapStateToProps(
        'isSiderDisplay',
        'manageList',
        'allMenuList',
        'checkedCardList',
        {
            namespace: 'manage',
        },
    ),
    {
        getAllMenuList,
        requestStart,
        requestSuccess,
        requestError,
        changeSiderState,
        updateCheckedCardList
    }
)
export default class MySider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            inputValue: '',
            isMenuListShow: false,
            cardsList: [],
            keyPath: [],
            searchValue: ''
        };
    }
    componentDidMount() {
        const { getAllMenuList, requestStart, requestError, requestSuccess, manageList } = this.props;
        requestStart()
        getAllMenuList().then(({ error, payload }) => {
            if (error) {
                requestError(payload);
                return;
            }
           
            payload.forEach(a => { //第一级
                a.menuItems.forEach(b => {  //第二级
                    b.children.forEach(c => {//第三极
                        if (c.children.length) {
                            c.children.forEach(d => {
                                if (hasCardContainInGroups(manageList, d.serviceId))
                                    d.hasBeenDragged = true;
                            })
                        } else {
                            if (hasCardContainInGroups(manageList, c.serviceId))
                                c.hasBeenDragged = true;
                        }
                    })
                })
            })
            this.setState({
                menuList: payload,
            }, () => {
                this.showServiceAndChangeInput()
            })
            requestSuccess();
        })

        this.setHeight();
        window.addEventListener('resize', this.setHeight)
    }
    setHeight = () => {
        if (this.serviceArea) {
            this.serviceArea.style.height = ((document.documentElement || document.body).clientHeight - 180) + "px"
        }
    }
    componentDidUpdate() {//解决隐藏后重新显示
        this.setHeight();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.setHeight)
    }
    renderMenu = () => {
        const { menuList, isMenuListShow } = this.state;
        const props = {
            isMenuListShow,
            menuList,
            showServiceAndChangeInput: this.showServiceAndChangeInput
        }
        return <MenuList  {...props} />
    }
    showServiceAndChangeInput = (keyPath = this.state.keyPath) => {
        // 通过keyPath，获得一二级
        var inputValue = '';
        let cardsList = [];

        if (keyPath.length) {
            this.state.menuList.forEach((item) => {
                if (item.menuBarId == keyPath[1]) {
                    inputValue += item.menuBarName + '/';
                    item.menuItems.forEach((a) => {
                        if (a.menuItemId == keyPath[0]) {
                            inputValue += a.menuItemName;
                            cardsList = a.children;
                            return
                        }
                    })
                }
            })
        }

        if (!keyPath.length) {
            cardsList = this.state.menuList[0].menuItems[0].children
            inputValue = `${this.state.menuList[0].menuBarName}/${this.state.menuList[0].menuItems[0].menuItemName}`
        }

        this.setState({
            cardsList,
            inputValue,
            isMenuListShow: false,
            keyPath
        })

    }

    renderService = () => {
        const { checkedCardList } = this.props;
        let dom = '';
        dom = this.state.cardsList.map((a, b) => {
            if (a.children && a.children.length == 0) {
                const isContainInCheckCardList = checkedCardList.some(item => { return item.serviceId == a.serviceId })
                a.checked = isContainInCheckCardList;
                return <div key={a.menuItemId} className="result_app_list_3">
                    <Card data={a} key={a.menuItemIdb} index={b}
                        onChangeChecked={this.onChangeChecked}
                    />
                    <hr />
                </div>
            }
            return <CardsList
                key={a.menuItemId}
                list={a.children}
                listName={a.menuItemName}
                checkedCardList={checkedCardList}
                onChangeChecked={this.onChangeChecked} />
        })
        return dom
    }
    componentWillReceiveProps(props){
        console.log(props,'propsprops===============');
    }
    onChangeChecked = (checked, parentId, menuItemId) => {
        const { cardsList } = this.state;
        //const newCardsList = JSON.parse(JSON.stringify(cardsList))
        const { checkedCardList, updateCheckedCardList } = this.props;
        let newCheckedCardList = JSON.parse(JSON.stringify(checkedCardList));
        if (checked) {//如果是选中，push checkedCardList
            cardsList.forEach((item) => {
                if (item.menuItemId == menuItemId && !item.children.length) {
                    //item.checked = checked;
                    newCheckedCardList.push(item)
                }

                if (item.children.length) {
                    item.children.forEach((a) => {
                        if (a.menuItemId == menuItemId) {
                            //a.checked = checked;
                            newCheckedCardList.push(a)
                        }
                    })
                }
            })
        }
        if (!checked) {//如果是解除选中状态，改变cardList状态，从 checkedCardList中删除
            cardsList.forEach((item) => {
                if (item.menuItemId == menuItemId && !item.children.length) {
                    //item.checked = checked;
                    newCheckedCardList = newCheckedCardList.filter(item => {
                        return item.menuItemId !== menuItemId
                    })
                }

                if (item.children.length) {
                    item.children.forEach((a) => {
                        if (a.menuItemId == menuItemId) {
                            // a.checked = checked;
                            newCheckedCardList = newCheckedCardList.filter(item => {
                                return item.menuItemId !== menuItemId
                            })
                        }
                    })
                }
            })
        }
        this.setState({
            cardsList: cardsList,
        })
        updateCheckedCardList(newCheckedCardList)
    }

    searchService = (e) => {
        //根据cardsList变化来render
        if (e.keyCode == 13) {
            const value = e.target.value
            const cardsList = [];
            this.state.menuList.forEach((a, b) => {
                a.menuItems.forEach((c, d) => {
                    c.children.forEach((e, f) => {
                        if (e.children.length == 0 && e.menuItemName.indexOf(value) != -1) {
                            cardsList.push(e);
                        } else if (e.children.length != 0) {
                            e.children.forEach((g, h) => {
                                if (g.menuItemName.indexOf(value) != -1) {
                                    cardsList.push(g);
                                }
                            })
                        }
                    })
                })
            })
            this.setState({ cardsList: cardsList });
        }

    }
    switchFetchFn = () => {
        this.setState(
            {
                ifSearchState: !this.state.ifSearchState,
                cardsList: []
            }, () => {
                if (this.state.ifSearchState) { //如果切换到search,就清空 ccardList
                    //debugger

                } else {   //如果切换到menu ，就取menu的第一级
                    this.showServiceAndChangeInput()
                }
            });

    }
    render() {

        const { inputValue, searchValue, ifSearchState } = this.state;
        const { isSiderDisplay, changeSiderState,languagesJSON } = this.props;
        return (
            <TransitionGroup component="div" className={sider_container}>
                <CSSTransitionGroup
                    transitionName={{
                        enter: 'animated',
                        enterActive: 'fadeInLeft',
                        leave: 'animated',
                        leaveActive: 'fadeOutLeft',
                    }}
                    transitionEnterTimeout={1300}
                    transitionLeaveTimeout={1300} >
                    {
                        isSiderDisplay ?
                            <div >
                                <div className="sider-container-fixed">
                                    <div className={add_item}>
                                        <span><Icon type="notice" />{languagesJSON.notice}</span>
                                        {/* <i className={toggleBar}
                                onClick={changeSiderState}>
                                {"<"}</i> */}
                                    </div>


                                    {ifSearchState ?
                                        <div className={selectServiceArea}>
                                            <input className={selectService}
                                                onKeyUp={this.searchService}
                                                key="clickSearch"
                                            />
                                            <span onClick={this.switchFetchFn} className="option">取消</span>
                                        </div> : <div className={selectServiceArea}>
                                            <input className={selectService}
                                                onFocus={() => { this.setState({ isMenuListShow: true }) }}
                                                value={inputValue}
                                                key="menuSearch"
                                            // onBlur={() => { this.setState({ isMenuListShow: false }) }}
                                            />
                                            <Icon type="search" onClick={this.switchFetchFn} className="option"/>
                                        </div>} 

                                    {this.renderMenu()}
                                    <div className="serviceArea" ref={ref => this.serviceArea = ref}>
                                        {this.renderService()}
                                    </div>
                                </div>
                            </div> : <div style={{ width: 20 }}><i className={`${add_item} ${toggleBar}`}
                                style={{ position: "fixed" }}
                                onClick={changeSiderState}>
                                {">"}</i></div>}
                </CSSTransitionGroup>
            </TransitionGroup>


        );
    }
}
