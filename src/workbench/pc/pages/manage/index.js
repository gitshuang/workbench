import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import manageActions from 'store/root/manage/actions';

import CreateManageModule from './manageWidget';
import { win } from './style.css';
import LanguagesJSON from 'yutils/languages';

const { requestStart, requestSuccess, requestError } = rootActions;
const {
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
  moveService,
  setCurrGroupIndex,
  editTitle,
  delectService,
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
  updateShadowCard
} = manageActions;


@withRouter
@connect(
  mapStateToProps(
    'manageList',
    'isEdit',
    'selectList',
    'batchMoveModalDisplay',
    'selectGroup',
    'currEditonlyId',
    'dragState',
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
    delectGroup,
    renameGroup,
    moveTopGroup,
    moveBottomGroup,
    selectListActions,
    selectGroupActions,
    setEditonlyId,
    setDragInputState,
    setCurrGroupIndex,
    editTitle,
    delectService,
    getAllServicesByLabelGroup,
    setCurrentSelectWidgetMap,
    addDesk,
    emptySelectGroup,
    updateShadowCard
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
  
    selectGroup: PropTypes.arrayOf(PropTypes.number),
    currEditonlyId: PropTypes.string,
    dragState: PropTypes.bool,
  
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
    delectGroup: PropTypes.func,
    renameGroup: PropTypes.func,
    moveTopGroup: PropTypes.func,
    moveBottomGroup: PropTypes.func,
    selectListActions: PropTypes.func,
    selectGroupActions: PropTypes.func,
    setEditonlyId: PropTypes.func,
    setDragInputState: PropTypes.func,
    setCurrGroupIndex: PropTypes.func,
    editTitle: PropTypes.func,
    delectService: PropTypes.func,
    applicationsMap: PropTypes.objectOf(PropTypes.object),
    allServicesByLabelGroup: PropTypes.objectOf(PropTypes.array),
    getAllServicesByLabelGroup: PropTypes.func,
    setCurrentSelectWidgetMap: PropTypes.func,
    addDesk: PropTypes.func,
    updateShadowCard:PropTypes.func
  };
  static defaultProps = {
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    history: {},
    isEdit: false,
    match: {},
    manageList: [],
    selectList: [],
    batchMoveModalDisplay: false,
    selectGroup: [],
    currEditonlyId: '',
    dragState: false,
    drag: '',
    currGroupIndex: 0,
    title: '',
    moveData: [],
    returnDefaultState: () => { },
    getManageList: () => { },
    moveGroup: () => { },
    moveService: () => { },
    setManageList: () => { },
    setEditState: () => { },
    emptySelectGroup: () => { },
    batchDelect: () => { },
    openBatchMove: () => { },
    addGroup: () => { },
    closeBatchMove: () => { },
    batchMove: () => { },
    delectGroup: () => { },
    renameGroup: () => { },
    moveTopGroup: () => { },
    moveBottomGroup: () => { },
    selectListActions: () => { },
    selectGroupActions: () => { },
    setEditonlyId: () => { },
    setDragInputState: () => { },
    setCurrGroupIndex: () => { },
    editTitle: () => { },
    delectService: () => { },
    applicationsMap: {},
    allServicesByLabelGroup: {},
    getAllServicesByLabelGroup: () => { },
    setCurrentSelectWidgetMap: () => { },
    addDesk: () => { },
    updateShadowCard: () => {}
  };

  constructor(props) {
    super(props);
    this.goToLocation = '';
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
      selectGroup,
      currEditonlyId,
      dragState,
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
      delectGroup,
      renameGroup,
      moveTopGroup,
      moveBottomGroup,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      setCurrGroupIndex,
      editTitle,
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
      selectGroup,
      currEditonlyId,
      dragState,
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
      delectGroup,
      renameGroup,
      moveTopGroup,
      moveBottomGroup,
      selectListActions,
      selectGroupActions,
      setEditonlyId,
      setDragInputState,
      setCurrGroupIndex,
      editTitle,
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
      languagesJSON: LanguagesJSON
    };
    return (
      <div className={`${win} home`}>
        <CreateManageModule {...manageReduxParams} {...manageOuterParams} />
      </div>
    );
  }
}

export default Manage;
