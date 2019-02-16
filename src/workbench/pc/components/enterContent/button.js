import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonBrand } from 'pub-comp/button';

class SubmitBtn extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    buttonText: PropTypes.string,
  };
  static defaultProps = {
    onClick: () => { },
    disabled: false,
    buttonText: '',
  };
  click = (e) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
  }
  render() {
    const { buttonText } = this.props;
    return (
      <div className="u-form-submit">
        {
          this.props.disabled
            ?
            <ButtonBrand disabled>{buttonText || '保存'}</ButtonBrand>
            :
            <ButtonBrand onClick={this.click} >{buttonText || '保存'}</ButtonBrand>
        }
      </div>
    );
  }
}
export default SubmitBtn;
