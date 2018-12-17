import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import searchActions from 'store/root/search/actions';

import SearchResult from './searchResult';
const { requestStart, requestSuccess, requestError } = rootActions;
const { setSearchHeadData } = searchActions;

@withRouter
@connect(
  mapStateToProps(
    'searchHeadData',
    {
      namespace: 'search',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    setSearchHeadData,
  },
)
class Search extends Component {
  static propTypes = {
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    setSearchHeadData: PropTypes.func,
    searchHeadData: PropTypes.shape({
      brm: PropTypes.array,
      appName: PropTypes.string,
    }),
  };
  static defaultProps = {
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    setSearchHeadData: () => { },
    searchHeadData: {},
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="">
        <SearchResult />
      </div>
    );
  }
}

export default Search;
