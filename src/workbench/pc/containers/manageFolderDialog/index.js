import React, { Component } from 'react';
import { DragDropContext,DragSource, DropTarget  } from 'react-dnd';
import { content } from './style.css';
import PopDialog from 'components/pop';
import Button from 'bee/button';
import WidgetItem from 'containers/manageWidgetList/widgetItem';
import { mapStateToProps } from '@u';
import { connect } from 'react-redux';
import manageActions from 'store/root/manage/actions';
import DialogContent from './dialogContent';

const {moveService,closeFolder } = manageActions;


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
class ManageFolderDialog extends Component {

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
                <WidgetItem { ...props } folderType={'folder'} type="pop" dragType="dragInFolder" closeFolderDrag={this.closeFolderDrag}/>
            );
        });
      const { connectDragSource, connectDropTarget,isDragging } = this.props;
      const opacity = isDragging ? 0 : 1;

      return (
            <div className="manageDialogFolder" >
              <DialogContent folderModalDisplay = {folderModalDisplay} closeFolderDrag={this.closeFolderDrag} />
              <PopDialog
                className="manageDialogFolder"
                show={ folderModalDisplay }
                title={title}
                close={closeFolder} >
                <div className={content}>
                  { list }
                </div>
              </PopDialog>
            </div>
        );
    }
}

export default  ManageFolderDialog;
