import React, { Component } from 'react';
import Header from './header/Header';
import Tab from './tabs/Tabs';
import PageNode from './page-node/PageNode';

class App extends Component {
  render() {
    return (
      <div className="um-win">
        <div className="um-header">
          <Header />
          <Tab />
        </div>
        <div className="um-content">
          <PageNode />
        </div>
      </div>
    );
  }
}

export default App;
