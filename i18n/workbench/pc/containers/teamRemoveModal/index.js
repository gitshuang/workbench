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
      msg:"$i18n{index.js0}$i18n-end",
      disable:false,
      btn:[
        {
          label: '$i18n{index.js1}$i18n-end',
          fun: this.configFn,
          disable:false
        },
        {
          label: '$i18n{index.js2}$i18n-end',
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
          btn:[]
        }); 
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
    const {disable,msg,btn} = this.state;
    return (
      <PopDialog
          className="team_remove_modal"
          show={ true }
          title="$i18n{index.js3}$i18n-end"
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
