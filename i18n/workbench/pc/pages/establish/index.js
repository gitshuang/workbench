import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import Header from 'components/header';
import EstablishContent from 'containers/establishContent';
import Icon from 'pub-comp/icon';

import Personals from 'pages/home/personal';

import logoUrl from 'assets/image/wgt/yonyou_logo.svg';
import { logo, establish, hidden, imgInner } from './style.css';


const { changeUserInfoDisplay, hideUserInfoDisplay, getSearchEnterOrTeam } = homeActions;
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
class Establish extends Component {
  static propTypes = {
    getSearchEnterOrTeam: PropTypes.func,
    requestError: PropTypes.func,
    requestSuccess: PropTypes.func,
    userInfoDisplay: PropTypes.bool,
    hideUserInfoDisplay: PropTypes.func,
    changeUserInfoDisplay: PropTypes.func,
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

  goHome = () => {
    const { allowTenants } = this.state;
    if (allowTenants.length > 0) {
      this.props.history.replace('/');
    }
  }

  goBack = () => {
    this.props.history.replace('');
  }

  render() {
    const { userInfo } = this.props;
    const { allowTenants } = this.state;
    // const leftContent = <img src = {logoUrl} style= {{ maxHeight: "27px" }} />
    const iconname = allowTenants.length  ? 'home' : <Personals />;
    return (
      <div className={`um-win   ${establish} ${allowTenants.length <= 0 ? '' : hidden}`} >
        {
            /* userInfo.allowTenants.length
                ? <div className="um-header" style={{background:"white"}}>
                    <Header onLeftClick={ this.goBack } iconName={"home"} >
                        <div>
                            <span>$i18n{index.js0}$i18n-end</span>
                        </div>
                    </Header>
                </div>
                : null
            */
        }
        <div className="um-header" style={{ background: 'white', position: 'relative' }}>
          {/* <Header leftContent = { leftContent } /> */}
          <Header iconName={iconname} onLeftClick={this.goHome} />
          <div className={logo}>
            <img alt="" src={logoUrl} style={{ width: '86px' }} />
          </div>
        </div>
        <div className="um-content">
          <EstablishContent userInfo={userInfo} type="init" />
        </div>
      </div>
    );
  }
}

export default Establish;