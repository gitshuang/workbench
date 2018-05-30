import React, { Component } from 'react';
import Button from 'bee/button';
import {
  btn,
  brand_btn,
  default_btn,
  default_line_btn,
  default_alpha_btn,
  check_selected_btn,
  check_close_btn,
  danger_btn,
  warning_btn,
  default_white_btn,
  search_icon_btn
} from './style.css';

const noop = () => {};
const buttonMaker = (btnType) => {
  return class extends Component {
    static defaultProps = {
      className: '',
      onClick: noop,
    }
    render() {
      const { className, onClick } = this.props;
      return (
        <Button
          {...this.props}
          className={`${btn} ${btnType} ${className}`}
          onClick={(e) => { onClick(e, this) }}
        />
      );
    }
  }
}

//品牌色
const ButtonBrand = buttonMaker(brand_btn)
//通用按钮
const ButtonDefault = buttonMaker(default_btn);
//带边框
const ButtonDefaultLine = buttonMaker(default_line_btn);
//默认背景透明
const ButtonDefaultAlpha = buttonMaker(default_alpha_btn);
//默认背景透明
const ButtonCheckSelected = buttonMaker(check_selected_btn);
//默认背景透明
const ButtonCheckClose = buttonMaker(check_close_btn);
//默认白色背景带边框
const ButtonDefaultWhite = buttonMaker(default_white_btn);
//危险
const ButtonDanger = buttonMaker(danger_btn);
//警告
const ButtonWarning = buttonMaker(warning_btn);
//搜索的button
const ButtonSearchIcon = buttonMaker(search_icon_btn);
export default ButtonDefault;
export {
  ButtonDanger,
  ButtonBrand,
  ButtonDefault,
  ButtonDefaultAlpha,
  ButtonDefaultLine,
  ButtonWarning,
  ButtonCheckClose,
  ButtonCheckSelected,
  ButtonDefaultWhite,
  //搜素的按钮
  ButtonSearchIcon,
};

/**
$i18n{index.js0}$i18n-end

type: PropTypes.string, $i18n{index.js1}$i18n-end
label: PropTypes.string, $i18n{index.js2}$i18n-end
onClick:PropTypes.fun,   $i18n{index.js3}$i18n-end
data:PropTypes.object   $i18n{index.js4}$i18n-endObject$i18n{index.js5}$i18n-end

<div style={{width:"500px",height:"600px",padding:"10px"}}>
<ButtonBrand />  $i18n{index.js6}$i18n-end
<ButtonDefault />  $i18n{index.js7}$i18n-end
<ButtonDefaultLine /> $i18n{index.js8}$i18n-end
<ButtonDefaultAlpha /> $i18n{index.js9}$i18n-end
<ButtonWarning />   $i18n{index.js10}$i18n-end
<ButtonDanger />  $i18n{index.js11}$i18n-end

</div>
**/
