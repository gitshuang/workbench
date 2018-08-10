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
            <ButtonBrand onClick={this.click} >創建</ButtonBrand>
          : <ButtonBrand disabled>創建</ButtonBrand>
        }
      </div>
    );
  }
}
export default SubmitBtn;
