import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import Icon from 'components/icon';
import {
  search,
  searchBtn,
  searchText,
  inputArea,
  inputEnter,
  inputLeave,
  inputEnterActive,
  inputLeaveActive,
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
    const { isShow } = this.state;
    if (isShow) {
      console.log(this.state.text)
    } else {
      this.setState({
        isShow: true,
      })
    }
    // this.props.history.push('/application');;
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
            onChange={this.onChangeHandler}
            placeholder="搜索员工信息，应用、服务及其他内容"/>
        </div>
      )
    }
    return (
      <div className={search}>
        <TransitionGroup>
          <CSSTransitionGroup
            transitionName={ {
              enter: inputEnter,
              enterActive: inputEnterActive,
              leave: inputLeave,
              leaveActive: inputLeaveActive,
            } }
            transitionEnterTimeout={0}
            transitionLeaveTimeout={0} >
            {item}
          </CSSTransitionGroup>
        </TransitionGroup>
        <div className={`tc ${searchBtn}  ${isShow?'btnColor':""}`} onClick={this.search} style={{color:isShow?"red":""}}>
          <Icon title="搜索" type="search" />
        </div>
      </div>
    );
  }
}

export default SearchContainer;
