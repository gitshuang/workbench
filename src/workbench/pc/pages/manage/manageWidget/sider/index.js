import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const {changeSiderState} = manageActions;
import rootActions from 'store/root/actions';
const { requestStart, requestSuccess, requestError } = rootActions;

import menuActions from 'store/root/menubar/actions';
const { getAllMenuList } = menuActions;


import { add_item, sider_container, toggleBar, selectService, result_app_list ,app_col} from './style.css'
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import MenuList from './menuList';
import Card from './card'
import Icon from "pub-comp/icon"
@connect(
    mapStateToProps(
        'isSiderDisplay',
        {
            namespace: 'root.manage',
        },
    ),
    {
        getAllMenuList,
        requestStart,
        requestSuccess,
        requestError,
        changeSiderState
    }
)
export default class MySider extends Component {
    constructor(props) {
        super(props);
        this.state = {
           // isSiderDisplay: true,
            menuList: [],
            inputValue: '',
            isMenuListShow: false,
            cardsList: [],
            keyPath:[],
            checkedCardList:[],
            searchValue:''
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
   
   

    renderMenu = () => {
        const { menuList, isMenuListShow } = this.state;

        return <MenuList menuList={menuList} isMenuListShow={isMenuListShow} closeMenuList={this.closeMenuListAndChangeInput} />
    }
    closeMenuListAndChangeInput = (keyPath=this.state.keyPath) => {
        // 通过keyPath，获得一二级
        var inputValue = '';
        if(keyPath.length){
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
            
        }
        
        this.showCards(keyPath);
        this.setState({
            isMenuListShow: false,
            inputValue: inputValue,
            keyPath
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
                <Card {...a} key={b} index={b} 
                onChangeChecked = {this.onChangeChecked}
                checkedCardList = {this.state.checkedCardList}/></div>) :
                (<div key={b} >
                    <div>{a.menuItemName}</div>
                    <div className={result_app_list}>
                    {a.children.map((item,c) => {
                        return <Card {...item}  key={c} index = {c} 
                        onChangeChecked = {this.onChangeChecked}
                        checkedCardList = {this.state.checkedCardList}/>//{item.menuItemName}
                    })}
                    </div>
                </div>)
        })
        return dom
    }
    onChangeChecked = (checked, parentId, menuItemId)=>{
        const {cardsList,checkedCardList} = this.state;
        cardsList.forEach((item) => {
            if (item.menuItemId == menuItemId) {
                item.checked = checked;
                checkedCardList.push(item)
            }
            if(item.children.length){
                item.children.forEach((a)=>{
                    if (a.menuItemId == menuItemId) {
                        a.checked = checked;
                        checkedCardList.push(a)

                    }
                })
            }
        })
        this.setState({
            cardsList: cardsList,
            checkedCardList:checkedCardList
        })
    }
    setSearchValue=(e)=>{
       
        if(e.keyCode==13){
            this.searchservice(e.target.value);
        }
        
    }
    searchservice=(value)=>{
        //根据cardsList变化来render
        const cardsList = [];
        this.state.menuList.forEach((a,b)=>{
            a.menuItems.forEach((c,d)=>{
                c.children.forEach((e,f)=>{
                    if(e.children.length==0&&e.menuItemName.indexOf(value)!=-1){
                        cardsList.push(e);
                    }else if(e.children.length!=0){
                        e.children.forEach((g,h)=>{
                            if(g.menuItemName.indexOf(value)!=-1){
                                cardsList.push(g);
                            }
                        })
                    }
                })
            })
        })
        this.setState({cardsList:cardsList});
    }
    render() {
        const { inputValue,searchValue } = this.state;
        const {isSiderDisplay,changeSiderState} = this.props;
        return (

            <div className={sider_container}  >
                {
                    isSiderDisplay ?
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
                                <div style={{ width: 380, display: isSiderDisplay ? "block" : "none" }}>
                                    <div className={add_item}>
                                        <span>*拖动下方磁贴至右侧所需位置</span>
                                        <i className={toggleBar}
                                            onClick={changeSiderState }>
                                            {"<"}</i>
                                    </div>
                                    
                                    {!this.state.ifSearchState?
                                    <div>
                                        <input className={selectService}
                                        onFocus={() => { this.setState({ isMenuListShow: true }) }}
                                        value={inputValue}
                                    // onBlur={() => { this.setState({ isMenuListShow: false }) }}
                                    />
                                    <Icon type="search" onClick={()=>{this.setState({ifSearchState:true})}}/>
                                        </div>:null}
                                    {this.state.ifSearchState?
                                     <div>
                                     <input className={selectService}
                                     onKeyUp={this.setSearchValue}
                                 />
                                 <span onClick={()=>{this.setState({ifSearchState:false})}}>取消</span>
                                     </div>:null}

                                    {this.renderMenu()}
                                    {this.renderService()}
                                </div>
                            </CSSTransitionGroup>
                        </TransitionGroup>
                        : <i className={`${add_item} ${toggleBar}`}
                            onClick={changeSiderState}>
                            {">"}</i>
                }

            </div>

        );
    }
}
