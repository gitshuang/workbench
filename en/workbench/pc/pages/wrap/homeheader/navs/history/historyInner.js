import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import PropTypes from 'prop-types';

import onClickOutside from 'react-onclickoutside';
import { openWin } from 'public/regMessageTypeHandler';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
const { requestStart, requestSuccess, requestError } = rootActions;
const { getHistoryList } = wrapActions;
import { historyPartInner } from './style.css';

@connect(
  mapStateToProps(
    'historyList',
    {
      namespace: 'wrap',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getHistoryList
  },
)

@onClickOutside
class HistoryInner extends Component {
  static propTypes = {
    historyList: PropTypes.arrayOf(PropTypes.object),
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getHistoryList: PropTypes.func,
  };
  static defaultProps = {
    historyList: [],
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getHistoryList: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getHistoryList,
    } = this.props;
    requestStart();
    getHistoryList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return;
      }
      requestSuccess();
    });
  }
  handleClickOutside() {
    this.props.openHistory()
  }
  openHistoryItem = (businessCode,extendParams) => {
    dispatchMessageTypeHandler({
      type: "openService",
      detail: {
        serviceCode: businessCode,
        data: extendParams
      }
    });
    this.props.openHistory();
  }
  openAllHistory = () => {
    openWin({
      id: 'History',
      title: '',
    });
    this.props.openHistory()
  }

  render() {
    let { historyList } = this.props;
    return (
      <div className={historyPartInner}>
        <div className="inner-header">
          <label className="title"></label>
          {historyList.length > 0  && <label className="all" onClick={this.openAllHistory}> </label>}
        </div>
        <ul className="inner-list">
          {
            historyList.filter((item,index)=>index<10).map(item => {
              return <li className="history-item" onClick={e => this.openHistoryItem(item.businessCode,item.extendParams)}>{item.title}</li>
            })
          }
        </ul>
      </div>
    );
  }
}
export default HistoryInner;

