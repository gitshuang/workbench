import React, { Component } from 'react';
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
    const { history } = this.props;
    // history.push('/createteam/home');
  }

  openEnter = () => {
    const { history } = this.props;
    // history.push('/createenter/home');
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
          <div className={box} key='team'>
            <div className={imageBox}>
              <img src = {Team} />
            </div>
            <h6>Create a team for free</h6>
            <div className={content}>
              <p>I'm a team manager.<br />I need to empower my department or project group.</p>
              <p>Key Features:</p>
              <ul className="clearfix">
                <li key='t0'>An All-in-one IM tool for teams (IM)</li>
                <li key='t1'>YouBot, an intelligent virtual personal assistant</li>
                <li key='t2'>Context-aware schedule center</li>
                <li key='t3'>An empowering project collaboration tool</li>
                <li key='t4'>Employee Benefits Center</li>
                <li key='t5'>Intelligent Personnel Searching Function</li>
                <li key='t6'>Moments, Mini-Mail, and other OA tools</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openTeam}>Create</button>
            </div>
          </div>
          <div className={box} key='enter'>
          <div className={imageBox}>
              <img src = {Company} />
            </div>
            <h6>Create an enterprise for free</h6>
            <div className={`${content}`}>
              <p>I'm an enterprise manager.<br />I need to convert all the departments to empowering organizations and get enterprise-level services.</p>
              <p>Key Features:</p>
              <ul className="clearfix">
                <li key='e0'>All capabilities of team organizations</li>
                <li key='e1'>Enterprise level organization structure management</li>
                <li key='e2'>Stricter enterprise member management</li>
                <li key='e3'>Role-based application permission management</li>
                <li key='e4'>Enterprise-level uniform basic file and data control</li>
                <li key='e5'>Basic Attendance and Salary Query Service</li>
                <li key='e6'>Enterprise-level App market provides all-round digital service entrance</li>
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
