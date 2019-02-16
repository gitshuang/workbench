import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { closeUpgradeModal } = teamconfigActions;
import PopDialog from 'pub-comp/pop';
import {content} from './index.css';
import { openWin } from 'public/regMessageTypeHandler';

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

  // 删除确认
  configFn = () => {
    
    openWin({
      id: 'UpdateEnter',
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
          title=""
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: '',
              fun: this.configFn,
            },
            {
              label: '',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            <p>· </p>

            <p>· </p>

            <p>· </p>

            <p>· </p>

            <p>· </p>

            <p>· </p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamUpgradeModal;
