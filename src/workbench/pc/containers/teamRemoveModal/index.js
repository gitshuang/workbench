import React, { Component } from 'react';
import { connect } from 'react-redux';
// 加载公共模块
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
// 定义actions
const { removeUser, closeRemoveModal } = teamconfigActions;

import { Modal, Button } from 'tinper-bee';
import { modal, form, cancelButton } from './index.css';
@connect(
  mapStateToProps(
    
  ),
  {
    removeUser,
    closeRemoveModal
  }
)


class TeamRemoveModal extends Component {

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
    const { removeUser, deleteMemberId, queryUser } = this.props;
    removeUser(deleteMemberId).then(({error, payload}) => {
      if (error) {
        console.log(payload);
      }
      queryUser();
      this.cancelFn();
    });
  }

  // 取消
  cancelFn = () => {
    const { closeRemoveModal } = this.props;
    closeRemoveModal();
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
          <Modal.Title>确认移除所选用户？</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>

        <Modal.Footer>
          <Button colors="danger" onClick={this.configFn}>删除</Button>
          <button className={cancelButton} onClick={this.cancelFn}>取消</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
export default TeamRemoveModal;
