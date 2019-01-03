import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import {ButtonDefaultWhite} from 'pub-comp/button';
import { mapStateToProps } from '@u';
import Icon from 'pub-comp/icon';

import WidgetItem from '../manageWidgetItem';
import manageActions from 'store/root/manage/actions';
import * as utilService from '../../utils';
import GroupTitle from './groupTitle.js'

const { addGroup,updateGroupList  } = manageActions;
import {
  addGroupBtn,
  addBtn,
  groupArea,
  selectedBackClass,
} from './style.css';



const itemSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
			type: props.type
		};
	},
	canDrag(props) {
		return props.currEditID === '' ? true : false;
	}
};

const itemTarget = {
  hover(props, monitor, component) {
		const dragItem = monitor.getItem();
         
		if (dragItem.type === 1) { //1是group
			//组hover到组
			const dragIndex = monitor.getItem().index;
			const hoverIndex = props.index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();

			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			props.moveGroupItem(dragIndex, hoverIndex);

			monitor.getItem().index = hoverIndex;
		} else if (dragItem.type === 3) { //3 是widget
      //卡片到组
      const hoverItem = props;
			const { x, y } = monitor.getClientOffset();
			const groupItemBoundingRect = findDOMNode(component).getBoundingClientRect();
			const groupItemX = groupItemBoundingRect.left;
      const groupItemY = groupItemBoundingRect.top;
			props.moveCardInGroupItem(dragItem, hoverItem, x - groupItemX, y - groupItemY);
		}
	},
	drop(props, monitor, component) {
		const dragItem = monitor.getItem();
    const dropItem = props;
		if (dragItem.type === 1) {//释放的分组对象
			props.onDrop(dragItem, dropItem);
    } else if (dragItem.type === 3) {//释放的分组内的卡片
			props.onCardDropInGroupItem(dragItem, dropItem);
		} else if (dragItem.type === 'cardlist') {//释放的Sider区域的卡片
			props.onCardListDropInGroupItem(dragItem, dropItem);
		}
	}
};

@connect(
	mapStateToProps(
    "manageList",
    "layout",
    "selectGroup",
    "currEditonlyId",
    "defaultLayout",
		{
			namespace: 'manage',
		},
	),
	{
		addGroup,
		updateGroupList
	},
)
@DragSource("item", itemSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
@DropTarget("item",itemTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver()
}))
export default class ManageGroup extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      groupName:  "",
      inFoucs: false,
      showModal: false,
      selectGroup: [],
      selectList: [],
    }
  }
  
  componentDidMount() {
		let clientWidth;
		const containerDom = document.querySelector('#widget-container');
		if (containerDom) {
			clientWidth = containerDom.clientWidth;
		}
		if (this.props.layout.containerWidth !== clientWidth) {
			this.props.handleLoad();
			// console.log('handle');
		}
	}
  
  
  // 添加新分组
  addGroupFn(index) {
    const { addGroup } = this.props;
    addGroup({index});
  }
  
  //创建卡片
	createCards(cards, groupID, index) {
		let itemDoms = [];
		_.forEach(cards, (c, i) => {
			itemDoms.push(
				<WidgetItem
					id={c.widgetId}
					groupID={groupID}
					groupIndex={index}
					index={i}
					type={c.type}
					gridx={c.gridx}
					gridy={c.gridy}
					width={c.width}
					height={c.height}
					haspower={c.haspower}
					isShadow={c.isShadow}
					isChecked={c.isChecked}
					key={`${groupID}_${c.widgetId}`}
				/>
			);
		});
		return itemDoms;
	}
  render() {
    const {
      data: {
        children,
        widgetName 
      },
      index,
      connectDragSource,
      connectDropTarget,
      layout,
      defaultLayout,
      id,
    } = this.props;
    const {
      inFoucs,
    } = this.state;
    const containerHeight = utilService.getContainerMaxHeight(children, layout.rowHeight, layout.margin);
    
   
    let _html = ( <div className={`${groupArea} animated zoomIn`} >
      <section className={inFoucs ? selectedBackClass : ""} >
        <GroupTitle groupID={id} index={index} widgetName={widgetName } children={children}/>
        <div id="widget-container"
         style={{
          height:
            containerHeight > defaultLayout.containerHeight
              ? containerHeight
              : defaultLayout.containerHeight
        }}>
          {this.createCards(children, id, index)}
        </div>
      </section>
      {/* 底部添加分组按钮 */}
      <div className={addBtn} >
        <ButtonDefaultWhite className={addGroupBtn} onClick={this.addGroupFn.bind(this, index)}>
          <Icon type="add"></Icon>
          {"添加分组"}
        </ButtonDefaultWhite>
      </div>

    </div>);
    return connectDragSource(connectDropTarget(_html));
  }
}

