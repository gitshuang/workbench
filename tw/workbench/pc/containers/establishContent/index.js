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
    const { type } = this.props;
    let titleCont = null;
    if(type && type == "init"){
      titleCont = (<div>
        <h5>歡迎來到用友雲</h5>
        <p className={desc}>創建您的團隊或企業，邀請好友一起體驗吧。您也可以聯繫好友邀請您加入他/她的團隊或企業。</p>
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
            <h6>免費創建團隊</h6>
            <div className={content}>
              <p>我是團隊管理者,<br />需要賦能刷新我的部門或專案組。</p>
              <p>關鍵特性：</p>
              <ul className="clearfix">
                <li>全功能團隊即時溝通工具（IM）</li>
                <li>小友智能虛擬個人助理</li>
                <li>帶有場景感知能力的日程中心</li>
                <li>賦能型專案協作工具</li>
                <li>員工權益中心</li>
                <li>智慧找人</li>
                <li>工作圈、微郵等辦公協作工具</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openTeam}>開始創建</button>
            </div>
          </div>
          <div className={box}>
          <div className={imageBox}>
              <img src = {Company} />
            </div>
            <h6>免費創建企業</h6>
            <div className={`${content} ${enter_context_div}`}>
              <p>我是企業管理者,<br />需要把所有部門都刷新為賦能型組織並獲得企業級服務。</p>
              <p>關鍵特性：</p>
              <ul className="clearfix">
                <li>團隊組織所具備的全部能力</li>
                <li>企業級組織架構管理</li>
                <li>更嚴格的企業成員管理</li>
                <li>基於管理角色的應用許可權管理</li>
                <li>企業級統一基礎檔案與資料管控</li>
                <li>基礎假勤與薪資查詢服務</li>
                <li>企業級應用市場提供全方位數位化服務入口</li>
              </ul>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={this.openEnter}>開始創建</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EstablishContent;