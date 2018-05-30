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
      <PopDialog
          className="team_transfer_modal"
          show={ true }
          title="$i18n{index.js0}$i18n-end"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: '$i18n{index.js1}$i18n-end',
              fun: this.configFn,
            },
            {
              label: '$i18n{index.js2}$i18n-end',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            <p>$i18n{index.js3}$i18n-end。</p>
            <p>$i18n{index.js4}$i18n-end</p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamTransferModal;
