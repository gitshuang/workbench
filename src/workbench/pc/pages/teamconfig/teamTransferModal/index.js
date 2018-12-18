import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { transferTeam, closeTransferModal } = teamconfigActions;
import PopDialog from 'pub-comp/pop';
import {content} from './index.css';

@connect(
  mapStateToProps(

  ),
  {
    transferTeam,
    closeTransferModal
  }
)


class TeamTransferModal extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // 删除确认
  configFn = () => {
    const { transferTeam } = this.props;
    transferTeam().then(({error, payload}) => {
      if (error) {
        console.log(payload);
      }
      this.cancelFn();
    });
  }

  // 取消
  cancelFn = () => {
    const { closeTransferModal } = this.props;
    closeTransferModal();
  }

  render() {
    return (
      <PopDialog
          className="team_transfer_modal"
          type="warning"
          show={ true }
          title="移交团队"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: '确定',
              fun: this.configFn,
            },
            {
              label: '取消',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            <p>移交团队后您将不再有管理员权限。</p>
            <p>请搜索被移交用户</p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamTransferModal;
