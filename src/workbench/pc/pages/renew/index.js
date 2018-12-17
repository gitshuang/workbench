import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IFrame from 'components/iframe';


class Account extends Component {
  static propTypes = {
    match: PropTypes.shape({}),
  };
  static defaultProps = {
    
    match: {},
  };

  componentDidMount() {
  }

  func = () => { }

  render() {
    const { params } = this.props.match;
    const { id } = params;
    return (
      <div>
        <IFrame title="应用市场" src={`/diwork-market/appMarket/#/application/${id}`} />
      </div>
    );
  }
}

export default Account;
