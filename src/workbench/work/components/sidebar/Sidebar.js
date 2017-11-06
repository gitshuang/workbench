import React, { Component } from 'react';
import Menu, { SubMenu } from 'bee-menus';
import './Sidebar.css';

const MenuItemGroup = Menu.ItemGroup;

class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      current: 1,
    };
    this.handleClick.bind(this);
  }
  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu onClick={this.handleClick} style={{ width: 240 }} selectedKeys={[this.state.current]} mode="inline">
        <SubMenu key="demo3sub1" title={<span><span>财务处理</span></span>}>
          <MenuItemGroup>
            <Menu.Item key="1">选项 1</Menu.Item>
            <Menu.Item key="2">选项 2</Menu.Item>
            <Menu.Item key="3">选项 3</Menu.Item>
            <Menu.Item key="4">选项 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu key="demo3sub2" title={<span><span>凭证</span></span>}>
          <Menu.Item key="5">选项 5</Menu.Item>
          <Menu.Item key="6">选项 6</Menu.Item>
          <SubMenu key="demo3sub3" title="子项">
            <Menu.Item key="7">选项 7</Menu.Item>
            <Menu.Item key="8">选项 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="demo3sub4" title={<span><span>账簿</span></span>}>
          <Menu.Item key="9">选项 9</Menu.Item>
          <Menu.Item key="10">选项 10</Menu.Item>
          <Menu.Item key="11">选项 11</Menu.Item>
          <Menu.Item key="12">选项 12</Menu.Item>
        </SubMenu>
        <SubMenu key="demo3sub5" title={<span><span>会计报表</span></span>}>
          <Menu.Item key="9">选项 9</Menu.Item>
          <Menu.Item key="10">选项 10</Menu.Item>
          <Menu.Item key="11">选项 11</Menu.Item>
          <Menu.Item key="12">选项 12</Menu.Item>
        </SubMenu>
        <SubMenu key="demo3sub6" title={<span><span>结账</span></span>}>
          <Menu.Item key="9">选项 9</Menu.Item>
          <Menu.Item key="10">选项 10</Menu.Item>
          <Menu.Item key="11">选项 11</Menu.Item>
          <Menu.Item key="12">选项 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default Sidebar;
