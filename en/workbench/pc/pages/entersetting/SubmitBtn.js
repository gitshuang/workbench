import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonBrand } from 'pub-comp/button';

class SubmitBtn extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    btlLabel: PropTypes.string,
  };
  static defaultProps = {
    onClick: () => { },
    disabled: false,
    btlLabel: '',
  };
  click = () => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }
  render() {
    const { btlLabel } = this.props;
    return (
      <div className="u-form-submit">
        {
          this.props.disabled ?
            <ButtonBrand onClick={this.click} >{btlLabel || 'Save'}</ButtonBrand>
            : <ButtonBrand disabled>{btlLabel || 'Save'}</ButtonBrand>
        }
      </div>
    );
  }
}
export default SubmitBtn;
