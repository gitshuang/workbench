import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Icon from 'pub-comp/icon';
import Header from 'containers/header';
import EstablishContent from 'containers/establishContent';
import Breadcrumbs from 'components/breadcrumb';

import { pageHome, appBreadcrumb, imgInner } from './style.css';

const {
  getSearchEnterOrTeam,
} = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'searchEnterOrTeamList',
    'metaData',
    {
      key: 'userInfo',
      value: (home, ownProps, root) => root.home.userInfo,
    },
    {
      namespace: 'home',
    },
  ),
  {
    getSearchEnterOrTeam,
    requestStart,
    requestSuccess,
    requestError,
  },
)
class EstablishUserCenter extends Component {
  static propTypes = {
    getSearchEnterOrTeam: PropTypes.func,
    requestError: PropTypes.func,
    requestSuccess: PropTypes.func,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }),
    userInfo: PropTypes.shape({
      userAvator: PropTypes.string,
    }),
  };
  static defaultProps = {
    getSearchEnterOrTeam: () => {},
    requestError: () => {},
    requestSuccess: () => {},
    history: {},
    userInfo: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      allowTenants: [],
    };
  }

  componentWillMount() {
    const { getSearchEnterOrTeam, requestError, requestSuccess } = this.props;
    getSearchEnterOrTeam().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      this.setState({
        allowTenants: payload,
      });
      requestSuccess();
    });
  }


  goHome = () => {
    this.props.history.replace('/');
  }

  render() {
    const { allowTenants } = this.state;
    const { userInfo } = this.props;

    const img = userInfo.userAvator;
    const imgIcon = img
      ? <img alt="" src={img} className={imgInner} />
      : <Icon type="staff" />;

    return (
      <div className={`um-win ${pageHome}`} >
        <div className="um-header" style={{ background: 'white' }}>
          <Header
            onLeftClick={this.goHome}
          >
            <div>
              <span>Create Team/Enterprise</span>
            </div>
          </Header>
        </div>
        <div className="um-content">
          <div className={appBreadcrumb}>
            <Breadcrumbs data={[{ name: 'Create Team/Enterprise' }]} goback={this.goHome} />
          </div>
          <EstablishContent userInfo={userInfo} />
        </div>
      </div>
    );
  }
}

export default EstablishUserCenter;
