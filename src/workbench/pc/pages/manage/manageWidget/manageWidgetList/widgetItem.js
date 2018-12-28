import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import Checkbox from 'bee/checkbox';
import PopDialog from 'pub-comp/pop';
import { widgetStyle } from '../../widgetStyle';
import { getCardByGroupIDAndCardID } from '../../utils'
import manageActions from 'store/root/manage/actions';

const { updateShadowCard } = manageActions;

import {
	widgetItem,
	title_right,
	footer,
	widgetItemCont,
	editDele,
	clearfix,
	widget_node
} from './style.css'

const itemSource = {
	beginDrag(props, monitor, component) {
		// const dragCard = getCardByGroupIDAndCardID(props.manageList, props.parentId, props.id);
		// dragCard.isShadow = true;
		// props.updateShadowCard(dragCard);
		//console.log(props.updateShadowCard,'props') a.isShadow = false;
		
		return { id: props.id, parentId: props.parentId, type: props.preType || props.type, folderType: props.folderType, dragType: props.dragType, props: props };
	},
	endDrag(props, monitor, component) {
		return { offSetItem: monitor.getDifferenceFromInitialOffset() }
	}
};
const itemTarget = {
	//hover 悬浮调用 drop落在目标上时调用
	hover(props, monitor, component) {
		var { size } = props.data;
		var dirDistance = widgetStyle[size - 1].width;
		const draggedId = monitor.getItem().id;

		if (draggedId !== props.id) { //这是什么
			component.setState({
				drag: 'fadeInLeft'
			});
		}

		const clientOffset = monitor.getClientOffset();

		var componentRect = 0;
		if (component) {
			componentRect = findDOMNode(component).getBoundingClientRect();
		}
		var xGap = componentRect.left - clientOffset.x;
		var moveLine = 'none'
		if (Math.abs(xGap) < dirDistance) {
			if (Math.abs(xGap) < (dirDistance / 3)) {
				moveLine = 'left'
			} else if (Math.abs(xGap) < (dirDistance / 3 * 2)) {
				moveLine = 'center'
			} else {
				moveLine = 'right'
			}
		}
		if (new Date().getTime() % 10 == 0) {   //这是什么
			props.savePosition(props.id, moveLine);
		}

	},
	drop(props, monitor) {
		const ifIntoFile = props.moveLine;
		const draggedId = monitor.getItem().id;
		const previousParentId = monitor.getItem().parentId;
		const preType = monitor.getItem().type;
		props.moveItemDrag(draggedId, previousParentId, preType, props.id, props.data.parentId, props.data.type, ifIntoFile);
	}
};

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}

function collectTaget(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
		offSet: monitor.getDifferenceFromInitialOffset(),
		getItemType: monitor.getItem(),
	}
}

@connect(
	mapStateToProps(
		"manageList",
		{
			namespace: 'manage',
		},
	),
	{
		updateShadowCard
	},
)
@DragSource("item", itemSource, collectSource)
@DropTarget("item", itemTarget, collectTaget)
export default class WidgetItem extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
	}
	constructor(props) {
		super(props);
		this.popSave = this.popSave.bind(this);
		this.popClose = this.popClose.bind(this);
		this.state = {
			showModal: false,
			title: '',
			timer: 0,
			timeEnough: false,
			moveLine: 'none',
		}
	}


	componentWillReceiveProps(nextProps) {
		var { canDrop, isDragging, isOver, getItemType, dragType } = this.props;

		if (nextProps.isOver == true && nextProps.moveLine !== 'none') {
			if (nextProps.moveLine == 'left') {
				this.setState({
					moveLine: 'left',
					timeEnough: false
				})
			} else if (nextProps.moveLine == 'center') {
				this.setState({
					timeEnough: true
				})
				if (getItemType.type == 2 || getItemType.dragType == 'dragInFolder') {
					this.setState({
						moveLine: 'none',
						timeEnough: false,
					})
				}
			} else {
				this.setState({
					moveLine: 'right',
					timeEnough: false,
				})
			}
			if (getItemType.dragType == 'dragInFolder' && !dragType) {
				this.setState({
					moveLine: 'none',
					timeEnough: false,
				})
			}
			if (getItemType.type === 1) {
				this.setState({
					moveLine: 'none',
					timeEnough: false,
				})
			}
		} else {
			this.setState({
				moveLine: 'none',
				timeEnough: false,
			})
		}
	}

	popSave = (data) => {
		const { delectService } = this.props;
		delectService(data.widgetId);
		this.setState({
			showModal: false
		})
	}

	popClose = () => {
		this.setState({
			showModal: false
		})
	}

	isContained = (a, b) => {
		if (!(a instanceof Array) || !(b instanceof Array)) return false;
		if (a.length < b.length) return false;
		var aStr = a.toString();
		for (var i = 0, len = b.length; i < len; i++) {
			if (aStr.indexOf(b[i]) == -1) return false;
		}
		return true;
	}
	onHandChange = (flag) => {
		const { selectList, selectGroup, selectListActions, selectGroupActions, propsIndex, manageList } = this.props;
		const {
			data: {
				widgetId
			}
		} = this.props;
		let selectList2;
		if (!flag) {
			selectList2 = selectList.filter((item, i) => {
				return item !== widgetId;
			});
			const selectGroup2 = selectGroup.filter((item, i) => {
				return propsIndex !== item;
			});
			selectGroupActions(selectGroup2);
		} else {
			selectList2 = [widgetId, ...selectList];
			// 判断当前分组下的子节点是否都在selectList中
			let newArr = manageList[propsIndex].children.map((item, index) => {
				return item.widgetId;
			})
			if (this.isContained(selectList2, newArr)) {
				selectGroup.push(propsIndex);
				selectGroupActions(selectGroup);
			}
		}
		selectListActions(selectList2);
	}

	render() {
		const { languagesJSON, isShadow } = this.props;
		const pop_btn = [
			{ label: `${languagesJSON.confirm}`, fun: this.popSave, className: "" },
			{ label: `${languagesJSON.cancel}`, fun: this.popClose, className: "" }
		]   //设置操作按钮

		const {
			data: {
				widgetId: id,
				size,
				widgetName
			}
		} = this.props;
		const { connectDragSource, connectDropTarget, isDragging, selectList, drag } = this.props;//connectDropTarget,
		const opacity = isDragging ? 0 : 1;
		const checkType = selectList.indexOf(id) > -1 ? true : false;
		if (isDragging) {
			// return null
		}
		const { isOver, canDrop, offSet } = this.props;
		var styleOverLine = {}, styleOver = {};

		if (isOver && canDrop) {
			if (this.state.timeEnough) {
				styleOver = {
					'opacity': '0.7',
					'boxShadow': '0 0 0 5px #ddd,0 0 0 8px rgba(0,205,195,1)',
					'transform': 'scale(1.01,1.01)',
					'borderRadius': '0',
				}
			}
			if (this.state.moveLine !== 'none') {
				if (this.state.moveLine == 'left') {
					styleOverLine = {
						'transform': 'scale(1,1)',
						'boxShadow': '-3px 0 0 0 #ddd,-6px 0 0 0 rgba(0,205,195,1)',
						'borderRadius': '0',
					}
				}
				if (this.state.moveLine == 'right') {
					styleOverLine = {
						'transform': 'scale(1,1)',
						'boxShadow': '3px 0 0 0 #ddd,6px 0 0 0 rgba(0,205,195,1)',
						'borderRadius': '0',
					}
				}
			} else {
				styleOverLine = {
					'transform': 'scale(1,1)',
					'boxShadow': '0 0 0 0 #ddd,0 0 0 0 #ddd',
				}
			}
		}
		const { title } = this.state;
		let widgetItemDom;
		console.log(isShadow,'isShadow')

		if (isShadow) {
			widgetItemDom =
				<li className={`${widgetItem} ${widget_node}`} style={{backgroundColor:'#00c4ff'}}>
				"我是阴影"
				</li>
		} else {
			widgetItemDom = <li title={title} className={`${widgetItem} ${widget_node} animated ${isDragging ? 'zoomOut' : 'zoomIn'} ${drag}`} style={{ ...widgetStyle[size - 1], ...opacity, ...styleOverLine, ...styleOver }} >
				<div className={title}>
					<div className={title_right}>{widgetName}</div>
				</div>
				<div className={widgetItemCont}>
				</div>

				<div className={`${clearfix} ${footer}`}>
					{this.props.type == "pop" ? null : <Checkbox className="test" checked={checkType} onChange={this.onHandChange} />}
					<div className={`${editDele} ${clearfix}`}>
						<div onClick={() => { this.popSave(this.props.data) }}><Icon title={languagesJSON.deleteService} type="dustbin" /></div>
					</div>
				</div>

				<PopDialog className="pop_dialog_delete" show={this.state.showModal} type="delete" close={this.popClose} data={this.props.data} btns={pop_btn} >
					<div className="pop_cont">
						<span>{languagesJSON.confirm_delete_this_service}</span>
					</div>
				</PopDialog>

			</li>
		}
		return connectDragSource(connectDropTarget(
			widgetItemDom
		));
	}
}
//export default DragSource("item", itemSource, collectSource)(DropTarget("item", itemTarget, collectTaget)(WidgetItem));
//export default DragSource(type, itemSource, collectSource)(WidgetItem);
