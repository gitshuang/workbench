import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { DragSource } from 'react-dnd';
import Icon from 'pub-comp/icon';
import { getCardByGroupIDAndCardID,calGridItemPosition,calWHtoPx,setPropertyValueForCards } from '../../utils'
import manageActions from 'store/root/manage/actions';
import _ from 'lodash';
const { updateShadowCard,updateGroupList } = manageActions;
import {
	widgetItem,
	title_right,
	footer,
	widgetItemCont,
	editDele,
	clearfix,
	widget_node,
	widgetItemShadow
} from './style.css'

const itemSource = {
	beginDrag(props, monitor, component) {
		const dragCard = getCardByGroupIDAndCardID(props.manageList, props.parentId, props.id);
		dragCard.isShadow = true;
		 props.updateShadowCard(dragCard);
		 return { id: props.id, type: props.type };
	},
	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			let { manageList } = props;
			manageList = _.cloneDeep(manageList);
			setPropertyValueForCards(manageList, 'isShadow', false);
			props.updateShadowCard({});
			props.updateGroupList(manageList);
		}
	}
};

@connect(
	mapStateToProps(
		"manageList",
		"currentHoveredTargetId",
		"layout",
		{
			namespace: 'manage',
		},
	),
	{
		updateShadowCard,
		updateGroupList
	},
)
@DragSource("item", itemSource,  (connect) => ({
	connectDragSource: connect.dragSource()
}))
export default class WidgetItem extends Component {
	
	constructor(props) {
		super(props);
		this.popSave = this.popSave.bind(this);
	}

	
	popSave = (data) => {
		const { delectService } = this.props;
		delectService(data.widgetId);
	}
	shouldComponentUpdate(nextProps, nextState) {
	
		
		//全等判断值为false，使用isEqual判断
		if (!_.isEqual(this.props.layout, nextProps.layout)) {
			return true;
		}
		if (this.props.gridx !== nextProps.gridx || this.props.gridy !== nextProps.gridy) {
			return true;
		}
		if (this.props.isShadow !== nextProps.isShadow) {
			return true;
		}
		return false;
	}

	render() {
		const {
			connectDragSource,
			widgetName,
			gridx,
			gridy,
			width,
			height,
			isShadow,
			haspower,
			id
		} = this.props;
		const { margin, rowHeight, calWidth } = this.props.layout;
		const { x, y } = calGridItemPosition(gridx, gridy, margin, rowHeight, calWidth);
		const { wPx, hPx } = calWHtoPx(width, height, margin, rowHeight, calWidth);
		let widgetItemDom;

		if (isShadow) {
			widgetItemDom =
				<li className={`${widgetItem} ${widgetItemShadow} ${widget_node}`} 
				style={{
					width: wPx,
					height: hPx,
					transform: `translate(${x}px, ${y}px)`
				}}>
				"我是阴影"
				{id}
				</li>
		} else{
			const opacity = haspower === false ? 0.6 : 1;
			widgetItemDom = <li 
			className={`${widgetItem} ${widget_node}`}
			style={{
				width: wPx,
				height: hPx,
				opacity: opacity,
				transform: `translate(${x}px, ${y}px)`
			}}>
				<div className={title_right}>{widgetName}</div>
				<div className={widgetItemCont}>
				{id}
				</div>

				<div className={`${clearfix} ${footer}`}>
					<div className={`${editDele} ${clearfix}`}>
						<div onClick={() => { this.popSave(this.props.data) }}><Icon title={111} type="dustbin" /></div>
					</div>
				</div>

			</li>
		}
		return connectDragSource(widgetItemDom);
	}
}

