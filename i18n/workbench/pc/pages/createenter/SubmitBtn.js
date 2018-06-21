import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonBrand } from 'pub-comp/button';

class SubmitBtn extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    onClick: () => { },
    disabled: false,
  };
  click = () => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className="u-form-submit">
        {
          this.props.disabled
          ?
            <ButtonBrand onClick={this.click} >$i18n{SubmitBtn.js0}$i18n-end</ButtonBrand>
          : <ButtonBrand disabled>$i18n{SubmitBtn.js1}$i18n-end</ButtonBrand>
        }
      </div>
    );
  }
}
export default SubmitBtn;
