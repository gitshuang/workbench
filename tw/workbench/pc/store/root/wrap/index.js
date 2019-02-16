import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getServiceList,
  getPortal,
  openRoot,
  showTabs,
  addTabs,
  delTabs,
  closeTabs,
  openPin,
  closePin,
  getFolders,
  cancelFolders,
  setFolders,
  addFolders,
  getAllMenuList,
  getHistoryList,
  delHistory,
  delAllHistory,
  // 手动修改
  changeDelHistory,
  changeRetract,
} = actions;

const defaultState = {
  serviceList: [],
  portalInfo: {
    openStatus: false,
    portalUrl: ''
  },
  retract: true,  // header合并一个
  tabs: [],     // 多页签存储
  currItem: {}, // 当前页签的内容
  activeCarrier: 'home',  // 当前页签id
  pinDisplay: false,  // 是否显示 pin弹窗
  folders: [],        // 分组列表
  allMenuList: [],  // 菜单项
  historyList: [],  // 历史记录
};

const reducer = handleActions({
  [getServiceList]: (state, { payload: serviceList, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      serviceList,
    };
  },
  [getPortal]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      portalInfo: payload,
    };
  },
  [openRoot]: (state, { payload, }) => {
    return {
      ...state,
      activeCarrier: 'home',
      currItem: {},
    };
  },
  [showTabs]: (state, { payload, }) => {
    return {
      ...state,
      activeCarrier: payload.id,
      currItem: payload,
    };
  },
  [addTabs]: (state, { payload, }) => {
    let { tabs } = state;
    // if (tabs.length >= 20) {
    //   return {
    //     ...state,
    //   };
    // }

    // TODO生成了新数组 这样感觉造成的重绘现象比较严重， ？
    // const newTabs = tabs.filter(item => {
    //   return item.id !== payload.id;
    // });

    const cIndex = tabs.findIndex((item) => {
      return item.id === payload.id;
    });

    if (cIndex > -1 && tabs.length) {
      tabs.splice(cIndex, 1);
    }

    // 判断是否已经打开
    // if (cIndex > -1 && tabs.length) {
    //   // 判断payload 和 原来tabs中对应的数据是否相等   主要是看看是否需要更新tabs
    //   if (Object.is(tabs[cIndex], payload)) {
    //     return {
    //       ...state,
    //       activeCarrier: payload.id,
    //       currItem: payload
    //     }
    //   } else {
    //     // 判断位置 
    //     tabs.splice(cIndex, 1, payload);
    //     return {
    //       ...state,
    //       tabs: [...tabs],
    //       activeCarrier: payload.id,
    //       currItem: payload
    //     }
    //   }
    // }
    return {
      ...state,
      tabs: [payload, ...tabs],
      // tabs: [payload, ...newTabs],
      activeCarrier: payload.id,
      currItem: payload,
    };
  },
  [delTabs]: (state, { payload, }) => {
    const { tabs, activeCarrier } = state;
    const newTabs = tabs.filter((item) => {
      return item.id !== payload.id;
    });
    // 判断删除的是否是当前获取焦点的tabs
    if (payload.id === activeCarrier) {
      // 如果已经删除的长度大于0，就将第一个设定为active状态 ，否则直接回home
      if (newTabs.length) {
        return {
          ...state,
          tabs: newTabs,
          currItem: newTabs[0],
          activeCarrier: newTabs[0].id,
        }
      }
      return {
        ...state,
        tabs: newTabs,
        currItem: {},
        activeCarrier: 'home',
      }
    }
    // 不是焦点的直接删。
    return {
      ...state,
      tabs: newTabs,
    };
  },
  [closeTabs]: (state) => {
    return {
      ...state,
      tabs: [],
      activeCarrier: 'home',
      currItem: {},
    };
  },
  [openPin]: (state) => {
    return {
      ...state,
      pinDisplay: true
    };
  },
  [closePin]: (state) => {
    return {
      ...state,
      pinDisplay: false
    };
  },
  [getFolders]: (state, { error, payload: folders }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      folders,
    };
  },
  [cancelFolders]: (state, { error }) => {
    if (error) {
      return state;
    }
    const { currItem, tabs, activeCarrier } = state;
    currItem.hasWidget = false;
    const currIndex = tabs.findIndex(item => {
      return activeCarrier === item.id;
    });
    tabs[currIndex].hasWidget = false;
    return {
      ...state,
      currItem: { ...currItem },
      tabs: [...tabs],
    };
  },
  [setFolders]: (state, { error }) => {
    if (error) {
      return state;
    }
    const { currItem, tabs, activeCarrier } = state;
    currItem.hasWidget = true;
    const currIndex = tabs.findIndex(item => {
      return activeCarrier === item.id;
    });
    tabs[currIndex].hasWidget = true;
    return {
      ...state,
      currItem: { ...currItem },
      tabs: [...tabs],
    };
  },
  [addFolders]: (state, { error, payload }) => {
    const { folders } = state;
    if (error) {
      return state;
    }
    return {
      ...state,
      folders: [...folders, payload],
    };
  },
  [getAllMenuList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      allMenuList: payload,
    };
  },
  [getHistoryList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      historyList: payload,
    };
  },
  [delHistory]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
  },
  [changeDelHistory]: (state, { payload, error }) => {
    let { latestAccessIds } = payload;
    let newHistory = [].concat(state.historyList);

    for (let id of latestAccessIds) {
      newHistory.forEach(({ latestAccessId }, index) => {
        if (id === latestAccessId) {
          newHistory.splice(index, 1);
        }
      })
    }
    return {
      ...state,
      historyList: newHistory,
    };
  },
  [delAllHistory]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      historyList: [],
    };
  },
  [changeRetract]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      retract: !payload,
    };
  },
}, defaultState);

export default reducer;