import React, { Component } from 'react';
import { DragDropContext,DragSource, DropTarget  } from 'react-dnd';
import { content } from './style.css';
import Modal from 'bee-modal';
import Button from 'bee-button';
import WidgetItem from 'containers/manageWidgetList/widgetItem';
import { mapStateToProps } from '@u';
import { connect } from 'react-redux';
import manageActions from 'store/root/manage/actions';
import DialogContent from './dialogContent';

const {moveServe,closeFolder } = manageActions;


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
class ManageFolderDialog extends Component {

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
        const {curDisplayFolder: {widgetName: title, children, }, closeFolder, folderModalDisplay} = this.props;
        const list = children && children.map((child, i) => {
            const {type, parentId, widgetId: id, } = child;
            const props = {
                key: `widget-${id}-${i}`,
                data: child,
                id,
                parentId,
                index: id,
                preType: type,
                moveItemDrag: this.moveItemDrag,
            };
            return (
                <WidgetItem { ...props } folderType={'folder'} type="pop" closeFolderDrag={this.closeFolderDrag}/>
            );
        });
      const { connectDragSource, connectDropTarget,isDragging } = this.props;
      const opacity = isDragging ? 0 : 1;

      return (
            <div className="manageDialogFolder" >
              <DialogContent folderModalDisplay = {folderModalDisplay} closeFolderDrag={this.closeFolderDrag} />
            <Modal className="manageDialogFolder" show={folderModalDisplay} onHide={closeFolder}>
              <div className={`targetModal`}>
              <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className={content}>
                  { list }
                </div>
              </Modal.Body>
            </div>
            </Modal>
            </div>
        );
    }
}

export default  ManageFolderDialog;
