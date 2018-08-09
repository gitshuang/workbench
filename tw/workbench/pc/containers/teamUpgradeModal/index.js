import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { closeUpgradeModal } = teamconfigActions;
import PopDialog from 'pub-comp/pop';
import {content} from './index.css';

@withRouter
@connect(
  mapStateToProps(

  ),
  {
    closeUpgradeModal
  }
)


class TeamUpgradeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  // 删除确认
  configFn = () => {
    const { history } = this.props;
    history.push("/updateenter");
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
          title="升級為企業後您可以獲得更多許可權"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: '立即升級',
              fun: this.configFn,
            },
            {
              label: '取消',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            <p>· 企業級組織架構管理</p>

            <p>· 更嚴格的企業成員管理</p>

            <p>· 基於管理角色的應用許可權管理</p>

            <p>· 企業級統一基礎檔案與資料管控</p>

            <p>· 基礎假勤與薪資查詢服務</p>

            <p>· 企業級應用市場提供全方位數位化服務入口</p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamUpgradeModal;
