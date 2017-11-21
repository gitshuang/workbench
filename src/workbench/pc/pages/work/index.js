import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
/*   actions   */
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
/*  components 组件 */
import Icon from 'components/icon';
/*  containers 容器组件  */
import TabsContainer from 'containers/tabs';
import HeaderContainer from 'containers/header';
import BreadcrumbContainer from 'containers/breadcrumb';
import ContentContainer from 'containers/content';
import SideBarContainer from 'containers/sideBar';
import QuickServiceContainer from 'containers/titleService';
import Pin from 'containers/pin';

/*  style样式库组件  */
import styles from './style.css';

/*  定义style  css-loader  */
const {workArea, sideBarArea, contentArea, hasTab, tabArea, wrap, } = styles;
/* 声明actions */
const {requestStart, requestSuccess, requestError} = rootActions;
const {setMenus, setCurrent, titleServiceDisplay, pinDisplayBlock, setPinCancel, getProductInfo, returnDefaultState} = workActions;


@withRouter
@connect(
    mapStateToProps(
        'pinType',
        'pinDisplay',
        'current',
        'tabs',
        'menus',
        'expandedSidebar',
        {
            namespace: 'work'
        }
    ),
    {
        setMenus,
        setCurrent,
        requestStart,
        requestSuccess,
        requestError,
        titleServiceDisplay,
        getProductInfo,
        pinDisplayBlock,
        setPinCancel,
        returnDefaultState

    }
)
export default class Work extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.productId,
            loaded: false,
            domainName: '',
            type: 1,
            widthBrm:false
        };
        this.goBack = this.goBack.bind(this);
        this.pinDisplay = this.pinDisplay.bind(this);
    }
    goBack() {
        this.props.history.replace('');
    }
    componentWillMount() {
        const {getProductInfo, setCurrent, setMenus} = this.props;
        const {productId} = this.state;
        requestStart();
        getProductInfo(productId).then(({error, payload}) => {
            if (error) {
                requestError(payload);
            } else {
                const {domain: {name: domainName, }, menuRoot: {menus, withTab, widthBrm}, curFunc: {id: currentId}, } = payload;
                let type = 1;
                if (menus && menus.length) {
                    type = 2;
                    if (withTab) {
                        type = 3;
                    }
                }
                this.setState({
                    loaded: true,
                    domainName,
                    type,
                    widthBrm,
                })
                let _menus = [];
                Object.assign(_menus,menus);
                this.getParentNodeById(_menus, currentId);
                setMenus(_menus);
                setCurrent(currentId);
                requestSuccess();
            }
        });
    }

    componentWillUnmount(){
        const {returnDefaultState} = this.props;
        returnDefaultState();
    }
    findArray(array,key, curId) {
      let b = false;
       array.map(function(da,i){
           if(da[key] == curId){
              b = true;
           }
       })
       return b;
    }

    getParentNodeById(menus, curId,parent) {

      for (let i = 0, l = menus.length; i < l; i++) {
        const menu = menus[i];
        const {children } = menu;

        if(parent){
            if(menus[i].parent){
              if(!findArray(menu.parent,"id",curId)){
                menus[i].parent.push({name:parent.name},{name:menu.name});
              }
            }else{
                menus[i].parent = [{name:parent.name},{name:menu.name}];
            }
        }else{
          menus[i].parent = [{name:menu.name}];
        }

        if (children && children.length) {
          this.getParentNodeById(children, curId,menus[i]);
        }
      }
      return menus;
    }



    pinDisplay() {
        const {pinDisplayBlock, pinType, pinDisplay, setPinCancel} = this.props;
        if (pinType) {

            setPinCancel().then(({error, payload}) => {
                if (error) {
                    requestError(payload);
                }
                console.log(payload);
            });
            return false;
        }
        if (!pinDisplay) {
            pinDisplayBlock();
        }
    }
    makeLayout() {
        const {type, loaded} = this.state;
        const {menus, tabs, current, expandedSidebar} = this.props;
        if (loaded) {
            switch (type) {
            case 1:
                return (
                    <div className={workArea} >
              <ContentContainer />
            </div>
                );
            case 2:
                return (
                    <div className={workArea} >
              {
                    expandedSidebar ? (
                        <div className={sideBarArea}>
                    <SideBarContainer />
                  </div>
                        ) : null
                    }
              <div className={contentArea}>
                <ContentContainer />
              </div>
            </div>
                );
            case 3:
                return (
                    <div className={workArea} >
                    {
                    expandedSidebar ? (
                        <div className={sideBarArea}>
                    <SideBarContainer />
                  </div>
                        ) : null
                    }
              <div className={hasTab}>
                <div className={contentArea}>
                  <ContentContainer hasTab={true}/>
                </div>
                <div className={tabArea}>
                  <TabsContainer />
                </div>
              </div>
            </div>
                );
            }
        }
    }

    render() {
        const {pinType, titleServiceDisplay, current: {title, hasRelationFunc, }, } = this.props;
        const { loaded, type, domainName } = this.state;
        let iconName = <Icon type="qiyejieshao" style={{fontSize:"24px"}}/>
        return (
          <div className={wrap + " um-win"}>
            <div className="um-header">
              <HeaderContainer onLeftClick={ this.goBack } iconName={iconName} leftContent={ domainName }>
                <div className="um-box">
                  <span>{ title }</span>
                  {
                    hasRelationFunc ?
                      (<Icon
                        type="xiala"
                        style={{marginLeft:"15px",fontSize:"10px"}}
                        onClick={ titleServiceDisplay } />) : undefined
                  }
                  <Icon
                    type="dingzhi"
                    className={ pinType ? 'active' : '' }
                    style={{ marginLeft:"15px",fontSize:"18px" }}
                    onClick={ this.pinDisplay }
                  />
                </div>
              </HeaderContainer>
            </div>
            <div className={`um-content ${workArea}`}>
                {
                    this.state.widthBrm?<BreadcrumbContainer withSidebar={ type !== 1 }/>:null
                }
              { this.makeLayout() }
            </div>
            <QuickServiceContainer outsideClickIgnoreClass={'icon-xiala'}/>
            <Pin outsideClickIgnoreClass={'icon-dingzhi'} />
          </div>
        );
    }
}
