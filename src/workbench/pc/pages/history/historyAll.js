import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { ButtonBrand, ButtonDefault } from 'pub-comp/button';
import Checkbox from 'bee/checkbox';
import Icon from 'pub-comp/icon';
import { openService } from 'public/regMessageTypeHandler';
import { historyAll, historyADay } from './style.css';

@connect(
  mapStateToProps(
    'historyList',
    {
      namespace: 'wrap',
    }
  ),
  {
  },
)
class HistoryAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyListNew: {},//需要处理historyList按照日期分类
      deleteSelected:{},//选择要删除的历史记录
    }
  }
  formatTime = (time, type = 1) => {
    // type = 1说明返回2019110这种格式;type=2说明返回2018年12月27日 星期四这些信息
    let newTime = new Date(time);
    let day = newTime.getDay();
    let year = newTime.getFullYear();
    let month = newTime.getMonth();
    let date = newTime.getDate();
    if (type === 1) {
      return `${year},${month},${date}`;
    } else {
      return { year: year, month: month, date: date, day: day }
    }
  }
  componentWillMount() {
    let obj = {};
    let { historyList } = this.props;
    if (historyList.length > 0) {
      historyList.forEach(item => {
        if (!obj[this.formatTime(item.createTime)]) {
          obj[this.formatTime(item.createTime)] = [];
          obj[this.formatTime(item.createTime)].push(item);
        } else {
          obj[this.formatTime(item.createTime)].push(item);
        }
      });
      this.setState({ historyListNew: obj })
    }
  }
  openService = (businessCode) =>{
    openService(businessCode)
  }
  toggleSelected = (status,businessCode) =>{
    let {deleteSelected} = this.state;
    if(status){
      deleteSelected[businessCode] = status;
    }else{
      delete deleteSelected[businessCode];
    }
    this.setState({deleteSelected})
  }
  deleteItem = () =>{

  }
  getHeader = (key) => {
    let dateArr = key.split(',');
    let currentTime = this.formatTime(new Date(dateArr[0], dateArr[1], dateArr[2]), 2);
    let a = `${currentTime.year}年${currentTime.month + 1}月${currentTime.date}日星期${currentTime.day}`
    return a
  }
  getList = (data) => {
    return data.map(item=>{
      return (
        <li className="item">
            <Checkbox className="item-checkbox"  onChange={e=>this.toggleSelected(e,item.businessCode)} />
            <span className="item-time">{`${new Date(item.createTime).getHours()}:${new Date(item.createTime).getMinutes()}`}</span>
            <span className="item-title" onClick={()=>this.openService(item.businessCode)}>{item.title}</span>
            <Icon className="item-delete" type="error3" onClick={()=>{this.deleteItem(item.businessCode)}}></Icon>
        </li>
      )
    })
  }
  
  render() {
    let { historyListNew,deleteSelected } = this.state;
    return (
      <div className={historyAll}>
        <div className="historyAllBtnArea">
          <ButtonBrand >清空历史记录</ButtonBrand>
          <ButtonDefault  disabled={Object.keys(deleteSelected).length === 0}>删除历史记录</ButtonDefault>
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
    );
  }
}
export default HistoryAll;

