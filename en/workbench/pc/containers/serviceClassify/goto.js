import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { openService } from 'public/regMessageTypeHandler';
import {
  appItemImg,
  appItem_describe,
  appItem_tit,
  appItem_con
} from './style.css';

@withRouter
class GoTo extends Component {
  goToLink = (path) => {
    openService(path, 2);
    // this.props.history.push('/app/'+path);
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
          {/* <p className={appItem_con}>Communication and collaboration in one step</p> */}
        </div>
      </li>
    )
  }
}

export default GoTo;
