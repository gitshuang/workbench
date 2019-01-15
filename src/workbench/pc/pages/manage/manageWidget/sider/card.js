import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { hasCardContainInGroups } from '../../utils';
import { mapStateToProps } from '@u';
import { app_col, list_item_content, title, isAddColor, title_name } from './style.css'
import manageActions from 'store/root/manage/actions';
const { updateManageList } = manageActions;

const noteSource = {
    beginDrag(props, monitor, component) {
        // debugger
        let totalCards = [];
        let realCheckedCardList = []; 
        realCheckedCardList = props.checkedCardList.filter(item=>{
            return item.hasBeenDragged!=true
        })
        realCheckedCardList.forEach(element => {
            let checkedCard = {
                size: 1,
                type: 3,
                widgetId: element.serviceId,
                widgetName: element.menuItemName,
            }
            totalCards.push(checkedCard)
        });
        const draggedCardList = [{
            size: 1,
            type: 3,
            widgetId: props.serviceId,
            widgetName: props.menuItemName
        }]

        if (!props.checked) {
            totalCards = totalCards.concat(draggedCardList);
            component.clickSiderCard(true, props.parentId, props.menuItemId);
        }
        return { id: "shadowCardId", type: "cardlist", parentId: 2, cardList: totalCards }  //3代表widget，parentId=2暂时代表侧边栏

    },
    endDrag(props, monitor, component){
        const DraggedItem = monitor.getItem();
        const {manageList,updateManageList }= props;
        if(!monitor.didDrop()){
            //debugger
            if(hasCardContainInGroups(manageList, DraggedItem.id)){
                
                manageList.forEach(item=>{
                    item.children.forEach((a,b)=>{
                        if(a.widgetId == DraggedItem.id){
                            item.children.splice(b,1)
                        }
                    })
                })
            }
            updateManageList(manageList)
        }else{
            console.log("正常拖拽")//
        }
    },
    canDrag(props, monitor) {
        if (props.hasBeenDragged) {
            return false
        }
        return true
    }
};

@connect(
    mapStateToProps(
        'manageList',
        {
            namespace: 'manage',
        },
    ),
    {
        updateManageList
    }
)
@DragSource('item', noteSource, (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
})
export default class Card extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true
        });
    }
    shouldComponentUpdate(nextProps){//优化：只有checked变化是才更新组件
        if(nextProps.checked!==this.props.checked)return true;
        if (hasCardContainInGroups(this.props.manageList, this.props.serviceId)) {
			return true;
        }
        return false
    }
    //改变SiderCard的选中状态
    onChangeChecked = (e) => {
        const checked = e.target.checked;
        const { menuItemId, parentId } = this.props;
        this.props.onChangeChecked(checked, parentId, menuItemId);
    };
    clickSiderCard = () => {
        const { menuItemId, parentId, checked } = this.props;
        this.props.onChangeChecked(!checked, parentId, menuItemId);
    };
    render() {

        const { connectDragSource, manageList, serviceId, menuItemName, checked } = this.props;
        const isContainInGroups = hasCardContainInGroups(manageList, serviceId)
        return connectDragSource(
            <div className={app_col}  onClick={this.clickSiderCard}>
                
                    {
                        isContainInGroups
                            ?
                            <div className={`${list_item_content} ${title} ${isAddColor}`}>
                                <span className={title_name} >{menuItemName}</span>
                            </div>
                            :
                            <div className={`${list_item_content} ${title} ${checked?'item-checked':null}`}>
                                <span className={title_name}>{menuItemName}</span>
                                {checked ? (
                                    <i
                                        title="卡片已选中"
                                        className="selected"
                                        style={{ color: 'rgb(0, 122, 206)' }}
                                    ></i>
                                ) :null}
                            </div>

                    }

                    {isContainInGroups}
                </div>
        );
    }
}



