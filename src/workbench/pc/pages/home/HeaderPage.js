import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapStateToProps } from '@u';
import homeActions from 'store/root/home/actions';
import Header from 'containers/header';
import Navbar from 'components/scroll-nav';
import {button_group,navbar} from './style.css';
import {header} from './header_page.css';

const { changeUserInfoDisplay } = homeActions;

@connect(
  mapStateToProps(),
  {
    changeUserInfoDisplay,
  }
)
class HeaderPage extends Component {
  getLeftContent() {
    let logoUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510562718599&di=2c650c278296b97dcab3e594f49330f4&imgtype=0&src=http%3A%2F%2Fimage.it168.com%2Fcms%2F2008-2-25%2FImage%2F2008225113034.jpg";
    return (<div className={HeaderLeft}>
      <img src={logoUrl}/>
    </div>)
  }

  render() {
    const { changeUserInfoDisplay } = this.props;
    return (
      <div className={header}>
        <Header onLeftClick={ changeUserInfoDisplay } leftContent={this.getLeftContent} iconName={'wode'}>
          <span>首页</span>
        </Header>
        <Navbar className={navbar} items={this.props.lis} offset={-80} height={30} duration={500} delay={0}> </Navbar>
      </div>
    );
  }
}

export default HeaderPage;
