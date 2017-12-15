import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5BackendGroup from 'react-dnd-html5-backend';
import {ButtonDefaultLine,ButtonBrand} from 'components/button';
import Button from 'bee-button';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import manageActions from 'store/root/manage/actions';

import HeaderPage from './headerPage';
import Header from 'containers/header';
import ManageGroup from 'containers/manageGroup';
import ManageFolderDialog from 'containers/manageFolderDialog';
import ManageBatchMoveDialog from 'containers/manageBatchMoveDialog';
import PopDialog from 'components/pop';
import 'assets/style/iuapmobile.um.css';


import {
  HeaderLeft,
  umBoxJustify,
  umBoxJustify1,
  umBoxJustify2,
  batchDeletion,
  preserve,
  cancel,
  um_content,
  um_footer,
  saveArea,
  batchArea,
  header,
  page_home
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const {
  setManageList,
  getManageList,
  batchDelect,
  openBatchMove,
  moveGroup,
  moveServe,
  setEditState,
} = manageActions;

@withRouter
@connect(
  mapStateToProps(
    'manageList',
    'isEdit',
    'selectList',
    {
      namespace: 'manage',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    setManageList,
    getManageList,
    batchDelect,
    openBatchMove,
    moveGroup,
    moveServe,
    setEditState,
  }
)

class Home extends Component {
  constructor(props) {
    super(props);
    const { manageList } = props;
    this.state = {
      showModal: false,
      showCancelModal: false
    };
  }
  moveGroupDrag = (id, afterId) => {
    const { moveGroup } = this.props;
    moveGroup({ id, afterId });
  }
  moveItemDrag = (id,preParentId, preType,afterId,parentId,afterType) => {
    let data = {id,preParentId,preType,afterId,parentId,afterType}
    const { moveServe } = this.props;
    moveServe(data);
  }
  componentDidMount() {
    this.getManageList();
  }

  getManageList() {
    const {
      requestStart,
      requestError,
      requestSuccess,
      getManageList,
    } = this.props;
    requestStart();
    return getManageList().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
      return error;
    });
  }



  //  保存
  save = () => {
    const {
      requestStart,
      requestError,
      requestSuccess,
      setManageList,
      manageList,
    } = this.props;
    requestStart();
    setManageList(manageList).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      } else {
        this.goBack();
      }
      requestSuccess();
      this.popCloseCancel();
    });
  }
  // 取消
  cancel = () => {
    const {
      //isEdit,
      setEditState,
    } = this.props;
    /*
    if(isEdit){
      this.getManageList().then((error) => {
        if (!error) {

        }
        setEditState(false);
      });
    }else{
      this.goBack();
    }*/
    setEditState(false);
    this.popCloseCancel();
    this.goBack();
  }
  // 返回操作
  goBack = () => {
    this.props.history.goBack();
  }
  //批量删除
  batchDelectFn = () => {
    const { batchDelect } = this.props;
    batchDelect();
    this.popClose();
  }

  openGroupTo = () => {
    const { openBatchMove } = this.props;
    openBatchMove();
  }
  // 打开删除的弹窗
  popOpen = () => {
    this.setState({
      showModal: true
    });
  }
  // 关闭删除的弹窗
  popClose = () => {
    this.setState({
      showModal: false
    });
  }
  // 打开取消的弹窗
  popOpenCancel = () => {
    const {isEdit} = this.props;
    if(isEdit){
      this.setState({
        showCancelModal: true
      });
    }else{
      this.goBack();
    }
  }
  // 关闭取消的弹窗
  popCloseCancel = () => {
    this.setState({
      showCancelModal: false
    });
  }

  renderContent() {
    let { manageList } = this.props;
    //console.log(manageList)
    //debugger;
    let list = [];
    if(manageList.length == 0) return;
    manageList.map((item, index) =>{
      list.push(
        <ManageGroup
          data={item}
          index={index}
          key={item.widgetId}
          id={item.widgetId}
          type={item.type}
          moveGroupDrag={this.moveGroupDrag}
          moveItemDrag={this.moveItemDrag} />
      )
    });
    return list;
  }
  render() {
    const {
      selectList,
      isEdit,
    } = this.props;
    const pop_btn = [
      {label:"确认",fun:this.batchDelectFn,className:""},
      {label:"取消",fun:this.popClose,className:""}
    ]
    const pop_btn2 = [
      {label:"保存",fun:this.save,className:""},
      {label:"不保存",fun:this.cancel,className:""},
      {label:"取消",fun:this.popCloseCancel,className:""}
    ]
    const list = [];
    return (
      <div className={page_home}>
        {/*<div className={header}>
          <div className="um-header">
            <Header onLeftClick={ this.goBack } iconName={"back"} leftContent={"返回"}>
              <span>首页编辑</span>
            </Header>
          </div>
        </div>*/}
        <HeaderPage list={list} />
        <div className={um_content}>
          {this.renderContent()}
        </div>
        <div className={um_footer}>
          <div className={`${umBoxJustify} um-box-justify`}>
             <div className={`${batchArea}  horizontalParent`}>
              <ButtonDefaultLine onClick={this.popOpen} disabled={selectList.length ? false:true} className="horizontal">删除</ButtonDefaultLine>
              <ButtonDefaultLine onClick={this.openGroupTo} disabled={selectList.length ? false:true} >移动到</ButtonDefaultLine>
            </div>
            <div className={`${saveArea}  horizontalParent`}>
              <ButtonBrand disabled={!isEdit} onClick={this.save}>保存</ButtonBrand>
              <ButtonDefaultLine onClick={this.popOpenCancel} >取消</ButtonDefaultLine>
              {/*<ButtonDefaultLine onClick={this.goBack}>取消</ButtonDefaultLine>*/}
            </div>
          </div>
        </div>
        <div className="manageDialog">
          <ManageFolderDialog />
        </div>
        <ManageBatchMoveDialog />
        <PopDialog className="pop_dialog_delete" type="delete" show = { this.state.showModal } close={this.popClose} btns={pop_btn} >
          <div>
            <span>您确认要批量删除吗?</span>
          </div>
        </PopDialog>
        <PopDialog className="pop_dialog_delete" show = { this.state.showCancelModal } close={this.popCloseCancel} btns={pop_btn2} title={"是否保存最新修改？"} >
          <div>
            <span>点击不保存，则最新修改将丢失</span>
          </div>
        </PopDialog>
      </div>
    );
  }
}

export default DragDropContext(HTML5BackendGroup)(Home);
