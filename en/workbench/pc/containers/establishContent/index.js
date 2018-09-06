import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
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
    // const { type } = this.props;
    // console.log(process.env.LUN);
    // debugger;
    // let titleCont = null;
    // if(type && type == "init"){
    //   titleCont = (<div>
    //     <h5>欢迎来到用友云</h5>
    //     <p className={desc}>创建您的团队或企业，邀请好友一起体验吧。您也可以联系好友邀请您加入他/她的团队或企业。</p>
    //   </div>)
    // }
    // {titleCont}
    const { locale  } = window.diworkContext();
    const enstyle = locale === 'en_US' ? en : '';
    return (
      <div className={`${wrap} ${enstyle}`}>
        <div className={`${est_context}`}>
          <div className={box}>
            <div className={imageBox}>
              <img src = {Team} />
            </div>
            <h6>Create a team for free</h6>
            <div className={content}>
              <p>I'm a team manager.<br />I need to empower my department or project group.</p>
              <p>Key Features:</p>
              <ul className="clearfix">
                <li>An All-in-one IM tool for teams (IM)</li>
                <li>YouBot, an intelligent virtual personal assistant</li>
                <li>Context-aware schedule center</li>
                <li>An empowering project collaboration tool</li>
                <li>Employee Benefits Center</li>
                <li>Intelligent Personnel Searching Function</li>
                <li>Moments, Mini-Mail, and other OA tools</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openTeam}>Create</button>
            </div>
          </div>
          <div className={box}>
          <div className={imageBox}>
              <img src = {Company} />
            </div>
            <h6>Create an enterprise for free</h6>
            <div className={`${content}`}>
              <p>I'm an enterprise manager.<br />I need to convert all the departments to empowering organizations and get enterprise-level services.</p>
              <p>Key Features:</p>
              <ul className="clearfix">
                <li>All capabilities of team organizations</li>
                <li>Enterprise level organization structure management</li>
                <li>Stricter enterprise member management</li>
                <li>Role-based application permission management</li>
                <li>Enterprise-level uniform basic file and data control</li>
                <li>Basic Attendance and Salary Query Service</li>
                <li>Enterprise-level App market provides all-round digital service entrance</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openEnter}>Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EstablishContent;
