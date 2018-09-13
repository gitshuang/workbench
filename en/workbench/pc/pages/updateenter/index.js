import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';

import EnterSetting from 'pages/entersetting/enterSetting';
import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';

import { content, pageEnterprise, enterTitle, enterCont, hr } from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { getTeamInfo } = teamconfigActions;

@withRouter
@connect(
  mapStateToProps(
    'teamData',
    {
      namespace: 'teamconfig',
    },
  ),

  {
    requestStart,
    requestSuccess,
    requestError,
    getTeamInfo, // 获取团队基础信息
  },
)
class Updateenter extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
    }),
    getTeamInfo: PropTypes.func,
    requestError: PropTypes.func,
    requestSuccess: PropTypes.func,
  };
  static defaultProps = {
    history: {},
    getTeamInfo: () => {},
    requestError: () => {},
    requestSuccess: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      enterData: null,
    };
  }

  componentWillMount() {
    const { getTeamInfo, requestError, requestSuccess } = this.props;
    getTeamInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      this.setState({
        enterData: payload,
      });
      requestSuccess();
    });
  }

  goHome = () => {
    this.props.history.replace('');
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { enterData } = this.state;
    return (
      <div>
        <div className="um-header header">
          <Header onLeftClick={this.goHome} iconName="home" >
            <div>
              <span>Enterprise Authentication</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs data={[{ name: 'Enterprise Authentication' }]} goback={this.goBack} />
          </div>
        </div>
        <div className={content}>
          <div className={`${pageEnterprise} content`}>
            <div className={enterTitle} >Enterprise Authentication</div>
            <hr className={hr} />
            <div className={enterCont} >
              <EnterSetting updateenter="upgrade_enter" data={enterData} btlLabel="Upgrade" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Updateenter;

