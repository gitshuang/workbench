import React, { Component } from 'react';
import {ButtonDefaultAlpha} from 'pub-comp/button';
import Icon from 'pub-comp/icon';
import ManageGroup from './manageGroup';
import _ from 'lodash';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { calGridXY,checkCardContainInGroup } from '../utils'
import manageActions from 'store/root/manage/actions';
const { updateShadowCard, addGroup,updateGroupList,updateLayout} = manageActions;
import { layoutCheck } from '../collision';
import { compactLayout, compactLayoutHorizontal } from '../compact';
import * as utilService from '../utils';

import {
  um_content,
  addBtn,
  addGroupBtn,
} from './style.css';

@connect(
	mapStateToProps(
    "manageList",
    "shadowCard",
    "layout",
    "defaultLayout",
		{
			namespace: 'manage',
    },
	),{
    updateShadowCard,
    addGroup,
    updateGroupList,
    updateLayout
  }
)
export default class Content extends Component{
  constructor(props){
    super(props);
  }
/**
	 * 移动组的顺序
	 * @param {Number} dragIndex 拖拽的组对象的index值
	 * @param {Number} hoverIndex 拖拽中鼠标悬浮的组对象的index值
	**/
	moveGroupItem = (dragIndex, hoverIndex) => {
		let { manageList } = this.props;
		manageList = _.cloneDeep(manageList);
		const dragCard = manageList[dragIndex];
		manageList.splice(dragIndex, 1);
		manageList.splice(hoverIndex, 0, dragCard);
		this.props.updateGroupList(manageList);
	};
/**
	 * 拖拽中卡片在组上移动
	 * @param {Object} dragItem 拖拽中的对象
	 * @param {Object} hoverItem 拖拽中鼠标悬浮的对象
	 * @param {Number} x 当前元素所在的网页的x轴位置，单位为px
	 * @param {Number} y 当前元素所在的网页的y轴位置，单位为px
	**/
	moveCardInGroupItem = (dragItem, hoverItem, x, y) => {
    
		let axis = 'gridx';
		let manageList = this.props.manageList;
    let shadowCard = this.props.shadowCard;
		const { margin, containerWidth, col, rowHeight } = this.props.layout;
    //计算当前所在的网格坐标
		const { gridX, gridY } = utilService.calGridXY(x, y, shadowCard.width, margin, containerWidth, col, rowHeight);
    if (gridX === shadowCard.gridx && gridY === shadowCard.gridy) {
			return;
    }
    
		let groupIndex = hoverItem.index;
		//先判断组内是否存在相同的卡片
		const widgetId = shadowCard.widgetId;
		const isContain = utilService.checkCardContainInGroup(manageList[groupIndex], widgetId);

		if (isContain) {
			return;
    }
		//删除阴影的卡片
		_.forEach(manageList, (g, index) => {
			_.remove(g.children, (a) => {
				return a.isShadow === true;
			});
		});
		shadowCard = { ...shadowCard, gridx: gridX, gridy: gridY };
		//添加阴影的卡片
		manageList[groupIndex].children.push(shadowCard);
    //获得当前分组内最新的layout布局
    
		const newlayout = layoutCheck(
			manageList[groupIndex].children,
			shadowCard,
			shadowCard.widgetId,
			shadowCard.widgetId,
			axis
    );

		//压缩当前分组内的layout布局
		let compactedLayout;
		if(axis === 'gridx'){
			compactedLayout = compactLayoutHorizontal(newlayout, this.props.layout.col, widgetId);
		}else if(axis === 'gridy'){
			compactedLayout = compactLayout(newlayout, shadowCard);
		}
    //更新group对象
    manageList[groupIndex].children = compactedLayout;
    this.props.updateShadowCard(shadowCard);
    this.props.updateGroupList(manageList);

  };
  //当页面加载完成，获得卡片容器宽度
	handleLoad = () => {
		let fn = () => {
			let clientWidth;
			const containerDom = document.querySelector('#widget-container');
			if (containerDom) {
				clientWidth = containerDom.clientWidth;
			} else {
				const firstAddButton = document.querySelector('#first-add');
				if (firstAddButton) {
					clientWidth = firstAddButton.clientWidth - 10;
				} else {
					return;
				}
			}
			const defaultCalWidth = this.props.defaultLayout.calWidth;
			const { containerPadding, margin } = this.props.layout;
			let layout = _.cloneDeep(this.props.layout);
			const windowWidth = window.innerWidth - 60 * 2;
			const col = utilService.calColCount(defaultCalWidth, windowWidth, containerPadding, margin);
			const calWidth = utilService.calColWidth(clientWidth, col, containerPadding, margin);

			let { manageList } = this.props;
			manageList = _.cloneDeep(manageList);
			_.forEach(manageList, (g) => {
				let compactedLayout = compactLayoutHorizontal(g.children, col);
				g.children = compactedLayout;
			});

			layout.calWidth = layout.rowHeight = calWidth;
			layout.col = col;
			layout.containerWidth = clientWidth;
			this.props.updateGroupList(manageList);
			this.props.updateLayout(layout);
		}
		utilService.DeferFn(fn)
  };
  /**
	 * 释放卡片到分组
	 * @param {Object} dragItem 拖拽的卡片对象
	 * @param {Object} dropItem 释放的目标组对象
	**/
	onCardDropInGroupItem = (dragItem, dropItem) => {
		let { manageList } = this.props;
		manageList = _.cloneDeep(manageList);
		//将所有分组内的阴影卡片设为非阴影
		utilService.setPropertyValueForCards(manageList, 'isShadow', false);
		//目标组内重新横向压缩布局
		_.forEach(manageList, (g, targetGroupIndex) => {
			let compactedLayout = compactLayoutHorizontal(manageList[targetGroupIndex].children, this.props.layout.col);
			manageList[targetGroupIndex].children = compactedLayout;
		});

		this.props.updateGroupList(manageList);
		this.props.updateShadowCard({});
  };
  
  /**
	 * 释放sider区中选中的所有卡片CardList到分组中
	 * @param {Object} dragItem 拖拽sider区中选中的所有卡片
	 * @param {Object} dropItem 释放的目标组对象
	**/
	onCardListDropInGroupItem = (dragItem, dropItem) => {
		let { manageList,layout,shadowCard } = this.props;
		manageList = _.cloneDeep(manageList);
		const targetGroupIndex = dropItem.index;
		const cardList = dragItem.cardList;
    //拖拽卡片和目标组内卡片合并、去重
    cardList.forEach(item=>{
      item.gridx = shadowCard.gridx;
      item.gridy = shadowCard.gridy;
    })
    
    //删除阴影的卡片
		_.forEach(manageList, (g, index) => {
			_.remove(g.children, (a) => {
				return a.isShadow === true;
			});
		});
		manageList[targetGroupIndex].children = _.concat(manageList[targetGroupIndex].children, cardList);
		manageList[targetGroupIndex].children = _.uniqBy(manageList[targetGroupIndex].children, 'widgetId');
		//目标组内重新横向压缩布局
    //todo: 数组偶然的几率出现重排
    manageList.splice()
		let compactedLayout = compactLayoutHorizontal(manageList[targetGroupIndex].children, layout.col);
		
		manageList[targetGroupIndex].children = compactedLayout;
		this.props.updateGroupList(manageList);
	};

  componentWillUnmount() {
		window.removeEventListener('resize', this.handleLoad);
	}
	//组件渲染完毕时，添加resize事件
	componentDidMount() {
		window.addEventListener('resize', this.handleLoad);
		//初始化时默认执行新增分组的方法
		// setTimeout(() => {
		// 	if (this.props.groups.length === 0) {
		// 		this.addFirstGroupItem();
		// 		document.getElementsByClassName('ant-input')[1].select();//初始化选中input
		// 	}
		// },1500);
	}
  renderContent() {
    var {
      manageList,
      selectGroup,
      selectList,
      currEditonlyId,
      dragState,
      requestStart,
      requestSuccess,
      requestError,
      delectGroup,
      renameGroup,
      moveGroup,
      moveTopGroup,
      moveBottomGroup,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      applicationsMap,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      moveGroupDrag,
      moveItemDrag,
      languagesJSON,
    } = this.props;
    var manageProps = {
      manageList,
      selectGroup,
      selectList,
      currEditonlyId,
      dragState,
      requestStart,
      requestSuccess,
      requestError,
      delectGroup,
      renameGroup,
      moveGroup,
      moveTopGroup,
      moveBottomGroup,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
    }
    var {
      manageList,
      drag,
      dragState,
      selectList,
      selectGroup,
      currEditonlyId,
      currGroupIndex,
      title,
      moveService,
      setCurrGroupIndex,
      editTitle,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      delectService,
      addDesk,
    } = this.props;
    var widgetListProps = {
      manageList,
      drag,
      dragState,
      selectList,
      selectGroup,
      currEditonlyId,
      currGroupIndex,
      title,
      moveService,
      setCurrGroupIndex,
      editTitle,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      delectService,
    }
    var widgetSelectListProps={
      applicationsMap,
      manageList,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      addDesk,
      requestSuccess,
      requestError,
    }
    let list = [];
    if(manageList.length == 0){
      return (
        <div className={addBtn} id="first-add">
          <ButtonDefaultAlpha className={addGroupBtn} onClick={()=>{addGroup({index:0})}}>
            <Icon type="add"></Icon>
            //添加组
            {languagesJSON.addGroup}
          </ButtonDefaultAlpha>
        </div>
      );
    }else{
      manageList.map((item, index) =>{
        list.push(
          <ManageGroup
            data={item}
            cards={item.children}
            index={index}
            key={item.widgetId}
            id={item.widgetId}
            type={item.type}
            moveGroupDrag={moveGroupDrag}
            moveItemDrag={moveItemDrag}
            checkFun={this.checkFun}
            {...manageProps}
            {...widgetListProps}
            {...widgetSelectListProps}
            languagesJSON={languagesJSON}
            moveCardInGroupItem = {this.moveCardInGroupItem}
            handleLoad = {this.handleLoad}
            onCardDropInGroupItem = {this.onCardDropInGroupItem}
            onCardListDropInGroupItem = {this.onCardListDropInGroupItem}
            moveGroupItem={this.moveGroupItem}//移动分组
            />
        )
      });
    }
    return list;
  }


  render(){
    return(
      <div className={um_content}>
      {this.renderContent()}
      </div>
    )
  }
}




