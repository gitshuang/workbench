import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { hasCardContainInGroups } from '../../utils';
import { mapStateToProps } from '@u';
import {app_col,list_item_content,title,isAddColor,title_name} from './style.css'

const noteSource = {
    beginDrag(props) {
        // debugger
        let  totalCards = []
         props.checkedCardList.forEach(element => {
            let checkedCard = {
                size:1,
                type:3,
                widgetId : element.menuItemId,
                widgetName : element.menuItemName
            }
            totalCards.push(checkedCard)
        });
        const draggedCardList = [{
            size: 1,
            type: 3,
            widgetId:props.menuItemId,
            widgetName: props.menuItemName
        }]

        if(!props.checked){
             totalCards = totalCards.concat(draggedCardList)
        }
       
        return {id:totalCards,type:3,parentId:2}
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
    componentWillMount(){
    }
    componentDidMount() {
        // Use empty image as a drag preview so browsers don't draw it
        // and we can draw whatever we want on the custom drag layer instead.
        this.props.connectDragPreview(getEmptyImage(), {
            // IE fallback: specify that we'd rather screenshot the node
            // when it already knows it's being dragged so we can hide it with CSS.
            captureDraggingState: true
        });
    }
    //SCU检测是否选中，是否在分组内存在
    shouldComponentUpdate(nextProps, nextState) {
        const thisProps = this.props || {},
            thisState = this.state || {};
        if (this.props.checked !== nextProps.checked) {
            return true;
        }
        if (hasCardContainInGroups(this.props.manageList, this.props.id) !== hasCardContainInGroups(nextProps.manageList, this.props.id)) {
            return true;
        }
        return false;
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
        
        const { connectDragSource, manageList, id,  menuItemName, checked } = this.props;
        //显示已添加卡片的小图标
        const isContainInGroups = hasCardContainInGroups(manageList, id)
        // ? <i
        // 	title="已添加卡片"
        // 	className="iconfont icon-peizhi_yixuan"
        // 	style={ {color: 'rgb(0, 122, 206)', position: 'absolute', top: '21px', right: '-3px' } }

        //   />
        //  : '';
        return connectDragSource(
            <div className={app_col}>
                <div
                    className={list_item_content}
                    onClick={this.clickSiderCard}
                    style={
                        checked
                            ? {
                                border: '1px dashed #d4d4d4',
                                color:'red'
                            }
                            : null
                    }
                >
                    {
                        isContainInGroups
                            ?
                            <div className={`${title} ${isAddColor}`}>
                                <span className={title_name}>{menuItemName}</span>
                            </div>
                            :
                            <div className={title}>
                                <span className={title_name}>{menuItemName}</span>
                            </div>
                    }
                    {checked ? (
                        <i
                            title="卡片已选中"
                            className="iconfont icon-peizhi_tianjia iconlocation"
                            style={{ color: 'rgb(0, 122, 206)' }}
                        />
                    ) : (
                            <i
                                title="卡片未选中"
                                className="iconfont icon-peizhi_tianjia iconlocation unSelect"
                            />
                        )}
                    {isContainInGroups}
                </div>
            </div>
        );
    }
}



