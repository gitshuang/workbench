import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions'; 
const { exitTeam, closeExitModal } = teamconfigActions; 
import PopDialog from 'components/pop';
import {content} from './index.css';
import SelectEnter from './selectEnter'

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    {
      namespace: 'home',
    }
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
      isManage: 0,
      msg:"",
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  // 删除确认
  configFn = () => {
    const { exitTeam, isManage, userId ,userInfo} = this.props;
    exitTeam(userId).then(({error, payload}) => {
      this.cancelFn();
      if (error) {
        return false;
        this.setState({
          isManage: 1,
          msg:payload,
        })
      }
      if(userInfo.allowTenants.length == 1){//进入该企业或团队
        if(!userInfo.allowTenants)return;
        this.changeTenant(userInfo.allowTenants[0].tenantId); 
      }else if(userInfo.allowTenants.length == 0){
        const {
          history, 
        } = this.props;
        history.push('/establishusercenter');
      }else if(userInfo.allowTenants.length > 1){
        this.setState({
          isManage: 2
        })
      }
    });
  }

  changeTenant =(tenantId)=>{
    const {
      location: {
        origin,
        pathname,
        hash,
      },
    } = window;
    window.location.replace(
      `${origin?origin:''}${pathname?pathname:''}?tenantId=${tenantId}&switch=true${hash}`,
    );
  }

  // 取消
  cancelFn = () => {
    // const { closeExitModal ,exitModal} = this.props;
    // closeExitModal();
  }
 
  render() {

    // const {isManage} = this.props;
    const {msg,isManage} = this.state;
    let btnLabel = "确定";

    let _cont = null;
    let _btn = [
      {
        label: '取消',
        fun: this.cancelFn,
      }
    ];

    if(isManage == 0){//退出团队信息
      btnLabel = "退出";
      _cont = (<div className={content} >
            <h6>确认退出团队?</h6>
            <p>团队解散后系统将解散你和本团队内所有成员的关系并清除所有数据，请谨慎操作!</p> 
        </div>);
        _btn = [
          {
            label: btnLabel,
            fun: this.configFn,
          },
          {
            label: '取消',
            fun: this.cancelFn,
          }
        ];
    }else if(isManage == 1){//退出失败后显示信息
      _cont = (<div className={content} > dddddddd<p>{msg}</p></div>);
    }else if(isManage == 2){//退出后选中企业/团队
      _cont = <SelectEnter />
    }

    return (
      <PopDialog
          className="team_exit_modal"
          show={ true }
          title="退出团队"
          backup={false}
          close={this.cancelFn} 
          btns={_btn} 
          >
          {_cont}
        </PopDialog>
    )
  }
}
export default TeamRemoveModal;
