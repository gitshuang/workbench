import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { mapStateToProps } from '@u';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import Icon from 'pub-comp/icon';
import { connect } from 'react-redux';
import searchActions from 'store/root/search/actions';
import SearchResult from 'containers/searchResult'
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import { trigger } from 'public/componentTools';

import {
  search,
  searchExtend,
  searchBtn,
  searchText,
  inputArea,
  inputEnter,
  inputLeave,
  inputEnterActive,
  inputLeaveActive,
  clearSearch,
  SearchWin,
  searchWindom,
  searchContent,
  h_icon,
  h_name,
  h_contact,
  search_service,
  search_help,
  showheight,
  searchBtnAll,
} from './style.css';
import _default_icon from 'assets/image/wgt/default.png';
import yonyouSpace1 from 'assets/image/wgt/yonyouSpace1.png';
import rootActions from 'store/root/actions';
const {getSearchSuggest} = searchActions;
const {requestStart, requestSuccess, requestError} = rootActions;


@connect(
  mapStateToProps(
    'SearchSuggestList',
    {
      namespace: 'search',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getSearchSuggest,
  }
)
@withRouter
@onClickOutside
class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isShow: false,
      isSearchWinShow: false,
      nosearchdata: false,
      SearchSuggestList:[]
    };
    this.search = this.search.bind(this);
    this.searchMin = this.searchMin.bind(this);
    this.goSearchPage = this.goSearchPage.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.goDetail = this.goDetail.bind(this);
    this.goemailDetail = this.goemailDetail.bind(this);
    this.gochatDetail = this.gochatDetail.bind(this);
  }
  goSearchPage() {
    //todu 此处如果使用push，每次传进去的参数，始终是第一个参数。
    let value = this.state.text;
    this.props.history.push(`/search/searchvalue/${value}`);
  }

  getSearchList(keyworks){
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearchSuggest,
    } = this.props;
    // if(this.state.allApplicationList.length == 0){
      //requestStart();
      getSearchSuggest(keyworks).then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        requestSuccess();
        if(payload.length<1){
          this.setState({
            nosearchdata:true
          })
        }
        this.setState({
          SearchSuggestList:payload
        })
      });
    // }
  }
  onChangeHandler(e) {
    var _this = this;
    this.setState({
      text: e.target.value
    })
    if( e.target.value==""){
      this.setState({
        isSearchWinShow:false
      })
    }else{
      setTimeout(function(){
        _this.searchMin()
      },0)
    }
  }
  onKeyup = (e) => {
    e.keyCode === 13 && this.goSearchPage()
  }
  handleClickOutside(evt) {
    const _this = this;
    const { isShow } = _this.state;
    if(isShow){
      setTimeout(function(){
        _this.setState({
          isShow: false,
          text: '',
        })
      },500)
    }
    const { isSearchWinShow } = _this.state;
    if(isSearchWinShow){
      _this.setState({
        isSearchWinShow: false,
      })
    }
  }
  searchMin() {
    const { isShow, text, isSearchWinShow } = this.state;
    if (isShow && text) {
      this.getSearchList(text)
      this.setState({
        isSearchWinShow: true,
      })
    }
  }
  search() {
    const { isShow, text, isSearchWinShow } = this.state;
    if (isShow && text) {
     this.goSearchPage();
    } else if (isShow) {
      this.setState({
        isShow: false,
      })
    } else {
      this.setState({
        isShow: true,
      })

    }
    // this.props.history.push('/application');;
  }
  clearInput = () => {
    this.setState({
      text: '',
    })
  }
  goDetail(type,item){
    return (e) => {
      e.stopPropagation();
      let code = "",_type="";
      if(item.serviceId){
        code = item.serviceCode;
        _type = "service";
      }else{
        code = item.applicationCode;
        _type = "app";
      }
      this.props.history.push('/'+_type+'/'+code);
    }
  }
  goemailDetail({ id, userId, userName, tenantId }){
    return (e) => {
      e.stopPropagation();
      dispatchMessageTypeHandler({
        type: 'openService',
        detail: {
          serviceCode: 'XTWEIYOU0000000000',
          data: {
            genre:4,
            fromDiworkAddressList: `${userName}---${userId}---${tenantId}`,
          },
        }
      });
    }
  }
  gochatDetail({ userId }) {
    return (e) => {
      e.stopPropagation();
      trigger('IM', 'switchChatTo', {
        yht_id: userId,
      });
    }
  }

  render() {
    const { isShow, text, isSearchWinShow, SearchSuggestList,nosearchdata} = this.state;
    const {color} = this.props;
    const _this = this;
    let item, searchWin, contenttype_user,contenttype_service,contenttype_help;
    let contenttype_other=[];
    function createMarkup(text) {
      return {__html: text};
    }
    SearchSuggestList.forEach((item,index)=>{
      if(item.content.length<1){
        return false
      }
      switch (item.type)
      {
        case "addressbook"://通讯录
          let lis = [];
          item.content.forEach((item2,index2)=>{
            item2 = eval('(' + item2 + ')')
            lis.push(<li key={index2} onClick={_this.goDetail(item.type,item2)}>
                  <div className={h_icon}><img src={item2.userAvator}/></div>
                  <div className={h_name}>
                    <p><span dangerouslySetInnerHTML={createMarkup(item2.userName)}></span><span>{item2.orgName}</span></p>
                    <p>办公电话 : {item2.userMobile}</p>
                  </div>
                  <div className={h_contact} onClick={_this.goemailDetail(item2)}><Icon title="发邮件" type="e-mail" /></div>
                  <div className={h_contact} onClick={_this.gochatDetail(item2)}><Icon title="发消息" type="chat" /></div>
                </li>);
          }),
          contenttype_user = (
            <div className={searchWindom}>
              <h3>{item.typeName}</h3>
              <ul>
                {lis}
              </ul>
            </div>
          )
          break;
        case "service":
          let lis2 = [];
          item.content.forEach((item2,index2)=>{
            item2 = eval('(' + item2 + ')')
            lis2.push(<li className={search_service} key={index2} onClick={_this.goDetail(item.type,item2)}>
                  <div className={h_icon}><img src={item2.serviceId?item2.serviceIcon:item2.applicationIcon}/></div>
                  <div className={h_name}>
                    <p className={search_help}><span dangerouslySetInnerHTML={createMarkup(item2.serviceId?item2.serviceName:item2.applicationName)}></span></p>
                  </div>
                </li>);
          }),
          contenttype_service= (
            <div className={searchWindom}>
              <h3>{item.typeName}</h3>
              <ul>
                {lis2}
              </ul>
            </div>
          )
          break;
        case "help":
          let lis3= [];
          item.content.forEach((item2,index2)=>{
            item2 = JSON.parse(item2)
            lis3.push(<li key={index2} onClick={_this.goDetail(item.type,item2)}>
                <div className={h_icon}><img src={_default_icon}/></div>
                <div className={h_name}>
                  <p className={search_help}  dangerouslySetInnerHTML={createMarkup(item2.title)}></p>
                </div>
                <div className={search_help}>{item2.size}</div>
              </li>);
          }),
          contenttype_help= (
            <div className={searchWindom}>
              <h3>{item.typeName}</h3>
              <ul>
                {lis3}
              </ul>
            </div>
          )
          break;
        default:
          let lis4 = [];

            item.content.forEach((item2,index2)=>{
              item2 = JSON.parse(item2)
              lis4.push(<li key={index2} onClick={_this.goDetail(item.type,item2)}>
                  <div className={h_icon}><img src={_default_icon}/></div>
                  <div className={h_name}>
                    <p className={search_help}  dangerouslySetInnerHTML={createMarkup(item2.title)}></p>
                  </div>
                </li>);
            })

          contenttype_other.push(
            <div className={searchWindom} key={index}>
              <h3>{item.typeName}</h3>
              <ul>
                {lis4}
              </ul>
            </div>
          )
      }
    })
    if (isShow) {
      item = (
        <div className={inputArea}  style={{borderColor:color}}>
          <input
            className={searchText}
            type="text"
            value={text}
            onChange={this.onChangeHandler}
            placeholder="搜索人员信息、应用、服务及其他内容"
            style={{color:color}}
            autoFocus={true}
            onKeyDown={this.onKeyup}
          />
        </div>
      ),

      searchWin = (
        <div className={`${SearchWin} ${isSearchWinShow? showheight : ''}`} >
            <div className={`${searchContent}`}>
                {contenttype_user}
                {contenttype_service}
                {contenttype_help}
                {contenttype_other}
            </div>
          {
            nosearchdata ? (
              <em>没有搜索结果</em>
            ) : <div className={searchBtnAll} onClick={this.goSearchPage}>更多结果</div>
          }

        </div>
      )
    }


    return (
      <div className={`${search} ${isShow? searchExtend : ''}`}  style={{borderColor:color}}>
        {item}
        {searchWin}
        {
          isShow && text ? (
            <div className={clearSearch}  onClick={this.clearInput}>
              <Icon title="清空" type="error3"/>
            </div>
          ) : null
        }
        <div className={`tc ${searchBtn}`} onClick={this.search}>
          <Icon title="搜索" type="search" style={{color:color}} />
        </div>
      </div>
    );
  }
}

export default SearchContainer;
