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
    history.push("/updateenter");
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
            <p>· $i18n{index.js3}$i18n-end</p>

            <p>· $i18n{index.js4}$i18n-end</p>

            <p>· $i18n{index.js5}$i18n-end</p>

            <p>· $i18n{index.js6}$i18n-end</p>

            <p>· $i18n{index.js7}$i18n-end</p>

            <p>· $i18n{index.js8}$i18n-end</p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamUpgradeModal;
