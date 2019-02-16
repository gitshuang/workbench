import React, { Component } from 'react';
import { mapStateToProps, getContext } from '@u';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatch, trigger } from 'public/componentTools';
import { Search } from 'diwork-business-components';
import searchActions from 'store/root/search/actions';
import rootActions from 'store/root/actions';
import { openWin } from 'public/regMessageTypeHandler';

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
      
    };
  }

  goSearchPage = (text) => {
    if (text === "") {
      text = " ";
    }
    // this.props.history.push(`/search/addressbook/${text}`);
    openWin({
      id: 'Search',
      title: '',
      data: {
        type: 'addressbook',
        value: text
      }
    })
  }

  getSearchList = (keyworks) => {
    const { requestError, getSearchSuggest, } = this.props;
    getSearchSuggest(keyworks).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
    });
  }

  render() {
    const { SearchSuggestList } = this.props;
    const { locale } = getContext();
    return (
      <Search
        list={SearchSuggestList}
        onChange={this.getSearchList}
        onEnter={this.goSearchPage}
        onSearch={this.goSearchPage}
        onMoreBtnClick={this.goSearchPage}
        dispatch={dispatch}
        trigger={trigger}
        locale={locale}
      />
    );
  }
}

export default SearchContainer;
