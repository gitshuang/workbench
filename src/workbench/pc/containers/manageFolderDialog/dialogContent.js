import React, { Component } from 'react';
import { DragDropContext,DragSource, DropTarget  } from 'react-dnd';
import Button from 'bee/button';
import WidgetItem from 'containers/manageWidgetList/widgetItem';
import { content } from './style.css';
import { mapStateToProps } from '@u';
import { connect } from 'react-redux';
import manageActions from 'store/root/manage/actions';

const {moveService,closeFolder } = manageActions;

const type='item';


const itemTarget = {
  //hover 悬浮调用 drop落在目标上时调用
  hover(props, monitor, component){
    props.closeFolderDrag();
  },
  drop(props, monitor) {
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
        moveService
    }
)
class DialogContent extends Component {

    constructor(props) {
        super(props);
        this.moveItemDrag = this.moveItemDrag.bind(this);
    }
    moveItemDrag = (id,preParentId,preType, afterId,parentId,afterType) => {
      let data = {id,preParentId,preType,afterId,parentId,afterType}
      const { moveService } = this.props;
      moveService(data);
    }
    closeFolderDrag = () => {
      const { closeFolder } = this.props;
      closeFolder();
    }

    popClose = ()=>{
      this.setState({
        folderModalDisplay:false
      })
      const { closeFolder } = this.props;
      closeFolder();
    }

    render() {
      const {curDisplayFolder: {widgetName: title, children, }, closeFolder, folderModalDisplay,list} = this.props;
      const { connectDragSource, connectDropTarget,isDragging } = this.props;
      const opacity = isDragging ? 0 : 1;

      return connectDropTarget(
              <div className={folderModalDisplay ? "u-modal-backdrop fade in folderDialog" : "out"} onClick={this.popClose}></div>
            );
    }
}

export default  DropTarget(type,itemTarget,collectTaget)(DialogContent);
