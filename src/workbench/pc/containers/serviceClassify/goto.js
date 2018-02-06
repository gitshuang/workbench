import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  appItemImg,
  appItem_describe,
  appItem_tit,
  appItem_con
} from './style.css';

@withRouter
class GoTo extends Component {
  goToLink = (path) => {
    this.props.history.push('/app/'+path);
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
          <p className={appItem_con}>沟通协作一步到位</p>
        </div>
      </li>
    )
  }
}

export default GoTo;
