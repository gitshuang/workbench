import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  uploadApplication,      // 图片上传
  createTeam,             // 保存
  changeIdentity,         // 更改用户身份
  openRemoveModal,        // 打开删除用户的弹窗
  closeRemoveModal,       // 关闭删除用户的弹窗     
  removeUser,             // 删除用户请求
  openUpgradeModal,       // 打开升级为企业弹窗 
  closeUpgradeModal,      // 关闭升级为企业弹窗 
} = actions;

const defaultState = {
  teamData : {},          // 保存成功之后 返回的团队信息
  removeModal: false,     // 删除弹窗的判断
  upgradeModal: false     //  升级为企业弹窗开关
};



const reducer = handleActions({
  // 
  [uploadApplication]: state => state,
  [createTeam]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      teamData: payload
    };
  },
  

  [changeIdentity]: state => state,

  [openRemoveModal]: (state) => ({
    ...state,
    removeModal: true
  }),
  [closeRemoveModal]: (state) => ({
    ...state,
    removeModal: false
  }),
  [removeUser]: (state, { payload, error }) => {
    if(error){
      return state;
    }
    return {
      ...state
    }
  },
  [openUpgradeModal]: (state) => ({
    ...state,
    upgradeModal: true
  }),
  [closeUpgradeModal]: (state) => ({
    ...state,
    upgradeModal: false
  }),
}, defaultState);

export default reducer;
