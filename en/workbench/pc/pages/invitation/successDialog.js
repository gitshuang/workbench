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
        title="Invite Member"
        show={show}
        type="success"
        backup
        close={close}
        btns={[
          {
            label: 'OK',
            fun: close,
          },
        ]}
      >
        <div className={successContent} >
          <p>Invitation sent</p>
          <p>Notify your friends to check their mailboxes</p>
        </div>
      </PopDialog>
    );
  }
}

export default ErrorDialog;
