import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions'; 
const { dismissTeam, closeDismissModal } = teamconfigActions; 
import PopDialog from 'components/pop';
import {content} from './index.css';
import SelectEnter from '../teamExitModal/selectEnter'

@connect(
  mapStateToProps(
    'dismissTeamMsg',
    'dismissModal',
    {
      key: 'userInfo',
      value: (teamconfig,ownProps,root) => {
        return root.home.userInfo
      }
    },
    {
      namespace: "teamconfig"
    },
  ),
  {
    dismissTeam,
    closeDismissModal
  }
)
class TeamDismissModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "确认解散团队?",
      isManage: 0,
      msg:"",
      close:true,
      pro:"1"
    }
  }
 
  configFn=()=>{
    const { dismissTeam, isManage ,userInfo} = this.props;
    let { pro} = this.state;
    if(pro == "1"){
      this.setState({
        title:"不再想想了？",
        pro:"2"
      });
      return false;
    }
    dismissTeam("dismissTeam").then(({error, payload}) => { 
      if (error) {
        this.setState({
          isManage: 1,
          msg:payload,
        });
        return false;
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
      // this.cancelFn();
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
    const { closeDismissModal } = this.props;
    closeDismissModal();
  }

  render() {
    const {msg,isManage,close,title} = this.state;
    let btnLabel = "确定";
    let _pop_title = "退出团队";
    let _cont = null;
    let _btn = null;

    if(isManage == 0){//退出团队信息
      btnLabel = "解散";
      _cont = (<div className={content} >
            <h5>{title}</h5>
          <p>团队解散后系统将解散你和本团队内所有成员的关系并清除所有数据，请谨慎操作!</p>
        </div>);
        _btn = [
          {
            label: btnLabel,
            fun: this.configFn
          },
          {
            label: '取消',
            fun: this.cancelFn,
          }
        ];
    }else if(isManage == 1){//退出失败后显示信息
      _cont = (<div className={content} ><p>{msg}</p></div>);
      _pop_title= "退出团队";
    }else if(isManage == 2){//退出后选中企业/团队
      _pop_title= "请重新选中企业或团队";
      _cont = <SelectEnter />;
    }
    // {[
    //   {
    //     label: '解散',
    //     fun: this.configFn,
    //   },
    //   {
    //     label: '取消',
    //     fun: this.cancelFn,
    //   }
    // ]} 

    return ( 
      <PopDialog
      className="team_dismiss_modal"
      show={ true }
      title="解散团队"
      backup={false}
      close={this.cancelFn} 
      btns={_btn}
      >
      <div className={content} >
          <h5>{this.state.title}</h5>
          <p>团队解散后系统将解散你和本团队内所有成员的关系并清除所有数据，请谨慎操作!</p>
      </div>
    </PopDialog>
    )
  }
}
export default TeamDismissModal;
