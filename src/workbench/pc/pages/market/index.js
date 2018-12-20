import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import IFrame from 'components/iframe';

@connect(
  mapStateToProps(
    'currItem',
  ),
  {},
)
class Account extends Component {
  static propTypes = {
    currItem: PropTypes.shape({}),
  };
  static defaultProps = {
    currItem: {
      id: 'Market',
      data: {},
    }
  };

  componentDidMount() {

  }

  render() {
    const { data } = this.props.currItem;
    const appId = data ? data.id : null;
    return (
      <div>
        {
          appId
            ?
            <IFrame title="应用市场" url={`/diwork-market/appMarket#/application/${appId}`} />
            :
            <IFrame title="应用市场" url="/diwork-market/appMarket" />
        }
      </div>
    );
  }
}

export default Account;
