import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
const { transferTeam, closeTransferModal } = teamconfigActions;
import PopDialog from 'pub-comp/pop';
import {content} from './index.css';

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
      <PopDialog
          className="team_transfer_modal"
          type="warning"
          show={ true }
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
            <p></p>
            <p></p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamTransferModal;
