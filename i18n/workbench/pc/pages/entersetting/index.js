import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';
import EnterOption from 'containers/enterOption';
import EnterSetting from './enterSetting';

import {
  pageEnterprise, enterTitle, enterCont, hr, hr2, title, appBreadcrumb,
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter, getEnterInfo } = homeActions;

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'enterInfo',
    {
      namespace: 'home',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    setCreateEnter,
    getEnterInfo,
  },
)
class Enterprise extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    userInfo: PropTypes.shape({
      company: PropTypes.string,
    }),
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getEnterInfo: PropTypes.func,
  };
  static defaultProps = {
    history: {},
    userInfo: {},
    match: {},
    requestSuccess: () => {},
    requestError: () => {},
    getEnterInfo: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      enterData: null,
    };

    this.tenantIndustry = {
      name: 'tenantIndustry',
      value: 'A',
      verify: true,
    };
  }

  componentWillMount() {
    const { requestSuccess, requestError, getEnterInfo } = this.props;
    const param = '123';
    getEnterInfo(param).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      requestSuccess();
      this.setState({
        enterData: payload,
      });
    });
  }

  setOption = () => {

  }

  setOptherData(obj) {
    this.tenantIndustry.value = obj.value;
  }

  goBack = () => {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  render() {
    const { match: { params }, userInfo: { company } } = this.props;
    const { enterData } = this.state;

    return (
      <div>
        <div style={{position:"fixed",top:0,left:0,width:"100%",zIndex:"9999"}}>
          {
            params.data === 'home'
            ?
              <div className="um-header" style={{ background: 'white' }}>
                <Header onLeftClick={this.goHome} iconName="home" >
                  <div>
                    <span>$i18n{index.js0}$i18n-end</span>
                  </div>
                </Header>
              </div>
            : null
          }
          <div className={appBreadcrumb}>
            <Breadcrumbs data={[{ name: '$i18n{index.js1}$i18n-end' }]} goback={this.goBack} />
          </div>
        </div>
        <div className={`${pageEnterprise}`}>
          <div className={enterTitle}>
            <div className={title}>{company}</div>
            <EnterOption
              data={[
                {
                  id: 'aa',
                  name: '$i18n{index.js2}$i18n-end',
                  value: '2',
                  serverApi: 'enter/remove',
                  msg: '$i18n{index.js3}$i18n-end',
                },
                {
                  id: 'allowExit',
                  name: '$i18n{index.js4}$i18n-end',
                  value: '3',
                  serverApi: 'enter/leave',
                  msg: '$i18n{index.js5}$i18n-end',
                },
              ]}
              type="$i18n{index.js6}$i18n-end"
            />

          </div>
          <hr className={hr} />
          <div className={`${enterCont} enter_setting`} >
            <EnterSetting updateenter="update_enter" data={enterData} />
          </div>
          <hr className={`${hr} ${hr2}`} />
        </div>
      </div>
    );
  }
}
export default Enterprise;

