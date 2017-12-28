import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';

import Header from 'containers/header';
import BreadcrumbContainer from 'components/breadcrumb';
import SearchResult from 'containers/searchResult';

import {header,um_content,appBreadcrumb} from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;
// const {changeUserInfoDisplay, getWorkList} = homeActions;

@withRouter


class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brm: [{name:"搜索结果页"}]
    }
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.replace('');
  }

  render() {
    return (
      <div className="um-win">
        <div className={header}>
          <div className="um-header">
            <Header onLeftClick={ this.goBack.bind(this) } iconName={"home"} >
              <div>
                <span>搜索结果页</span>
              </div>
            </Header>
            <div className={appBreadcrumb}>
              <BreadcrumbContainer data={this.state.brm} goback={this.goBack}/>
            </div>
          </div>
        </div>
        <div className={um_content + " um-box um-content"}>
          <SearchResult />
        </div>
      </div>
    );
  }
}

export default Application;
