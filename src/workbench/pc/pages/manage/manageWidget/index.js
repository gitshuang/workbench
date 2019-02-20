import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Content from './content'
import Footer from './footer'
import BatchMove from './batchMove'
import PopDialogComp from './popDialogComp'
import judgedBackend from './backend';
import { DragDropContext } from 'react-dnd';
import Sider from './sider';
import CustomDragLayer from './dragLayer/customDragLayer.js';


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
      delectGroup,
      renameGroup,
      moveGroup,
      moveTopGroup,
      moveBottomGroup,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      manageList,
      drag,
      dragState,
      selectList,
      currGroupIndex,
      title,
      moveService,
      setCurrGroupIndex,
      editTitle,
      delectService,
      batchDelectFn,
      openGroupTo,
      isEdit,
      save,
      popOpenCancel,
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
      delectGroup,
      renameGroup,
      moveGroup,
      moveTopGroup,
      moveBottomGroup,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      moveGroupDrag,
      moveItemDrag,
    }
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
    var footerProps = {
      batchDelectFn,
      selectList,
      openGroupTo,
      isEdit,
      save,
      popOpenCancel,
    }
    var batchMoveRedux = {
      batchMoveModalDisplay,
      manageList,
      moveData,
      closeBatchMove,
      batchMove,
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
      <div style={{display:'flex'}}>
          {/* <div style={{width:300}}>sider</div> */}
          <Sider languagesJSON={languagesJSON}/>
          <Content {...manageProps} {...widgetListProps} {...widgetSelectListProps} languagesJSON={languagesJSON}/>
          <Footer {...footerProps} languagesJSON={languagesJSON}/>
          <BatchMove {...batchMoveRedux} languagesJSON={languagesJSON}/>
          <PopDialogComp {...popDialogOuter} languagesJSON={languagesJSON}/>
          <CustomDragLayer/>

      </div>
    );
  }
}

export default DragDropContext(judgedBackend)(CreateManageModule);
