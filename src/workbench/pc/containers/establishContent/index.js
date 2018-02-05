import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Button } from 'tinper-bee';
import {
  wrap,
  desc,
  box,
  imageBox,
  content
} from './index.css';

import Team from 'assets/image/wgt/team.png';
import Company from 'assets/image/wgt/company.png';

@withRouter
class EstablishContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentWillMount() {

  }
  
  openTeam = () => {
    console.log(this.props);
    const { history } = this.props;
    const { userInfo } = this.props;

    //let data = userInfo.allowTenants.length ? "home" : "login" ;
    const path = '/createteam/login';
    history.push(path);
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div className={wrap}>
        <h5>Hi {userInfo.userName}，欢迎来到用友Diwork</h5>  
        <p className={desc}>在正式使用之前，您需要先有所属的团队或企业。</p>
        <div className="um-box">
          <div className={box}>
            <div className={imageBox}>
              <img src = {Team} />
            </div>
            <h6>创建团队</h6>
            <div className={content}>
              <p>创建后你可以使用以下功能：</p>
              <ul className="clearfix">
                <li>· 项目管理</li>  
                <li>· 共享图书</li>  
                <li>· 文件管理</li>  
                <li>· 工作圈/投票/话题</li>  
                <li>· 笔记共享</li>  
                <li>· 电话会议/视频会议</li>  
                <li>· 商旅出行</li>  
              </ul>  
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openTeam}>开始创建</button>  
            </div>
          </div>
          <div className={box}>
          <div className={imageBox}>
              <img src = {Company} />
            </div>
            <h6>创建企业</h6>
            <div className={content}>
              <p>开通企业你可以使用以下功能：</p>
              <ul className="clearfix">
                <li>· 企业组织管理</li>  
                <li>· 工资条</li>  
                <li>· 入离职</li>  
                <li>· 自助档案</li>  
                <li>· 考勤打卡/请假/报表</li>  
                <li>· 企业公告/新闻</li>  
              </ul>  
            </div>
            <div style={{textAlign:"center"}}>
              <button>开始创建</button>  
            </div>
          </div>
        </div>
      </div>  
    )
  }
}

export default EstablishContent;
