import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setMenus,
  setCurrent,
  setExpandedSidebar,
  getProductInfo,
  getTitleService,
  titleServiceDisplay,
  titleServiceHidden,
  pinDisplayBlock,
  pinDisplayNone,
  setPinAdd,
  setAddGroup,
  getPinGroup,
  setPinCancel,
  delTab,
  addBrm,
  returnDefaultState
} = actions;


const defaultState = {
  expandedSidebar: false,
  current:{
    name: '',
    hasRelationFunc: false,
  },
  menus:[],
  brm:[
     {name:"财务"},
     {name:"人员"}
  ],
  tabs:[],
  titleServiceList: [],
  titleServiceType: false,
  pinType: false,
  pinDisplay: false
};

const findMenuById = (menus, curId) => {
  let result;
  for (let i = 0, l = menus.length; i < l; i++) {
    const menu = menus[i];
    const { id, children } = menu;
    if (children && children.length) {
      result = findMenuById(children, curId);
    }
    if (result) {
      break;
    }
    if (id === curId) {
      result = menu;
      break;
    }
  }
  return result;
}

const reducer = handleActions({
  [setMenus]: (state, { payload: menus }) => ({
    ...state,
    menus,
  }), 
  [addBrm]: (state, { payload: data }) => ({
    ...state,
    brm:state.brm.concat({
       name:data
    })
  }),
  [setCurrent]: (state, { payload: currentId }) => {
    const { tabs, menus } = state;
    const current = findMenuById(menus, currentId);
    if (!current) {
      return state;
    }
    const { name, location } = current
    const curTab = tabs.find(({id}) => id === currentId);
    
    let brm = [];
    current.parent.map(function(da,i){
        brm.push({name:da.name});
    })
    console.log("brm.length " + brm.length);
    
    if (curTab) {
      return {
        ...state,
        current,
        brm
      }
    } else {
      return {
        ...state,
        current,
        brm,
        tabs: tabs.concat({
          id: currentId,
          name,
          location,
        })
      }
    }
  },
  [setExpandedSidebar]: (state, { payload: expandedSidebar }) => ({
    ...state,
    expandedSidebar,
  }),
  [setPinAdd]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      pinType: true,
    };
  },
  [setAddGroup]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
  },
  [getPinGroup]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
  },
  [setPinCancel]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      pinType: payload,
    };
  },
  [delTab]: (state, { payload: currentId }) => {
    const { tabs: oldTabs, menus } = state;
    let newCurIndex;
    const newTabs = oldTabs.filter(({ id }, i) => {
      const result = id !== currentId;
      if (!result) {
        newCurIndex = i;
        if (newCurIndex + 1 === oldTabs.length) {
          newCurIndex -= 1;
        }
      }
      return result;
    });
    const newCur = findMenuById(menus, newTabs[newCurIndex].id);

    return {
      ...state,
      tabs: newTabs,
      current: newCur,
    }
  },
  [getProductInfo]: state => state,
  [getTitleService]: (state, { payload: titleServiceList, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      titleServiceList,
    };
  },
  [titleServiceDisplay]: state => ({
    ...state,
    titleServiceType: true,
  }),
  [titleServiceHidden]: state => ({
    ...state,
    titleServiceType: false,
  }),
  [pinDisplayBlock]: state => ({
    ...state,
    pinDisplay: true,
  }),
  [pinDisplayNone]: state => ({
    ...state,
    pinDisplay: false,
  }),
  [returnDefaultState]:state => defaultState
}, defaultState);

export default reducer;
