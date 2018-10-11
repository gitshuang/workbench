import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import Breadcrumbs from 'components/breadcrumb';
import Header from 'containers/header';
import CreateTeamContent from 'containers/createTeam';
import { appBreadcrumb, homeNone } from './style.css';

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'metaData',
    {
      namespace: 'home',
    },
  ),
  {},
)
class CreateTeam extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    userInfo: PropTypes.shape({
      allowTenants: PropTypes.array,
    }),
  };
  static defaultProps = {
    history: {},
    match: {},
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

  render() {
    const { match: { params } } = this.props;
    const classes = params.data === 'home' ? homeNone : '';
    return (
      <div className={`um-win ${classes}`}>
        {
          params.data === 'home'
          ?
            <div className="um-header" style={{ background: 'white' }}>
              <Header onLeftClick={this.goHome} >
                <div>
                  <span>创建团队</span>
                </div>
              </Header>
            </div>
          : null
        }
        <div className="um-content">
          <div className={appBreadcrumb}>
            <Breadcrumbs data={[{ name: '创建团队' }]} goback={this.goBack} />
          </div>
          <CreateTeamContent />
        </div>
      </div>
    );
  }
}

export default CreateTeam;
