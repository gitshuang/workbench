import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Icon from 'pub-comp/icon';
import { connect } from 'react-redux';
import searchActions from 'store/root/search/actions';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import { dispatch, trigger } from 'public/componentTools';
import SearchItem from 'components/searchItem';

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
  showheight,
  searchBtnAll,
} from './style.css';
import rootActions from 'store/root/actions';
const { getSearchSuggest } = searchActions;
const { requestStart, requestSuccess, requestError } = rootActions;


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
      SearchSuggestList: []
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

  getSearchList(keyworks) {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearchSuggest,
    } = this.props;
    // if(this.state.allApplicationList.length == 0){
    //requestStart();
    getSearchSuggest(keyworks).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
      if (payload.length < 1) {
        this.setState({
          nosearchdata: true
        })
      }
      this.setState({
        SearchSuggestList: payload
      })
    });
    // }
  }
  onChangeHandler(e) {
    var _this = this;
    this.setState({
      text: e.target.value
    })
    if (e.target.value == "") {
      this.setState({
        isSearchWinShow: false
      })
    } else {
      setTimeout(function () {
        _this.searchMin()
      }, 0)
    }
  }
  onKeyup = (e) => {
    e.keyCode === 13 && this.goSearchPage()
  }
  handleClickOutside(evt) {
    const _this = this;
    const { isShow } = _this.state;
    if (isShow) {
      setTimeout(function () {
        _this.setState({
          isShow: false,
          text: '',
        })
      }, 500)
    }
    const { isSearchWinShow } = _this.state;
    if (isSearchWinShow) {
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
      isSearchWinShow: false
    })
  }
  goDetail(type, item) {
    return (e) => {
      e.stopPropagation();
      let code = "", _type = "";
      if (item.serviceId) {
        code = item.serviceCode;
        _type = "service";
      } else {
        code = item.applicationCode;
        _type = "app";
      }
      this.props.history.push('/' + _type + '/' + code);
    }
  }
  goemailDetail({ id, userId, name, tenantId }) {
    return (e) => {
      e.stopPropagation();
      dispatchMessageTypeHandler({
        type: 'openService',
        detail: {
          serviceCode: 'XTWEIYOU0000000000',
          data: {
            genre: 4,
            fromDiworkAddressList: `${name}---${userId}---${tenantId}`,
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

  goAddress = (actibe, item) => {
    const { id, name, userId, tenantId } = this.props;
    dispatchMessageTypeHandler({
      type: 'openService',
      detail: {
        serviceCode: 'XTTONGXUNLU0000000',
        data: {
          genre: 4,
          fromDiworkAddressList: `${name}---${userId}---${tenantId}`,
        },
      }
    });
  }

  render() {
    const { isShow, text, isSearchWinShow, SearchSuggestList, nosearchdata } = this.state;
    const { color } = this.props;
    let inputWrap, searchWin;
    const dataList = SearchSuggestList.map(({ typeName, content, type, renderUrl }, i) => {
      return (
        <div className={searchWindom} key={`type${i}`}>
          <h3>{typeName} </h3>
          <ul>
            {
              content.map((item, j) => {
                return (
                  <li key={`item${j}`}>
                    <SearchItem dispatch={dispatch} trigger={trigger} data={item} type={type} url={renderUrl} from="quick" />
                  </li>
                );
              })
            }
          </ul>
        </div>
      );
    });
    if (isShow) {
      inputWrap = (
        <div className={inputArea} style={{ borderColor: color }}>
          <input
            className={searchText}
            type="text"
            value={text}
            onChange={this.onChangeHandler}
            placeholder="搜索人员信息、应用、服务及其他内容"
            style={{ color: color }}
            autoFocus={true}
            onKeyDown={this.onKeyup}
          />
        </div>
      );

      searchWin = (
        <div className={`${SearchWin} ${isSearchWinShow ? showheight : ''}`} >
          <div className={`${searchContent}`}>
            {dataList}
          </div>
          {
            nosearchdata ? (
              <em>没有搜索结果</em>
            ) : <div className={searchBtnAll} onClick={this.goSearchPage}>更多结果</div>
          }

        </div>
      );
    }

    return (
      <div className={`${search} ${isShow ? searchExtend : ''}`} style={{ borderColor: color }}>
        {inputWrap}
        {searchWin}
        {
          isShow && text ? (
            <div className={clearSearch} onClick={this.clearInput}>
              <Icon title="清空" type="error3" />
            </div>
          ) : null
        }
        <div className={`tc ${searchBtn}`} onClick={this.search}>
          <Icon title="搜索" type="search" style={{ color: color }} />
        </div>
      </div>
    );
  }
}

export default SearchContainer;
