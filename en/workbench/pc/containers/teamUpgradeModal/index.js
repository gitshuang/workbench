import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { closeUpgradeModal } = teamconfigActions;
import PopDialog from 'pub-comp/pop';
import {content} from './index.css';

@withRouter
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
    history.replace("/updateenter");
    this.cancelFn();
  }

  // 取消
  cancelFn = () => {
    const { closeUpgradeModal } = this.props;
    closeUpgradeModal();
  }

  render() {
    return (
      <PopDialog
          className="team_upgrade_modal_dailog"
          show={ true }
          type="success"
          title="You can get more rights when you upgrade to an enterprise"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: 'update now',
              fun: this.configFn,
            },
            {
              label: 'cancel',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            <p>· Enterprise-level organizational architecture management</p>

            <p>· Stricter management of corporate members</p>

            <p>· Application permission management based on administrative roles</p>

            <p>· Enterprise level unified basic file and data control</p>

            <p>· Basic attendance and salary enquiry service</p>

            <p>· Enterprise - level application market provides a comprehensive digital service portal</p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamUpgradeModal;
