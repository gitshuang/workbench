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


const { getSearchEnterOrTeam } = homeActions;
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
class Establish extends Component {
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


  render() {
    const { userInfo } = this.props;
    const { allowTenants } = this.state;
    const iconname = <Personals />;
    return (
      <div className={`um-win ${establish}`} >
        <div className="um-header" style={{ background: 'white', position: 'relative' }}>
          <Header iconName={iconname} />
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
