import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Content from './content' 
import Footer from './footer'  
import FolderDialog from './folderDialog' 
import BatchMove from './batchMove'
import PopDialogComp from './popDialogComp' 
import judgedBackend from 'components/backend';
import { DragDropContext } from 'react-dnd';

class CreateManageModule extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var {
      selectGroup,
      currEditonlyId,
      requestStart,
      requestSuccess,
      requestError,
      addGroup,
      delectGroup,
      renameGroup,
      moveGroup,
      moveTopGroup,
      moveBottomGroup,
      addFolder,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      manageList,
      curEditFolderId,
      drag,
      dragState,
      selectList,
      currGroupIndex,
      title,
      openFolder,
      deleteFolder,
      renameFolder,
      setFolderEdit,
      moveService,
      closeFolder,
      setCurrGroupIndex,
      editTitle,
      cancelFolderEdit,
      delectService,
      batchDelectFn,
      openGroupTo,
      isEdit,
      save,
      popOpenCancel,
      curDisplayFolder,
      folderModalDisplay,
      batchMoveModalDisplay,
      moveData,
      closeBatchMove,
      batchMove,
      showModal,
      showCancelModal,
      popClose,
      cancel,
      popCloseCancel,
      applicationsMap,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      addDesk,
      moveGroupDrag,
      moveItemDrag,
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
      addFolder,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      moveGroupDrag,
      moveItemDrag,
    }
    var widgetListProps = {
      manageList,
      curEditFolderId,
      drag,
      dragState,
      selectList,
      selectGroup,
      currEditonlyId,
      currGroupIndex,
      title,
      openFolder,
      deleteFolder,
      renameFolder,
      setFolderEdit,
      moveService,
      addFolder,
      closeFolder,
      setCurrGroupIndex,
      editTitle,
      selectListActions,
      selectGroupActions,
      cancelFolderEdit,
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
      deleteFolder,
      addDesk,
      requestSuccess,
      requestError,
    }
    var footerProps = {
      batchDelectFn,
      selectList,
      openGroupTo,
      isEdit,
      save,
      popOpenCancel,
    }
    var folderDialogProps = {
      curDisplayFolder,
      folderModalDisplay,
      closeFolder,
      moveService
    }
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
    var batchMoveRedux = {
      batchMoveModalDisplay,
      manageList,
      moveData,
      closeBatchMove,
      batchMove,
      addGroup
    }
    var popDialogOuter = {
      showModal,
      showCancelModal,
      popClose,
      batchDelectFn,
      cancel,
      save,
      popCloseCancel,
    }
    return (
      <div>
          <Content {...manageProps} {...widgetListProps} {...widgetSelectListProps}/>
          <Footer {...footerProps} />
          <FolderDialog {...folderDialogProps} {...widgetItemProps}/>
          <BatchMove {...batchMoveRedux}/>
          <PopDialogComp {...popDialogOuter}/>
      </div>
    );
  }
}

export default DragDropContext(judgedBackend)(CreateManageModule);
