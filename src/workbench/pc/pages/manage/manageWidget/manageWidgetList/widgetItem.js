import WidgetItemFather from './widgetItemFather';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import Checkbox from 'bee/checkbox';
import { widgetStyle } from './widgetStyle';
import { hasCardContainInGroups } from '../../utils';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const { moveSideCards,dropSideCards } = manageActions;



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
	endDrag(props, monitor, component) {
		return { offSetItem: monitor.getDifferenceFromInitialOffset() }
	}
};
const itemTarget = {
	hover(props, monitor,component) {
		let draggedId = monitor.getItem().id;	
		if (draggedId !== props.id) {

			const previousParentId = monitor.getItem().parentId;
			const preType = monitor.getItem().type;

			//检查是否有重复
			if (preType == "cardlist") {
				// draggedId = draggedId.filter(item => {
				// 	return !hasCardContainInGroups(props.manageList, item.widgetId)
				// })
				// if (!draggedId.length) return
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
			}

		}

	},
	drop(props,monitor){
		const dragSource = monitor.getItem()
		// const didDrop = monitor.didDrop();
		// const getDropResult = monitor.getDropResult();
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
		{
			namespace: 'manage',
		},
	),
	{
	  moveSideCards,
	  dropSideCards
	}
)
@DragSource("item", itemSource, (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview(),
	};
})
@DropTarget("item", itemTarget, (connect, monitor) => {
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
		const opacity = isDragging ? 0.5 : 1;
		const checkType = selectList.indexOf(id) > -1 ? true : false;
		const dragStyle = isOver?{
			opacity:0.5,
			backgroundColor:'red',
			color:"blue"
		}:{}

		const { title } = this.state;
		return connectDragSource(connectDropTarget(
			<li title={title} className={`${widgetItem} ${widget_node} animated pulse`}
				style={{ ...widgetStyle[size - 1], ...dragStyle }} >
				<div className={title}>
					<div className={title_right}>{`${widgetName} ${index}`}</div>
				</div>
				<div className={widgetItemCont}>
				</div>
				{isOver?null:<div className={`${clearfix} ${footer}`}>
					{this.props.type == "pop" ? null : <Checkbox className="test" checked={checkType} onChange={this.onHandChange} />}
					<div className={`${editDele} ${clearfix}`}>
						<div onClick={() => { this.popSave(this.props.data) }}><Icon title={languagesJSON.deleteService} type="dustbin" /></div>
					</div>
				</div>}
				

			</li>
		));
	}
}
