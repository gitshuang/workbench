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
} from './style.css';

@withRouter
@onClickOutside
class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isShow: false
    };
    this.search = this.search.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(e) {
    this.setState({
      text: e.target.value
    })
  }
  handleClickOutside(evt) {
    const { isShow } = this.state;
    if(isShow){
      this.setState({
        isShow: false,
      })
    }
  }
  search() {
    const { isShow, text } = this.state;
    if (isShow && text) {
      console.log(this.state.text)
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
    const { isShow, text } = this.state;
    let item;
    if (isShow) {
      item = (
        <div className={inputArea} >
          <input
            className={searchText}
            type="text"
            value={text}
            onChange={this.onChangeHandler} />
        </div>
      )
    }
    return (
      <div className={`${search} ${isShow? searchExtend : ''}`}>
        {item}
        {
          isShow && text ? (
            <div className={clearSearch} onClick={this.clearInput}>
              <Icon title="清空" type="error3"/>
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

export default SearchContainer;
