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
        title="$i18n{successDialog.js0}$i18n-end"
        show={show}
        type="success"
        backup
        close={close}
        btns={[
          {
            label: '$i18n{successDialog.js1}$i18n-end',
            fun: close,
          },
        ]}
      >
        <div className={successContent} >
          <p>$i18n{successDialog.js2}$i18n-end</p>
          <p>$i18n{successDialog.js3}$i18n-end</p>
        </div>
      </PopDialog>
    );
  }
}

export default ErrorDialog;
