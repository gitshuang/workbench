import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import { dispatch, trigger } from 'public/componentTools';
import FormControl from 'bee/form-control';
import Tabs, { TabPane } from 'bee/tabs';
import Icon from 'pub-comp/icon';
import EnhancedPagination from 'pub-comp/enhancedPagination';
import SearchItem from 'diwork-business-components/dist/search/searchItem';

import searchActions from 'store/root/search/actions';
import rootActions from 'store/root/actions';

import nodata from 'assets/image/wgt/nodata.png';

import {
  bg,
  recently,
  tabPane1,
  tabContent,
  clearfix,
  bg_wrap,
  wrap,
  serviceSearch,
  ufSearch,
  search_tit,
  search_icon_con,
  searchPanel,
  nodataClass,
  paginationClass,
} from './style.css';


const {
  getSearchMore, getSearch, getSearchOther, setSearchHeadData,
} = searchActions;
const { requestStart, requestSuccess, requestError } = rootActions;
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
  },
)
class searchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      current: undefined,
      activetab: '',
      SearchMoreList: [],
      hasOther: false,
      keywords: '',
      Searchotherlist: {
        content: [],
      },
      dataList: {
        content: [],
      },
      activePage: 1,
      pagesize: 1,
      isShownodataClassEach: true,
      dataPerPageNum: 10,
    };
  }

  componentWillMount() {
    this.getSearchMoreList(this.props.match.params.value);
  }

  componentWillReceiveProps(nextProps) {
    const keywords = nextProps.match.params ? nextProps.match.params.value : '';
    if (keywords == this.state.keywords) return;
    this.getSearchMoreList(keywords);
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  }

  getSearchMoreList(keywords, type, page, size) {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearchMore,
    } = this.props;

    requestStart();
    this.setState({ keywords, value: keywords }, function () {
      getSearchMore(keywords, type, page, size).then(({ error, payload }) => {
        if (error) {
          requestError(payload);
        }
        requestSuccess();
        this.setState({
          SearchMoreList: payload.data,
          hasOther: payload.hasOther,
          activetab: payload.data[0].type,
        });

        this.getSearchTpyeList(keywords, payload.data[0].type, page, size);
      });
    });
  }

  getSearchTpyeList(keywords, type, page, size = 10) {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearch,
    } = this.props;
    requestStart();
    getSearch(keywords, type, page, size).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      this.setState({
        dataList: payload,
        pagesize: payload.totalPages,
        isShownodataClassEach: !!payload.content.length,
      });
      requestSuccess();
    });
  }

  handleClick = labelId => () => {
    this.setState({
      current: labelId,
    });
  }

  btnSearch = () => {
    // 修改URL、
    const nowUrl = window.location.href;
    const searchvalue = !this.state.value ? '' : this.state.value;
    const newUrl = nowUrl.substring(0, nowUrl.indexOf('searchvalue/') + 12).concat(searchvalue);
    window.location.href = newUrl;

    this.setState({
      keywords: searchvalue,
    }, function () {
      this.getSearchMoreList(this.state.value);
    });
  }

  // 输入框修改data数据源
  inputOnChange = (e) => {
    this.setState({
      value: e,
    });
  }

  //
  handleSelect(eventKey) {
    const { value, activetab } = this.state;
    this.setState({
      activePage: eventKey,
    });
    const dataSize = this.state.dataPerPageNum;
    this.getSearchTpyeList(value, activetab, --eventKey, dataSize);
  }

  // 下面选择每页展示的数据条目数
  paginationNumSelect = (id, dataNum) => {
    const reg = new RegExp('条\/页', 'g');
    const dataPerPageNum = dataNum.replace(reg, '');
    const { value, activetab, activePage } = this.state;
    this.setState({
      dataPerPageNum,
    }, function () {
      this.getSearchTpyeList(value, activetab, activePage - 1, dataPerPageNum);
    });
  }

  TabsClick = (activetab) => {
    const { value } = this.state;
    this.setState({
      activetab,
      activePage: 1,
    });
    const dataSize = this.state.dataPerPageNum;
    this.getSearchTpyeList(value, activetab, 0, dataSize);
  }

  onKeyup = (e) => {
    e.keyCode === 13 && this.btnSearch();
  }

  otherlistLi(data) {
    return data.content.map((item, index) => (
      <li key={index}>
        <SearchItem dispatch={dispatch} trigger={trigger} data={item} type={data.type} url={data.renderUrl} from="full" />
      </li>
    ));
  }

  render() {
    const {
      SearchMoreList, dataList, isShownodataClassEach, pagesize,
    } = this.state;
    const Morelist = [];
    const anifalse = false;
    SearchMoreList.forEach((item) => {
      Morelist.push(<TabPane
        tab={item.typeName}
        key={item.type}
        className={tabPane1}
      >
        <ul className={recently}>{this.otherlistLi(dataList)}</ul>
        {
          isShownodataClassEach ? null :
            <div className={nodataClass}>
              <img src={nodata} />
              <p>暂无相关内容</p>
            </div>
        }

      </TabPane>);
    });

    return (
      <div className={`${bg} um-content um-vbox`}>
        <div className={`${bg_wrap} um-content um-vbox`}>
          <div className={`${wrap} ${clearfix} um-content um-vbox`}>
            <div className={searchPanel}>
              <FormControl
                className={serviceSearch}
                placeholder="搜索人员信息、应用、服务及其他内容"
                value={this.state.value}
                onKeyDown={this.onKeyup}
                onChange={this.inputOnChange}
              />
              <div className={search_icon_con}>
                <span>|</span>
                <Icon type="search" className={ufSearch} onClick={this.btnSearch} />
                <span className={search_tit} onClick={this.btnSearch}>搜索</span>
              </div>
            </div>
            <div className={'um-content' + ` ${tabContent}`}>
              <Tabs
                destroyInactiveTabPane
                defaultActiveKey={this.state.activetab}
                activeKey={this.state.activetab}
                className="demo-tabs"
                onChange={this.TabsClick}
                animated={anifalse}
              >
                {Morelist}
              </Tabs>
              {
                pagesize > 1 ? <div className={paginationClass}>
                  <EnhancedPagination
                    items={pagesize}
                    activePage={this.state.activePage}
                    onDataNumSelect={this.paginationNumSelect}
                    onSelect={this.handleSelect.bind(this)}
                  />
                </div> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default searchResult;
