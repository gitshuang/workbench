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
    console.log(this.props.match.params.type)
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
    }
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
                <p><span dangerouslySetInnerHTML={createMarkup(item.serveName)}></span></p>
                <p >{item.serveName}</p>
              </div>
            </li>);
    })
    return (
      <div className={bg+" um-content um-vbox"}>
        <div className={bg_wrap+" um-content um-vbox"}>
          <div className={`${wrap} ${clearfix} um-content um-vbox`}>
            <ul className={recently}>{lis}</ul>
            <div className={isShowPagination? isdisplay : ''}>
              <Pagination
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
      </div>
    )
  }
}

export default searchOther;