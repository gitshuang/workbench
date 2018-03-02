import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { removeUser, closeRemoveModal } = teamconfigActions;
import PopDialog from 'components/pop';
import {content} from './index.css';
@connect(
  mapStateToProps(

  ),
  {
    removeUser,
    closeRemoveModal
  }
)


class TeamRemoveModal extends Component {

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
    const { removeUser, deleteMemberId, queryUser } = this.props;
    removeUser(deleteMemberId).then(({error, payload}) => {
      if (error) {
        console.log(payload);
      }
      queryUser();
      this.cancelFn();
    });
  }

  // 取消
  cancelFn = () => {
    const { closeRemoveModal } = this.props;
    closeRemoveModal();
  }

  render() {
    return (
      <PopDialog
          className="team_remove_modal"
          show={ true }
          title="确认移除所选用户?"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: '删除',
              fun: this.configFn,
            },
            {
              label: '取消',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            确认移除所选用户？
          </div>
        </PopDialog>
    )
  }
}
export default TeamRemoveModal;
