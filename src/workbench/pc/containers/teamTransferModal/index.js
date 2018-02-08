import React, { Component } from 'react';
import { connect } from 'react-redux';
// 加载公共模块
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
// 定义actions
const { transferTeam, closeTransferModal } = teamconfigActions;

import { Modal, Button } from 'tinper-bee';
import { modal, form, cancelButton } from './index.css';
@connect(
  mapStateToProps(
    
  ),
  {
    transferTeam,
    closeTransferModal
  }
)


class TeamTransferModal extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  // 删除确认
  configFn = () => {
    const { transferTeam } = this.props;
    transferTeam().then(({error, payload}) => {
      if (error) {
        console.log(payload);
      }
      this.cancelFn();
    });
  }

  // 取消
  cancelFn = () => {
    const { closeTransferModal } = this.props;
    closeTransferModal();
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
          <Modal.Title>移交团队</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>移交团队后您将不再有管理员权限。</p>
          <p>请搜索被移交用户</p>
          <div></div>
        </Modal.Body>
        <Modal.Footer>
          <Button colors="danger" onClick={this.configFn}>删除</Button>
          <button className={cancelButton} onClick={this.cancelFn}>取消</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
export default TeamTransferModal;
