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
          title="NoDictionary"
          backup={false}
          close={this.cancelFn} 
          btns={[
            {
              label: 'NoDictionary',
              fun: this.configFn,
            },
            {
              label: 'NoDictionary',
              fun: this.cancelFn,
            }
          ]} 
          >
          <div className={content} >
            <p>· NoDictionary</p>

            <p>· NoDictionary</p>

            <p>· NoDictionary</p>

            <p>· NoDictionary</p>

            <p>· NoDictionary</p>

            <p>· NoDictionary</p>
          </div>
        </PopDialog>
    )
  }
}
export default TeamUpgradeModal;
