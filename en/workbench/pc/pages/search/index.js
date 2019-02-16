import React, { Component } from 'react';
import SearchResult from './searchResult';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="diworkcontent">
        <SearchResult />
      </div>
    );
  }
}

export default Search;
