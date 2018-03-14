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
      msg:"确认移除所选用户？",
      disable:false
    }
  }
  // 删除确认
  configFn = () => {
    this.setState({
      disable:true
    })
    const { removeUser, currMemberId, queryUser } = this.props;
    removeUser(currMemberId).then(({error, payload}) => {
      this.setState({
        disable:false
      })
      if (error) {
        this.setState({
          msg:payload,
        });
        console.log(payload);
        return;
      }else{
        queryUser();
        this.cancelFn();
      }
    });
  }
  // 取消
  cancelFn = () => {
    const { closeRemoveModal } = this.props;
    closeRemoveModal();
  }

  render() {
    const {disable} = this.state;
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
              disable
            },
            {
              label: '取消',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
              {msg}
          </div>
        </PopDialog>
    )
  }
}
export default TeamRemoveModal;
