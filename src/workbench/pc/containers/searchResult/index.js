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
import GoTo from './goto';
import Select from 'bee-select';
import Tabs, { TabPane } from 'bee-tabs';
import Pagination from 'bee-pagination';

import {
  bg,
  recently,
  promotion,
  tabPane1,
  tabPane2,
  tabContent,
  clearfix,
  mleft50,
  h_icon,
  h_name,
  h_contact,
  search_service,
  search_help,
  bg_wrap,
  wrap,
  serviceSearch,
  ufSearch,
  appContent,
  menuBtnGroup,
  link,
  icon,
  search_tit,
  search_icon_con,
  searchPanel,
  um_content,
  icon_close,
  isdisplay
} from './style.css';
import _default_icon from 'assets/image/wgt/default.png';
import yonyouSpace1 from 'assets/image/wgt/yonyouSpace1.png';
import searchActions from 'store/root/search/actions';
import rootActions from 'store/root/actions';
const {getSearchMore, getSearch,getSearchOther} = searchActions;
const {requestStart, requestSuccess, requestError} = rootActions;
@withRouter

@connect(
  mapStateToProps(
    'SearchMoreList',
    'SearchList',
    'SearchOtherList',
    {
      namespace: 'search',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getSearchMore,
    getSearch,
    getSearchOther,
  }
)
class searchResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "关键词",
      isPackUp:false,
      current: undefined,
      activetab: '',
      SearchMoreList:[],
      hasOther:false,
      keywords:window.sessionStorage.searchkeywords,
      Searchotherlist :{
        content:[]
      },
      dataList :{
        content:[]
      },
      activePage:1,
      pagesize:10,
      isShowPagination:true,
    }
  }
  componentWillMount() {
    const { keywords} = this.state
    if(keywords!=undefined && keywords!=""){
      this.setState({
        value:keywords
      })
    this.getSearchMoreList(keywords)
    }
  }

  getSearchMoreList(keywords){
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearchMore,
    } = this.props;
      requestStart();
      getSearchMore(keywords).then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        this.setState({
          SearchMoreList:payload.data,
          hasOther:payload.hasOther,
          activetab:payload.data[0].type
        })
        requestSuccess();
        this.getSearchTpyeList(keywords,payload.data[0].type,1)
        window.sessionStorage.searchkeywords='';
      });
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
  getSearchOtherList(keywords,type,page){
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearchOther,
    } = this.props;
      requestStart();
      getSearchOther(keywords,type,page).then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        this.setState({
          Searchotherlist:payload,
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
  handleClick = (labelId) => () => {
    this.setState({
      current: labelId,
    })
  }

  btnSearch=()=>{
    if(this.state.value != "关键词"){
      console.log(this.state.value);
      this.getSearchMoreList(this.state.value)
    }
  }
  onFormChange = (value) => {
    this.setState({
      value
    })
  }


  //输入框修改data数据源
  inputOnChange = (e) => {
    this.setState({
        value:e
    });
  }
  handleSelect(eventKey) {
    const {value,activetab}=this.state
    this.setState({
      activePage: eventKey
    });
    if(activetab=='other'){
      this.getSearchOtherList(value,activetab,eventKey)
    }else{
     this.getSearchTpyeList(value,activetab,eventKey)
    }
  }
  inputOnFocus = (e) => {
    let _value = e.target.value != "关键词"?e.target.value:"";
    this.setState({
        value:_value 
    });
  }

  inputOnBlur = (e) => {
    if(e.target.value == ""){
      this.setState({
          value:"关键词"
      });
    }
  }

  TabsClick = (activetab) =>{
    const {value,activePage} = this.state
    this.setState({
      activetab,
      activePage:1
    })
    if(activetab=='other'){
      this.getSearchOtherList(value,activetab,1)

    }else{
      this.getSearchTpyeList(value,activetab,1)
    }
  }
  goDetail(type,item){
    return (e) => {
      e.stopPropagation();
      console.log(type,item)
    }
  }
  goOtherlist(item){
    return () => {
      console.log(item)
      this.props.history.push('/search/searchlist/'+item.type);
    }
  }
  goemailDetail(item){
    return (e) => {
      e.stopPropagation();
      console.log(item)
    }
  }

  gochatDetail(item) {
    return (e) => {
      e.stopPropagation();
      console.log(item)
    }
  }

  otherlistLi(data){
    var lis =[]
    function createMarkup(text) {
      return {__html: text};
    }
    data.content.forEach((item,index)=>{
      item = JSON.parse(item)
      switch (data.type)
      {
        case "user":
          lis.push(<li key={index} onClick={this.goDetail(this.state.activetab,item)}>
                <div className={h_icon}><img src={item.headimg}/></div>
                <div className={h_name}>
                  <p><span dangerouslySetInnerHTML={createMarkup(item.username)}></span><span>{item.department}</span></p>
                  <p>办公电话 : {item.phone}</p>
                </div>
                <div className={`${h_contact} ${mleft50}`} onClick={this.goemailDetail(item)}><Icon title="发邮件" type="e-mail" /></div>
                <div className={h_contact} onClick={this.goemailDetail(item)}><Icon title="发消息" type="chat" /></div>
              </li>);
          break;
        case "service":
          lis.push(<li className={search_service} key={index} onClick={this.goDetail(this.state.activetab,item)}>
                  <div className={h_icon}><img src={item.serveIcon}/></div>
                  <div className={h_name}>
                    <p><span dangerouslySetInnerHTML={createMarkup(item.serveName)}></span></p>
                    <p >{item.serveName}</p>
                  </div>
                </li>);
          break;
        case "help":
            lis.push(<li key={index} onClick={this.goDetail(this.state.activetab,item)}>
                <div className={h_icon}><img src={_default_icon}/></div>
                <div className={h_name}>
                  <p className={search_help}  dangerouslySetInnerHTML={createMarkup(item.title)}></p>
                </div>
                <div className={search_help}>{item.size}</div>
              </li>);
          break;
        default:
            lis.push(<li key={index} onClick={this.goDetail(this.state.activetab,item)}>
                <div className={h_icon}><img src={_default_icon}/></div>
                <div className={h_name}>
                  <p className={search_help}  dangerouslySetInnerHTML={createMarkup(item.title)}></p>
                </div>
              </li>);
      }
    })
    return lis
  }
  render() {
    const { value,  keywords, current ,SearchMoreList,dataList,isShowPagination,Searchotherlist } = this.state;
    let otherlist = []
    let Morelist = []
    const anifalse=false
    SearchMoreList.forEach((item,index) => {

      Morelist.push(
      <TabPane
          tab={item.typeName}
          key={item.type}
          className={tabPane1}
      >
          <ul className={recently}>{this.otherlistLi(dataList)}</ul>
      </TabPane>)
    })

    Searchotherlist.content.forEach((item,index) => {
      otherlist.push(<ul className={`${recently} ${clearfix}`} key={index}>
      <h3>{item.typeName}</h3>
      {this.otherlistLi(item)}
      
      <em key={index} onClick={this.goOtherlist(item)}>查看全部，共{item.total}条 ></em>
    </ul>)
    })
                  
    return (
      <div className={bg+" um-content um-vbox"}>
        <div className={bg_wrap+" um-content um-vbox"}>
          <div className={`${wrap} ${clearfix} um-content um-vbox`}>
            <div className={searchPanel}>
              <FormControl className={serviceSearch} value={this.state.value} onFocus={this.inputOnFocus} onBlur={this.inputOnBlur} onChange={this.inputOnChange}/>
              <div className={search_icon_con}>
                  <span>|</span>
                  <Icon type="search" className={ufSearch} onClick={this.btnSearch}></Icon>
                  <span className={search_tit} onClick={this.btnSearch}>搜索</span>
              </div>
            </div>
            <div className={"um-content" + ` ${tabContent}`}>
            
              <Tabs
                defaultActiveKey={this.state.activetab}
                activeKey={this.state.activetab}
                className="demo-tabs"
                onChange={this.TabsClick}
                animated={anifalse}
              >
              {Morelist}
              {
                this.state.hasOther ? (
                  <TabPane tab='其他内容' key="other" className={tabPane1}>
                    {otherlist}
                  </TabPane>
                ) : null
              }
                
              </Tabs>
            </div>
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

export default searchResult;
