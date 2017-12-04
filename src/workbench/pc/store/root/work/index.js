import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import { findPath } from '@u';
import actions from './actions';

const {
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
  domainName: '',
  expandedSidebar: false,
  current:{
    title: '',
    serveCode: '',
    serveId: '',
    hasRelationFunc: false,
  },
  // 页面布局类型
  type: 1,
  menus:[],
  brm:[],
  tabs:[],
  titleServiceList: [],
  titleServiceType: false,
  pinType: false,       // 是否pin上
  pinDisplay: false,   // pin是否显示
  widthBrm: true,
};

const getBrmById = (menus, curId) => {
  let finded = false;
  let result = [];
  function loop (menus) {
    if (finded) {
      return;
    }
    for (let i = 0, l = menus.length; i < l; i++) {
      const menu = menus[i];
      const { menuItemId: id, menuItemName: name, children } = menu;
      if (id === curId) {
        finded = true;
        break;
      }
      if (children && children.length) {
        result.push({name});
        loop(children, curId);
      }
    }
    if (!finded) {
      result.pop();
    }
  }
  loop(menus);
  return result;
}

const reducer = handleActions({
  [addBrm]: (state, { payload: data }) => ({
    ...state,
    brm:state.brm.concat({
       name:data
    })
  }),
  [setCurrent]: (state, { payload: currentId }) => {
    const { tabs, menus } = state;
    const menuPath = findPath(menus, 'children', 'menuItemId', currentId);
    const current = menuPath.slice(-1)[0];
    if (!current) {
      return state;
    }
    const {
      menuItemName: name,
      serve: {
        url,
        relationServes,
      },
      serveId,
      serveCode,
    } = current;

    const curTab = tabs.find(({id}) => id === currentId);
    const brm = menuPath.map(({menuItemName: name}) => ({name}));

    if (curTab) {
      return {
        ...state,
        current: {
          menuItemId: currentId,
          title: name,
          hasRelationFunc: relationServes,
          serveCode,
          serveId,
          url,
        },
        brm
      }
    } else {
      return {
        ...state,
        current:{
          menuItemId: currentId,
          title: name,
          hasRelationFunc: relationServes,
          serveCode,
          serveId,
          url,
        },
        brm,
        tabs: tabs.concat({
          id: currentId,
          name,
          location: url,
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
      pinType: false,
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
    const menuItemId = newTabs[newCurIndex].id;
    const menuPath = findPath(menus, 'children', 'menuItemId', menuItemId);
    const newCur = menuPath.slice(-1)[0];
    const brm = menuPath.map(({menuItemName: name}) => ({name}));
    const {
      menuItemName: name,
      serve: {
        url,
        relationServes,
      },
      serveId,
      serveCode,
    } = newCur;

    return {
      ...state,
      tabs: newTabs,
      brm,
      current:{
        menuItemId,
        title: name,
        hasRelationFunc: relationServes,
        serveCode,
        serveId,
        url,
      },
    }
  },
  [getTitleService]: (state, { payload: titleServiceList, error }) => {
    return {
      ...state,
      titleServiceList,
    };
  },
  [getProductInfo]: (state, { payload: productInfo, error}) => {
    if (error) {
      return state;
    }
    const {
      curMenuBar: {
        single,
        hasTab,
        menuBarName: domainName,
        hasTopNav: widthBrm,
        menuItems: menus,
      },
      curServe: {
        serveName: title,
        relationServes,
        hasWidget: pinType,
        serveCode,
        serveId,
        url,
      },
    } = productInfo;
    let type = 1;
    if (!single) {
      type = 2;
    }
    if (hasTab) {
      type = 3;
    }
    const menuPath = findPath(menus, 'children', 'serveId', serveId);
    const menu = menuPath.slice(-1)[0];
    const brm = menuPath.map(({menuItemName: name}) => ({name}));
    return {
      ...state,
      brm,
      menus,
      domainName,
      widthBrm,
      current:{
        menuItemId: menu && menu.menuItemId,
        title,
        hasRelationFunc: relationServes,
        serveCode,
        serveId,
        url,
      },
      tabs: [{
        id: menu && menu.menuItemId,
        name: title,
        location: url,
      }],
      type,
      pinType,
    }
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
