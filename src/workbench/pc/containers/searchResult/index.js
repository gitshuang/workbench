import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Button from 'bee/button';
import Icon from 'components/icon';
// import InputGroup from 'bee-input-group';
// import AutoComplete from 'bee-autocomplete';
import FormControl from 'bee/form-control';
import Menu from 'bee/menus';
// import ButtonGroup from 'bee/button-group';
//import GoTo from './goto';
// import Select from 'bee-select';
import Tabs, { TabPane } from 'bee/tabs';
import Pagination from 'bee/pagination';
import EnhancedPagination from 'bee/enhancedPagination';

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
  nodataClass,
  paginationClass,
  isdisplay
} from './style.css';
import _default_icon from 'assets/image/wgt/default.png';
import yonyouSpace1 from 'assets/image/wgt/yonyouSpace1.png';
import nodata from 'assets/image/wgt/nodata.png';
import searchActions from 'store/root/search/actions';
import rootActions from 'store/root/actions';
const {getSearchMore, getSearch,getSearchOther,setSearchHeadData} = searchActions;
const {requestStart, requestSuccess, requestError} = rootActions;
@withRouter

@connect(
  mapStateToProps(
    'SearchMoreList',
    'SearchList',
    'SearchOtherList',
    'searchHeadData',
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
    setSearchHeadData,
  }
)
class searchResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isPackUp:false,
      current: undefined,
      activetab: '',
      SearchMoreList:[],
      hasOther:false,
      keywords:props.match.params?props.match.params.value:"",
      Searchotherlist :{
        content:[]
      },
      dataList :{
        content:[]
      },
      activePage:1,
      pagesize:10,
      isShowPagination:true,
      isShownodataClass:true,
      isShownodataClassEach:true,
      otherName:"其他内容"
      //otherName:"其他内容(0)"
    }
  }
  
  componentDidMount() {
    console.log(" ===componentDidMount=== "+this.props.match.params.value);
    this.getSearchMoreList(this.props.match.params.value)
  }

  componentWillReceiveProps(nextProps){
    console.log(" -componentWillReceiveProps-- "+nextProps.match.params.value);
    let keywords = nextProps.match.params?nextProps.match.params.value:"";
    if(keywords == this.state.keywords)return;
    this.getSearchMoreList(keywords);
  }

  getSearchMoreList(keywords){
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearchMore,
    } = this.props;
      // requestStart();
      this.setState({keywords,value:keywords},function () {
          getSearchMore(keywords).then(({error, payload}) => {
            if (error) {
              requestError(payload);
            }
            this.setState({
              SearchMoreList:payload.data,
              hasOther:payload.hasOther,
              activetab:payload.data[0].type,
              //keywords,
              //value:keywords
            })
            // requestSuccess();
            if(payload.data.length<1){
              this.setState({
                isShownodataClass:false,
              })
            }else{
              this.setState({
                isShowPagination:true,
              })
            } 
            this.getSearchTpyeList(keywords,payload.data[0].type,0);
          });
      })
      
  }

  getSearchTpyeList(keywords,type,page){
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearch,
    } = this.props;
      // requestStart();
      getSearch(keywords,type,page).then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        this.setState({
          dataList:payload,
          //pagesize:payload.pageSize
          pagesize:payload.totalPages
        })
        if(payload.content.length>0){
          this.setState({
            isShowPagination:false,
            isShownodataClassEach:true,

          })
        }else{
          this.setState({
            isShowPagination:true,
            isShownodataClassEach:false,
          })
        }
       requestSuccess();
      });
  }

  getSearchOtherList(keywords,contentsize,page){
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearchOther,
    } = this.props;
      requestStart();
      getSearchOther(keywords,contentsize,page).then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        let _count = 0;
        payload.content.forEach((da)=>{
          _count += da.pageSize
        })
        let _newObj = {otherName:"其他内容"};
        _newObj.Searchotherlist = payload;
        //_newObj.pagesize = payload.pageSize;
        _newObj.pagesize = payload.totalPages;//总页数
        if(payload.content.length>0){
          _newObj.isShowPagination = false;
          _newObj.isShownodataClassEach = true;
        }else{
          _newObj.isShowPagination = true;
          _newObj.isShownodataClassEach = false;
        }
        this.setState({
          ..._newObj
        })
       requestSuccess();
      });
  }
  
  handleClick = (labelId) => () => {
    this.setState({
      current: labelId,
    })
  }

  btnSearch=()=>{
    //修改URL、
    let nowUrl = window.location.href;
    let searchvalue = !this.state.value?'':this.state.value
    let newUrl =  nowUrl.substring(0,nowUrl.indexOf('searchvalue/')+12).concat(searchvalue);
    window.location.href = newUrl;
    this.setState({
      keywords:searchvalue
    }, function() {
      this.getSearchMoreList(this.state.value)
    })
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
      this.getSearchOtherList(value,5,--eventKey)
    }else{
     this.getSearchTpyeList(value,activetab,--eventKey)
    }
  }
  // inputOnFocus = (e) => {
  //   let _value = e.target.value != "搜索人员信息、应用、服务及其他内容"?e.target.value:"";
  //   this.setState({
  //       value:_value
  //   });
  // }

  // inputOnBlur = (e) => {
  //   if(e.target.value == ""){
  //     this.setState({
  //         value:"搜索人员信息、应用、服务及其他内容"
  //     });
  //   }
  // }

  TabsClick = (activetab) =>{
    const {value,activePage} = this.state
    this.setState({
      activetab,
      activePage:1
    })
    if(activetab=='other'){
      this.getSearchOtherList(value,5,0)

    }else{
      this.getSearchTpyeList(value,activetab,0)
    }
  }
  goDetail(type,item){
    return (e) => {
      e.stopPropagation();
      this.props.history.push('/'+type+'/'+item.serviceCode);
    }
  }
  goOtherlist(item){
    const {setSearchHeadData,searchHeadData:{brm}} = this.props;
    setSearchHeadData({appName:item.typeName,brm:[{name:brm[0].name},{name:item.typeName}],searchValue:this.state.keywords});
    //this.props.history.push({pathname:`/search/searchlist`,state:item});
    this.props.history.push({pathname:`/search/searchlist/${!this.state.keywords?'':this.state.keywords}`,state:item});
  }
  goemailDetail(item){
    return (e) => {
      e.stopPropagation();
    }
  }
  onKeyup = (e) => {
    e.keyCode === 13 && this.btnSearch()
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
      item= eval('(' + item + ')')
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
                  <div className={h_icon}><img src={item.serviceIcon}/></div>
                  <div className={h_name}>
                    <p className={search_help}><span dangerouslySetInnerHTML={createMarkup(item.serviceName)}></span></p>
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
    const { otherName,value,  keywords, current ,SearchMoreList,dataList,isShowPagination,Searchotherlist,isShownodataClass,isShownodataClassEach } = this.state;
    let otherlist = []
    let Morelist = []
    const anifalse=false
    SearchMoreList.forEach((item,index) => {
      Morelist.push(
      <TabPane
          tab={item.typeName+"("+item.totalElements+")"}
          key={item.type}
          className={tabPane1}
      >
          <ul className={recently}>{this.otherlistLi(dataList)}</ul>
          <div className={`${nodataClass} ${isShownodataClassEach ? isdisplay : ''}`}>
                <img src={nodata}/>
                <p>暂无相关内容</p>
              </div>
      </TabPane>)
    })

    Searchotherlist.content.forEach((item,index) => {
      if(item.content.length<1){
        return false
      }
      otherlist.push(<ul className={`${recently} ${clearfix}`} key={index}>
      <h3>{item.typeName}</h3>
      {this.otherlistLi(item)}

      <em key={index} onClick={()=>{this.goOtherlist(item)}}>查看全部 ></em>
    </ul>)
    })

    return (
      <div className={bg+" um-content um-vbox"}>
        <div className={bg_wrap+" um-content um-vbox"}>
          <div className={`${wrap} ${clearfix} um-content um-vbox`}>
            <div className={searchPanel}>
              <FormControl className={serviceSearch} placeholder="搜索人员信息、应用、服务及其他内容"
               value={this.state.value} onKeyDown={this.onKeyup} onChange={this.inputOnChange}/>
              <div className={search_icon_con}>
                  <span>|</span>
                  <Icon type="search" className={ufSearch} onClick={this.btnSearch}></Icon>
                  <span className={search_tit} onClick={this.btnSearch}>搜索</span>
              </div>
            </div>
            <div className={"um-content" + ` ${tabContent}`}>
              <div className={`${nodataClass} ${isShownodataClass? isdisplay : ''}`}>
                <img src={nodata}/>
                <p>暂无相关内容</p>
              </div>
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
                  <TabPane tab={otherName} key="other" className={tabPane1}>
                    {otherlist}
                    <div className={`${nodataClass} ${isShownodataClassEach? isdisplay : ''}`}>
                      <img src={nodata}/>
                      <p>暂无相关内容</p>
                    </div>
                  </TabPane>
                ) : null
              }

              </Tabs>

              <div className={`${paginationClass} ${isShowPagination? isdisplay : ''}`}>
              <EnhancedPagination
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
        </div>
      </div>
    )
  }
}

export default searchResult;
