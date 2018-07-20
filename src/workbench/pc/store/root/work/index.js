import { handleActions } from 'redux-actions';
import { findPath } from '@u';
import { getOpenServiceData } from 'public/regMessageTypeHandler';
import actions from './actions';

const {
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
  addBrm,
  popBrm,
  removeBrm,
  returnDefaultState,
  setTabs,
  changeService,
  setProductInfo,
} = actions;

const defaultState = {
  domainName: '',
  expandedSidebar: true,
  current: {
    title: '',
    serviceCode: '',
    serviceId: '',
    hasRelationFunc: true,
    relationUsers: [],
    relationServices: [],
  },
  // 页面布局类型
  type: 1,
  menus: [],
  brm: [],
  brmBackVal: -1,
  tabs: [],
  titleServiceType: false,
  pinType: false, // 是否pin上
  pinDisplay: false, // pin是否显示
  widthBrm: true,
  backUrl: [],
};

function appendSearchParam(url, params) {
  if (url) {
    const urlObj = new URL(url);
    Object.keys(params).forEach((name) => {
      urlObj.searchParams.append(name, params[name]);
    });
    return urlObj.toString();
  }
  return url;
}

const reducer = handleActions({
  [addBrm]: (state, { payload: data }) => {
    const nowBrmLast = state.brm.length > 0 ?
      state.brm[state.brm.length - 1] :
      []; // brm的每一项都是一个数组，取最后一个
    /* 20180514修改一个浏览器的返回 再addBrm的问题 数组最后的name重复 */
    let topBrm;
    let newBrm;
    data.addBrm = true;
    if (nowBrmLast.length > 0 && data.name === nowBrmLast[nowBrmLast.length - 1].name) {
      state.brm[state.brm.length - 1][nowBrmLast.length - 1] = data;
      newBrm = [...state.brm];
    } else {
      topBrm = [...nowBrmLast, data];// 合并后的最新一个数组面包屑
      newBrm = [...state.brm, topBrm];
    }
    return {
      ...state,
      brm: newBrm,
    };
  },
  [popBrm]: (state, { payload: data }) => {
    const newBrm = [...state.brm];
    let backVal;
    const { index } = data;
    if (index === -1) {
      newBrm.pop();
      // delete newBrm[newBrm.length-1];
      backVal = 1;
    } else {
      const stateBrm = state.brm;
      const popBrmName = stateBrm[stateBrm.length - 1][index].name;// 面包屑一直展示的是brm的最后一个元素
      let item;
      for (let i = 0; i < stateBrm.length; i += 1) {
        item = stateBrm[i];
        if (item[item.length - 1].name === popBrmName) {
          backVal = stateBrm.length - 1 - i;
          for (let j = stateBrm.length - 1 - i; j > 0; --j) newBrm.pop();  // eslint-disable-line
          break;
        }
      }
    }
    return {
      ...state,
      brmBackVal: backVal,
      brm: JSON.parse(JSON.stringify(newBrm)),
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
    };
  },
  [changeService]: (state, { payload: code }) => {
    const { menus, tabs, backUrl } = state;
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
    const curTab = tabs.find(({ id }) => id === currentId);
    const newBrm = [];
    menuPath.map(item =>
      newBrm.push({ name: item.menuItemName, url: item.service && item.service.url }));
    const brm = state.brm && state.brm.length ? [...state.brm, newBrm] : [newBrm];
    if (backUrl[backUrl.length - 1] !== serviceCode) {
      backUrl.push(serviceCode);
    }
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
        brm,
        backUrl
      };
    }
    // 此处更改了url
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
      backUrl,
      tabs: [{
        id: currentId,
        serviceCode,
        name,
        location,
      }].concat(tabs),
    };
  },
  [setExpandedSidebar]: (state, { payload: expandedSidebar }) => ({
    ...state,
    expandedSidebar,
  }),
  [setPinAdd]: (state, { error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      pinType: true,
    };
  },
  [setAddGroup]: (state, { error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
  },
  [getPinGroup]: (state, { error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
  },
  [setPinCancel]: (state, { error }) => {
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
  [setProductInfo]: (state, { payload: productInfo }) => {
    const {
      curMenuBar: {
        single,
        hasTab,
        menuBarName: domainName,
        hasTopNav: widthBrm,
        menuItems: menus,
        workspaceStyle
      },
      curService: {
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
    if (workspaceStyle && workspaceStyle === 'acc') {
      type = 4;
    }
    return {
      ...state,
      menus,
      domainName,
      widthBrm,
      type,
      pinType,
      tabs: [],
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
  [returnDefaultState]: () => defaultState,
}, defaultState);

export default reducer;
