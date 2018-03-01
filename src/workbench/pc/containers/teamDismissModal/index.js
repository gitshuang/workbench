import React, { Component } from 'react';
import { connect } from 'react-redux';
// 加载公共模块
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
// 定义actions
const { dismissTeam, closeDismissModal } = teamconfigActions;

import Modal from 'bee/modal';
import Button from 'bee/button';
import { modal, form, cancelButton } from './index.css';
@connect(
  mapStateToProps(

  ),
  {
    dismissTeam,
    closeDismissModal
  }
)


class TeamRemoveModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "确认解散团队?",
      number: 0
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  // 删除确认
  configFn = () => {
    const { number } = this.state;
    if (number == 0){
      this.setState({
        number: 1,
        title: "不再想想了？"
      });
      return false;
    }
    const { dismissTeam } = this.props;
    dismissTeam().then(({error, payload}) => {
      if (error) {
        console.log(payload);
      }
      this.cancelFn();
    });
  }

  // 取消
  cancelFn = () => {
    const { closeDismissModal } = this.props;
    closeDismissModal();
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
          <Modal.Title>解散团队</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{this.state.title}</h5>
          <p>团队解散后系统将解散你和本团队内所有成员的关系并清除所有数据，请谨慎操作!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button colors="danger" onClick={this.configFn}>解散</Button>
          <button className={cancelButton} onClick={this.cancelFn}>取消</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
export default TeamRemoveModal;
