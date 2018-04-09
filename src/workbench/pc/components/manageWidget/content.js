import React, { Component } from 'react';
import {ButtonDefaultLine,ButtonBrand,ButtonDefaultAlpha} from 'pub-comp/button';
import Icon from 'pub-comp/icon';
import ManageGroup from 'components/manageWidget/manageGroup';

// import judgedBackend from 'components/backend';
// import { DragDropContext } from 'react-dnd';

import {
  um_content,
  addBtn,
  addGroupBtn,
} from './style.css';



export default class Content extends Component{
  constructor(props){
    super(props);
  }
  static defaultProps = {
    // manageList,
    // addGroup,
    // moveGroupDrag,
    // moveItemDrag,
    // checkFun,
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
      addFolder,
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
    }
    var {
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
      addDesk,
      folderBgSrc
    } = this.props;
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
      folderBgSrc,
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
    let list = [];
    if(manageList.length == 0){
      return (
        <div className={addBtn} >
          <ButtonDefaultAlpha className={addGroupBtn} onClick={()=>{addGroup({index:0})}}>
            <Icon type="add"></Icon>
            添加组
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
            moveGroupDrag={this.props.moveGroupDrag}
            moveItemDrag={this.props.moveItemDrag}
            checkFun={this.checkFun}
            {...manageProps}
            {...widgetListProps}
            {...widgetSelectListProps}
            />
        )
      });
    }
    return list;
  }


  render(){
    return(
      <div className={um_content}>
      {this.renderContent()}
      </div>
    )
  }
}




