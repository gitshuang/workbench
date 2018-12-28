import React, { Component } from 'react';
import {ButtonDefaultAlpha} from 'pub-comp/button';
import Icon from 'pub-comp/icon';
import ManageGroup from './manageGroup';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { widgetStyle } from '../widgetStyle';
import { calGridXY,checkCardContainInGroup } from '../utils'
import manageActions from 'store/root/manage/actions';

const { updateShadowCard } = manageActions;


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
		{
			namespace: 'manage',
    },
	),{
    updateShadowCard
  }
)
export default class Content extends Component{
  constructor(props){
    super(props);
  }

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
		const { gridX, gridY } = calGridXY(x, y,widgetStyle[shadowCard.size-1].width , margin, containerWidth, col, rowHeight);
		if (gridX === shadowCard.gridx && gridY === shadowCard.gridy) {
			return;
		}
		let groupIndex = hoverItem.index;
		//先判断组内是否存在相同的卡片
		const widgetId = shadowCard.widgetId;
		const isContain = checkCardContainInGroup(manageList[groupIndex], widgetId);

		if (isContain) {
			return;
		}
    //删除阴影的卡片
		manageList.forEach((g, index) => {   //优化
			g.children = g.children.filter((a) => {
				return a.isShadow !== true;
			});
		});
		shadowCard = { ...shadowCard, gridx: gridX, gridy: gridY };
		//添加阴影的卡片
		manageList[groupIndex].children.push(shadowCard);
		this.props.updateShadowCard(shadowCard);
	};
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
      addGroup,
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
      addGroup,
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
        <div className={addBtn} >
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




