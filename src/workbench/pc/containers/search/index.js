import React, { Component } from 'react';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatch, trigger } from 'public/componentTools';
import { Search } from 'diwork-business-components';
import searchActions from 'store/root/search/actions';
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
class SearchContainer extends Component {
  goSearchPage = (text) => {
    this.props.history.push(`/search/searchvalue/${text}`);
  }
  getSearchList = (keyworks) => {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getSearchSuggest,
    } = this.props;
    getSearchSuggest(keyworks).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
    });
  }
  render() {
    const { SearchSuggestList } = this.props;
    return (<Search
      list={SearchSuggestList}
      onChange={this.getSearchList}
      onEnter={this.goSearchPage}
      onSearch={this.goSearchPage}
      onMoreBtnClick={this.goSearchPage}
      dispatch={dispatch}
      trigger={trigger} />
    );
  }
}

export default SearchContainer;
