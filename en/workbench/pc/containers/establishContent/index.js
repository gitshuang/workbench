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
        <h5>Welcome to YouZone</h5>
        <p className={desc}>Create your team or enterprise, and invite your friends to experience now./You can also contact your friends and ask them to invite you to join in their teams or enterprises.</p>
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
            <h6>Create a team for free</h6>
            <div className={content}>
              <p>I'm a team manager,<br />&nbsp;&nbsp;&nbsp;and I need the authorization to refresh my department or project group.</p>
              <p>Key Features:</p>
              <ul className="clearfix">
                <li>Team instant communication tool with rich functionsIM）</li>
                <li>Xiaoyou, your intelligent virtual personal assistant</li>
                <li>Context-aware schedule center</li>
                <li>Empowerment-style project collaboration tools</li>
                <li>Employee Benefits Center</li>
                <li>Intelligent Personnel Searching Function</li>
                <li>Moments, Mini-Mail, and other office collaboration tools</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openTeam}>Start to create</button>
            </div>
          </div>
          <div className={box}>
          <div className={imageBox}>
              <img src = {Company} />
            </div>
            <h6>Create an enterprise for free</h6>
            <div className={`${content} ${enter_context_div}`}>
              <p>I'm an enterprise manager,<br />&nbsp;&nbsp;&nbsp;and I need to refresh all the departments to empowerment-style organizations and get enterprise-level services.</p>
              <p>Key Features:</p>
              <ul className="clearfix">
                <li>All capabilities of team organizations</li>
                <li>Enterprise level organization structure management</li>
                <li>Stricter enterprise member management</li>
                <li>Management role-based App permission management</li>
                <li>Enterprise-level uniform basic file and data control</li>
                <li>Basic Attendance and Salary Query Service</li>
                <li>Enterprise-level App market provides all-round digital service entrance</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openEnter}>Start to create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EstablishContent;
