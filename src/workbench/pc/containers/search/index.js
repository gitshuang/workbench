import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import Icon from 'components/icon';
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
import { setTimeout } from 'timers';

@withRouter
@onClickOutside
class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isShow: false,
      isSearchWinShow: false,
      dataList:{
        status:1,
        data:[
          {
            type:'user',
            renderurl:'',
            contents:[
              {
                userId:'111xdd',
                headimg:_default_icon,
                username:'小<font>dd</font>',
                phone:'1328222912',
                email:'dxx@qq.com',
                department:'市场部'
              },
              {
                userId:'111xdd',
                headimg:_default_icon,
                username:'大<font>dd</font>',
                phone:'142444252',
                email:'gvvvv@qq.com',
                department:'业务部'
              }
            ]
          },
          {
            type:'service',
            renderurl:'',
            contents:[
              {
                id:'111xdd',
                headimg:_default_icon,
                title:'小<font>dd</font>',
                brief:'办公协同、沟通协作等核心价值',
                
              },
            ]
          },
          {
            type:'help',
            renderurl:'',
            contents:[
              {
                id:'111xdd',
                headimg:_default_icon,
                title:'小<font>dd</font>',
                size:'800kb',
              }
            ]
          },
          {
            type:'other',
            renderurl:'',
            class:"其他",
            contents:[
              {
                id:'111xdd',
                headimg:_default_icon,
                title:'其他分类<font>dd</font>',
              }
            ]
          },
          
        ]
      }
    };
    this.search = this.search.bind(this);
    this.goSearchPage = this.goSearchPage.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  goSearchPage() {
    var local= this.props.history.location.pathname;
    if(local!='/search'){
      this.props.history.push('/search');
    }
  }
  onChangeHandler(e) {
    this.setState({
      text: e.target.value
    })
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
  search() {
    const { isShow, text, isSearchWinShow } = this.state;
    if (isShow && text) {
      console.log(this.state.text)
      this.setState({
        isSearchWinShow: true,
      })
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

  render() {
    const { isShow, text, isSearchWinShow, dataList} = this.state;
    let item, searchWin, contenttype_user,contenttype_service,contenttype_help;
    let contenttype_other=[];
    function createMarkup(text) {
      return {__html: text};
    }
    dataList.data.forEach((item,index)=>{
      switch (item.type)
      {
        case "user":
          let lis = [];
          item.contents.forEach((item2,index2)=>{
            lis.push(<li key={index2}>
                  <div className={h_icon}><img src={item2.headimg}/></div>
                  <div className={h_name}>
                    <p><span dangerouslySetInnerHTML={createMarkup(item2.username)}></span><span>{item2.department}</span></p>
                    <p>办公电话 : {item2.phone}</p>
                  </div>
                  <div className={h_contact}><Icon title="发邮件" type="e-mail" /></div>
                  <div className={h_contact}><Icon title="发消息" type="chat" /></div>
                </li>);
          }),
          contenttype_user = (
            <div className={searchWindom}>
              <h3>通讯录</h3>
              <ul>
                {lis}
              </ul>
            </div>
          )
          break;
        case "service":
          let lis2 = [];
          item.contents.forEach((item2,index2)=>{
            lis2.push(<li className={search_service} key={index2}>
                  <div className={h_icon}><img src={yonyouSpace1}/></div>
                  <div className={h_name}>
                    <p><span dangerouslySetInnerHTML={createMarkup(item2.title)}></span></p>
                    <p >{item2.brief}</p>
                  </div>
                </li>);
          }),
          contenttype_service= (
            <div className={searchWindom}>
              <h3>应用/服务</h3>
              <ul>
                {lis2}
              </ul>
            </div>
          )
          break;
        case "help":
          let lis3= [];
          item.contents.forEach((item2,index2)=>{
            lis3.push(<li key={index2}>
                <div className={h_icon}><img src={_default_icon}/></div>
                <div className={h_name}>
                  <p className={search_help}  dangerouslySetInnerHTML={createMarkup(item2.title)}></p>
                </div>
                <div className={search_help}>{item2.size}</div>
              </li>);
          }),
          contenttype_help= (
            <div className={searchWindom}>
              <h3>帮助</h3>
              <ul>
                {lis3}
              </ul>
            </div>
          )
          break;
        default:
          let lis4 = [];
          if(item.renderurl!=''){
            item.contents.forEach((item2,index2)=>{
              lis4.push(eval(item.renderurl));
            })
          }else{
            item.contents.forEach((item2,index2)=>{
              lis4.push(<li key={index2}>
                  <div className={h_icon}><img src={_default_icon}/></div>
                  <div className={h_name}>
                    <p className={search_help}  dangerouslySetInnerHTML={createMarkup(item2.title)}></p>
                  </div>
                </li>);
            })
          }
          contenttype_other.push(
            <div className={searchWindom} key={index}>
              <h3>{item.class}</h3>
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
            placeholder="关键词"
            style={{color:color}}
          />
        </div>
      ),
      
      searchWin = (
        <div className={`${SearchWin} ${isSearchWinShow? showheight : ''}`} >
          {contenttype_user}
          {contenttype_service}
          {contenttype_help}
          {contenttype_other}
          <div className={searchBtnAll} onClick={this.goSearchPage}>查看全部</div>
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
