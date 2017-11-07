import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import HeaderContainer from 'containers/header';
import ContentContainer from 'containers/content';
import SideBarContainer from 'containers/sideBar';
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
  mapStateToProps({
    key: 'product',
    value: (state, { productId }) => state.productList.find(product => product.id === productId),
  }),
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
    this.props.history.goBack();
  }
  componentWillMount() {
    const { product = {} } = this.props;
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
    const { product = {} } = this.props;
    const { type, menu } = this.state;
    return (
      <div className={wrap} >
        <HeaderContainer title={product.name || ''} >
          <button onClick={this.goBack.bind(this)} >返回</button>
        </HeaderContainer>
        {
          this.state.loaded ? (
            <div className={workArea} >
              { makeLayout(type, menu) }
            </div>
          ) : null
        }
      </div>
    );
  }
}
