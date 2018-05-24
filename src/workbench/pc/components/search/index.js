import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import SearchItem from './searchItem';
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

class Search extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      typeName: PropTypes.string,
      renderUrl: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    onEnter: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    trigger: PropTypes.func.isRequired,
    onMoreBtnClick: PropTypes.func.isRequired,
  }
  static defaultProps = {
    list: [],
    onChange: () => {},
    onEnter: () => {},
    onSearch: () => {},
    dispatch: () => {},
    trigger: () => {},
    onMoreBtnClick: () => {},
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isShow: false,
      isSearchWinShow: false,
      inWrap: false,
    };
  }
  componentDidMount() {
    document.body.addEventListener('click', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  }
  search = () => {
    const { isShow, text, isSearchWinShow } = this.state;
    if (isShow && text) {
      this.props.onSearch(text);
    } else if (isShow) {
      this.setState({
        isShow: false,
      })
    } else {
      this.setState({
        isShow: true,
      })
    }
  }
  handleClickOutside = (e) => {
    setTimeout(() => {
      if (!this.state.inWrap) {
        const { isShow, isSearchWinShow } = this.state;
        if (isShow) {
          setTimeout(() => {
            this.setState({
              isShow: false,
              text: '',
            });
          }, 500);
        }
        if (isSearchWinShow) {
          this.setState({
            isSearchWinShow: false,
          });
        }
      }
      this.setState({
        inWrap: false,
      });
    }, 10);
  }
  stopPropagation = () => {
    this.setState({
      inWrap: true,
    });
  }
  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.onEnter(e.target.value);
    }
  }
  clearInput = () => {
    this.setState({
      text: '',
      isSearchWinShow: false
    })
  }
  onChangeHandler = (e) => {
    const { value } = e.target;
    if (value === '') {
      this.setState({
        isSearchWinShow: false,
      });
    } else {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.onChange(value);
        if (!this.state.isSearchWinShow) {
          this.setState({
            isSearchWinShow: true,
          });
        }
      }, 300);
    }
    this.setState({
      text: value,
    });
  }
  onMoreBtnClick = () => {
    this.props.onMoreBtnClick(this.stats.text);
  }
  render() {
    const { isShow, text, isSearchWinShow } = this.state;
    const { list, dispatch, trigger } = this.props;
    let inputWrap, searchWin;
    const dataList = list
      .filter(({ content }) => content.length)
      .map(({ typeName, content, type, renderUrl }, i) => {
        return (
          <div className={searchWindom} key={`type${i}`}>
            <h3>{typeName}</h3>
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
        <div className={inputArea} >
          <input
            className={searchText}
            type="text"
            value={text}
            onChange={this.onChangeHandler}
            placeholder="搜索人员信息、应用、服务及其他内容"
            autoFocus={true}
            onKeyDown={this.onKeyDown}
          />
        </div>
      );

      searchWin = (
        <div className={`${SearchWin} ${isSearchWinShow ? showheight : ''}`} >
          <div className={`${searchContent}`}>
            {dataList}
          </div>
          {
            list.length ? (
              <div className={searchBtnAll} onClick={this.onMoreBtnClick}>更多结果</div>
            ) : (
              <em>没有搜索结果</em>
            )
          }
        </div>
      );
    }

    return (
      <div onClick={this.stopPropagation} className={`${search} ${isShow ? searchExtend : ''}`} >
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
          <Icon title="搜索" type="search" />
        </div>
      </div>
    );
  }
}

export default Search;
export { SearchItem };
