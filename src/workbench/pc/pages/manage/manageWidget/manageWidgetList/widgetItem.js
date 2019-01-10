import React, { Component } from 'react';
import WidgetItemFather from './widgetItemFather';
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
	
	hover(props, monitor,component){
		var { size } = props.data;
		var dirDistance = widgetStyle[size-1].width;
		  const draggedId = monitor.getItem().id;
		if (draggedId !== props.id){ //这是什么
		  component.setState({
			drag:'fadeInLeft'
		  });
		}
		const clientOffset = monitor.getClientOffset();
	
		var componentRect = 0;
		if(component){
		  componentRect = findDOMNode(component).getBoundingClientRect();
		}
		var xGap = componentRect.left-clientOffset.x;
		var moveLine = 'none'
		if(Math.abs(xGap)<dirDistance){
		  if(Math.abs(xGap)<(dirDistance/3)){
			moveLine = 'left'
		  }else if(Math.abs(xGap)<(dirDistance/3*2)){
			moveLine = 'center'
		  }else{
			moveLine = 'right'
		  }
		}
		if(new Date().getTime() % 10 == 0){   //这是什么
		  props.savePosition(props.id,moveLine);
		}
	  },
	
	drop(props, monitor, component) {
			const ifIntoFile = props.moveLine;
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
	
			props.moveItemDrag(draggedId, previousParentId, preType, props.id, props.data.parentId, props.data.type, ifIntoFile);
		}
}

@DragSource("item", itemSource, (connect, monitor) =>{
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview(),
	};
})
@DropTarget("item", itemTarget, (connect, monitor)=> {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
		offSet: monitor.getDifferenceFromInitialOffset(),
		getItemType: monitor.getItem(),
	}
})

export default class WidgetItem extends WidgetItemFather {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
	}
	constructor(props) {
		super(props);
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
