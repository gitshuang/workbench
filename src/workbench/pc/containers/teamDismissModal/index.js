import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions'; 
const { dismissTeam, closeDismissModal } = teamconfigActions;
import PopDialog from 'components/pop';
import {content} from './index.css';


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
      <PopDialog
      className="team_dismiss_modal"
      show={ true }
      title="解散团队"
      backup={false}
      close={this.cancelFn} 
      btns={[
        {
          label: '解散',
          fun: this.configFn,
        },
        {
          label: '取消',
          fun: this.cancelFn,
        }
      ]} 
      >
      <div className={content} >
          <h5>{this.state.title}</h5>
          <p>团队解散后系统将解散你和本团队内所有成员的关系并清除所有数据，请谨慎操作!</p>
      </div>
    </PopDialog>
    )
  }
}
export default TeamRemoveModal;
