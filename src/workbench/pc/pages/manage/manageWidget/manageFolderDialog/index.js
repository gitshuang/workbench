import React, { Component } from 'react';
import { content } from './style.css';
import PopDialog from 'pub-comp/pop';
import Button from 'bee/button';
import WidgetItem from '../manageWidgetList/widgetItem';
import DialogContent from './dialogContent';

class ManageFolderDialog extends Component {

    constructor(props) {
        super(props);
        this.moveItemDrag = this.moveItemDrag.bind(this);
        this.state = {
            moveLine:'none',
            checkId:'',
          }
    }
    moveItemDrag = (id,preParentId,preType, afterId,parentId,afterType,ifIntoFile) => {
      let data = {id,preParentId,preType,afterId,parentId,afterType,ifIntoFile}
      const { moveService } = this.props;
      moveService(data);
    }
    closeFolderDrag = () => {
      const { closeFolder } = this.props;
      closeFolder();
    }
    savePosition = (id,moveLine) => {
        this.setState({
          checkId:id,
          moveLine:moveLine,
        })
      }
    moveLine = (id,moveLinePara)=>{
      if(id == this.state.checkId){
        return moveLinePara;
      }else{
        return 'none'
      }
    }
    render() {
        var {
          manageList,
          curEditFolderId,
          selectList,
          selectGroup,
          currGroupIndex,
          drag,
          deleteFolder,
          renameFolder,
          setFolderEdit,
          selectListActions,selectGroupActions,
          addFolder,
          delectService,
          languagesJSON
        } = this.props;
        var widgetItemProps ={
          manageList,
          curEditFolderId,
          selectList,
          selectGroup,
          currGroupIndex,
          drag,
          deleteFolder,
          renameFolder,
          setFolderEdit,
          selectListActions,selectGroupActions,
          addFolder,
          delectService
        }
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
                savePosition : this.savePosition,
                moveLine : this.moveLine(id,this.state.moveLine),
            };
            return (
                <WidgetItem { ...props }
                  folderType={'folder'} type="pop" dragType="dragInFolder"
                  closeFolderDrag={this.closeFolderDrag}
                  {...widgetItemProps} languagesJSON={languagesJSON}
                />
            );
        });
      const { isDragging } = this.props;
      const {curDisplayFolder,moveService} = this.props;
      const opacity = isDragging ? 0 : 1;

      return (
            <div className="manageDialogFolder" >
              <DialogContent
                folderModalDisplay = {folderModalDisplay}
                closeFolderDrag={this.closeFolderDrag}
                closeFolder = { closeFolder }
                moveService = {moveService}
                curDisplayFolder = {curDisplayFolder}
              />
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
