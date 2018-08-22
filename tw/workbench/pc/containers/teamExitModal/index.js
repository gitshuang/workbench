import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

import teamconfigActions from 'store/root/teamconfig/actions';
const { exitTeam, closeExitModal } = teamconfigActions;

import PopDialog from 'pub-comp/pop';
import { content, select_enter_close } from './index.css';
import SelectEnter from './selectEnter'

@withRouter
@connect(
  mapStateToProps(
    'exitModal',
    {
      namespace: "teamconfig"
    },
  ),
  {
    exitTeam,
    closeExitModal,
  }
)
class TeamRemoveModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isManage: 0,
      msg: "",
      close: true,
      disable: false,
      next: false,
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.close != this.props.close) {
      this.setState({
        close: nextProps.close
      })
    }
  }

  // 删除确认
  configFn = (da) => {
    this.setState({
      disable: true
    })
    const { exitTeam, data: { serverApi }, } = this.props;
    exitTeam(serverApi).then(({ error, payload }) => {
      this.setState({
        disable: false
      })
      if (error) {
        this.setState({
          isManage: 3,
          msg: payload,
        });
        return false;
      }
      window.location.replace(window.location.origin);
      // getSearchEnterOrTeam().then(({ error, payload }) => {
      //   if (error) {
      //     requestError(payload);
      //     return false;
      //   }
      //   requestSuccess();
      //   if (payload.length == 1) {//进入该企业或团队
      //     if (!payload) return;
      //     this.changeTenant(payload[0].tenantId);
      //   } else if (payload.length == 0) {
      //     const {
      //       history,
      //     } = this.props;
      //     this.cancelFn();
      //     window.location.replace(window.location.origin);
      //   } else if (payload.length > 1) {
      //     this.setState({
      //       isManage: 2
      //     });
      //   }
      // });
    });
  }

  // changeTenant = (tenantId) => {
  //   const {
  //     location: {
  //       origin,
  //       pathname,
  //       hash,
  //     },
  //   } = window;
  //   window.location.replace(
  //     `${origin ? origin : ''}${pathname ? pathname : ''}?tenantId=${tenantId}&switch=true`,
  //   );
  // }

  // 取消
  cancelFn = () => {
    const { closeExitModal } = this.props;
    closeExitModal();
  }

  render() {
    const { exitModal, data } = this.props;
    let { name, _msg } = "";
    if (data) {
      name = data.name;
      _msg = data.msg;
    }
    const { msg, isManage, disable } = this.state;
    let btnLabel = "確定";
    let _pop_title = "確認" + name + "?";
    let _cont = null;
    let _btn = [
      {
        label: btnLabel,
        fun: null,
        disable
      },
      {
        label: '取消',
        fun: this.cancelFn,
      }
    ];
    let _select_enter = null;
    if (isManage == 0) {//退出团队信息
      _cont = (<div className={content} >
        <p>{_msg}</p>
      </div>);
      _btn[0].fun = () => {
        this.setState({
          isManage: 1
        })
      }
    } else if (isManage == 1) {//提示是否需要退出或解散
      _cont = (<div className={content}><p>{msg}</p></div>);
      _pop_title = "確認" + name + "?";
      _btn[0].fun = () => {
        this.configFn();
      }
    } else if (isManage == 3) {//退出失败后显示信息
      _cont = (<div className={content}><p>{msg}</p></div>);
      _pop_title = "確認" + name + "?";
      _btn = null;
    } else if (isManage == 2) {//退出后选中企业/团队
      _pop_title = "您已" + name;
      _cont = <SelectEnter />
      _btn = null;
      _select_enter = select_enter_close;
    }

    return (
      <PopDialog
        className={`team_exit_modal ${_select_enter} `}
        type="warning"
        backdrop={"static"}
        show={exitModal}
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
