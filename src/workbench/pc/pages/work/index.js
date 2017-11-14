import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import HeaderContainer from 'containers/header';
import BreadcrumbContainer from 'containers/breadcrumb';
import ContentContainer from 'containers/content';
import SideBarContainer from 'containers/sideBar';
import TabsContainer from 'containers/tabs';
import rootActions from 'store/root/actions';
import getProductInfo from 'store/root/work/api';
import baseStyles from 'public/base.css';
import styles from './style.css';

const {
  wrap,
} = baseStyles;

const {
  workArea,
} = styles;

const {
  requestStart,
  requestSuccess,
  requestError,
} = rootActions;

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
      },
    },
    {
      key:'tabsList',
      value: (home,props,root)=>{
        return root.work.tabsList;
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
  },
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
    const { product = {},tabsList } = this.props;
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
    const { product = {},tabsList=[],current } = this.props;
    const { type, menu } = this.state;

    return (
      <div className="um-win">
        <div className="um-header">
          <HeaderContainer onLeftClick={ this.goBack.bind(this) } iconName={"back"} leftContent={"返回"}>
            <span position="center">{product.title || ''}</span>
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
      </div>
    );
  }
}
