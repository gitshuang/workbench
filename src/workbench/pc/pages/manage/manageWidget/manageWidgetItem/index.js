import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import { compactLayoutHorizontal } from '../../compact';
import * as utilService from '../../utils';
import _ from 'lodash';
import background_card from 'assets/image/default.png';
import {card_shadow,card,card_mid,card_footer} from "./style.css"
import manageActions from 'store/root/manage/actions';
import Icon from 'pub-comp/icon';
import Checkbox from 'bee/checkbox';


const { updateShadowCard,updateGroupList} = manageActions;
const noteSource = {
	//开始拖拽，设置isShadow属性，shadowCard对象，更新groups
	beginDrag(props, monitor, component) {
		const dragCard = utilService.getCardByGroupIDAndCardID(props.manageList, props.groupID, props.id);
		dragCard.isShadow = true;
		props.updateShadowCard(dragCard);
		return { id: props.id, type: props.type };
	},
	//结束拖拽，设置isShadow属性，shadowCard对象，更新groups
	endDrag(props, monitor, component) {
		//判断是否正常走了drop事件
		if (!monitor.didDrop()) {
			let { manageList } = props;
			manageList = _.cloneDeep(manageList);
			utilService.setPropertyValueForCards(manageList, 'isShadow', false);
			props.updateShadowCard({});
			props.updateGroupList(manageList);
		}
	}
};

@connect(
	mapStateToProps(
    "manageList",
    "shadowCard",
    "layout",
		{
			namespace: 'manage',
    },
	),{
    updateShadowCard,
    updateGroupList,
  }
)
@DragSource('item', noteSource, (connect) => ({
	connectDragSource: connect.dragSource()
}))
//卡片组件类
export default class Item extends Component {
	constructor(props) {
		super(props);
	}
	//依靠前后props中shadowCard状态（前为空对象，后为有对象）来判断是否为beginDrag状态，来阻止dom刷新
	shouldComponentUpdate(nextProps, nextState) {
		const thisProps = this.props || {},
			thisState = this.state || {};
		if (this.props.isChecked !== nextProps.isChecked) {
			return true;
		}
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
	//删除卡片
	deleteCard = () => {
		let { manageList, groupIndex } = this.props;
		manageList = _.cloneDeep(manageList);
		utilService.removeCardByGroupIndexAndCardID(manageList, groupIndex, this.props.id);

		let compactedLayout = compactLayoutHorizontal(manageList[groupIndex].children, this.props.layout.col);
		manageList[groupIndex].children = compactedLayout;
		this.props.updateGroupList(manageList);
	};
	//选中卡片
	onCheckboxChange = (flag) => {
		let { manageList, groupIndex, index } = this.props;
		manageList = _.cloneDeep(manageList);
		manageList[groupIndex].children[index].isChecked = flag;
		this.props.updateGroupList(manageList);
	};
	render() {
		const {
			connectDragSource,
			name,
			gridx,
			gridy,
			width,
			height,
			isShadow,
			isChecked,
			haspower
		} = this.props;
        
		const { margin, rowHeight, calWidth } = this.props.layout;
		
		const { x, y } = utilService.calGridItemPosition(gridx, gridy, margin, rowHeight, calWidth);
		

		const { wPx, hPx } = utilService.calWHtoPx(width, height, margin, rowHeight, calWidth);
		let cardDom;
		//是否为拖拽中的阴影卡片
		if (isShadow) {
			cardDom = (
				<div
					className={card_shadow}
					style={{
						width: wPx,
						height: hPx,
						transform: `translate(${x}px, ${y}px)`
					}}
				/>
			);
		} else {
			const opacity = haspower === false ? 0.6 : 1;
			cardDom = (
				<div
					className={card}
					style={{
						width: wPx,
						height: hPx,
						opacity: opacity,
						transform: `translate(${x}px, ${y}px)`
					}}
				>
					<div style={{ paddingLeft: '10px' }}>{name}</div>
					<div className={card_mid}>
						<img 
							src={background_card}
							alt='logo'
							width='107'
							height='113'
						/>
					</div>
					<div className={card_footer}>
						<Checkbox checked={isChecked} onChange={this.onCheckboxChange} />
						<Icon type='dustbin' className='card-delete' onClick={this.deleteCard} />
						<i
							className='iconfont icon-shanchu card_delete'
							onClick={this.deleteCard}
						/>
					</div>
				</div>
			);
		}
		return connectDragSource(cardDom);
	}
}


