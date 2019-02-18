import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { hasCardContainInGroups } from '../../utils';
import { mapStateToProps } from '@u';
import { list_item_content, title, isAddColor, title_name } from './style.css'
import manageActions from 'store/root/manage/actions';
const { updateManageList } = manageActions;

const noteSource = {
    beginDrag(props, monitor, component) {
        props.checkedCardList.forEach(element => {
            element.size = 1;
            element.type = 3;
            element.widgetId = element.service.serviceId;
            element.widgetName = element.service.serviceName;
            element.serviceCode = element.service.serviceCode;
            element.icon = element.service.serviceIcon;
            element.size = element.widgetTemplate.size;
            element.serviceType = element.widgetTemplate.serviceType
        });
        
        const data = props.data;
        data.size = 1;
        data.type = 3;
        data.widgetId = data.service.serviceId;
        data.widgetName = data.service.serviceName;
        data.serviceCode = data.service.serviceCode;
        data.icon = data.service.serviceIcon;
        data.size = data.widgetTemplate.size;
        data.serviceType = data.widgetTemplate.serviceType
        if (!data.checked) {//拖拽没被选择上的元素时，元素被push进checkedCardList
            props.checkedCardList.push(data);
            ///component.clickSiderCard(true, data.parentId, data.menuItemId);
        }

        return { id: "shadowCardId", type: "cardlist", parentId: 2, cardList: props.checkedCardList }  //3代表widget，parentId=2暂时代表侧边栏

    },
    endDrag(props, monitor, component) {
        const DraggedItem = monitor.getItem();
        const { manageList, updateManageList } = props;
        if (!monitor.didDrop()) {
            //debugger

                manageList.forEach(item => {
                    item.children.forEach((a, b) => {
                        if (a.widgetId == DraggedItem.id) {
                            item.children.splice(b, 1)
                        }
                    })
                })
            updateManageList(manageList)
        } else {
            console.log("正常拖拽")//
        }
    },
    canDrag(props, monitor) {
        // debugger
        const { manageList, data } = props;

        if (props.hasBeenDragged||hasCardContainInGroups(manageList, data.service.serviceId)) {
            return false
        }
        return true
    }
};

@connect(
    mapStateToProps(
        'manageList',
        'checkedCardList',
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

    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true
        });
    }
    // shouldComponentUpdate(nextProps,nextState){//优化：只有checked变化是才更新组件
    //     if(nextProps.checked!==this.props.checked)return true;
    //     const isContain = hasCardContainInGroups(this.props.manageList, this.props.serviceId)
    //     const isNextContain = hasCardContainInGroups(nextProps.manageList, this.props.serviceId);


    //     if (isContain!=isNextContain) {
    // 		return true;
    //     }
    //     return false
    // }
    //改变SiderCard的选中状态

    clickSiderCard = () => {
        const { menuItemId, parentId, checked } = this.props.data;
        this.props.onChangeChecked(!checked, parentId, menuItemId);
    };
    render() { 

        const { connectDragSource, manageList} = this.props;
        const { serviceId, menuItemName, checked } = this.props.data;
        const isContainInGroups = hasCardContainInGroups(manageList, serviceId);
        return connectDragSource(
            <div>
                {
                    isContainInGroups
                        ?
                        <div className="app_col" >
                        <div className={`${list_item_content} ${title} ${isAddColor}`}>
                            <span className={title_name} >{menuItemName}</span>
                        </div>
                        </div>
                        :
                        <div className="app_col" onClick={this.clickSiderCard}>
                        <div className={`${list_item_content} ${title} ${checked ? 'item-checked' : null}`}>
                            <span className={title_name}  title={menuItemName}>{menuItemName}</span>
                            {checked ? (
                                <i
                                    className="selected"
                                    style={{ color: 'rgb(0, 122, 206)' }}
                                ></i>
                            ) : null}
                        </div>
                        </div>

                }

               
            </div>
        );
    }
}



