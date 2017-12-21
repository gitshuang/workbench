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
      isSearchWinShow: false
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
    const { isShow, text, isSearchWinShow} = this.state;
    const {color} = this.props;
    let item, searchWin;
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
          <div className={searchWindom}>
            <h3>通讯录</h3>
            <ul>
              <li >
                <div className={h_icon}><img src={_default_icon}/></div>
                <div className={h_name}>
                  <p><span>我<font >{text}</font></span><span>市场部</span></p>
                  <p>办公电话 : 18372893749</p>
                </div>
                <div className={h_contact}><Icon title="发邮件" type="e-mail" /></div>
                <div className={h_contact}><Icon title="发消息" type="chat" /></div>
              </li>
              <li >
                <div className={h_icon}><img src={_default_icon}/></div>
                <div className={h_name}>
                  <p><span>我<font >{text}</font></span><span>市场部</span></p>
                  <p>办公电话 : 18372893749</p>
                </div>
                <div className={h_contact}><Icon title="发邮件" type="e-mail" /></div>
                <div className={h_contact}><Icon title="发消息" type="chat" /></div>
              </li>
            </ul>
          </div>
          <div className={searchWindom}>
            <h3>应用/服务</h3>
            <ul>
              <li className={search_service}>
                <div className={h_icon}><img src={yonyouSpace1}/></div>
                <div className={h_name}>
                  <p><span>友<font >{text}</font></span></p>
                  <p >办公协同、沟通协作等核心价值，高…</p>
                </div>
              </li>
            </ul>
          </div>
          <div className={searchWindom}>
            <h3>帮助</h3>
            <ul>
              <li >
                <div className={h_icon}><img src={_default_icon}/></div>
                <div className={h_name}>
                  <p className={search_help}>报账产<font >{text}</font>文档.word</p>
                </div>
                <div className={search_help}>800kb</div>
              </li>
            </ul>
          </div>
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
