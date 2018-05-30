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
          show={ true }
          title="NoDictionary"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: 'NoDictionary',
              fun: this.configFn,
            },
            {
              label: 'NoDictionary',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            NoDictionary
          </div>
        </PopDialog>
    )
  }
}
export default TeamManagerModal;
