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
import Pin from 'containers/pin'

/*  style样式库组件  */
import "assets/style/iuapmobile.um.css"
import styles from './style.css';

/*  定义style  css-loader  */
const { workArea,wrap } = styles;
/* 声明actions */
const { requestStart, requestSuccess, requestError, } = rootActions;
const {
  titleServiceDisplay,
  getProductInfo,
  pinDisplayBlock,
  pinDisplayNone,
  pinTypeFocus,
  setPinCancel,
} = workActions;

function makeLayout(type, menu,tabsList) {
  switch (type) {
    case 1:
      return [
        <ContentContainer />
      ];
    case 2:
      return [
        <SideBarContainer key={1} data={menu} />,
        <ContentContainer key={2}/>,
        <TabsContainer tabsList={tabsList} />
      ];
    case 3:
      return [
        <SideBarContainer key={1} data={menu} />,
        <ContentContainer key={2} hasTab />
      ];
  }
}

@withRouter
@connect(
  mapStateToProps(
    {
      key: 'pinType',
      value: (rot,props,root)=>{
        return rot.work.pinType
      }
    },
    {
      key: 'pinDisplay',
      value: (rot,props,root)=>{
        return rot.work.pinDisplay
      }
    },
    {
      key: 'product',
      //value: (state, { productId }) => state.productList.find(product => product.id === productId),
      value: (rot,props,root)=>{
        let value = '';
        rot.home.workList.forEach((work) => {
          work.widgeList.forEach((widget)=>{
            if(widget.id === props.match.params.productId){
              value = widget;
              return false;
            }
          })
          if (value) {
            return false;
          }
        });
        return value
      },
    },
    {
      key:'tabsList',
      value: (home,props,root)=>{
        return root.work.tabsList;
      }
    },
    {
      namespace: 'root'
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    titleServiceDisplay,
    getProductInfo,
    pinDisplayBlock,
    pinDisplayNone,
    pinTypeFocus,
    setPinCancel,
  }
)
export default class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      type: 1,
      menu: [],
    };
  }
  goBack() {
    this.props.history.replace('');
  }
  componentDidMount() {
    const { product = {},tabsList, getProductInfo } = this.props;
    requestStart();
    getProductInfo(product.id).then(({ type, menu = [] }) => {
        this.setState({
          loaded: true,
          type: type,
          menu: menu,
        })
        requestSuccess();
      },
      (e) => {
        requestError(e);
      },
    );
  }

  goBack() {
    this.props.history.replace('');
  }

  pinDisplay = () => {
    const { pinDisplayBlock, pinDisplayNone, pinType, pinDisplay, pinTypeFocus, setPinCancel } = this.props;
    if ( pinType ){

      setPinCancel().then(({ error, payload }) => {
        if (error) {
          requestError(payload);
        }
        console.log(payload);
      });
      return false;
    }
    pinDisplayBlock();
  }
  render() {
    const { product = {},tabsList=[],current, pinType, titleServiceDisplay } = this.props;
    const { type, menu } = this.state;
    let iconName = <Icon type="qiyejieshao" style={{fontSize:"24px"}}/>
    return (
      <div className={wrap + " um-win"}>
        <div className="um-header">
          <HeaderContainer onLeftClick={ this.goBack.bind(this) } iconName={iconName} leftContent={ product.title }>
            <div className="um-box">
              <span>{product.title || ''}</span>
              <Icon type="xiala" style={{marginLeft:"15px",fontSize:"10px"}} onClick={titleServiceDisplay} />
              <Icon
                type="dingzhi"
                className={ pinType ? 'active' : '' }
                style={{ marginLeft:"15px",fontSize:"18px" }}
                onClick={ this.pinDisplay }
              />
            </div>
          </HeaderContainer>
        </div>
        <div className="um-content">
          <BreadcrumbContainer />
          {
            this.state.loaded ? (
              <div className={workArea} >
                { makeLayout(type, menu,tabsList) }
              </div>
            ) : null
          }
        </div>
        <QuickServiceContainer outsideClickIgnoreClass={'icon-xiala'}/>
        <Pin outsideClickIgnoreClass={'icon-dingzhi'} />
      </div>
    );
  }
}
