import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { content } from './style.css';

class ContentContainer extends Component {
  static propTypes = {
    hasTab: PropTypes.bool,
    contentSrc: PropTypes.string,
  }
  render() {
    const { hasTab, contentSrc } = this.props;
    return (
      <div className={content} >
        { hasTab ? <div className="tab">tab</div> : undefined }
        <iframe title="content" className={hasTab ? 'hasTae' : ''} src={contentSrc} />
      </div>
    );
  }
}

export default connect(mapStateToProps(
  'contentSrc',
  {
    namespace: 'work',
  },
))(ContentContainer);
