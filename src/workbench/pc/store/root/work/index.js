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
  returnDefaultState,
  getServeInfoWithDetail,
  setTabs,
  changeServe,
} = actions;


const defaultState = {
  domainName: '',
  expandedSidebar: false,
  current:{
    title: '',
    serveCode: '',
    serveId: '',
    hasRelationFunc: false,
    relationUsers: [],
    relationServes: [],
  },
  // 页面布局类型
  type: 1,
  menus:[],
  brm:[],
  tabs:[],
  titleServiceType: false,
  pinType: false,       // 是否pin上
  pinDisplay: false,   // pin是否显示
  widthBrm: true,
};

const reducer = handleActions({
  [addBrm]: (state, { payload: data }) => ({
    ...state,
    brm:state.brm.concat({
       name:data
    })
  }),
  [changeServe]: (state, { payload: { currentId, current, menuPath } }) => {
    const { tabs } = state;
    if (!current) {
      return state;
    }
    const {
      menuItemName: name,
      serve: {
        url,
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
          ...defaultState.current,
          menuItemId: currentId,
          title: name,
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
          ...defaultState.current,
          menuItemId: currentId,
          title: name,
          serveCode,
          serveId,
          url,
        },
        brm,
        tabs: tabs.concat({
          id: currentId,
          serveCode,
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
  [setTabs]: (state, { payload: tabs }) => ({
    ...state,
    tabs,
  }),
  [getTitleService]: (state, { payload: serveInfo, error }) => {
    if (error) {
      return state;
    }
    const {
      hasWidget,
      relationServes,
      relationUsers,
      serveId,
    } = serveInfo;
    const {
      current,
    } = state;

    let hasRelationFunc = false;
    if ((relationServes && relationServes.length) ||
        (relationUsers && relationUsers.length)) {
      hasRelationFunc = true;
    }
    return {
      ...state,
      pinType: hasWidget,
      current: {
        ...current,
        hasRelationFunc,
        relationUsers,
        relationServes,
      },
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
        relationUsers,
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
    const menuItemId = menu.menuItemId;
    const brm = menuPath.map(({menuItemName: name}) => ({name}));
    const hasRelationFunc = (
      (relationServes && relationServes.length) ||
      (relationUsers && relationUsers.length)
    );
    return {
      ...state,
      brm,
      menus,
      domainName,
      widthBrm,
      current:{
        menuItemId,
        title,
        serveCode,
        serveId,
        url,
        hasRelationFunc,
        relationServes,
        relationUsers,
      },
      tabs: [{
        id: menuItemId,
        serveCode,
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
  [returnDefaultState]: state => defaultState,
}, defaultState);

export default reducer;
