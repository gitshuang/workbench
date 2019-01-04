import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const { } = manageActions;
import rootActions from 'store/root/actions';
const { requestStart, requestSuccess, requestError } = rootActions;

import menuActions from 'store/root/menubar/actions';
const { getAllMenuList } = menuActions;

import { add_item, sider_container, toggleBar, selectService, result_app_list ,app_col} from './style.css'
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import MenuList from './menuList';
import Card from './card'

@connect(
    mapStateToProps(
        'selectList',
        'isEdit',
    ),
    {
        getAllMenuList,
        requestStart,
        requestSuccess,
        requestError
    }
)
export default class MySider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siderDisplay: true,
            menuList: [],
            inputValue: '',
            menuListShow: false,
            cardsList: []
        };
    }
    componentDidMount() {
        const { getAllMenuList, requestStart, requestError, requestSuccess } = this.props;
        requestStart()
        getAllMenuList().then(({ error, payload }) => {
            if (error) {
                requestError(payload);
                return;
            }
            this.setState({
                menuList: payload
            })
            requestSuccess();
        })
    }
    //领域模块搜索
    onCascaderChange = value => {

    };
    //切换搜索状态
    switchSearch = () => {
        const { showSearch } = this.state;
        this.setState({ showSearch: !showSearch }, () => {
            if (this.state.showSearch) {
                this.refs.searchInput.focus();
                this.setState({ appGroupArr: [], isAllShow: true });
            } else {
                this.onCascaderChange(this.state.domainModuleSelect);
            }
        });
    };


    renderMenu = () => {
        const { menuList, menuListShow } = this.state;

        return <MenuList menuList={menuList} menuListShow={menuListShow} closeMenuList={this.closeMenuListAndChangeInput} />
    }
    closeMenuListAndChangeInput = (keyPath) => {
        // 通过keyPath，获得一二级
        var inputValue = '';
        this.state.menuList.forEach((item) => {
            if (item.menuBarId == keyPath[1]) {
                inputValue += item.menuBarName + '/';
                item.menuItems.forEach((a) => {
                    if (a.menuItemId == keyPath[0]) {
                        inputValue += a.menuItemName;
                        return
                    }
                })
            }
        })
        this.showCards(keyPath);
        this.setState({
            menuListShow: false,
            inputValue: inputValue,
        })
    }
    showCards = (keyPath) => {
        let cardsList = [];
        this.state.menuList.forEach((item) => {
            if (item.menuBarId == keyPath[1]) {
                item.menuItems.forEach((a) => {
                    if (a.menuItemId == keyPath[0]) {
                        cardsList = a.children;
                        return
                    }
                })
            }
        })
        this.setState({
            cardsList: cardsList,
        })
    }
    renderService = () => {
        let dom = '';
        dom =  this.state.cardsList.map((a, b) => {

            return a.children.length == 0 ? (<div key={b} className={result_app_list}>
                <Card {...a} key={b} /></div>) :
                (<div key={b} >
                    <div>{a.menuItemName}</div>
                    <div className={result_app_list}>
                    {a.children.map((item,c) => {
                        return <Card {...item}  key={c}/>//{item.menuItemName}
                    })}
                    </div>
                </div>)
        })
        return dom
    }
    render() {
        const { inputValue } = this.state;
        return (

            <div className={sider_container}  >
                {
                    this.state.siderDisplay ?
                        <TransitionGroup>
                            <CSSTransitionGroup
                                transitionName={{
                                    enter: 'animated',
                                    enterActive: 'fadeInLeft',
                                    leave: 'animated',
                                    leaveActive: 'fadeOutLeft',
                                }}
                                transitionEnterTimeout={1300}
                                transitionLeaveTimeout={1300} >
                                <div style={{ width: 380, display: this.state.siderDisplay ? "block" : "none" }}>
                                    <div className={add_item}>
                                        <span>*拖动下方磁贴至右侧所需位置</span>
                                        <i className={toggleBar}
                                            onClick={() => { this.setState({ siderDisplay: !this.state.siderDisplay }) }}>
                                            {"<"}</i>
                                    </div>
                                    <input className={selectService}
                                        onFocus={() => { this.setState({ menuListShow: true }) }}
                                        value={inputValue}
                                    // onBlur={() => { this.setState({ menuListShow: false }) }}
                                    />

                                    {this.renderMenu()}
                                    {this.renderService()}
                                </div>
                            </CSSTransitionGroup>
                        </TransitionGroup>
                        : <i className={`${add_item} ${toggleBar}`}
                            onClick={() => { this.setState({ siderDisplay: !this.state.siderDisplay }) }}>
                            {">"}</i>
                }

            </div>

        );
    }
}
