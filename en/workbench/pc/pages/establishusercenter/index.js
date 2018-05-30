import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
// import HeaderPage from './headerPage';
import Icon from 'pub-comp/icon';
import Header from 'containers/header';
import EstablishContent from 'containers/establishContent';
import Breadcrumbs from 'components/breadcrumb';

import { pageHome, appBreadcrumb, establisPage, hidden, imgInner } from './style.css';

const {
  changeUserInfoDisplay, hideUserInfoDisplay, getSearchEnterOrTeam,
} = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'searchEnterOrTeamList',
    'userInfoDisplay',
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
    changeUserInfoDisplay,
    hideUserInfoDisplay,
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
    userInfoDisplay: PropTypes.bool,
    hideUserInfoDisplay: PropTypes.func,
    changeUserInfoDisplay: PropTypes.func,
    history: PropTypes.shape({
      replace: PropTypes.func,
      goBack: PropTypes.func,
    }),
    userInfo: PropTypes.shape({
      userAvator: PropTypes.string,
    }),
  };
  static defaultProps = {
    getSearchEnterOrTeam: () => {},
    requestError: () => {},
    requestSuccess: () => {},
    userInfoDisplay: true,
    hideUserInfoDisplay: () => {},
    changeUserInfoDisplay: () => {},
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
      }
      this.setState({
        allowTenants: payload,
      });
      requestSuccess();
    });
  }

  goBack =() => {
    this.props.history.goBack();
  }

  goHome = () => {
    const { userInfoDisplay, hideUserInfoDisplay, changeUserInfoDisplay } = this.props;
    const { allowTenants } = this.state;
    if (allowTenants.length <= 0) {
      if (userInfoDisplay) {
        hideUserInfoDisplay();
      } else {
        changeUserInfoDisplay();
      }
    } else {
      this.props.history.replace('/');
    }
  }

  render() {
    const { allowTenants } = this.state;
    const { userInfo } = this.props;
    // const leftContent = <img src = {logoUrl} style= {{ maxHeight: "27px" }} />

    const img = userInfo.userAvator;
    let imgIcon = null;
    if (img) {
      imgIcon = <img alt="" src={img} className={imgInner} />;
    } else {
      imgIcon = <Icon type="staff" />;
    }

    return (
      <div className={`um-win ${pageHome} ${establisPage} ${allowTenants.length <= 0 ? '' : hidden}`} >
        <div className="um-header" style={{ background: 'white' }}>
          <Header
            iconName={allowTenants.length <= 0 ? imgIcon : 'home'}
            onLeftClick={this.goHome}
          >
            <div>
              <span>NoDictionary/NoDictionary</span>
            </div>
          </Header>
        </div>
        <div className="um-content">
          <div className={appBreadcrumb}>
            <Breadcrumbs data={[{ name: 'NoDictionary/NoDictionary' }]} goback={this.goBack} />
          </div>
          <EstablishContent userInfo={userInfo} />
        </div>
      </div>
    );
  }
}

export default EstablishUserCenter;
