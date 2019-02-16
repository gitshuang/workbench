import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { openService } from 'public/regMessageTypeHandler';
import {
  appItemImg,
  appItem_describe,
  appItem_tit,
} from './style.css';

@withRouter
class GoTo extends Component {
  goToLink = (path) => {
    openService(path, 2);
  }
  render() {
    const {
      code,
      icon,
      appName,
    } = this.props;
    return (
      <li onClick={ ()=>{this.goToLink(code)} }>
        <div className={appItemImg}><img src={icon}/></div>
        <div className={appItem_describe}>
          <p className={appItem_tit}>{appName}</p>
        </div>
      </li>
    )
  }
}

export default GoTo;
