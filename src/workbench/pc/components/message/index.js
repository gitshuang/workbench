import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from 'bee/message';
import {messageClass} from './style.css';


const propTypes = {
  message: PropTypes.string
};
const defaultProps = {
  message: ''
};

class MessageComp extends Component {

  render() {
    const {message} = this.props;
    return <div className={messageClass}>{message}</div>;
  }
}

MessageComp.propTypes = propTypes;
MessageComp.defaultProps = defaultProps;

const openMessage = function ({msg}) {
  Message.create({
    content: <MessageComp message={msg}/>, color: 'success',
    style: {
      width: '236', position: 'fixed', left: '50%', marginLeft: '-118'
    },
    position: 'top'
  });
}

export {openMessage};
