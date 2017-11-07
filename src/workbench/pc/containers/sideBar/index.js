import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noop } from '@u';
import actions from 'store/root/work/actions';
import Menu, { SubMenu } from 'bee-menus';
import { sideBar } from './style.css';


const { setContentSrc } = actions;

class SideBarContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      current: 1,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(o) {
    const { data, setContentSrc } = this.props;
    const item = data[o.key];
    if (item) {
      setContentSrc(item.src);
      this.setState({
        current: o.key,
      });
    }
  }
  render() {
    const { data } = this.props;
    return (
      <div className={sideBar} >
        <Menu onClick={this.handleClick} style={{ width: 240 }} selectedKeys={[this.state.current]} mode="inline">
          {
            data.map((item, i) => (
              <Menu.Item key={i} >{item.name}</Menu.Item>
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
  },
)(SideBarContainer);
