import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import PropTypes from 'prop-types';

import onClickOutside from 'react-onclickoutside';
import { openWin } from 'public/regMessageTypeHandler';
import { openService } from 'public/regMessageTypeHandler';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
const { requestStart, requestSuccess, requestError } = rootActions;
const { getHistoryList } = homeActions;
import { historyPartInner } from './style.css';

@connect(
  mapStateToProps(
    'historyList',
    {
      namespace: 'home',
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
      console.log('this.props.historyList22332323', this.props.historyList, payload)
      requestSuccess();
    });
  }
  handleClickOutside() {
    this.props.openHistory()
  }
  openHistoryItem = (businessCode) => {

    openService(businessCode);
    this.props.openHistory();
  }
  openAllHistory = () => {
    openWin({
      id: 'History',
      title: '全部历史',
    });
    this.props.openHistory()
  }

  render() {
    let { historyList } = this.props;
    return (
      <div className={historyPartInner}>
        <div className="inner-header">
          <label className="title">历史记录</label>
          <label className="all" onClick={this.openAllHistory}> 全部</label>
        </div>
        <ul className="inner-list">
          {
            historyList.map(item => {
              return <li className="history-item" onClick={e => this.openHistoryItem(item.businessCode)}>{item.title}</li>
            })
          }
        </ul>
      </div>
    );
  }
}
export default HistoryInner;

