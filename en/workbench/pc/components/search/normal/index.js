import React, { Component } from 'react';
import {
  wrap,
} from './index.css';

class Normal extends Component {
  goDetail = (e) => {
    e.stopPropagation();
  }
  render() {
    return (
      <div className={wrap} onClick={this.goDetail} onKeyDown={this.goDetail} role="presentation">
        <h3>unkonwn search result</h3>
      </div>
    );
  }
}

export default Normal;
