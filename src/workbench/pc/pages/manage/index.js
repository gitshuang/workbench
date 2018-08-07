import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import manageActions from 'store/root/manage/actions';


import CreateManageModule from 'pub-comp/manageWidget';
import folderBgSrc from 'assets/image/wgt/folder_bg.png';
import HeaderPage from './headerPage';

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
  emptySelectGroup,
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
    },
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
  },
)


class Manage extends Component {
  static propTypes = {
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    history: PropTypes.shape({
      block: PropTypes.func,
      replace: PropTypes.func,
    }),
    isEdit: PropTypes.bool,
    match: PropTypes.shape({
      path: PropTypes.string,
    }),
    manageList: PropTypes.arrayOf(PropTypes.object),
    selectList: PropTypes.arrayOf(PropTypes.string),
    batchMoveModalDisplay: PropTypes.bool,
    curDisplayFolder: PropTypes.shape({
      children: PropTypes.array,
    }),
    folderModalDisplay: PropTypes.bool,
    selectGroup: PropTypes.arrayOf(PropTypes.number),
    currEditonlyId: PropTypes.string,
    dragState: PropTypes.bool,
    curEditFolderId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    drag: PropTypes.string,
    currGroupIndex: PropTypes.number,
    title: PropTypes.string,
    moveData: PropTypes.arrayOf(PropTypes.object),
    returnDefaultState: PropTypes.func,
    getManageList: PropTypes.func,
    moveGroup: PropTypes.func,
    moveService: PropTypes.func,
    setManageList: PropTypes.func,
    setEditState: PropTypes.func,
    emptySelectGroup: PropTypes.func,
    batchDelect: PropTypes.func,
    openBatchMove: PropTypes.func,
    addGroup: PropTypes.func,
    closeBatchMove: PropTypes.func,
    batchMove: PropTypes.func,
    closeFolder: PropTypes.func,
    delectGroup: PropTypes.func,
    renameGroup: PropTypes.func,
    moveTopGroup: PropTypes.func,
    moveBottomGroup: PropTypes.func,
    addFolder: PropTypes.func,
    selectListActions: PropTypes.func,
    selectGroupActions: PropTypes.func,
    setEditonlyId: PropTypes.func,
    setDragInputState: PropTypes.func,
    openFolder: PropTypes.func,
    deleteFolder: PropTypes.func,
    renameFolder: PropTypes.func,
    setFolderEdit: PropTypes.func,
    setCurrGroupIndex: PropTypes.func,
    editTitle: PropTypes.func,
    cancelFolderEdit: PropTypes.func,
    delectService: PropTypes.func,
    applicationsMap: PropTypes.objectOf(PropTypes.object),
    allServicesByLabelGroup: PropTypes.objectOf(PropTypes.array),
    getAllServicesByLabelGroup: PropTypes.func,
    setCurrentSelectWidgetMap: PropTypes.func,
    addDesk: PropTypes.func,
  };
  static defaultProps = {
    requestStart: () => {},
    requestSuccess: () => {},
    requestError: () => {},
    history: {},
    isEdit: false,
    match: {},
    manageList: [],
    selectList: [],
    batchMoveModalDisplay: false,
    curDisplayFolder: {},
    folderModalDisplay: false,
    selectGroup: [],
    currEditonlyId: '',
    dragState: false,
    curEditFolderId: '',
    drag: '',
    currGroupIndex: 0,
    title: '',
    moveData: [],
    returnDefaultState: () => {},
    getManageList: () => {},
    moveGroup: () => {},
    moveService: () => {},
    setManageList: () => {},
    setEditState: () => {},
    emptySelectGroup: () => {},
    batchDelect: () => {},
    openBatchMove: () => {},
    addGroup: () => {},
    closeBatchMove: () => {},
    batchMove: () => {},
    closeFolder: () => {},
    delectGroup: () => {},
    renameGroup: () => {},
    moveTopGroup: () => {},
    moveBottomGroup: () => {},
    addFolder: () => {},
    selectListActions: () => {},
    selectGroupActions: () => {},
    setEditonlyId: () => {},
    setDragInputState: () => {},
    openFolder: () => {},
    deleteFolder: () => {},
    renameFolder: () => {},
    setFolderEdit: () => {},
    setCurrGroupIndex: () => {},
    editTitle: () => {},
    cancelFolderEdit: () => {},
    delectService: () => {},
    applicationsMap: {},
    allServicesByLabelGroup: {},
    getAllServicesByLabelGroup: () => {},
    setCurrentSelectWidgetMap: () => {},
    addDesk: () => {},
  };

  constructor(props) {
    super(props);
    this.goToLocation = '/';
    this.configBack = false;
    this.state = {
      showModal: false,
      showCancelModal: false,
    };
  }

  componentDidMount() {
    const { history } = this.props;

    history.block((location) => {
      const { isEdit } = this.props;
      this.goToLocation = location.pathname;
      if ((location.pathname !== this.props.match.path) && isEdit && !this.configBack) {
        this.setState({
          showCancelModal: true,
        });
      }
    });

    this.getManageList();
  }

  componentWillUnmount() {
    const { returnDefaultState } = this.props;
    returnDefaultState();
  }

  getManageList() {
    const {
      requestStart,
      requestError,
      requestSuccess,
      getManageList,
    } = this.props;
    requestStart();
    return getManageList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
      return error;
    });
  }

  moveGroupDrag = (id, afterId) => {
    const { moveGroup } = this.props;
    moveGroup({ id, afterId });
  }

  moveItemDrag = (id, preParentId, preType, afterId, parentId, afterType) => {
    const data = {
      id, preParentId, preType, afterId, parentId, afterType,
    };
    const { moveService } = this.props;
    moveService(data);
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
    if (this.checkBtn) {
      this.checkBtn.click();
    }
    requestStart();
    setManageList(manageList).then(({ error, payload }) => {
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
      // isEdit,
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
    } */
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
  // 批量删除
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
      showModal: true,
    });
  }
  // 关闭删除的弹窗
  popClose = () => {
    this.setState({
      showModal: false,
    });
  }
  // 打开取消的弹窗
  popOpenCancel = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      this.setState({
        showCancelModal: true,
      });
    } else {
      this.goBack();
    }
  }
  // 关闭取消的弹窗
  popCloseCancel = () => {
    this.setState({
      showCancelModal: false,
    });
  }
  // 返回确认按钮
  checkFun = (id) => {
    const btn = document.getElementById(id);
    this.checkBtn = btn || null;
  }

  render() {
    const list = [];
    const {
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
    const manageReduxParams = {
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
    };
    const manageOuterParams = {
      showModal: this.state.showModal,
      showCancelModal: this.state.showCancelModal,
      popClose: this.popClose,
      batchDelectFn: this.batchDelectFn,
      cancel: this.cancel,
      save: this.save,
      popCloseCancel: this.popCloseCancel,
      openGroupTo: this.openGroupTo,
      popOpenCancel: this.popOpenCancel,
      moveGroupDrag: this.moveGroupDrag,
      moveItemDrag: this.moveItemDrag,
      folderBgSrc,
			languagesJSON: {
				addGroup: '添加分组',
				groupName_max_words_four: '分组名称,最多4个字符',
				rename_group: '重命名分组',
				add_folder: '添加文件夹',
				confirm: '确认',
				cancel: '取消',
				confirm_del_this_item: '您确认要删除此项？',
				'delete': '删除',
				moveTo: '移动到',
				save: '保存',
				deleteService: '删除服务',
				confirm_delete_this_service: '您确认要删除此项服务？',
				move: '移动',
				group: '分组',
				to: '到',
				notSave: '不保存',
				confirm_to_delete_batch: '您确认要批量删除吗？',
				notSave_to_lose_new_modify: '点击不保存，则最新修改将丢失？',
				addQuick_to_home: '添加快捷方式至首页',
				all: '全部',
				search: '搜索',
				add: '添加',
				searchContent: '搜索内容...',
				added: '已添加',
				notAdd: '未添加',
				extend: '展开',
				unfold: '收起',
				rename_folder: '重命名文件夹',
				delete_folder: '删除文件夹',
				confirm_delete_service: '您确认要删除服务'
			}
    };
    return (
      <div>
        <HeaderPage list={list} />
        <CreateManageModule {...manageReduxParams} {...manageOuterParams} />
      </div>
    );
  }
}

export default Manage;
