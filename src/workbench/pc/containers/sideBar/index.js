import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noop } from '@u';
import actions from 'store/root/work/actions';
import Menu, { SubMenu } from 'bee-menus';
import { sideBar } from './style.css';

const { setContentSrc } = actions;

const MenuItemGroup = Menu.ItemGroup;

class SideBarContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      current: 1,
    };
    this.handleClick.bind(this);
  }
  handleClick({ key }) {
    const { data, setContentSrc } = this.props;
    const item = data.find(v => v.id === key);
    if (item) {
      setContentSrc.bind(this, item.src)
      this.setState({
        current: e.key,
      });
    }
  }
  render() {
    const { data, setContentSrc } = this.props;
    return (
      <div className={sideBar} >
        <Menu onClick={this.handleClick} style={{ width: 240 }} selectedKeys={[this.state.current]} mode="inline">
          {
            data.map((item) => (
              <Menu.Item key={item.id} >{item.name}</Menu.Item>
            ))
          }
        </Menu>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  {
    setContentSrc,
  }
)(SideBarContainer);
