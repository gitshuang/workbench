import React, { Component } from 'react';
import NavBar from '../../../public-components/navbar/index';
import Icon from '../../../public-components/icon/index';

class Header extends Component {
  onLeftClick = () => {
  };
  onRightClick = (name) => {
    return function () {
      alert(name);
    };
  };

  render() {
    return (
      <div className="header">
        <NavBar
          mode="light"
          iconName={<Icon type="touxiang1" />}
          onLeftClick={this.onLeftClick}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.onRightClick('a')} />,
            <Icon key="1" type="quanzi" onClick={this.onRightClick('b')} />]}
        >首页
        </NavBar>
      </div>
    );
  }
}

export default Header;
