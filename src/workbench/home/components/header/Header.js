import React, { Component } from 'react';
import './Header.css';
import NavBar from '../../../public-components/navbar/index'
import Icon from '../../../public-components/icon/index'

class Header extends Component {
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="back" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="quanzi" />,
          ]}
        >首页</NavBar>
      </div>
    );
  }
}

export default Header;
