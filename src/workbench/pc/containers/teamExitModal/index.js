import React, { Component } from 'react';
import { connect } from 'react-redux';
// 加载公共模块
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
// 定义actions
const { exitTeam, closeExitModal } = teamconfigActions;

import Modal from 'bee/modal';
import Button from 'bee/button'
import { modal, form, cancelButton } from './index.css';
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
    return (
      <Modal
        show = { true }
        style={{ width: 400}}
        onHide={ this.cancelFn }
        className={modal}
      >
        <Modal.Header className="text-center" closeButton={true}>
          <Modal.Title>退出团队</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {this.renderModalBody()}
        </Modal.Body>
        <Modal.Footer>
          <Button colors="danger" onClick={this.configFn}>{this.state.isManage ? "移交" : "退出"}</Button>
          <button className={cancelButton} onClick={this.cancelFn}>取消</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
export default TeamRemoveModal;
