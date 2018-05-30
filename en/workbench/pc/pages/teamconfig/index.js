import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from 'containers/header';
import BreadcrumbContainer from 'components/breadcrumb';
import TeamconfigContent from 'containers/teamconfig';

@withRouter
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

  goBack = () => {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  render() {
    return (
      <div className="um-win">
        <div className="um-header" style={{ background: 'white' }}>
          <Header onLeftClick={this.goHome} iconName="home" >
            <div>
              <span>NoDictionary</span>
            </div>
          </Header>
          <div style={{ paddingLeft: '23px', fontSize: '12px' }}>
            <BreadcrumbContainer data={[{ name: 'NoDictionary' }]} goback={this.goBack} />
          </div>
        </div>
        <div className="um-content">
          <TeamconfigContent />
        </div>
      </div>
    );
  }
}

export default Teamconfig;
