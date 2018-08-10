import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PopDialog from 'pub-comp/pop';
import {
  successContent,
} from './style.css';

class ErrorDialog extends Component {
  static propTypes = {
    close: PropTypes.bool,
    show: PropTypes.bool,
  };
  static defaultProps = {
    close: false,
    show: false,
  };
  render() {
    const {
      close,
      show,
    } = this.props;
    return (
      <PopDialog
        className="invitation_pop"
        title="邀請成員"
        show={show}
        type="success"
        backup
        close={close}
        btns={[
          {
            label: '好的',
            fun: close,
          },
        ]}
      >
        <div className={successContent} >
          <p>邀請已發送</p>
          <p>快去通知小夥伴查看郵件吧</p>
        </div>
      </PopDialog>
    );
  }
}

export default ErrorDialog;
