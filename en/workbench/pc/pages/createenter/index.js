import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';

import EnterContent from 'pub-comp/enterContent';
import { uploadApplication } from 'store/root/api';
import { texts } from 'components/entertext';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;

import { pageEnterprise, enterTitle, enterCont, hr } from './style.css';
import 'assets/style/Form.css';

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
    setCreateEnter
  },
)
class Enterprise extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
    userInfo: PropTypes.shape({
      allowTenants: PropTypes.array,
    }),
  };
  static defaultProps = {
    history: {},
    userInfo: {},
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goBack = () => {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  handleClick = (param, fn) => {
    const {
      requestStart,
      requestSuccess,
      requestError,
      setCreateEnter
    } = this.props;
    requestStart();
    setCreateEnter(param, "create").then(({ error, payload }) => {
      // 此处调用callback
      fn({ error, payload });
      if (error) {
        requestError(payload);
        return;
      }
      requestSuccess();
      localStorage.setItem('create', '1');
    });
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="header um-header">
          <Header
            onLeftClick={this.goHome}
          >
            <div>
              <span>Create Enterprise</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs data={[{ name: 'Create Enterprise' }]} goback={this.goBack} />
          </div>
        </div>

        <div className="content">
          <div className={pageEnterprise}>
            <div className={enterTitle} >Create Enterprise</div>
            <hr className={hr} />
            <div className={enterCont} >
              <EnterContent
                userInfo={userInfo}
                _from="create"
                handleClickFn={this.handleClick}
                buttonText=""
                loadingDesc=""
                uploadApplication={uploadApplication}
                texts={texts}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Enterprise;

