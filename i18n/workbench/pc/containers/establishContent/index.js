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
        <h5>$i18n{index.js0}$i18n-end</h5>
        <p className={desc}>$i18n{index.js1}$i18n-end。$i18n{index.js2}$i18n-end/$i18n{index.js3}$i18n-end。</p>
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
            <h6>$i18n{index.js4}$i18n-end</h6>
            <div className={content}>
              <p>$i18n{index.js5}$i18n-end,<br />&nbsp;&nbsp;&nbsp;$i18n{index.js6}$i18n-end。</p>
              <p>$i18n{index.js7}$i18n-end</p>
              <ul className="clearfix">
                <li>$i18n{index.js8}$i18n-endIM$i18n{index.js9}$i18n-end</li>
                <li>$i18n{index.js10}$i18n-end</li>
                <li>$i18n{index.js11}$i18n-end</li>
                <li>$i18n{index.js12}$i18n-end</li>
                <li>$i18n{index.js13}$i18n-end</li>
                <li>$i18n{index.js14}$i18n-end</li>
                <li>$i18n{index.js15}$i18n-end、$i18n{index.js16}$i18n-end</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openTeam}>$i18n{index.js17}$i18n-end</button>
            </div>
          </div>
          <div className={box}>
          <div className={imageBox}>
              <img src = {Company} />
            </div>
            <h6>$i18n{index.js18}$i18n-end</h6>
            <div className={`${content} ${enter_context_div}`}>
              <p>$i18n{index.js19}$i18n-end,<br />&nbsp;&nbsp;&nbsp;$i18n{index.js20}$i18n-end。</p>
              <p>$i18n{index.js21}$i18n-end</p>
              <ul className="clearfix">
                <li>$i18n{index.js22}$i18n-end</li>
                <li>$i18n{index.js23}$i18n-end</li>
                <li>$i18n{index.js24}$i18n-end</li>
                <li>$i18n{index.js25}$i18n-end</li>
                <li>$i18n{index.js26}$i18n-end</li>
                <li>$i18n{index.js27}$i18n-end</li>
                <li>$i18n{index.js28}$i18n-end</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openEnter}>$i18n{index.js29}$i18n-end</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EstablishContent;
