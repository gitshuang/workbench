import React, { Component } from 'react';
import { DragDropContext,DragSource, DropTarget  } from 'react-dnd';
import Modal from 'bee-modal';
import Button from 'bee-button';
import WidgetItem from 'containers/manageWidgetList/widgetItem';
import { content } from './style.css';
import { mapStateToProps } from '@u';
import { connect } from 'react-redux';
import manageActions from 'store/root/manage/actions';

const {moveServe,closeFolder } = manageActions;

const type='item';

const itemSource = {
  beginDrag(props) {
    return { id: props.id , parentId:props.parentId,type:props.preType || props.type};
  },
  endDrag(props, monitor, component){
    return monitor.getClientOffset();
  }

};


const itemTarget = {
  //hover 悬浮调用 drop落在目标上时调用
  hover(props, monitor, component){
    if(props.isOverFolder !== "over" || !monitor.isOver()){
      //debugger;
      console.log(monitor.isOver());
      console.log(monitor.isOver({ shallow: true }));
      return monitor.getClientOffset();
    }
  },
  drop(props, monitor) {
    //debugger;
    const draggedId = monitor.getItem().id;
    //const previousParentId = monitor.getItem().parentId;

    if (draggedId !== props.id) {
      //props.moveItemDrag(draggedId,previousParentId,preType, props.id, props.data.parentId, props.data.type);
    }
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


function collectTaget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

@connect(
    mapStateToProps(
        'curDisplayFolder',
        'folderModalDisplay',
        {
            namespace: 'manage',
        }
    ),
    {
        closeFolder,
        moveServe
    }
)
class DialogContent extends Component {

    constructor(props) {
        super(props);
        this.moveItemDrag = this.moveItemDrag.bind(this);
    }
    moveItemDrag = (id,preParentId,preType, afterId,parentId,afterType) => {
      let data = {id,preParentId,preType,afterId,parentId,afterType}
      const { moveServe } = this.props;
      moveServe(data);
    }
    closeFolderDrag = () => {
      const { closeFolder } = this.props;
      closeFolder();
    }

    render() {
      const {curDisplayFolder: {widgetName: title, children, }, closeFolder, folderModalDisplay,list} = this.props;
      const { connectDragSource, connectDropTarget,isDragging } = this.props;
      const opacity = isDragging ? 0 : 1;

      return connectDropTarget(
                <div className={content}>
                  { list }
                </div>
            );
    }
}

export default  DropTarget(type,itemTarget,collectTaget)(DialogContent);
