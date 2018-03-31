import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Button from 'bee/button';
import Icon from 'pub-comp/icon';
import Menu from 'bee/menus';
import Pagination from 'bee/pagination';
import EnhancedPagination from 'pub-comp/enhancedPagination';;
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
const { getSearch,setSearchHeadData} = searchActions;

const {requestStart, requestSuccess, requestError} = rootActions;
@withRouter

@connect(
  mapStateToProps(
    'SearchList',
    'searchHeadData',
    {
      namespace: 'search',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getSearch,
    setSearchHeadData,
  }
)
class searchOther extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //keywords:window.sessionStorage.searchkeywords,
      keywords:props.match.params?props.match.params.value:"",
      type:'',
      typeName:'',
      dataList :{
        content:[]
      },
      activePage:1,
      pagesize:10,
      isShowPagination:true,
      dataPerPageNum:10,//10条/页
    }
  }

  componentWillMount() {
    const {setSearchHeadData} = this.props;
    const {type,typeName} = this.props.location.state?this.props.location.state :JSON.parse(window.sessionStorage.stateStorage);
    //为了让页面刷新仍然有数据且面包屑正常,持久化
    window.sessionStorage.stateStorage = this.props.location.state? JSON.stringify(this.props.location.state):window.sessionStorage.stateStorage;
    if(this.props.location.state){
      //通过这个可以判断是否页面刷新了，没刷新全懂重新赋值
      window.sessionStorage.searchHeadData = JSON.stringify(this.props.searchHeadData);
    }
    if(!this.props.location.state && window.sessionStorage.searchHeadData && JSON.parse(window.sessionStorage.searchHeadData).brm.length == 2){
        //这里是刷新后，面包屑数据的bmr长度=1，是初始值
        let nowSearchHeadData = JSON.parse( window.sessionStorage.searchHeadData);
        setSearchHeadData({appName:typeName,brm:[{name:nowSearchHeadData.brm[0].name},{name:nowSearchHeadData.brm[1].name}],searchValue:nowSearchHeadData.searchValue});
    }
    if(!type)return;
    this.setState({type,typeName});
    const { keywords} = this.state
    this.getSearchTpyeList(keywords,type,0)
  }

  getSearchTpyeList(keywords,type,page,size=10){
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearch,
    } = this.props;
      requestStart();
      getSearch(keywords,type,page,size).then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        this.setState({
          dataList:payload,
          pagesize:payload.totalPages
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
    const type = this.props.match.params.type || this.state.type;
    const {keywords,activetab}=this.state
    this.setState({
      activePage: eventKey
    });
    let dataSize = this.state.dataPerPageNum;
     this.getSearchTpyeList(keywords,type,--eventKey,dataSize)
  }

  paginationNumSelect = (id,dataNum) =>{
    const type = this.props.match.params.type || this.state.type;
    const {keywords,activetab,activePage}=this.state;
    const reg = new RegExp("条\/页","g");
    let dataPerPageNum  = dataNum.replace(reg,"");
    this.setState({
      dataPerPageNum:dataPerPageNum
    },function () {
      this.getSearchTpyeList(keywords,type,activePage-1, dataPerPageNum)
    })
  }

  goDetail(type,item){
    return (e) => {
      e.stopPropagation();
      this.props.history.push('/'+type+'/'+item.serviceCode);
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
                <p className={search_help}><span dangerouslySetInnerHTML={createMarkup(item.serviceName)}></span></p>
              </div>
              <div className={search_ts}>{this.Datetimechange(item.ts)}</div>
            </li>);
    })
    return (
      <div className={bg+" um-content um-vbox"}>
        <div className={bg_wrap+" um-content um-vbox"}>
          <div className={`${wrap} ${clearfix} um-content um-vbox`}>
            <div>共{dataList.totalElements}条</div>
            <ul className={recently}>{lis}</ul>

            <div className={`${paginationClass} ${isShowPagination? isdisplay : ''}`}>
              <EnhancedPagination
                items={this.state.pagesize}
                activePage={this.state.activePage}
                onDataNumSelect={this.paginationNumSelect}
                onSelect={this.handleSelect.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default searchOther;
