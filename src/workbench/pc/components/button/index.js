import ButtonBrand from './ButtonBrand';
import ButtonDanger from './ButtonDanger';
import ButtonDefault from './ButtonDefault';
import ButtonDefaultAlpha from './ButtonDefaultAlpha';
import ButtonDefaultLine from './ButtonDefaultLine';
import ButtonWarning from './ButtonWarning';

export default ButtonDefault;
export { ButtonDanger,ButtonBrand,ButtonDefaultAlpha, ButtonDefaultLine,ButtonWarning};


/**

参数

type: PropTypes.string, 后续拓展，暂无
label: PropTypes.string, 显示文字
onClick:PropTypes.fun,   按钮回调事件
data:PropTypes.object   回调事件回带数据Object格式

<div style={{width:"500px",height:"600px",padding:"10px"}}> 
<ButtonBrand />  品牌色
<ButtonDefault />  通用按钮
<ButtonDefaultLine /> 通用按钮带边框
<ButtonDefaultAlpha /> 通用按钮无背景
<ButtonWarning />   告警
<ButtonDanger />  危险

</div>
**/