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
      title: '创建团队',
    });
  }

  openEnter = () => {
    openWin({
      id: 'CreateEnter',
      title: '创建企业',
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
            <h6>免费创建团队</h6>
            <div className={content}>
              <p>我是团队管理者,<br />需要赋能刷新我的部门或项目组。</p>
              <p>关键特性：</p>
              <ul className="clearfix">
                <li key='t0'>全功能团队即时沟通工具（IM）</li>
                <li key='t1'>小友智能虚拟个人助理</li>
                <li key='t2'>带有场景感知能力的日程中心</li>
                <li key='t3'>赋能型项目协作工具</li>
                <li key='t4'>员工权益中心</li>
                <li key='t5'>智慧找人</li>
                <li key='t6'>工作圈、微邮等办公协作工具</li>
              </ul>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={this.openTeam}>开始创建</button>
            </div>
          </div>
          <div className={box} key='enter'>
            <div className={imageBox}>
              <img src={Company} />
            </div>
            <h6>免费创建企业</h6>
            <div className={`${content}`}>
              <p>我是企业管理者,<br />需要把所有部门都刷新为赋能型组织并获得企业级服务。</p>
              <p>关键特性：</p>
              <ul className="clearfix">
                <li key='e0'>团队组织所具备的全部能力</li>
                <li key='e1'>企业级组织架构管理</li>
                <li key='e2'>更严格的企业成员管理</li>
                <li key='e3'>基于管理角色的应用权限管理</li>
                <li key='e4'>企业级统一基础档案与数据管控</li>
                <li key='e5'>基础假勤与薪资查询服务</li>
                <li key='e6'>企业级应用市场提供全方位数字化服务入口</li>
              </ul>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={this.openEnter}>开始创建</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EstablishContent;
