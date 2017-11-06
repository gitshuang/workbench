import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  HashRouter as Router,
} from 'react-router-dom';
import RootContainer from 'containers/root';
import store from './store';
import 'public/base.css';

const App = () => (
  <Router>
    <Provider store={store}>
      <RootContainer />
    </Provider>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
