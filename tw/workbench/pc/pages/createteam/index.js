import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Breadcrumbs from 'components/breadcrumb';
import Header from 'containers/header';
import CreateTeamContent from 'containers/createTeam';


@withRouter
class CreateTeam extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
  };
  static defaultProps = {
    history: {},
    match: {},
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
    return (
      <div className='um-win'>
        <div className="um-header header">
          <Header onLeftClick={this.goHome} iconName={'computer'} >
            <div>
              <span>創建團隊</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs data={[{ name: '創建團隊' }]} goback={this.goBack} />
          </div>
        </div>
        <div className="um-content content">
          <CreateTeamContent />
        </div>
      </div>
    );
  }
}

export default CreateTeam;
