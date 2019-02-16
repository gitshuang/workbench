import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import PropTypes from 'prop-types';
import { ButtonBrand, ButtonDefault } from 'pub-comp/button';
import Checkbox from 'bee/checkbox';
import Icon from 'pub-comp/icon';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
const { requestStart, requestSuccess, requestError } = rootActions;
const { getHistoryList, delHistory, delAllHistory, changeDelHistory } = wrapActions;

import { historyAll, historyADay } from './style.css';

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
    getHistoryList,
    delHistory,
    delAllHistory,
    changeDelHistory
  },
)
class HistoryAll extends Component {
  static propTypes = {
    historyList: PropTypes.arrayOf(PropTypes.object),
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getHistoryList: PropTypes.func,
    delHistory: PropTypes.func,
    delAllHistory: PropTypes.func,
    changeDelHistory: PropTypes.func,
  };
  static defaultProps = {
    historyList: [],
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getHistoryList: () => { },
    delHistory: () => { },
    delAllHistory: () => { },
    changeDelHistory: () => { }
  };

  constructor(props) {
    super(props);
    this.state = {
      historyListNew: {},//需要处理historyList按照日期分类
      deleteSelected: {},//选择要删除的历史记录
    }
    this.DateChinese = ['', '', '', '', '', '',]
  }

  formatTime = (time, type = 1) => {
    // type = 1说明返回2019110这种格式;type=2说明返回2018年12月27日 星期四这些信息
    let newTime = new Date(time);
    let day = this.DateChinese[newTime.getDay()];
    let year = newTime.getFullYear();
    let month = newTime.getMonth();
    let date = newTime.getDate();
    if (type === 1) {
      return `${year},${month},${date}`;
    } else {
      return { year: year, month: month, date: date, day: day }
    }
  }

  formatHistoryList = (historyList) => {
    let obj = {};
    historyList.forEach(item => {
      if (!obj[this.formatTime(item.createTime)]) {
        obj[this.formatTime(item.createTime)] = [];
        obj[this.formatTime(item.createTime)].push(item);
      } else {
        obj[this.formatTime(item.createTime)].push(item);
      }
    });
    return obj;
  }
  componentWillMount() {
    let { historyList } = this.props;
    if (historyList.length > 0) {
      this.setState({ historyListNew: this.formatHistoryList(historyList) })
    } else {
      console.log('')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.historyList.length !== this.props.historyList) {
      this.setState({ historyListNew: this.formatHistoryList(nextProps.historyList) })
    }
  }
  openService = (businessCode, extendParams) => {
    dispatchMessageTypeHandler({
      type: "openService",
      detail: {
        serviceCode: businessCode,
        data: extendParams
      }
    });
    this.props.openHistory();
  }

  toggleSelected = (status, latestAccessId) => {
    let { deleteSelected } = this.state;
    if (status) {
      deleteSelected[latestAccessId] = status;
    } else {
      delete deleteSelected[latestAccessId];
    }
    this.setState({ deleteSelected })
  }

  delHistory = (type, data) => {
    const {
      requestStart,
      requestSuccess,
      requestError,
      delHistory,
      delAllHistory,
      changeDelHistory
    } = this.props;
    let { deleteSelected } = this.state;
    requestStart();
    if (type === 'all') {
      delAllHistory().then(({ error, payload }) => {
        if (error) {
          requestError(payload);
          return;
        }
        requestSuccess();
      });
    } else {
      let param = [];
      if (type === 'single') {
        param = [data.latestAccessId]
      } else {
        Object.keys(deleteSelected).forEach(key => {
          param.push(key);
        })
      }
      delHistory(param).then(({ error, payload }) => {
        if (error) {
          requestError(payload);
          return;
        }
        changeDelHistory({ latestAccessIds: param });
        this.setState({ deleteSelected: {} })
        requestSuccess();
      });
    }
  }

  getHeader = (key) => {
    let dateArr = key.split(',');
    let currentTime = this.formatTime(new Date(dateArr[0], dateArr[1], dateArr[2]), 2);
    let a = `${currentTime.year}${currentTime.month + 1}${currentTime.date}${currentTime.day}`
    return a
  }
  getList = (data) => {
    let { deleteSelected } = this.state;
    return data.map(item => {
      return (
        <li className="item">
          <Checkbox className="item-checkbox" checked={!!deleteSelected[item.latestAccessId]} onChange={e => this.toggleSelected(e, item.latestAccessId)} />
          <span className="item-time">{`${new Date(item.createTime).getHours()}:${new Date(item.createTime).getMinutes()}`}</span>
          <span className="item-title" onClick={() => this.openService(item.businessCode, item.extendParams)}>{item.title}</span>
          <Icon className="item-delete" type="error3" onClick={() => this.delHistory('single', item)}></Icon>
        </li>
      )
    })
  }

  render() {
    let { historyListNew, deleteSelected } = this.state;
    return (
      <div className="diworkcontent">
        <div className="contentbg">
          <div className={historyAll}>
            <div className="historyAllBtnArea">
              <ButtonBrand onClick={() => this.delHistory('all')}></ButtonBrand>
              <ButtonDefault disabled={Object.keys(deleteSelected).length === 0} onClick={() => this.delHistory('selected')}></ButtonDefault>
            </div>
            {
              Object.keys(historyListNew).map(item => {
                return (
                  <div className={historyADay}>
                    <label className="day-head">
                      {this.getHeader(item)}
                    </label>
                    <ul className="day-list">
                      {this.getList(historyListNew[item])}
                    </ul>
                  </div>
                )

              })
            }
          </div>
        </div>
      </div>
    );
  }
}
export default HistoryAll;
