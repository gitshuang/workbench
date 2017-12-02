import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapStateToProps } from '@u';
import homeActions from 'store/root/home/actions';
import Header from 'containers/header';
import Navbar from 'components/scrollNav';
import { logoImg, header } from './style.css';
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
  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 1)
    },0);
  }
  render() {
    const {
      changeUserInfoDisplay,
      list,
    } = this.props;
    return (
      <div className={header}>
        <Header
          onLeftClick={ changeUserInfoDisplay }
          leftContent={this.getLeftContent()}
          iconName={'wode'} >
          <span>首页</span>
        </Header>
        {
          list.length > 1 ? (
            <Navbar
              items={list}
              offset={-80}
              duration={500}
              delay={0} />
          ) : null
        }
      </div>
    );
  }
}

export default HeaderPage;
