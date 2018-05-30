import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {
  wrap,
  desc,
  box,
  imageBox,
  content,
  est_context,
  enter_context_div
} from './index.css';

import Team from 'assets/image/wgt/team.png';
import Company from 'assets/image/wgt/company.png';

@withRouter
class EstablishContent extends Component {
  openTeam = () => {
    const { history } = this.props;
    history.push('/createteam/home');
  }

  openEnter = () => {
    const { history } = this.props;
    history.push('/createenter/home');
  }

  render() {
    const { userInfo,type } = this.props;
    let titleCont = null;
    if(type && type == "init"){
      titleCont = (<div>
        <h5>NoDictionary</h5>
        <p className={desc}>NoDictionary。NoDictionary/NoDictionary。</p>
      </div>)
    }

    return (
      <div className={wrap}>
        {titleCont}
        <div className={`${est_context}`}>
          <div className={box}>
            <div className={imageBox}>
              <img src = {Team} />
            </div>
            <h6>NoDictionary</h6>
            <div className={content}>
              <p>NoDictionary,<br />&nbsp;&nbsp;&nbsp;NoDictionary。</p>
              <p>NoDictionary</p>
              <ul className="clearfix">
                <li>NoDictionaryIMNoDictionary</li>
                <li>NoDictionary</li>
                <li>NoDictionary</li>
                <li>NoDictionary</li>
                <li>NoDictionary</li>
                <li>NoDictionary</li>
                <li>NoDictionary、NoDictionary</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openTeam}>NoDictionary</button>
            </div>
          </div>
          <div className={box}>
          <div className={imageBox}>
              <img src = {Company} />
            </div>
            <h6>NoDictionary</h6>
            <div className={`${content} ${enter_context_div}`}>
              <p>NoDictionary,<br />&nbsp;&nbsp;&nbsp;NoDictionary。</p>
              <p>NoDictionary</p>
              <ul className="clearfix">
                <li>NoDictionary</li>
                <li>NoDictionary</li>
                <li>NoDictionary</li>
                <li>NoDictionary</li>
                <li>NoDictionary</li>
                <li>NoDictionary</li>
                <li>NoDictionary</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openEnter}>NoDictionary</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EstablishContent;
