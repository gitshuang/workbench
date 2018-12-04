import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import { dispatch, trigger } from 'public/componentTools';
import { openHomePage } from 'public/regMessageTypeHandler';

import Tabs, { TabPane } from 'bee/tabs';
import SearchInput from 'pub-comp/searchInput';
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
      dataNumSelect: [
        { id: 0, name: '5条/页',value:5},
        { id: 1, name: '10条/页', value:10},
        { id: 2, name: '15条/页',value:15 },
        { id: 3, name: '20条/页',value:20 }
      ],
      dataNum:1,
      enhancedPaginationText:{
        jump:'跳至',
        jumpPage:'页'
      }
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
    this.setState({dataNum:1,dataPerPageNum:10,activePage:1},()=>{
      this.props.history.push(`/search/${activetab}/${keywords}`);
    })
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
      dataNum:1,
      dataPerPageNum:10,
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
    // const reg = new RegExp('条\/页', 'g');
    // const dataPerPageNum = dataNum.replace(reg, '');
    const dataPerPageNum = dataNum;
    const { keywords, activePage, activetab } = this.state;
    this.setState({
      dataPerPageNum,
      dataNum:id,
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

  openHomepage = (userId,key) => {
    openHomePage({
      userId,
      key,
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
          handleClick={this.openHomepage}
        />
      </li>
    ));
  }

  render() {
    const {
      SearchMoreList, dataList, isShownodataClassEach, totalPages,
      dataNum, dataNumSelect, enhancedPaginationText,
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
              <img src={nodata} alt="暂无相关内容" />
              <p>暂无相关内容</p>
            </div>
        }

      </TabPane>);
    });

    return (
      <div className={`${bg}  um-vbox`}>
        <div className={`${bg_wrap}  um-vbox`}>
          <div className={`${wrap} ${clearfix}  um-vbox`}>
            <SearchInput
              onKeyDown = {this.onKeyup}
              onChange = {this.inputOnChange}
              keywords = {this.state.keywords}
              onClick = {this.btnSearch}
              placeholder = "搜索人员信息、服务及其他内容"
              btnText = "搜索"
            />
            
            <div className={'' + ` ${tabContent}`}>
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
                    dataNumSelect={dataNumSelect}
                    dataNum={dataNum}
                    enhancedPaginationText={enhancedPaginationText}
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
