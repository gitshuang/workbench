import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import Applications from './applications';

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

  openServiceModal = () => {
    this.setState({
      quickServiceDisplay: true,
    });
  }

  closeServiceModal = () => {
    this.setState({
      quickServiceDisplay: false,
    });
  }

  render() {
    const { quickServiceDisplay } = this.state;
    // const { serviceList, openServiceFn, openAllFn } = this.props;
    const appClass = quickServiceDisplay ? active : "";
    return (
      <div>
        <div className={`${appClass} ${aBtn}`} onClick={this.openServiceModal} >
          <Icon title="快捷应用" type="application" />
        </div>
        {
          quickServiceDisplay
          ? <Applications 
              quickServiceDisplay={quickServiceDisplay} 
              closeServiceModal={this.closeServiceModal}
              {...this.props}
            />
          : null
        }
      </div>
    );
  }
}

export default QuickApplication;
