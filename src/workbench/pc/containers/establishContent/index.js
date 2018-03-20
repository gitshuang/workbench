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
        <h5>欢迎来到用友diwork</h5>
        <p className={desc}>创建您的团队或企业，邀请好友一起体验吧。您也可以联系好友邀请您加入他/她的团队或企业。</p>
      </div>)
    }

    return (
      <div className={wrap}>
        {titleCont}
        <div className={`${est_context} um-box`}>
          <div className={box}>
            <div className={imageBox}>
              <img src = {Team} />
            </div>
            <h6>免费创建团队</h6>
            <div className={content}>
              <p>我是团队管理者。需要赋能刷新我的部门或项目组。</p>
              <p>关键特性：</p>
              <ul className="clearfix">
                <li>· 全功能团队即时沟通工具（IM）</li>
                <li>· 小友智能虚拟个人助理</li>
                <li>· 带有场景感知能力的日程中心</li>
                <li>· 赋能型项目协作工具</li>
                <li>· 员工权益中心</li>
                <li>· 智慧找人与共享图书</li>
                <li>· 工作圈、微邮等办公协作工具</li>
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
            <h6>免费创建企业</h6>
            <div className={`${content} ${enter_context_div}`}>
              <p>我是企业管理者，需要把所有部门都刷新为赋能型组织并获得企业级服务。</p>
              <p>关键特性：</p>
              <ul className="clearfix">
                <li>· 团队组织所具备的全部能力</li>
                <li>· 企业级组织架构管理</li>
                <li>· 更严格的企业成员管理</li>
                <li>· 基于管理角色的应用权限管理</li>
                <li>· 企业级统一基础档案与数据管控</li>
                <li>· 基础假勤与薪资查询服务</li>
                <li>· 企业级应用市场提供全方位数字化服务入口</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openEnter}>开始创建</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EstablishContent;
