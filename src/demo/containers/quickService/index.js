import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { service } from './style.css';

class QuickServiceContainer extends Component {
  render() {
    const { quickServiceDisplay, serviceList } = this.props;
    return (
      <div className={service} style={{display: quickServiceDisplay ? 'block' : 'none'}}>
        <ul>
          {
            serviceList.map((service, i) => {
              return <li key={i}>{service.name}</li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps(
    'quickServiceDisplay',
    'serviceList',
  ),
)(QuickServiceContainer);
