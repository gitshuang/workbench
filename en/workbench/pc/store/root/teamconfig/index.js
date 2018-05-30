import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getTeamInfo, // NoDictionary
  uploadApplication, // NoDictionary
  createTeam, // NoDictionary

  getUserList, // NoDictionaryuserlist api
  openManagerModal, // NoDictionary
  closeManagerModal, // NoDictionary
  userToAdmin, // NoDictionary
  adminToUser, // NoDictionary
  openRemoveModal, // NoDictionary
  closeRemoveModal, // NoDictionary
  removeUser, // NoDictionary
  changePage, // NoDictionary

  openUpgradeModal, // NoDictionary
  closeUpgradeModal, // NoDictionary

  openTransferModal, // NoDictionary
  closeTransferModal, // NoDictionary
  transferTeam, // NoDictionary

  openDismissModal, // NoDictionary
  closeDismissModal, // NoDictionary
  dismissTeam, // NoDictionary

  openExitModal, // NoDictionary
  closeExitModal, // NoDictionary
  exitTeam, // NoDictionary

  getAllApps, //  NoDictionary
} = actions;

const defaultState = {
  teamData: {}, //  NoDictionary NoDictionary
  managerModal: false, //  NoDictionary
  removeModal: false, //  NoDictionary
  upgradeModal: false, //  NoDictionary
  transferModal: false, //  NoDictionary
  dismissModal: false, //  NoDictionary
  exitModal: false, //  NoDictionary
  applicationlist: [], //  NoDictionary
  userList: {}, //  NoDictionary
  activePage: 1, //  NoDictionary
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
  [uploadApplication]: state => state,
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
