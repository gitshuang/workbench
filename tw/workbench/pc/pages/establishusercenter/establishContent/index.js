import React, { Component } from 'react';
import { openWin } from 'public/regMessageTypeHandler';
import {
  wrap,
  en,
  box,
  imageBox,
  content,
  est_context,
} from './index.css';

import Team from 'assets/image/wgt/team.png';
import Company from 'assets/image/wgt/company.png';

class EstablishContent extends Component {

  openTeam = () => {
    openWin({
      id: 'CreateTeam',
      title: '',
    });
  }

  openEnter = () => {
    openWin({
      id: 'CreateEnter',
      title: '',
    });
  }

  render() {
    const { locale } = window.diworkContext();
    const enstyle = locale === 'en_US' ? en : '';
    return (
      <div className={`${wrap} ${enstyle}`}>
        <div className={`${est_context}`}>
          <div className={box} key='team'>
            <div className={imageBox}>
              <img src={Team} />
            </div>
            <h6></h6>
            <div className={content}>
              <p><br /></p>
              <p></p>
              <ul className="clearfix">
                <li key='t0'>IM</li>
                <li key='t1'></li>
                <li key='t2'></li>
                <li key='t3'></li>
                <li key='t4'></li>
                <li key='t5'></li>
                <li key='t6'></li>
              </ul>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={this.openTeam}></button>
            </div>
          </div>
          <div className={box} key='enter'>
            <div className={imageBox}>
              <img src={Company} />
            </div>
            <h6></h6>
            <div className={`${content}`}>
              <p><br /></p>
              <p></p>
              <ul className="clearfix">
                <li key='e0'></li>
                <li key='e1'></li>
                <li key='e2'></li>
                <li key='e3'></li>
                <li key='e4'></li>
                <li key='e5'></li>
                <li key='e6'></li>
              </ul>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={this.openEnter}></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EstablishContent;
