import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getTeamInfo, // $i18n{index.js0}$i18n-end
  uploadApplication, // $i18n{index.js1}$i18n-end
  createTeam, // $i18n{index.js2}$i18n-end

  getUserList, // $i18n{index.js3}$i18n-enduserlist api
  openManagerModal, // $i18n{index.js4}$i18n-end
  closeManagerModal, // $i18n{index.js5}$i18n-end
  userToAdmin, // $i18n{index.js6}$i18n-end
  adminToUser, // $i18n{index.js7}$i18n-end
  openRemoveModal, // $i18n{index.js8}$i18n-end
  closeRemoveModal, // $i18n{index.js9}$i18n-end
  removeUser, // $i18n{index.js10}$i18n-end
  changePage, // $i18n{index.js11}$i18n-end

  openUpgradeModal, // $i18n{index.js12}$i18n-end
  closeUpgradeModal, // $i18n{index.js13}$i18n-end

  openTransferModal, // $i18n{index.js14}$i18n-end
  closeTransferModal, // $i18n{index.js15}$i18n-end
  transferTeam, // $i18n{index.js16}$i18n-end

  openDismissModal, // $i18n{index.js17}$i18n-end
  closeDismissModal, // $i18n{index.js18}$i18n-end
  dismissTeam, // $i18n{index.js19}$i18n-end

  openExitModal, // $i18n{index.js20}$i18n-end
  closeExitModal, // $i18n{index.js21}$i18n-end
  exitTeam, // $i18n{index.js22}$i18n-end

  getAllApps, //  $i18n{index.js23}$i18n-end
} = actions;

const defaultState = {
  teamData: {}, //  $i18n{index.js24}$i18n-end $i18n{index.js25}$i18n-end
  managerModal: false, //  $i18n{index.js26}$i18n-end
  removeModal: false, //  $i18n{index.js27}$i18n-end
  upgradeModal: false, //  $i18n{index.js28}$i18n-end
  transferModal: false, //  $i18n{index.js29}$i18n-end
  dismissModal: false, //  $i18n{index.js30}$i18n-end
  exitModal: false, //  $i18n{index.js31}$i18n-end
  applicationlist: [], //  $i18n{index.js32}$i18n-end
  userList: {}, //  $i18n{index.js33}$i18n-end
  activePage: 1, //  $i18n{index.js34}$i18n-end
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
