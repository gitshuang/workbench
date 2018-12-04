import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { removeUser, closeRemoveModal } = teamconfigActions;
import PopDialog from 'pub-comp/pop';
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
      msg:"確認移除所選用戶？",
      disable:false,
      btn:[
        {
          label: '刪除',
          fun: this.configFn,
          disable:false
        },
        {
          label: '取消',
          fun: this.cancelFn,
        }
      ]
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
          btn:[{
            label: '知道了',
            fun: this.cancelFn,
          }]
        }); 
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
    const {disable,msg,btn} = this.state;
    return (
      <PopDialog
          className="team_remove_modal"
          type="warning"
          show={ true }
          title="確認移除所選用戶?"
          backup={false}
          close={this.cancelFn} 
          btns={btn} 
          >
          <div className={content} >
              {msg}
          </div>
        </PopDialog>
    )
  }
}
export default TeamRemoveModal;
