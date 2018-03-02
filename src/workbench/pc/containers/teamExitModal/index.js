import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions'; 
const { exitTeam, closeExitModal } = teamconfigActions; 
import PopDialog from 'components/pop';
import {content} from './index.css';

@connect(
  mapStateToProps(

  ),
  {
    exitTeam,
    closeExitModal
  }
)


class TeamRemoveModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isManage: false
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  // 删除确认
  configFn = () => {
    const { exitTeam, isManage, userId } = this.props;
    // if( isManage ){
    //   this.setState({
    //     isManage: true
    //   });
    //   return false;
    // }
    exitTeam(userId).then(({error, payload}) => {
      this.cancelFn();
      if (error) {
        console.log(payload);
        return false;
      }
      if(payload){

      }
      window.location.href = "/";
    });
  }

  // 取消
  cancelFn = () => {
    const { closeExitModal } = this.props;
    closeExitModal();
  }

  renderModalBody = () => {
    const { isManage } = this.state;
    if(!isManage){
      return (
        <div>
          <h6>确认退出团队?</h6>
          <p>团队解散后系统将解散你和本团队内所有成员的关系并清除所有数据，请谨慎操作!</p>
        </div>
      )
    }else{
      return (
        <div>
          <h6>管理员需移交团队后再退出团队.</h6>
        </div>
      )
    }
  }

  render() {
    let btnLabel = this.state.isManage ? "移交" : "退出";

    return (
      <PopDialog
          className="team_exit_modal"
          show={ true }
          title="退出团队"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: btnLabel,
              fun: this.configFn,
            },
            {
              label: '取消',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            <h6>确认退出团队?</h6>
            <p>团队解散后系统将解散你和本团队内所有成员的关系并清除所有数据，请谨慎操作!</p> 
          </div>
        </PopDialog>
    )
  }
}
export default TeamRemoveModal;
