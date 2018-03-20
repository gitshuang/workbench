import React, { Component } from 'react';
import PopDialog from 'pub-comp/pop';
import {
  successContent,
} from './style.css';

class ErrorDialog extends Component {
  render() {
    const {
      close,
      show,
    } = this.props;
    return (
      <PopDialog
        className="invitation_pop"
        title={'邀请成员'}
        show={show}
        type="success"
        backup={true}
        close={close}
        btns={[
          {
            label: '好的',
            fun: close,
          }
        ]} >
        <div className={successContent} >
          <p>邀请已发送</p>
          <p>快去通知小伙伴查看邮件吧</p>
        </div>
      </PopDialog>
    );
  }
}

export default ErrorDialog;
