import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions'; 
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const { exitTeam, closeExitModal } = teamconfigActions; 
import PopDialog from 'pub-comp/pop';
import {content,select_enter_close} from './index.css';
import SelectEnter from './selectEnter'
const {requestStart, requestSuccess, requestError} = rootActions;
const { getSearchEnterOrTeam } = homeActions;

@withRouter
@connect(
  mapStateToProps(
    'exitModal',
    'exitTeamMsg',
    {
      key: 'searchEnterOrTeamList',
      value: (teamconfig,ownProps,root) => {
        return root.home.searchEnterOrTeamList
      }
    },
    {
      namespace: "teamconfig"
    },
  ),
  {
    getSearchEnterOrTeam,
    exitTeam,
    closeExitModal,
    requestError,
    requestSuccess
  }
)
class TeamRemoveModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isManage: 0,
      msg:"",
      close:true,
      disable:false,
      next:false,
      allowTenants:[],
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.close != this.props.close){
      this.setState({
        close:nextProps.close
      })
    }
  }
 
  // 删除确认
  configFn = (da) => {
    this.setState({
      disable:true
    })
    const { exitTeam, isManage, userId ,data:{serverApi},getSearchEnterOrTeam} = this.props;
    exitTeam(serverApi).then(({error, payload}) => {
      this.setState({
        disable:false
      })
      if (error) {
        this.setState({
          isManage: 3,
          msg:payload,
        });
        return false;
      }
      getSearchEnterOrTeam().then(({error, payload}) => {
          if (error) {
            requestError(payload);
          }
          if(payload.length == 1){//$i18n{index.js0}$i18n-end
            if(!payload)return;
            this.changeTenant(payload[0].tenantId); 
          }else if(payload.length == 0){
            const {
              history, 
            } = this.props;
            this.cancelFn();
            history.replace('/establish');
          }else if(payload.length > 1){
            this.setState({
              isManage: 2
            })
          }
          requestSuccess();
      });
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
    const { closeExitModal } = this.props;
    closeExitModal();
  }
 
  render() {
    const {exitModal,type,data} = this.props;
    let {name  ,_msg  } = "";
    if(data){
      name = data.name;
      _msg = data.msg;
    }
    const {msg,isManage,close,disable} = this.state;
    let btnLabel = "$i18n{index.js1}$i18n-end";
    let _pop_title = "$i18n{index.js2}$i18n-end"+name+"?";
    let _cont = null;
    let _btn = [
      {
        label: btnLabel,
        fun:null,
        disable
      },
      {
        label: '$i18n{index.js3}$i18n-end',
        fun: this.cancelFn,
      }
    ];
    let _select_enter = null;
    if(isManage == 0){//$i18n{index.js4}$i18n-end
      _cont = (<div className={content} >
            <p>{_msg}</p>
        </div>);
        _btn[0].fun = ()=>{
          this.setState({
            isManage:1
          })
        }
    }else if(isManage == 1){//$i18n{index.js5}$i18n-end
      _cont = (<div className={content}><p>{msg}</p></div>);
      _pop_title= "$i18n{index.js6}$i18n-end"+name+"?";
      _btn[0].fun = ()=>{
         this.configFn();
      }
    }else if(isManage == 3){//$i18n{index.js7}$i18n-end
      _cont = (<div className={content}><p>{msg}</p></div>);
      _pop_title= "$i18n{index.js8}$i18n-end"+name+"?";
      _btn = null;
    }else if(isManage == 2){//$i18n{index.js9}$i18n-end/$i18n{index.js10}$i18n-end
      _pop_title= "$i18n{index.js11}$i18n-end"+name;
      _cont = <SelectEnter />
      _btn = null;
      _select_enter = select_enter_close;
    }
    
    return (
      <PopDialog
          className={`team_exit_modal ${_select_enter} `}
          type="warning"
          backdrop={"static"}
          show={ exitModal }
          title={_pop_title}
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