import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { title } from './style.css';

class QuickServiceContainer extends Component {
  render() {
    const { titleServiceDisplay } = this.props;
    return (
      <div className={title + ' um-css3-hc'} style={{ display: titleServiceDisplay ? 'block' : 'none' }} >
        123
      </div>
    );
  }
}

export default connect(mapStateToProps(
  'titleServiceDisplay',
))(QuickServiceContainer);
