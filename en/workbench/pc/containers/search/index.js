import React, { Component } from 'react';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatch, trigger } from 'public/componentTools';
import { openHomePage } from 'public/regMessageTypeHandler';
import { Search } from 'diwork-business-components';
import searchActions from 'store/root/search/actions';
import rootActions from 'store/root/actions';

const { getSearchSuggest } = searchActions;
const { requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'SearchSuggestList',
    {
      namespace: 'search',
    },
  ),
  {
    requestError,
    getSearchSuggest,
  }
)
class SearchContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: {
        placeholder: 'Personnel Info, service, and others',
        more: 'More Results',
        none: 'No result found',
        clear: 'Clear',
        search: 'Search',
      },
    };
  }

  goSearchPage = (text) => {
    if(text === ""){
      text = " ";
    }
    this.props.history.push(`/search/addressbook/${text}`);
  }

  getSearchList = (keyworks) => {
    const { requestError, getSearchSuggest, } = this.props;
    getSearchSuggest(keyworks).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
    });
  }

  openHomepage = (userId) => {
    openHomePage({userId});
  }

  render() {
    const { SearchSuggestList } = this.props;
    const { searchText } = this.state;
    return (
      <Search
        list={SearchSuggestList}
        onChange={this.getSearchList}
        onEnter={this.goSearchPage}
        onSearch={this.goSearchPage}
        onMoreBtnClick={this.goSearchPage}
        dispatch={dispatch}
        trigger={trigger} 
        searchText={searchText}
        handleClick={this.openHomepage}
      />
    );
  }
}

export default SearchContainer;
