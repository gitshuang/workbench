import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setManageList,
  getManageList,
  addGroup,
  delectGroup,
  renameGroup,
  moveGroup,
  addFolder,
  delectFolder,
  renameFolder,
  splitFolder,
  addServe,
  delectServe,
  moveServe,
  } = actions;

const defaultState = {
  manageList : []
};

const reducer = handleActions({
  [setManageList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
  },
  [getManageList]: (state, { payload, error }) => {
    if (error) {
      return state;
    } else {
      return {
        ...state,
        manageList: payload,
      };
    }
  },
  [addGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;

    manageList.splice(index+1,0,{
      name: '默认分组',
      id: '',
      icon: '',
      "widgeList": [],
    });
    return{
      ...state,
      manageList: [...manageList],
    }
  },
  [delectGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;
    const newList =  manageList.filter((item,i) => {
      return index !== i;
    });
    if (!newList.length) {
      newList.push({
        name: '默认分组',
        id: '',
        icon: '',
        "widgeList": [],
      })
    }
    return{
      ...state,
      manageList: newList,
    }
  },
  [renameGroup]: (state, { payload: {name,index} }) => {
    let manageList = state.manageList;
    manageList[index].name = name;
    return{
      ...state,
      manageList,
    }
  },
  [moveGroup]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
  [addFolder]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
  [delectFolder]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
  [renameFolder]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
  [splitFolder]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
  [addServe]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
  [delectServe]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
  [moveServe]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
}, defaultState);

export default reducer;
