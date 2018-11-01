import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import teamconfigActions from 'store/root/teamconfig/actions';

import EnterContent from 'pub-comp/enterContent';
import { uploadApplication } from 'store/root/api';
import { texts } from 'yutils/entertext';


import { pageEnterprise, enterTitle, enterCont, hr } from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;
const { getTeamInfo } = teamconfigActions;

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    {
      namespace: 'home',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getTeamInfo, // 获取团队基础信息
    setCreateEnter,
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
    getTeamInfo: () => { },
    requestError: () => { },
    requestSuccess: () => { },
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

  handleClick = (param, fn) => {
    const {
      requestStart,
      requestSuccess,
      requestError,
      setCreateEnter
    } = this.props;
    requestStart();
    setCreateEnter(param, "update").then(({ error, payload }) => {
      // 此处调用callback
      fn({ error, payload });
      if (error) {
        requestError(payload);
        return;
      }
      requestSuccess();
    });
  }

  render() {
    const { enterData } = this.state;
    const { userInfo } = this.props;
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="um-header header">
          <Header onLeftClick={this.goHome}>
            <div>
              <span>企業認證</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs data={[{ name: '企業認證' }]} goback={this.goBack} />
          </div>
        </div>
        <div className="content">
          <div className={pageEnterprise}>
            <div className={enterTitle} >企業認證</div>
            <hr className={hr} />
            <div className={enterCont} >
              {
                enterData ?
                  <EnterContent
                    data={enterData}
                    userInfo={userInfo}
                    _from="update"
                    handleClickFn={this.handleClick}
                    buttonText="升級"
                    loadingDesc="正在升級企業..."
                    uploadApplication={uploadApplication}
                    texts={texts}
                  /> : null
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Updateenter;

