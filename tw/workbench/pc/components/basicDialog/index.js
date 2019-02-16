import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapStateToProps} from '@u';
import PopDialog from 'pub-comp/pop';
import rootActions from 'store/root/actions';
import {titleStyle} from './style.css'
import DragM from "dragm";
import ToolTip from 'bee/toolTip';

class BuildTitle extends React.Component {
	updateTransform = transformStr => {
		this.modalDom.style.transform = transformStr;
	};

	componentDidMount() {
		this.modalDom = document.getElementsByClassName(
			"basic_dialog_modal"
		)[0];
	}

	render() {
		const {title} = this.props;
		return (
			<DragM updateTransform={this.updateTransform}>
				<div style={{display: 'inline-block', width: '85%'}}>{title}</div>
			</DragM>
		);
	}
}

const {showDialog, closeDialogNew} = rootActions;

@connect(
	mapStateToProps(
		'showModal',
		'dialogType',
		'dialogTitle',
		'dialogMsg'
	),
	{
		showDialog,
		closeDialogNew
	}
)
class PopDialogComp extends Component {

	showTip = (tip, message) => {
		if (message && message.length > 50) {
			return <ToolTip trigger="click" rootClose inverse overlay={tip}>
				<a style={{color: 'blue'}}>
					
				</a>
			</ToolTip>
		}
	}

	render() {
		const {dialogType, dialogMsg, dialogTitle, showModal, closeDialogNew} = this.props;
		let btnLabel = "";
		let _btn = [
			{
				label: btnLabel,
				fun: () => {
					closeDialogNew();
				},
				type: null,//dialogType === "success" ? null : dialogType,
				className: 'basic_dialog_modal u-button'
			}
		];
		let tip = (
			<div>
				{dialogMsg}
			</div>
		)
		const title = <BuildTitle visible={showModal} title={<span className={titleStyle}>{dialogTitle}</span>}/>
		return (
			<PopDialog
				className="basic_dialog_modal"
				type={dialogType}
				backdrop={"static"}
				show={true}
				title={title}
				backup={false}
				close={closeDialogNew}
				btns={_btn}
			>
				<div className="content_div">
					<p className="content_p">
						{dialogMsg && dialogMsg.length > 50 ? dialogMsg.substring(0, 50) + '......' : dialogMsg}
						{this.showTip(tip, dialogMsg)}
					</p>
				</div>
			</PopDialog>
		)
	}
}

export default PopDialogComp;
