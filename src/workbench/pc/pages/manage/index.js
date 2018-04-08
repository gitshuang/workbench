import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import judgedBackend from 'components/backend';

import {ButtonDefaultLine,ButtonBrand,ButtonDefaultAlpha} from 'pub-comp/button';
import Button from 'bee/button';
import Icon from 'pub-comp/icon';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import manageActions from 'store/root/manage/actions';

import HeaderPage from './headerPage';
import Header from 'containers/header';
import CreateManageModule from 'components/manageWidget/index'


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
  page_home,
  cancelModal,
  addBtn,
  addGroupBtn,
  manager_save_pop
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const {
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
  deleteFolder, 
  renameFolder, 
  setFolderEdit,
  moveService, 
  openFolder,
  closeFolder,
  setCurrGroupIndex,
  editTitle,
  delectService,
  cancelFolderEdit, 
  closeBatchMove, 
  batchMove,
  setManageList,
  getManageList,
  batchDelect,
  openBatchMove,
  setEditState,
  returnDefaultState,
  getAllServicesByLabelGroup,
  addDesk,
  setCurrentSelectWidgetMap,
  emptySelectGroup
} = manageActions;


@withRouter
@connect(
  mapStateToProps(
    'manageList',
    'isEdit',
    'selectList',
    'batchMoveModalDisplay',
    'curDisplayFolder',
    'folderModalDisplay',
    'selectGroup',
    'currEditonlyId',
    'dragState',
    'curEditFolderId',
    'drag',
    'currGroupIndex',
    'title',
    'applicationsMap',
    'allServicesByLabelGroup',
    {
      key: 'moveData',
      value: ({ manageList }) => manageList.map(group => ({
        ...group,
        children: [],
      })),
    },
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
    moveService,
    setEditState,
    addGroup,
    returnDefaultState,
    closeBatchMove,
    batchMove,
    closeFolder,
    delectGroup,
    renameGroup,
    moveTopGroup,
    moveBottomGroup,
    addFolder,
    selectListActions,
    selectGroupActions,
    setEditonlyId,
    setDragInputState,
    openFolder,
    deleteFolder,
    renameFolder,
    setFolderEdit,
    setCurrGroupIndex,
    editTitle,
    cancelFolderEdit,
    delectService,
    getAllServicesByLabelGroup,
    setCurrentSelectWidgetMap,
    addDesk,
    emptySelectGroup,
  }
)


class Home extends Component {
  constructor(props) {
    super(props);
    const { manageList } = props;
    this.goToLocation = "/";
    this.configBack = false;
    this.state = {
      showModal: false,
      showCancelModal: false,
      currLocation:"",
    };
  }
  moveGroupDrag = (id, afterId) => {
    const { moveGroup } = this.props;
    moveGroup({ id, afterId });
  }
  moveItemDrag = (id,preParentId, preType,afterId,parentId,afterType) => {
    let data = {id,preParentId,preType,afterId,parentId,afterType}
    const { moveService } = this.props;
    moveService(data);
  }

  componentWillUnmount() {
    const { returnDefaultState } = this.props;
    returnDefaultState();
  }

  componentDidMount() {
    const { history} = this.props;

    history.block(location => {
      const { isEdit} = this.props;
      this.goToLocation =  location.pathname;
      if((location.pathname != this.props.match.path) && isEdit && !this.configBack ){
        this.setState({
          showCancelModal: true
        });
        return false;
      }
    })
    this.getManageList();
  }
  componentWillReceiveProps(nextProps){

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
    this.checkBtn?this.checkBtn.click():null;
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
    this.configBack = true;
    const { emptySelectGroup } = this.props;
    emptySelectGroup();
    this.props.history.replace(this.goToLocation);
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
      return false;
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

  // 返回确认按钮
  checkFun =(id)=>{
    let btn = document.getElementById(id);
    this.checkBtn = btn?btn:null;
  }

  render() {
    const list = [];
    var {
      manageList,
      isEdit,
      selectList,
      batchMoveModalDisplay,
      curDisplayFolder,
      folderModalDisplay,
      selectGroup,
      currEditonlyId,
      dragState,
      curEditFolderId,
      drag,
      currGroupIndex,
      title,
      moveData,
      requestStart,
      requestSuccess,
      requestError,
      setManageList,
      getManageList,
      batchDelect,
      openBatchMove,
      moveGroup,
      moveService,
      setEditState,
      addGroup,
      returnDefaultState,
      closeBatchMove,
      batchMove,
      closeFolder,
      delectGroup,
      renameGroup,
      moveTopGroup,
      moveBottomGroup,
      addFolder,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      openFolder,
      deleteFolder,
      renameFolder,
      setFolderEdit,
      setCurrGroupIndex,
      editTitle,
      cancelFolderEdit,
      delectService,
      applicationsMap,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      addDesk,
    } = this.props;
    var manageReduxParams = {
      manageList,
      isEdit,
      selectList,
      batchMoveModalDisplay,
      curDisplayFolder,
      folderModalDisplay,
      selectGroup,
      currEditonlyId,
      dragState,
      curEditFolderId,
      drag,
      currGroupIndex,
      title,
      moveData,
      requestStart,
      requestSuccess,
      requestError,
      setManageList,
      getManageList,
      batchDelect,
      openBatchMove,
      moveGroup,
      moveService,
      setEditState,
      addGroup,
      returnDefaultState,
      closeBatchMove,
      batchMove,
      closeFolder,
      delectGroup,
      renameGroup,
      moveTopGroup,
      moveBottomGroup,
      addFolder,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      openFolder,
      deleteFolder,
      renameFolder,
      setFolderEdit,
      setCurrGroupIndex,
      editTitle,
      cancelFolderEdit,
      delectService,
      applicationsMap,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      addDesk,
    } 
    var manageOuterParams = {
      showModal:this.state.showModal,
      showCancelModal:this.state.showCancelModal,
      popClose:this.popClose,
      batchDelectFn:this.batchDelectFn,
      cancel:this.cancel,
      save:this.save,
      popCloseCancel:this.popCloseCancel,
      openGroupTo:this.openGroupTo,
      popOpenCancel:this.popOpenCancel,
      moveGroupDrag:this.moveGroupDrag,
      moveItemDrag:this.moveItemDrag,
    }
    return (
      <div className={page_home}>
        <HeaderPage list={list} />
        <CreateManageModule {...manageReduxParams} {...manageOuterParams}/>
      </div>
    );
  }
}

export default Home;
