import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Button from 'bee-button';
import Icon from 'components/icon';
import InputGroup from 'bee-input-group';
import AutoComplete from 'bee-autocomplete';
import FormControl from 'bee-form-control';
import Menu from 'bee-menus';
import ButtonGroup from 'bee-button-group';
import Select from 'bee-select';
import Tabs, { TabPane } from 'bee-tabs';
import Pagination from 'bee-pagination';

import {
  mleft50,
  h_icon,
  h_name,
  h_contact,
  search_service,
  search_help,
  clearfix,
  wrap,
  bg_wrap,
  um_content,
  bg,
  isdisplay,
  paginationClass,
  search_ts,
  recently
} from './style.css';
import _default_icon from 'assets/image/wgt/default.png';
import yonyouSpace1 from 'assets/image/wgt/yonyouSpace1.png';
import searchActions from 'store/root/search/actions';
import rootActions from 'store/root/actions';
const { getSearch} = searchActions;
const {requestStart, requestSuccess, requestError} = rootActions;
@withRouter

@connect(
  mapStateToProps(
    'SearchList',
    {
      namespace: 'search',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getSearch,
  }
)
class searchOther extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keywords:window.sessionStorage.searchkeywords,
      dataList :{
        content:[]
      },
      activePage:1,
      pagesize:10,
      isShowPagination:true,
    }
  }
  componentWillMount() {
    const type = this.props.match.params.type
    const { keywords} = this.state
    this.getSearchTpyeList(keywords,type,1)
  }
  getSearchTpyeList(keywords,type,page){
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearch,
    } = this.props;
      requestStart();
      getSearch(keywords,type,page).then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        this.setState({
          dataList:payload,
          pagesize:payload.pageSize
        })
        if(payload.content.length>0){
          this.setState({
            isShowPagination:false,
          })
        }
       requestSuccess();
      });
  }
  
  handleSelect(eventKey) {
    const type = this.props.match.params.type
    const {keywords,activetab}=this.state
    this.setState({
      activePage: eventKey
    });
     this.getSearchTpyeList(keywords,type,eventKey)
  }
 
  goDetail(type,item){
    return (e) => {
      e.stopPropagation();
      console.log(type,item)
      window.location.href=item.url
    }
  }
 
  Datetimechange(ts){
    const timeNow = parseInt(new Date().getTime() / 1000, 10);
    const d = timeNow - ts / 1000;
    const dDays = parseInt(d / 86400, 10);
    const dHours = parseInt(d / 3600, 10);
    const dMinutes = parseInt(d / 60, 10);
    const dSeconds = parseInt(d, 10);
    if (dDays > 0 && dDays < 4) {
      ts = `${dDays}天前`;
    } else if (dDays <= 0 && dHours > 0) {
      ts = `${dHours}小时前`;
    } else if (dDays <= 0 && dHours <= 0 && dMinutes > 0) {
      ts = `${dMinutes}分钟前`;
    } else if (dSeconds < 60) {
      ts = '刚刚';
    } else if (dDays > 3) {
      ts = new Date(parseInt(ts, 10)).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ');
    }
    return ts
  }

  render() {
    const { keywords,dataList,isShowPagination } = this.state;
    var lis =[]
    function createMarkup(text) {
      return {__html: text};
    }
    dataList.content.forEach((item,index)=>{
      item = eval('(' + item + ')')
      lis.push(<li className={search_service} key={index} onClick={this.goDetail(this.state.activetab,item)}>
              <div className={h_icon}><img src={yonyouSpace1}/></div>
              <div className={h_name}>
                <p className={search_help}><span dangerouslySetInnerHTML={createMarkup(item.serveName)}></span></p>
              </div>
              <div className={search_ts}>{this.Datetimechange(item.ts)}</div>
            </li>);
    })
    return (
      <div className={bg+" um-content um-vbox"}>
        <div className={bg_wrap+" um-content um-vbox"}>
          <div className={`${wrap} ${clearfix} um-content um-vbox`}>
            <div>共{dataList.total}条</div>
            <ul className={recently}>{lis}</ul>
            
          </div>
          <div className={`${paginationClass} ${isShowPagination? isdisplay : ''}`}>
              <Pagination
                first
                last
                prev
                next
                size="sm"
                gap={true}
                items={this.state.pagesize}
                maxButtons={7}
                activePage={this.state.activePage}
                onSelect={this.handleSelect.bind(this)} />
            </div>
        </div>
      </div>
    )
  }
}

export default searchOther;