import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { dismissTeam, closeDismissModal } = teamconfigActions;
import PopDialog from 'pub-comp/pop';
import { content, select_enter_close } from './index.css';
import SelectEnter from '../teamExitModal/selectEnter'

@connect(
  mapStateToProps(
    'dismissTeamMsg',
    {
      key: 'userInfo',
      value: (teamconfig, ownProps, root) => {
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
      title: "Confirm" + props.data.name + "?",
      isManage: 0,
      msg: "",
      close: true,
      pro: "1",
      disable: false
    }
  }

  configFn = () => {
    this.setState({
      disable: true
    })
    const { dismissTeam, isManage, userInfo, data: { serverApi } } = this.props;
    let { pro } = this.state;
    if (pro == "1") {
      this.setState({
        title: "Later?",
        pro: "2"
      });
      return false;
    }
    dismissTeam(serverApi).then(({ error, payload }) => {
      this.setState({
        disable: false
      })
      if (error) {
        this.setState({
          isManage: 1,
          msg: payload,
        });
        return false;
      }
      if (userInfo.allowTenants.length == 1) {//进入该企业或团队
        if (!userInfo.allowTenants) return;
        this.changeTenant(userInfo.allowTenants[0].tenantId);
      } else if (userInfo.allowTenants.length == 0) {
        const {
          history,
        } = this.props;
        history.replace('/');
      } else if (userInfo.allowTenants.length > 1) {
        this.setState({
          isManage: 2
        });
      }
    });
  }

  changeTenant = (tenantId) => {
    const {
      location: {
        origin,
        pathname,
        hash,
      },
    } = window;
    window.location.replace(
      `${origin ? origin : ''}${pathname ? pathname : ''}?tenantId=${tenantId}&switch=true`,
    );
  }

  // 取消
  cancelFn = () => {
    const { closeDismissModal } = this.props;
    closeDismissModal();
  }

  render() {
    const { type, data: { name, msg: _msg } } = this.props;
    const { msg, isManage, close, title, disable } = this.state;
    let btnLabel = "OK";
    let _pop_title = "Confirm" + name + "?";
    let _cont = null;
    let _btn = null;
    let _select_enter = null;

    if (isManage == 0) {//退出团队信息
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
          label: 'Cancel',
          fun: this.cancelFn,
        }
      ];
    } else if (isManage == 1) {//退出失败后显示信息
      _cont = (<div className={content} ><p>{msg}</p></div>);
      _pop_title = { title };
    } else if (isManage == 2) {//退出后选中企业/团队
      _pop_title = "Please choose again";
      _cont = <SelectEnter />
      _btn = null;
      _select_enter = select_enter_close;
    }

    _pop_title = "Please choose again";
    _cont = <SelectEnter />
    _btn = null;
    _select_enter = select_enter_close;

    return (
      <PopDialog
        className={`team_dismiss_modal ${_select_enter} `}
        show={true}
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
