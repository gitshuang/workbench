import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from 'bee/message';
import Icon from 'pub-comp/icon';
import {messageClass} from './style.css';


const propTypes = {
  message: PropTypes.string
};
const defaultProps = {
  message: ''
};

class MessageComp extends Component {

  componentDidMount() {
    //这里暂时通过代码将默认message图片隐藏，未找到其他好办法
    let doms = document.querySelectorAll('.u-message-notice-description-icon');
    if (doms && doms.length > 0) {
      for (let i = 0; i < doms.length; i++) {
        doms[i].setAttribute('style', 'display:none');
      }
    }
  }

  render() {
    const {message} = this.props;
    return <div className={messageClass}>
      <Icon
        type="succeed"
        style={{
          position: 'absolute',
          top: '4px', left: '10px', color: '#00B39E'
        }}
      />
      <p style={{lineHeight: '18px'}}>{message}</p>
    </div>;
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
