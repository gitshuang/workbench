import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import Modal from 'bee/modal';
import { frame } from './index.css';

@connect(
  mapStateToProps(
    'frameParam',
  ),
  {}
)
class Frame extends Component {
  static propTypes = {
    frameParam: PropTypes.shape({

    }),
  };
  static defaultProps = {
    frameParam: {
      id: 'honor',
      url: 'http://www.baidu.com',
      rect: {
        width: '100%',
        height: '100%',
      }
    },
  };


  render() {
    const { id, url, rect, } = this.props.frameParam;
    const Style = {
      // width: rect.width,
      // height: rect.height
    }
    return (
      <div style={Style}>
        <Modal
          className={frame}
          show
          backdrop={false}
        >
          <iframe id={id} title={id} src={url} />
        </Modal>
      </div>
    )
  }
}

export default Frame;
