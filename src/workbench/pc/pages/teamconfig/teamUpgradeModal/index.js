import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { closeUpgradeModal } = teamconfigActions;
import PopDialog from 'pub-comp/pop';
import {content} from './index.css';
import { openWin } from 'public/regMessageTypeHandler';

@withRouter
@connect(
  mapStateToProps(

  ),
  {
    closeUpgradeModal,
  }
)


class TeamUpgradeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // 删除确认
  configFn = () => {
    
    openWin({
      id: 'UpdateEnter',
      title: '升级企业',
    });
    // const { history, } = this.props;
    // history.push("/updateenter");
    this.cancelFn();
  }

  // 取消
  cancelFn = () => {
    const { closeUpgradeModal } = this.props;
    closeUpgradeModal();
  }

  render() {
    return (
      <PopDialog
          className="team_upgrade_modal_dailog"
          show={ true }
          type="success"
          title="升级为企业后您可以获得更多权限"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: '立即升级',
              fun: this.configFn,
            },
            {
              label: '取消',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            <p>· 企业级组织架构管理</p>

            <p>· 更严格的企业成员管理</p>

            <p>· 基于管理角色的应用权限管理</p>

            <p>· 企业级统一基础档案与数据管控</p>

            <p>· 基础假勤与薪资查询服务</p>

            <p>· 企业级应用市场提供全方位数字化服务入口</p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamUpgradeModal;
