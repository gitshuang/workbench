import React, { Component } from 'react';
import {ButtonDefaultAlpha} from 'pub-comp/button';
import Icon from 'pub-comp/icon';
import ManageGroup from './manageGroup';
import Footer from './footer';
import BatchMove from './batchMove';
import PopDialogComp from './popDialogComp';


import {
  um_content, 
  addBtn,
  addGroupBtn, 
} from './style.css';

export default class Content extends Component{
  constructor(props){
    super(props);
  }


  renderContent() {
    var {
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
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      applicationsMap,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      moveGroupDrag,
      moveItemDrag,
      languagesJSON,
      updateShadowCard
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
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      updateShadowCard
    }
    var {
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
      addDesk,
    } = this.props;
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
    let list = [];
    if(manageList.length == 0){
      return (
        <div className={addBtn} >
          <ButtonDefaultAlpha className={addGroupBtn} onClick={()=>{addGroup({index:0})}}>
            <Icon type="add"></Icon>
            //添加组
            {languagesJSON.addGroup}
          </ButtonDefaultAlpha>
        </div>
      );
    }else{
      manageList.map((item, index) =>{
        list.push(
          <ManageGroup
            data={item}
            index={index}
            key={item.widgetId}
            id={item.widgetId}
            type={item.type}
            moveGroupDrag={moveGroupDrag}
            moveItemDrag={moveItemDrag}
            checkFun={this.checkFun}
            {...manageProps}
            {...widgetListProps}
            {...widgetSelectListProps}
            languagesJSON={languagesJSON}
            />
        )
      });
    }
    return list;
  }


  render(){
    var {
      addGroup,
      manageList,
      batchDelectFn,
      openGroupTo,
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
      languagesJSON,
    } = this.props;
  
    var footerProps = {
      batchDelectFn,
      openGroupTo,
      save,
      popOpenCancel,
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
    return(
      <div className={um_content}>
          {this.renderContent()}
          <Footer {...footerProps} languagesJSON={languagesJSON}/>
          <BatchMove {...batchMoveRedux} languagesJSON={languagesJSON}/>
          <PopDialogComp {...popDialogOuter} languagesJSON={languagesJSON}/>
      </div>
    )
  }
}




