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
// import SearchItem from './searchItem';
import searchActions from 'store/root/search/actions';
import rootActions from 'store/root/actions';

import nodata from 'assets/image/wgt/nodata.png';

import {
  bg,
  bg_wrap,
  wrap,
  clearfix,
  searchPanel,
  serviceSearch,
  search_icon_con,
  ufSearch,
  search_tit,
  tabContent,
  nodataClass,
  recently,
  tabPane1,
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
      SearchMoreList: [],
      dataList: {
        content: [],
      },
      isShownodataClassEach: true, // 当没数据或者请求失败  渲染无数据图片
      totalPages: 0,  // 总页数
      // 四个参数
      keywords: '', // 关键词
      activetab: '',  // 当前选中的是哪个类型
      activePage: 1,  // 当前是第几页
      dataPerPageNum: 10, // 每页显示几条

      searchValue: '',
      searchTab: '',
    };
  }

  componentWillMount() {
    const keywords = this.props.match.params.value || '';
    this.getSearchMoreList(keywords);
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.match.params ? nextProps.match.params.value : '';
    const id = nextProps.match.params ? nextProps.match.params.id : '';
    const { searchValue, searchTab } = this.state;
    if (searchValue === '' && searchTab === '') return;
    if (value === searchValue && id === searchTab) return;
    this.getSearchTpyeList(value, id, 0, 10);
  }

  getSearchMoreList = (keywords) => {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearchMore,
    } = this.props;
    const { id } = this.props.match.params;
    requestStart();
    this.setState({ keywords }, () => {
      getSearchMore(keywords).then(({ error, payload }) => {
        if (error) {
          requestError(payload);
          return false;
        }
        requestSuccess();
        const activetab = id || payload.data[0].type;
        this.setState({
          SearchMoreList: payload.data,
          activetab,
        }, () => {
          this.getSearchTpyeList(keywords, activetab, 0, 10);
        });
      });
    });
  }

  getSearchTpyeList = (keywords, type, page, size) => {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearch,
    } = this.props;
    requestStart();
    this.setState({
      searchValue: keywords,
      searchTab: type,
      // 下边这两个  主要是为了兼容 快速搜索触发nextprops后 更改参数
      activetab: type,
      keywords: keywords
    }, () => {
      getSearch(keywords, type, page, size).then(({ error, payload }) => {
        if (error) {
          requestError(payload);
          this.setState({
            dataList: {
              content: [],
            },
            totalPages: 0,
            isShownodataClassEach: false
          });
          return false;
        }
        requestSuccess();
        this.setState({
          dataList: payload,
          totalPages: payload.totalPages,
          isShownodataClassEach: !!payload.content.length,
        });

      });
    })
  }

  btnSearch = () => {
    const { activetab, searchValue } = this.state;
    let { keywords } = this.state;
    if (searchValue === keywords) return;
    if(keywords === ""){
      keywords = " ";
    }
    this.props.history.push(`/search/${activetab}/${keywords}`);
  }

  // 点击tabs 分类
  TabsClick = (activetab) => {
    let { keywords } = this.state;
    if(keywords === ""){
      keywords = " ";
    }
    this.setState({
      activetab,
      activePage: 1,
      dataList: {
        content: [],
      },
      totalPages: 0,
      isShownodataClassEach: true,
    }, () => {
      this.props.history.push(`/search/${activetab}/${keywords}`);
    });
  }

  // 点击分页
  handleSelect(eventKey) {
    const { keywords, activetab, dataPerPageNum } = this.state;
    this.setState({
      activePage: eventKey,
    }, () => {
      this.getSearchTpyeList(keywords, activetab, eventKey - 1, dataPerPageNum);
    });
  }

  // 下面选择每页展示的数据条目数
  paginationNumSelect = (id, dataNum) => {
    const reg = new RegExp('條\/頁', 'g');
    const dataPerPageNum = dataNum.replace(reg, '');
    const { keywords, activePage, activetab } = this.state;
    this.setState({
      dataPerPageNum,
    }, () => {
      this.getSearchTpyeList(keywords, activetab, activePage - 1, dataPerPageNum);
    });
  }

  // 输入框敲回车键
  onKeyup = (e) => {
    e.keyCode === 13 && this.btnSearch();
  }

  // 输入框修改data数据源
  inputOnChange = (e) => {
    this.setState({
      keywords: e,
    });
  }

  // 渲染列表页面
  otherlistLi(data) {
    if (!data || data.content.length === 0) return null;
    return data.content.map((item, index) => (
      <li key={index}>
        <SearchItem
          dispatch={dispatch}
          trigger={trigger}
          data={item}
          type={data.type}
          url={data.renderUrl}
          from="full"
        />
      </li>
    ));
  }

  render() {
    const {
      SearchMoreList, dataList, isShownodataClassEach, totalPages,
    } = this.state;
    const Morelist = [];
    const anifalse = false;
    if (SearchMoreList.length === 0) return null;
    const renderItems = this.otherlistLi(dataList);
    SearchMoreList.forEach((item) => {
      Morelist.push(<TabPane
        tab={item.typeName}
        key={item.type}
        className={tabPane1}
      >
        <ul className={recently}>{renderItems}</ul>
        {
          isShownodataClassEach ? null :
            <div className={nodataClass}>
              <img src={nodata} alt="暫無相關內容" />
              <p>暫無相關內容</p>
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
                placeholder="搜索人員資訊、服務及其他內容"
                value={this.state.keywords}
                onKeyDown={this.onKeyup}
                onChange={this.inputOnChange}
              />
              <div className={search_icon_con}>
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
                totalPages > 1 ? <div className="paginationClass">
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