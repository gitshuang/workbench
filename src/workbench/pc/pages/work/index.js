/*应用级引用*/
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
import HeaderContainer from 'containers/header';
import BreadcrumbContainer from 'containers/breadcrumb';
import ContentContainer from 'containers/content';
import SideBarContainer from 'containers/sideBar';
import QuickServiceContainer from 'containers/titleService';
/*  style样式库组件  */
import "assets/style/iuapmobile.um.css"
import styles from './style.css';

/*  定义style  css-loader  */
const { workArea, HeaderLeft } = styles;
/* 声明actions */
const { requestStart, requestSuccess, requestError, } = rootActions;
const { titleServiceDisplay, getProductInfo, pinDisplayBlock, pinDisplayNone } = workActions;

function makeLayout(type, menu) {
  switch (type) {
    case 1:
      return [
        <ContentContainer />
      ];
    case 2:
      return [
        <SideBarContainer key={1} data={menu} />,
        <ContentContainer key={2}/>
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
      key: 'product',
      //value: (state, { productId }) => state.productList.find(product => product.id === productId),
      value: (home,props,root)=>{
        let value = '';
        home.workList.forEach((work) => {
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
      }
    },
    {
      namespace: 'home'
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    titleServiceDisplay,
    getProductInfo,
    pinDisplayBlock,
    pinDisplayNone
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
  componentWillMount() {
    const { product = {}, getProductInfo, } = this.props;
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
  render() {
    let leftContent = <div className={HeaderLeft}>返回</div>
    const { product = {}, titleServiceDisplay } = this.props;
    const { type, menu } = this.state;
    let iconName = <Icon type="qiyejieshao" style={{fontSize:"20PX"}}/>
    return (
      <div className="um-win">
        <div className="um-header">
          <HeaderContainer onLeftClick={ this.goBack.bind(this) } iconName={iconName} leftContent={leftContent}>
            <div className="um-box">
              <span>{product.title || ''}</span>
              <Icon type="xiala" style={{marginLeft:"15px",fontSize:"10px"}} onClick={titleServiceDisplay}></Icon>
              <Icon type="dingzhi" style={{marginLeft:"15px"}}></Icon>
            </div>
          </HeaderContainer>
        </div>
        <div className="um-content">
          <BreadcrumbContainer />
          {
            this.state.loaded ? (
              <div className={workArea} >
                { makeLayout(type, menu) }
              </div>
            ) : null
          }
        </div>
        <QuickServiceContainer outsideClickIgnoreClass={'icon-xiala'}/>
      </div>
    );
  }
}
