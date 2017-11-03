import React, { Component } from 'react';
import './Header.css';
import NavBar from '../../../public-components/navbar/index'
import Icon from '../../../public-components/icon/index'

class Header extends Component {

  openUser = () => {
    console.log('onLeftClick')
  }
  opena = (name) => {
    return function (){
      console.log(name)
    }
  }

  render() {
    let _this = this;
    return (
      <div className="um-header">
        <NavBar
          mode="light"
          iconName={<Icon type="touxiang1" />}
          onLeftClick={this.openUser}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.opena("a")} />,
            <Icon key="1" type="quanzi" onClick={this.opena("b")}/>
          ]}
        >首页</NavBar>
      </div>
    );
  }
}

export default Header;
