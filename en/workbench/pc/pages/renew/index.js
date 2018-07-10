import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import ApplicationWrap from 'containers/applicationWrap';

import {
  bg,
  frameElm,
} from './style.css';

@withRouter
@connect(
  mapStateToProps(
    'brm',
    {
      namespace: 'work',
    },
  ),
  {
  },
)
class Account extends Component {
  static propTypes = {
    brm: PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.shape({
      go: PropTypes.func,
    }),
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
  };
  static defaultProps = {
    brm: [],
    history: {},
    match: {},
  };

  componentDidMount() {
    // this.props.addBrm({name:'应用详情',url:'/market/details'})
  }


  goBack = () => {
    this.props.history.go(-1);
  }

  func = () => { }

  render() {
    const { params } = this.props.match;
    const brmVal = this.props.brm;
    const { id } = params;
    return (
      <ApplicationWrap
        name={brmVal.length <= 1 ? 'App Details' : brmVal[brmVal.length - 1].name}
        brms={brmVal.length === 0 ? [{ name: 'All Apps' }] : brmVal.slice(0, brmVal.length - 1)}
        goBack={this.goBack}
      >
        <div className={`${bg} um-content um-vbox`}>
          {/* <iframe className={frameElm} src={'http://localhost:3005/#/application/'+id} /> */}
          {
            <iframe title="applicaton" className={frameElm} src={`/diwork-market/appMarket/#/application/${id}`} />
          }
        </div>
      </ApplicationWrap>
    );
  }
}

export default Account;
