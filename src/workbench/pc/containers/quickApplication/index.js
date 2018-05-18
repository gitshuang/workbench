import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import searchActions from 'store/root/search/actions';

import {
  aBtn,
  active
} from './style.css';

class QuickApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quickServiceDisplay: false
    };
  }

  openService = () => {
    this.setState({
      quickServiceDisplay: true,
    });
  }

  closeService = () => {
    this.setState({
      quickServiceDisplay: false,
    });
  }

  render() {
    const { quickServiceDisplay } = this.state;
    const appClass = quickServiceDisplay ? active : "";
    return (
      <div>
        <div className={`${appClass} ${aBtn}`} onClick={this.openService} >
          <Icon title="快捷应用" type="application" />
        </div>
        {
          quickServiceDisplay
          ? (
            <div>1</div>
          )
          : null
        }
      </div>
    );
  }
}

export default QuickApplication;
