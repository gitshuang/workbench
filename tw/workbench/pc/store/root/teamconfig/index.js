import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getTeamInfo, // 获取团队基础信息
  createTeam, // 保存

  getUserList, // 获取userlist api
  openManagerModal, // 打开用户升级管理员弹窗
  closeManagerModal, // 关闭用户升级管理员弹窗
  userToAdmin, // 用户升级管理员
  adminToUser, // 管理员降级用户
  openRemoveModal, // 打开删除用户的弹窗
  closeRemoveModal, // 关闭删除用户的弹窗
  removeUser, // 删除用户请求
  changePage, // 点击分页更改页数

  openUpgradeModal, // 打开升级为企业弹窗
  closeUpgradeModal, // 关闭升级为企业弹窗

  openTransferModal, // 打开移交团队弹窗
  closeTransferModal, // 关闭移交团队弹窗
  transferTeam, // 移交团队

  openDismissModal, // 打开解散团队弹窗
  closeDismissModal, // 关闭解散团队弹窗
  dismissTeam, // 解散团队

  openExitModal, // 打开退出团队弹窗
  closeExitModal, // 关闭退出团队弹窗
  exitTeam, // 退出团队

  getAllApps, //  获取所有应用
} = actions;

const defaultState = {
  teamData: {}, //  保存成功之后 返回的团队信息
  managerModal: false, //  升级管理员弹窗开关
  removeModal: false, //  删除弹窗开关
  upgradeModal: false, //  升级为企业弹窗开关
  transferModal: false, //  移交团队弹窗开关
  dismissModal: false, //  解散团队弹窗开关
  exitModal: false, //  退出团队弹窗开关
  applicationlist: [], //  应用列表
  userList: {}, //  用户列表
  activePage: 1, //  当前页数
  exitTeamMsg: '',
  dismissTeamMsg: '',
};


const reducer = handleActions({
  //
  [getTeamInfo]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      teamData: payload,
    };
  },
  [createTeam]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      teamData: payload,
    };
  },
  [getUserList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      userList: payload,
    };
  },
  [openManagerModal]: state => ({
    ...state,
    managerModal: true,
  }),
  [closeManagerModal]: state => ({
    ...state,
    managerModal: false,
  }),
  [userToAdmin]: state => state,
  [adminToUser]: state => state,

  [openRemoveModal]: state => ({
    ...state,
    removeModal: true,
  }),
  [closeRemoveModal]: state => ({
    ...state,
    removeModal: false,
  }),
  [removeUser]: (state, { error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
  },
  [changePage]: (state, { payload: eventKey }) => ({
    ...state,
    activePage: eventKey,
  }),

  [openUpgradeModal]: state => ({
    ...state,
    upgradeModal: true,
  }),
  [closeUpgradeModal]: state => ({
    ...state,
    upgradeModal: false,
  }),

  [openTransferModal]: state => ({
    ...state,
    transferModal: true,
  }),
  [closeTransferModal]: state => ({
    ...state,
    transferModal: false,
  }),
  [transferTeam]: (state, { error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
  },

  [openDismissModal]: state => ({
    ...state,
    dismissModal: true,
  }),
  [closeDismissModal]: state => ({
    ...state,
    dismissModal: false,
  }),
  [dismissTeam]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      dismissTeamMsg: payload,
    };
  },

  [openExitModal]: state => ({
    ...state,
    exitModal: true,
  }),
  [closeExitModal]: state => ({
    ...state,
    exitModal: false,
  }),
  [exitTeam]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      exitTeamMsg: payload,
    };
  },
  [getAllApps]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      applicationlist: payload,
    };
  },
}, defaultState);

export default reducer;
