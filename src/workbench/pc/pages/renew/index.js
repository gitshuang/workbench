import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import PropTypes from 'prop-types';
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
    currItem: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      appId: ''
    };
  }

  componentDidMount() {
    const { appId } = this.props.currItem.data;
    this.setState({
      appId,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currItem.id !== "Renew") return;
    const newAppId = nextProps.currItem.data ? nextProps.currItem.data.appId : '';
    const appId = this.state;
    if (newAppId && newAppId !== appId) {
      this.setState({
        appId: newAppId,
      });
    }
  }

  render() {
    const { appId } = this.state;
    return (
      <div>
        {/* <IFrame title="应用市场" url={`http://localhost:3005/#/application/${appId}`} /> */}
        <IFrame title="应用市场" url={`/diwork-market/appMarket/#/application/${appId}`} />
      </div>
    );
  }
}

export default Account;
