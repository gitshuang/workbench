import React from 'react';
import WidgetItemFather from './widgetItemFather';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import Checkbox from 'bee/checkbox';
import { widgetStyle } from './widgetStyle';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const { moveSideCards,dropSideCards } = manageActions;
import { findDOMNode } from 'react-dom'



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

		props.manageList.forEach(item => {
			item.children.forEach((a, b) => {

			})
		})

		return { id: props.id, parentId: props.parentId, type: props.type, props: props, index: props.index };
	},
	isDragging(props, monitor){
		return monitor.getItem().id === props.id;
	}
	
};
const itemTarget = {
	hover(props, monitor,component) {
		let draggedId = monitor.getItem().id;
		
		if (draggedId !== props.id) {  //如果被拖拽元素与被hover元素的id不一致，交换位置

			const previousParentId = monitor.getItem().parentId;
			const preType = monitor.getItem().type;

			const draggedSize = preType == "cardlist"?1:monitor.getItem().props.data.size;
			const hoveredSize = props.data.size;
			const hoverIndex = props.index;
			const dragIndex = preType == "cardlist"?0:monitor.getItem().props.index;
			const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
			const clientOffset = monitor.getClientOffset()
			const hoverClientY = clientOffset.y - hoverBoundingRect.top
			const hoverClientX = clientOffset.x - hoverBoundingRect.left
			

			if(draggedSize<hoveredSize){
				
				if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
					return
				}
				// Dragging upwards
				if (dragIndex > hoverIndex &&  hoverClientX > hoverMiddleX) {
					return
				} 
			
			}
		

			if (preType == "cardlist") {
				
					const cardList = monitor.getItem().cardList;
					const siderCardPops = {
						id:draggedId,
						preParentId:previousParentId,
						afterId:props.id,
						parentId:props.data.parentId,
						afterType:props.data.type,
						monitor,
						cardList
					}
					props.moveSideCards(siderCardPops);
			
				
				//当前拖拽的id   hover的id,hover的parentID,hover的项的type
			}else{
				props.moveItemDrag(draggedId, previousParentId, preType, props.id, props.data.parentId, props.data.type,monitor);
				monitor.getItem().index = props.index
				
			}

		}

	},
	drop(props,monitor){
		const dragSource = monitor.getItem()
		if(dragSource.type=="cardlist"){
		let draggedId = monitor.getItem().id;	
		const previousParentId = monitor.getItem().parentId;
		const preType = monitor.getItem().type;
		const cardList = monitor.getItem().cardList;

			const siderCardPops = {
				id:draggedId,
				preParentId:previousParentId,
				afterId:props.id,
				parentId:props.data.parentId,
				afterType:props.data.type,
				monitor,
				cardList 
			}
			props.dropSideCards(siderCardPops);
		}
	}
}
@connect(
	mapStateToProps(
		'manageList',
		'shadowCard',
		{
			namespace: 'manage',
		},
	),
	{
	  moveSideCards,
	  dropSideCards
	}
)

@DropTarget("item", itemTarget, (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver:monitor.isOver()
	}
})
@DragSource("item", itemSource, (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
})
export default class WidgetItem extends WidgetItemFather {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
	}
	static defaultProps = {
		isDragging: false
	  };
	constructor(props) {
		super(props);
		this.state = {
			title: '',
		}
	}


	render() {
		const { languagesJSON } = this.props;
		const {
			data: {
				widgetId: id,
				size,
				widgetName
			}
		} = this.props;
		const { connectDragSource, connectDropTarget, isDragging, selectList, index,isOver } = this.props;//connectDropTarget,
		const checkType = selectList.indexOf(id) > -1 ? true : false;
		const dragStyle = isDragging?{
			opacity:0.5,
			backgroundColor:'rgba(255,255,255,1)',
			color:"blue"
		}:{}
		const { title } = this.state;
		return connectDragSource(connectDropTarget(
			<li title={title} className={`${widgetItem} ${widget_node}  `}
				style={{ ...widgetStyle[size - 1], ...dragStyle }} >
				<div className={title}>
				{isDragging?null:<div className={title_right}>{`${widgetName} `}</div>}
				</div>
				<div className={widgetItemCont}>
				</div>
				{isDragging?null:<div className={`${clearfix} ${footer}`}>
					{this.props.type == "pop" ? null : <Checkbox className="test" checked={checkType} onChange={this.onHandChange} />}
					<div className={`${editDele} ${clearfix}`}>
						<div onClick={() => { this.popSave(this.props.data) }}><Icon title={languagesJSON.deleteService} type="dustbin" /></div>
					</div>
				</div>}
			</li>
		));
	}
}
