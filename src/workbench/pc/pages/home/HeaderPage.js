import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Header from 'containers/header';

// import baseStyles from 'public/base.css';
import {button_group} from './style.css';
import {header} from './header_page.css';

// const {wrap, } = baseStyles;

const {changeUserInfoDisplay} = homeActions;

const {requestStart, requestSuccess, requestError} = rootActions;

@withRouter
@connect(
  mapStateToProps(
    {
      namespace: 'headerpage',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    changeUserInfoDisplay,
  }
)

class HeaderPage extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  getLeftContent() {
    let logoUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510562718599&di=2c650c278296b97dcab3e594f49330f4&imgtype=0&src=http%3A%2F%2Fimage.it168.com%2Fcms%2F2008-2-25%2FImage%2F2008225113034.jpg";

    return (<div className={HeaderLeft}>
      <img src={logoUrl}/>
    </div>)
  }

  render() {

    const {changeUserInfoDisplay} = this.props;
    let {workList} = this.state;

    return (
      <div className={header}>
        <Header onLeftClick={ changeUserInfoDisplay } leftContent={this.getLeftContent} iconName={'wode'}>
          <span>首页</span>
          <Link to={`/manage`}>打开管理</Link>
        </Header>

        <ul className={button_group}>
          {this.props.lis}
        </ul>
      </div>
    );
  }
}

export default HeaderPage;
