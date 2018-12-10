import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { closeUpgradeModal } = teamconfigActions;
import PopDialog from 'pub-comp/pop';
import {content} from './index.css';
import { openService } from 'public/regMessageTypeHandler';

@withRouter
@connect(
  mapStateToProps(

  ),
  {
    closeUpgradeModal,
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
    
    openService({
      id: 'updateenter',
      type: 'local',
      url: 'UpdateEnter',
      title: '',
    });
    // const { history, } = this.props;
    // history.push("/updateenter");
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
          title="After upgrading to an enterprise, you will get more privileges"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: 'Upgrade',
              fun: this.configFn,
            },
            {
              label: 'Cancel',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            <p>· Enterprise level organization structure management</p>

            <p>· Stricter enterprise member management</p>

            <p>· Role-based application permission management</p>

            <p>· Enterprise-level uniform basic file and data control</p>

            <p>· Basic Attendance and Salary Query Service</p>

            <p>· Enterprise-level App market provides all-round digital service entrance</p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamUpgradeModal;
