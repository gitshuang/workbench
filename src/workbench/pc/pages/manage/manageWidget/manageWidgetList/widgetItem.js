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
import {isContained} from '../../utils'

const { updateShadowCard } = manageActions;
const storage = window.localStorage;
import {
	widgetItem,
	title_right,
	footer,
	widgetItemCont,
	editDele,
	clearfix,
	widget_node,
	widgetItemCanDrop
} from './style.css'

const itemSource = {
	beginDrag(props, monitor, component) {
		// const dragCard = getCardByGroupIDAndCardID(props.manageList, props.parentId, props.id);
		// dragCard.isShadow = true;
		 // props.updateShadowCard(dragCard);
		//console.log(props,'props')// a.isShadow = false;
		//在managelist里面删除当前被拖拽的元素；
		//props.manageList[props.propsIndex].children.
		// props.manageList.forEach((g, index) => {   //优化
		// 	g.children = g.children.filter((a) => {
		// 		return a.widgetId !== props.id;
		// 	});
		// });
		return { id: props.id, parentId: props.parentId, type: props.type,size:props.data.size };
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
		const currentDraggedItem = monitor.getItem();  //当前被drag的元素    props.id：当前被hover的元素
		if(storage.getItem("currentHoveredTargetId")==props.id){//如果还在当前元素上hover，那么就不做操作
			return;
		}
		storage.setItem("currentHoveredTargetId",props.id);
		console.log(findDOMNode(component))
		//在props.id后面补充当前shadowCard
		// props.manageList.forEach((g, index) => {   //优化
		// 	g.children.forEach((a,index)=>{
		// 		if(a.widgetId==props.id){
		// 			g.children.splice(index,0,currentDraggedItem)
		// 		}
		// 	})
		// });

	},
	drop(props, monitor) {
		const draggedId = monitor.getItem().id;
		const previousParentId = monitor.getItem().parentId;
		const preType = monitor.getItem().type;
		props.moveItemDrag(draggedId, previousParentId, preType, props.id, props.data.parentId, props.data.type);
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
		offSet: monitor.getDifferenceFromInitialOffset(),
		canDrop:monitor.canDrop(),
	}
}

@connect(
	mapStateToProps(
		"manageList",
		"currentHoveredTargetId",
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
	}

	componentWillUnmount(){
		localStorage.removeItem('currentHoveredTargetId');
	}
	popSave = (data) => {
		const { delectService } = this.props;
		delectService(data.widgetId);
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
			if (isContained(selectList2, newArr)) {
				selectGroup.push(propsIndex);
				selectGroupActions(selectGroup);
			}
		}
		selectListActions(selectList2);
	}

	render() {
		const { languagesJSON, isShadow  } = this.props;
		const {
			data: {
				widgetId: id,
				size,
				widgetName
			}
		} = this.props;
		const { connectDragSource, connectDropTarget, isDragging, selectList,canDrop,isOver } = this.props;//connectDropTarget,
		const checkType = selectList.indexOf(id) > -1 ? true : false;
		let display;
		if (isDragging) {
			display={display:"none"}
		}
	
		let widgetItemDom;

		if (isDragging) {
			widgetItemDom =
				<li className={`${widgetItem} ${widget_node}`} style={{backgroundColor:'#00c4ff'}}>
				"我是阴影"
				{id}
				</li>
		} else if(isOver){
			widgetItemDom = <li title={id} 
			className={`${widgetItem} ${widgetItemCanDrop} ${widget_node} animated ${isDragging ? 'zoomOut' : 'zoomIn'}`}
			 style={{ ...widgetStyle[size - 1],...display}} >
				<div >
					<div className={title_right}>{widgetName}</div>
				</div>
				<div className={widgetItemCont}>
				{id}
				</div>

				<div className={`${clearfix} ${footer}`}>
					<Checkbox className="test" checked={checkType} onChange={this.onHandChange} />
					<div className={`${editDele} ${clearfix}`}>
						<div onClick={() => { this.popSave(this.props.data) }}><Icon title={languagesJSON.deleteService} type="dustbin" /></div>
					</div>
				</div>

			</li>
		}else{
			widgetItemDom = <li title={id} 
			className={`${widgetItem} ${widget_node} animated ${isDragging ? 'zoomOut' : 'zoomIn'} `}
			 style={{ ...widgetStyle[size - 1],...display}} >
				<div >
					<div className={title_right}>{widgetName}</div>
				</div>
				<div className={widgetItemCont}>
				{id}
				</div>

				<div className={`${clearfix} ${footer}`}>
					<Checkbox className="test" checked={checkType} onChange={this.onHandChange} />
					<div className={`${editDele} ${clearfix}`}>
						<div onClick={() => { this.popSave(this.props.data) }}><Icon title={languagesJSON.deleteService} type="dustbin" /></div>
					</div>
				</div>

			</li>
		}
		return connectDragSource(connectDropTarget(
			widgetItemDom
		));
	}
}
//export default DragSource("item", itemSource, collectSource)(DropTarget("item", itemTarget, collectTaget)(WidgetItem));
//export default DragSource(type, itemSource, collectSource)(WidgetItem);
