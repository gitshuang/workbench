import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noop } from '@u';
import actions from 'store/root/work/actions';
import { sideBar } from './style.css';

const { setContentSrc } = actions;

class SideBarContainer extends Component {
  render() {
    const { data, setContentSrc } = this.props;
    return (
      <div className={sideBar} >
        <ul>
          {
            data.map((item, i) => (
              <li key={i} onClick={setContentSrc.bind(this, item.src)}>{item.name}</li>
            ))
          }
        </ul>
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
