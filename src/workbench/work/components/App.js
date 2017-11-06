import React from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Tabs from './tabs/Tabs';
import PageNode from './page-node/PageNode';


const App = () => (
  <div>
    <Header />
    <div>
      <Sidebar />
      <Tabs />
      <PageNode />
    </div>
  </div>
);

export default App;
