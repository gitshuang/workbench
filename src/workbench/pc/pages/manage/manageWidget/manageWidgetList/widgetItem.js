import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import Checkbox from 'bee/checkbox';
import PopDialog from 'pub-comp/pop';
import { widgetStyle } from './widgetStyle';
import { hasCardContainInGroups } from '../../utils';
import { findDOMNode } from 'react-dom';


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

		//const dragCard = utilService.getCardByGroupIDAndCardID(props.groups, props.groupID, props.id);
		//dragCard.isShadow = true;
		props.manageList.forEach(item => {
			item.children.forEach((a, b) => {
				// if(a.widgetId == props.id){
				// 	a.drag = 'hide'
				// 	//item.children.splice(b,1);
				// }else{
				// 	a.drag = 'display'
				// }

			})
		})
		// component.setState(function(state){
		//     //debugger
		// 	return {drag:'hide'}
		// });
		//props.updateShadowCard();
		//debugger
		//console.log(props.updateShadowCard,'props') a.isShadow = false;
		return { id: props.id, parentId: props.parentId, type: props.type, props: props,index:props.index };
	},
	endDrag(props, monitor, component) {
		return { offSetItem: monitor.getDifferenceFromInitialOffset() }
	}
};
const itemTarget = {
	hover(props, monitor, component) {
		if (!component) {
			return null
		}
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(
			component,
		).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		// Determine mouse position
		const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;
		const hoverClientX = Math.abs(hoverBoundingRect.left - clientOffset.x)
        
		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
		console.log("dragIndex",dragIndex)
		console.log("hoverIndex=======",hoverIndex)
        console.log("hoverClientX===============",hoverClientX)
		console.log("hoverMiddleX===============================",hoverMiddleX)
	
        console.log("hoverClientY===============",hoverClientY)
        console.log("hoverMiddleY===============================",hoverMiddleY)
		// Dragging downwards
		if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY)&&(dragIndex < hoverIndex && hoverClientX < hoverMiddleX)) {
			return
		}
		
		// Dragging upwards
		if ((dragIndex > hoverIndex && hoverClientY > hoverMiddleY)&&(dragIndex > hoverIndex && hoverClientX > hoverMiddleX)) {
			return
		}
		// Dragging let
		// if () {
		// 	return
		// }

		// Dragging right
		// if () {
		// 	return
		// }

		// Time to actually perform the action
		//props.moveCard(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		let draggedId = monitor.getItem().id;
		const previousParentId = monitor.getItem().parentId;
		const preType = monitor.getItem().type;
		//检查是否有重复
		if (preType == "cardlist") {
			draggedId = draggedId.filter(item => {
				return !hasCardContainInGroups(props.manageList, item.widgetId)
			})
			if (!draggedId.length) return
		}
		props.moveItemDrag(draggedId, previousParentId, preType, props.id, props.data.parentId, props.data.type);
		monitor.getItem().index = hoverIndex;

	},
	//hover 悬浮调用 drop落在目标上时调用


};

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview(),
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

class WidgetItem extends Component {
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
			drag: ''
		}
	}


	componentWillReceiveProps(nextProps) {
		var { canDrop, isDragging, isOver, getItemType } = this.props;

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

			} else {
				this.setState({
					moveLine: 'right',
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
		const { languagesJSON } = this.props;
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
		const { connectDragSource, connectDropTarget, isDragging, selectList,index } = this.props;//connectDropTarget,
		const opacity = isDragging ? 0 : 1;
		const checkType = selectList.indexOf(id) > -1 ? true : false;
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
		return connectDragSource(connectDropTarget(
			<li title={title} className={`${widgetItem} ${widget_node} animated ${isDragging ? 'zoomOut' : 'zoomIn'} `}
				style={{ ...widgetStyle[size - 1], ...opacity, ...styleOverLine, ...styleOver }} >
				<div className={title}>
					<div className={title_right}>{`${widgetName} ${index}`}</div>
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
		));
	}
}
export default DragSource("item", itemSource, collectSource)(DropTarget("item", itemTarget, collectTaget)(WidgetItem));
