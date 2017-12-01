import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapStateToProps } from '@u';
import homeActions from 'store/root/home/actions';
import Header from 'containers/header';
import Navbar from 'components/scroll-nav';
import {button_group,navbar,logoImg} from './style.css';
import {header} from './header_page.css';
import logoUrl from 'assets/image/wgt/yonyou_logo.svg';

const { changeUserInfoDisplay } = homeActions;

@connect(
  mapStateToProps(),
  {
    changeUserInfoDisplay,
  }
)
class HeaderPage extends Component {
  getLeftContent() {
    return (<img src={logoUrl} className={logoImg}/>);
  }

  render() {
    const { changeUserInfoDisplay } = this.props;
    return (
      <div className={header}>
        <Header onLeftClick={ changeUserInfoDisplay } leftContent={this.getLeftContent()} iconName={'wode'}>
          <span>首页</span>
        </Header>
        <Navbar className={navbar} items={this.props.lis} offset={-80} height={30} duration={500} delay={0}> </Navbar>
      </div>
    );
  }
}

export default HeaderPage;
