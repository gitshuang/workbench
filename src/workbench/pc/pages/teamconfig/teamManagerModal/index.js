import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';

const { userToAdmin, closeManagerModal } = teamconfigActions;
import PopDialog from 'pub-comp/pop';
import {content} from './index.css';
@connect(
  mapStateToProps(

  ),
  {
    userToAdmin,
    closeManagerModal
  }
)


class TeamManagerModal extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  // 删除确认
  configFn = () => {
    const { userToAdmin, currMemberId, queryUser } = this.props;
    userToAdmin( currMemberId ).then(({ error, payload }) => {
      if (error) {
        console.log(payload);
      }
      queryUser();
      this.cancelFn();
    });
  }

  // 取消
  cancelFn = () => {
    const { closeManagerModal } = this.props;
    closeManagerModal();
  }

  render() {
    return (
      <PopDialog
          className="team_remove_modal"
          type="warning"
          show={ true }
          title="设置管理员"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: '设置管理员',
              fun: this.configFn,
            },
            {
              label: '取消',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            确定设置当前用户为管理员？
          </div>
        </PopDialog>
    )
  }
}
export default TeamManagerModal;
