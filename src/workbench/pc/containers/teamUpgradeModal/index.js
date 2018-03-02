import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { closeUpgradeModal } = teamconfigActions;
import PopDialog from 'components/pop';
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
    history.replace("/updateenter");
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
          title="升级为企业后您可以获得更多权限:"
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
            <p>企业组织管理</p>
            <p>入离职</p>
            <p>考勤打卡/请假/报表</p>
            <p>工资条</p>
            <p>自助档案</p>
            <p>企业公告/新闻</p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamUpgradeModal;
