import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
/*   actions   */
import homeActions from 'store/root/home/actions';

import Header from 'containers/header';
import Navbar from 'components/scrollNav';
import { logoImg, header } from './style.css';
import logoUrl from 'assets/image/wgt/yonyou_logo.svg';

const { changeUserInfoDisplay,hideUserInfoDisplay } = homeActions;

@connect(
  mapStateToProps(
    'userInfoDisplay',
    'userInfo',
    {
      namespace: 'home',
    }
  ),
  {
    changeUserInfoDisplay,
    hideUserInfoDisplay
  }
)
class HeaderPage extends Component {
  getLeftContent() {
    const {
      userInfo: {
        logo,
      }
    } = this.props;
    return (<img src={logo || logoUrl} className={logoImg}/>);
  }
  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 1);
    },0);
    // scroll.scrollTo(50,this.Navbar);
  }
  render() {
    const {
      changeUserInfoDisplay,
      hideUserInfoDisplay,
      userInfoDisplay,
      list
    } = this.props;
    return (
      <div className={header}>
        <Header
          onLeftClick={ userInfoDisplay?hideUserInfoDisplay:changeUserInfoDisplay }
          leftContent={this.getLeftContent()}
          iconName={"staff"} >
          <span>首页</span>
        </Header>
        {
          list.length > 1 ? (
            <Navbar
              items={list}
              offset={-24}
              duration={500}
              delay={0} />
          ) : null
        }
      </div>
    );
  }
}


export default HeaderPage;
