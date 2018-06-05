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
        <h5>Welcome to yonyouSpace</h5>
        <p className={desc}>create your team,invite others,inivite his/her team or business to join</p>
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
            <h6>create team for free</h6>
            <div className={content}>
              <p>team manager,<br />&nbsp;&nbsp;&nbsp;refresh my department or group。</p>
              <p>key properties:</p>
              <ul className="clearfix">
                <li>communication tool(IM）</li>
                <li>xiaoyou assistant</li>
                <li>calendar</li>
                <li>accordination tool</li>
                <li>more gift</li>
                <li>find people easy</li>
                <li>circle..tool</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openTeam}>start create</button>
            </div>
          </div>
          <div className={box}>
          <div className={imageBox}>
              <img src = {Company} />
            </div>
            <h6>create enterprise for free</h6>
            <div className={`${content} ${enter_context_div}`}>
              <p>enterprise manager,<br />&nbsp;&nbsp;&nbsp;All departments need to be refreshed as enabling organizations and enterprise-level services.</p>
              <p>key properties:</p>
              <ul className="clearfix">
                <li>All the capabilities of a team organization</li>
                <li>Enterprise-level organizational architecture management</li>
                <li>Stricter management of corporate members</li>
                <li>Application permission management based on administrative roles</li>
                <li>Enterprise level unified basic file and data control</li>
                <li>Basic attendance and salary enquiry service</li>
                <li>Enterprise - level application market provides a comprehensive digital service portal</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openEnter}>start create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EstablishContent;
