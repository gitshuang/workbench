import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions'; 
const { dismissTeam, closeDismissModal } = teamconfigActions; 
import PopDialog from 'pub-comp/pop';
import {content,select_enter_close} from './index.css';
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
      title: "$i18n{index.js0}$i18n-end"+props.data.name+"?",
      isManage: 0,
      msg:"",
      close:true,
      pro:"1",
      disable:false
    }
  }
 
  configFn=()=>{
    this.setState({
      disable:true
    })
    const { dismissTeam, isManage ,userInfo,data:{serverApi}} = this.props;
    let { pro} = this.state;
    if(pro == "1"){
      this.setState({
        title:"$i18n{index.js1}$i18n-end",
        pro:"2"
      });
      return false;
    }
    dismissTeam(serverApi).then(({error, payload}) => {
      this.setState({
        disable:false
      })
      if (error) {
        this.setState({
          isManage: 1,
          msg:payload,
        });
        return false;
      }
      if(userInfo.allowTenants.length == 1){//$i18n{index.js2}$i18n-end
        if(!userInfo.allowTenants)return;
        this.changeTenant(userInfo.allowTenants[0].tenantId); 
      }else if(userInfo.allowTenants.length == 0){
        const {
          history, 
        } = this.props;
        history.push('/establish');
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
      `${origin?origin:''}${pathname?pathname:''}?tenantId=${tenantId}&switch=true`,
    );
  }

  // 取消
  cancelFn = () => {
    const { closeDismissModal } = this.props;
    closeDismissModal();
  }

  render() {
    const {type,data:{name,msg:_msg}} = this.props;
    const {msg,isManage,close,title,disable} = this.state;
    let btnLabel = "$i18n{index.js3}$i18n-end";
    let _pop_title = "$i18n{index.js4}$i18n-end"+name+"?";
    let _cont = null;
    let _btn = null;
    let _select_enter = null;

    if(isManage == 0){//$i18n{index.js5}$i18n-end
      _cont = (<div className={content} >
            {/* <h5>{title}</h5> */}
          <p>{_msg}</p>
        </div>);
        _btn = [
          {
            label: btnLabel,
            fun: this.configFn,
            disable
          },
          {
            label: '$i18n{index.js6}$i18n-end',
            fun: this.cancelFn,
          }
        ];
    }else if(isManage == 1){//$i18n{index.js7}$i18n-end
      _cont = (<div className={content} ><p>{msg}</p></div>);
      _pop_title= {title};
    }else if(isManage == 2){//$i18n{index.js8}$i18n-end/$i18n{index.js9}$i18n-end
      _pop_title= "$i18n{index.js10}$i18n-end";
      _cont = <SelectEnter />
      _btn = null;
      _select_enter = select_enter_close;
    }

    _pop_title= "$i18n{index.js11}$i18n-end";
    _cont = <SelectEnter />
    _btn = null;
    _select_enter = select_enter_close;

    return ( 
      <PopDialog
      className={`team_dismiss_modal ${_select_enter} `}
      show={ true }
      title={name}
      backup={false}
      close={this.cancelFn} 
      btns={_btn}
      >
      <div className={content} >
          <h5>{this.state.title}</h5>
          <p>{msg}</p>
      </div>
    </PopDialog>
    )
  }
}
export default TeamDismissModal;
