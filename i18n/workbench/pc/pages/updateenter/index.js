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

import { pageEnterprise, enterTitle, enterCont, hr, appBreadcrumb } from './style.css';

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
    getTeamInfo, // $i18n{index.js0}$i18n-end
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
      }
      this.setState({
        enterData: payload,
      });
      requestSuccess();
    });
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { enterData } = this.state;
    return (
      <div className="um-win">
        <div className="um-header" style={{ background: 'white' }}>
          <Header onLeftClick={this.goBack} iconName="home" >
            <div>
              <span>$i18n{index.js1}$i18n-end</span>
            </div>
          </Header>
        </div>
        <div className={appBreadcrumb}>
          <Breadcrumbs data={[{ name: '$i18n{index.js2}$i18n-end' }]} goback={this.goBack} />
        </div>

        <div className={`${pageEnterprise} um-content`}>
          <div className={enterTitle} >$i18n{index.js3}$i18n-end</div>
          <hr className={hr} />
          <div className={enterCont} >
            <EnterSetting updateenter="upgrade_enter" data={enterData} btlLabel="$i18n{index.js4}$i18n-end" />
          </div>
        </div>
      </div>
    );
  }
}
export default Updateenter;
