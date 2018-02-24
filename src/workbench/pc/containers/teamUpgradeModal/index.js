import React, { Component } from 'react';
import { connect } from 'react-redux';
// 加载公共模块
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
// 定义actions
const { closeUpgradeModal } = teamconfigActions;

import { Modal, Button } from 'tinper-bee';
import { modal, form, cancelButton } from './index.css';
@connect(
  mapStateToProps(
    
  ),
  {
    closeUpgradeModal
  }
)


class TeamUpgradeModal extends Component {

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
    const { history } = this.props;
    history.push("/createenter/team");
    this.cancelFn();
  }

  // 取消
  cancelFn = () => {
    const { closeUpgradeModal } = this.props;
    closeUpgradeModal();
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
          <Modal.Title>升级为企业后您可以获得更多权限:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>企业组织管理</p>
          <p>入离职</p>
          <p>考勤打卡/请假/报表</p>
          <p>工资条</p>
          <p>自助档案</p>
          <p>企业公告/新闻</p>
        </Modal.Body>

        <Modal.Footer>
          <Button colors="danger" onClick={this.configFn}>立即升级</Button>
          <button className={cancelButton} onClick={this.cancelFn}>取消</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
export default TeamUpgradeModal;
