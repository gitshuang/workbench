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
    'exitModal',
    'exitTeamMsg',
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
      close:true
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
    const { exitTeam, isManage, userId ,userInfo,data:{serverApi}} = this.props;
    exitTeam(serverApi).then(({error, payload}) => { 
      if (error) {
        let obj = {
          isManage: 1,
          msg:payload,
        };
        this.setState({
          ...obj
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
      `${origin?origin:''}${pathname?pathname:''}?tenantId=${tenantId}&switch=true`,
    );
    // ${hash}
  }

  // 取消
  cancelFn = () => {
    const { closeExitModal ,exitModal} = this.props;
    closeExitModal();
  }
 
  render() {
    const {exitModal,type,data} = this.props;
    let {name  ,_msg  } = "";
    if(data){
      name = data.name;
      _msg = data.msg;
    }
    const {msg,isManage,close} = this.state;
    let btnLabel = "确定";
    let _pop_title = name;
    let _cont = null;
    let _btn = null;

    if(isManage == 0){//退出团队信息
      _cont = (<div className={content} >
            <h6>确认{name}?</h6>
            <p>{_msg}</p>
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
      _cont = (<div className={content}><p>{_msg}</p></div>);
      _pop_title= name;
    }else if(isManage == 2){//退出后选中企业/团队
      _pop_title= "请重新选择"+type;
      _cont = <SelectEnter />
    }
    
    return (
      <PopDialog
          className="team_exit_modal"
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
