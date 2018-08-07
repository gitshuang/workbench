import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import workActions from 'store/root/work/actions';
import IFrame from 'components/iframe_other';
import { bg } from './style.css';

const { addBrm, popBrm } = workActions;


@withRouter
@connect(
  mapStateToProps(
    'brm',
    {
      namespace: 'work',
    },
  ),
  {
    addBrm,
    popBrm,
  },
)
class Account extends Component {
  static propTypes = {
    brm: PropTypes.arrayOf(PropTypes.object),
    addBrm: PropTypes.func,
    popBrm: PropTypes.func,
    history: PropTypes.shape({
      go: PropTypes.func,
    }),
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
  };
  static defaultProps = {
    brm: [],
    addBrm: () => {},
    popBrm: () => {},
    history: {},
    match: {},
  };

  componentDidMount() {
    // [
    //  [{name:'全部应用'},
    //  [{name:'全部应用'},{name:"应用市场"}],
    //  [{name:'全部应用'},{name:'应用市场'},{name:'应用详情'}]
    // ]
    if (this.props.brm.length === 0) {
      this.props.addBrm({ name: '$i18n{index.js0}$i18n-end', url: '/application' });
      this.props.addBrm({ name: '$i18n{index.js1}$i18n-end', url: '/market' });
    } else if (this.props.brm.length === 1) {
      this.props.addBrm({ name: '$i18n{index.js2}$i18n-end', url: '/market' });
    } else if (this.props.brm.length === 3) {
      this.props.popBrm({ index: 1, url: window.location.href });
    }
  }

  goBack = (i, backVal) => {
    if (backVal > 1) {
      this.props.history.go(-backVal);
      this.props.popBrm({ index: -backVal });
    }else{
      this.props.popBrm({ index: i });
      this.props.history.goBack();
    }
  }


  render() {
    const brmVal = this.props.brm;
    const brmLastVal = brmVal.length > 0 && brmVal[brmVal.length - 1];
    const brmLastLen = brmVal.length > 0 && brmVal[brmVal.length - 1].length;
    const appId = this.props.match.params.id;
    return (
      <ApplicationWrap 
        name={brmVal.length > 0 ? brmLastVal[brmLastLen - 1].name : ''} 
        brms={brmVal.length > 1 ? brmVal[brmVal.length - 2] : [{ name: '' }]} 
        goBack={this.goBack}
      >
        <div className={`${bg} um-content um-vbox`}>
          {/* <iframe className={frameElm} src={'http://localhost:3005'} /> */}
          {
            appId
            ? 
            <IFrame title="$i18n{index.js3}$i18n-end" url={`/diwork-market/appMarket#/application/${appId}`} />
            :
            <IFrame title="$i18n{index.js4}$i18n-end" url="/diwork-market/appMarket" />
          }
        </div>
      </ApplicationWrap>
    );
  }
}

export default Account;
