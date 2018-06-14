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
      current: undefined,
      SearchMoreList: [],
      
      dataList: {
        content: [],
      },
      isShownodataClassEach: false,
      totalPages: 1,  // 总页数
      // 四个参数
      keywords: '', // 关键词
      activetab: '',  // 当前选中的是哪个类型
      activePage: 1,  // 当前是第几页
      dataPerPageNum: 10, // 每页显示几条
    };
  }

  componentWillMount() {
    const keywords = this.props.match.params.value || '';
    this.getSearchMoreList(this.props.match.params.value);
  }

  componentWillReceiveProps(nextProps) {
    const keywords = nextProps.match.params ? nextProps.match.params.value : '';
    if (keywords == this.state.keywords) return;
    this.getSearchMoreList(keywords);
  }

  getSearchMoreList = (keywords) => {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearchMore,
    } = this.props;
    const {dataPerPageNum} = this.state;
    requestStart();
    this.setState({ keywords }, function () {
      getSearchMore(keywords).then(({ error, payload }) => {
        if (error) {
          requestError(payload);
          return false;
        }
        requestSuccess();
        this.setState({
          SearchMoreList: payload.data,
          activetab: payload.data[0].type,
        });

        this.getSearchTpyeList(keywords, payload.data[0].type);
      });
    });
  }

  getSearchTpyeList = (keywords, type, page = 0, size = 10) => {
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
        return false;
      }
      this.setState({
        dataList: payload,
        totalPages: payload.totalPages,
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
    debugger;
    // const nowUrl = window.location.href;
    // const searchvalue = this.state.keywords || "";
    // const newUrl = nowUrl.substring(0, nowUrl.indexOf('searchvalue/') + 12).concat(searchvalue);
    // window.location.href = newUrl;

    // this.setState({
    //   keywords: searchvalue,
    // }, function () {
    //   // this.getSearchMoreList(searchvalue);
    // });
    const { keywords, activetab, activePage, dataPerPageNum } = this.state;
    this.getSearchTpyeList(keywords, activetab, activePage-1, dataPerPageNum);
  }

  // 输入框修改data数据源
  inputOnChange = (e) => {
    this.setState({
      keywords: e,
    });
  }

  // 点击分页
  handleSelect(eventKey) {
    const { keywords, activetab, dataPerPageNum } = this.state;
    this.setState({
      activePage: eventKey,
    });
    this.getSearchTpyeList(keywords, activetab, eventKey-1, dataPerPageNum);
  }

  // 下面选择每页展示的数据条目数
  paginationNumSelect = (id, dataNum) => {
    const reg = new RegExp('条\/页', 'g');
    const dataPerPageNum = dataNum.replace(reg, '');
    const { keywords, activetab, activePage } = this.state;
    this.setState({
      dataPerPageNum,
    }, function () {
      this.getSearchTpyeList(keywords, activetab, activePage - 1, dataPerPageNum);
    });
  }

  // 点击tabs 分类
  TabsClick = (activetab) => {
    const { keywords } = this.state;
    this.setState({
      activetab,
      activePage: 1,
    });
    this.getSearchTpyeList(keywords, activetab);
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
      SearchMoreList, dataList, isShownodataClassEach, totalPages,
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
                value={this.state.keywords}
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
                totalPages > 1 ? <div className={paginationClass}>
                  <EnhancedPagination
                    items={totalPages}
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
