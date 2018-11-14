import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import Header from 'containers/header';
import BreadcrumbContainer from 'components/breadcrumb';
import TeamconfigContent from 'containers/teamconfig';
import homeActions from 'store/root/home/actions';
const { getUserInfo } = homeActions;

@withRouter
@connect(mapStateToProps(), { getUserInfo })
class Teamconfig extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
  };
  static defaultProps = {
    history: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  render() {
    return (
      <div className="um-win">
        <div className="um-header header">
          <Header onLeftClick={this.goHome}>
            <div>
              <span>团队设置</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <BreadcrumbContainer data={[{ name: '团队设置' }]} goback={this.goBack} />
          </div>
        </div>
        <div className="um-content content">
          <TeamconfigContent />
        </div>
      </div>
    );
  }
}

export default Teamconfig;
