import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import EnterSetting from 'pages/entersetting/enterSetting';
import Header from 'containers/header';
import { page_enterprise ,enter_title,enter_cont,hr} from './style.css';
import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';

const { requestStart, requestSuccess, requestError } = rootActions;
const { getTeamInfo } = teamconfigActions;

@withRouter
@connect(
  mapStateToProps(
    'teamData',
    {
      namespace: "teamconfig"
    },
  ),

  {
    requestStart,
    requestSuccess,
    requestError,
    getTeamInfo,            // 获取团队基础信息 
  }
)
class Updateenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enterData:null
    }
  }

  componentWillMount(){
    const { getTeamInfo, requestError, requestSuccess } = this.props;
    getTeamInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      debugger;
      this.setState({
        enterData:payload
      })
      requestSuccess();
    });
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    const {enterData} = this.state;
    const { params } = this.props.match;
    const {  teamList  } = this.props;
    return (
      <div className="um-win">
        <div className="um-header" style={{ background: "white" }}>
          <Header onLeftClick={this.goBack} iconName={"home"} >
            <div>
              <span>企业认证</span>
            </div>
          </Header>
        </div>
        <div className={`${page_enterprise} um-content`}>
          <div className={enter_title} >企业认证</div>
          <hr className={hr}/>
          <div className={enter_cont} >
            <EnterSetting updateenter="upgrade_enter" data={enterData} btlLabel="升级"/>
          </div> 
        </div>
      </div>
    );
  }
}
export default Updateenter;

