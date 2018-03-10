import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import { findPath } from '@u';
import { getOpenServiceData } from 'public/regMessageTypeHandler';
import actions from './actions';

const {
  setCurrent,
  setExpandedSidebar,
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
  popBrm,
  removeBrm,
  returnDefaultState,
  getServiceInfoWithDetail,
  setTabs,
  changeService,
  setProductInfo,
} = actions;

const defaultState = {
  domainName: '',
  expandedSidebar: false,
  current:{
    title: '',
    serviceCode: '',
    serviceId: '',
    hasRelationFunc: true,
    relationUsers: [],
    relationServices: [],
  },
  // 页面布局类型
  type: 1,
  menus:[],
  brm:[],
  brmBackIndex:-1,
  tabs:[],
  titleServiceType: false,
  pinType: false,       // 是否pin上
  pinDisplay: false,   // pin是否显示
  widthBrm: true,
};

function appendSearchParam(url, params) {
  if (url) {
    var urlObj = new URL(url);
    Object.keys(params).forEach((name) => {
      urlObj.searchParams.append(name, params[name]);
    });
    return urlObj.toString();
  }
  return url;
}

const reducer = handleActions({
  [addBrm]:(state, { payload:data })=> {
    let nowBrmLast = state.brm.length>0 ? state.brm[state.brm.length-1]:[];//brm的每一项都是一个数组，取最后一个
    let topBrm = [...nowBrmLast,data];//合并后的最新一个数组面包屑
    let newBrm = [...state.brm,topBrm]
    return {
      ...state,
      brm: newBrm
    };
  },
  [popBrm]:(state, { payload: index })=> {
    let newBrm = [...state.brm];
    let backVal;
    if(index == -1){
      newBrm.pop();
      backVal = 1;
    }else{
      let stateBrm = state.brm;
      let popBrmName = stateBrm[stateBrm.length-1][index].name;//面包屑一直展示的是brm的最后一个元素
      let item;
      for(let i = 0;i<stateBrm.length ; i++){
          item=stateBrm[i];
          if(item[item.length-1].name == popBrmName){
              backVal = stateBrm.length-1-i;
              for(let j =stateBrm.length-1-i ; j>0;--j) newBrm.pop();
              break;
          }
      }
    }
    return {
      ...state,
      brmBackIndex:backVal,
      brm: newBrm
    };
  },
  [removeBrm]: (state, { payload: length }) => {
    const newBrm = state.brm.slice(0, state.brm.length - length);
    const last = newBrm[newBrm.length - 1];
    newBrm[newBrm.length - 1] = {
      name: last.name,
    };
    return {
      ...state,
      brm: newBrm,
    }
  },
  [changeService]: (state, { payload: code }) => {
    const { menus, tabs } = state;
    const menuPath = findPath(menus, 'children', 'serviceCode', code);
    const current = menuPath.slice(-1)[0];
    if (!current) {
      return state;
    }
    const {
      menuItemId: currentId,
      menuItemName: name,
      service: {
        url,
      },
      serviceId,
      serviceCode,
    } = current;
    const curTab = tabs.find(({id}) => id === currentId);
    const brm = menuPath.map(({menuItemName: name}) => ({name}));
    if (curTab) {
      return {
        ...state,
        current: {
          ...defaultState.current,
          hasRelationFunc: state.current.hasRelationFunc,
          menuItemId: currentId,
          title: name,
          serviceCode,
          serviceId,
          url: curTab.location,
        },
        brm
      }
    } else {
      const location = appendSearchParam(url, {
        ...getOpenServiceData(serviceCode),
        serviceCode,
      });
      return {
        ...state,
        current: {
          ...defaultState.current,
          hasRelationFunc: state.current.hasRelationFunc,
          menuItemId: currentId,
          title: name,
          serviceCode,
          serviceId,
          url: location,
        },
        brm,
        tabs: [{
          id: currentId,
          serviceCode,
          name,
          location,
        }].concat(tabs)
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
  [getTitleService]: (state, { payload: serviceInfo, error }) => {
    if (error) {
      return state;
    }
    const {
      hasWidget,
      relationServices,
      relationUsers,
      serviceId,
    } = serviceInfo;
    const {
      current,
    } = state;

    let hasRelationFunc = true;
    if (!(relationServices && relationServices.length) &&
        !(relationUsers && relationUsers.length)) {
      hasRelationFunc = false;
    }
    return {
      ...state,
      pinType: hasWidget,
      current: {
        ...current,
        hasRelationFunc,
        relationUsers,
        relationServices,
      },
    };
  },
  [setProductInfo]: (state, { payload: productInfo}) => {
    const {
      curMenuBar: {
        single,
        hasTab,
        menuBarName: domainName,
        hasTopNav: widthBrm,
        menuItems: menus,
      },
      curService: {
        serviceName: title,
        hasWidget: pinType,
      },
    } = productInfo;
    let type = 1;
    if (!single) {
      type = 2;
    }
    if (hasTab) {
      type = 3;
    }
    return {
      ...state,
      menus,
      domainName,
      widthBrm,
      type,
      pinType,
      tabs: [],
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
