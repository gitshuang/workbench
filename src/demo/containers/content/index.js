import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { content } from './style.css';

class ContentContainer extends Component {
  render() {
    const { data, hasTab, contentSrc } = this.props;
    return (
      <div className={content} >
        { hasTab ? <div className="tab">tab</div> : undefined }
        <iframe className={hasTab ? 'hasTae' : ''} src={contentSrc}></iframe>
      </div>
    );
  }
}

export default connect(
  mapStateToProps(
    'contentSrc',
    {
      namespace: 'work',
    },
  ),
)(ContentContainer);
