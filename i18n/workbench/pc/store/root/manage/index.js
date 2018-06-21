import { handleActions } from 'redux-actions';
import update from 'react/lib/update';
import { guid, avoidSameName } from '@u';
import actions from './actions';

const {
  setManageList,
  getManageList,
  addDesk,
  batchDelect,
  batchMove,
  selectGroupActions,
  selectListActions,
  addGroup,
  delectGroup,
  renameGroup,
  moveGroup,
  stickGroup,
  moveTopGroup,
  moveBottomGroup,
  addFolder,
  setFolderEdit,
  deleteFolder,
  renameFolder,
  splitFolder,
  addService,
  delectService,
  moveService,
  openFolder,
  closeFolder,
  getAllServicesByLabelGroup,
  setCurrentSelectWidgetMap,
  openBatchMove,
  closeBatchMove,
  setEditState,
  cancelFolderEdit,
  setCurrGroupIndex,
  editTitle,
  setEditonlyId,
  returnDefaultState,
  setDragInputState,
  emptySelectGroup,
} = actions;

const defaultState = {
  curEditFolderId: '',
  manageList: [],
  isEdit: false,
  isFocus: false,
  curDisplayFolder: {
    widgetName: '',
    children: [],
  },
  folderModalDisplay: false,
  batchMoveModalDisplay: false,
  selectList: [], // 勾选的服务列表
  // selectWidgetList:[],
  selectGroup: [],
  currGroupIndex: 0,
  currentSelectWidgetMap: {},
  title: '',
  currEditonlyId: '',

  applicationsMap: {},
  // selectWidgetItem:true,
  allServicesByLabelGroup: {},

  dragState: true, // 是否可拖拽
};

const findTreeById = (data, curId) => {
  let result;
  for (let i = 0, l = data.length; i < l; i += 1) {
    const menu = data[i];
    const { id, children } = menu;
    if (children && children.length) {
      result = findTreeById(children, curId);
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
};
// 定义上下移动数组
function swapItems(arr, index1, index2) {
  arr[index1] = [arr.splice(index2, 1, arr[index1])];
  return arr;
}
const defaultGroup = {
  widgetName: '',
  type: 1,
  children: [],
  isNew: true,
};

// 递归查找
let data;
function findById(manageList, id) {
  for (let i = 0; i < manageList.length; i++) {
    if (manageList[i].widgetId && manageList[i].widgetId === id) {
      data = manageList[i];
      break;
    } else {
      manageList[i].children && findById(manageList[i].children, id);
    }
  }
  return data;
}

function setDefaultSelected(manageList, applicationsMap) {
  manageList.forEach((da) => {
    if (da && da.type === 3) { // 表示服务和应用
      if (applicationsMap[da.serviceId]) {
        applicationsMap[da.serviceId].selected = '1';
      }
    } else if (da.children && da.children != 0) {
      setDefaultSelected(da.children, applicationsMap);
    }
  });
}

const reducer = handleActions({

  [setManageList]: (state, { payload, error }) =>
    ({
      ...state,
      selectWidgetItem: true,
    }),
  // return state;

  [setDragInputState]: (state, { payload: dragState }) => ({
    ...state,
    dragState,
  }),
  [getManageList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      manageList: payload.workList,
      currEditonlyId: '',
    };
  },
  [addDesk]: (state, { payload: data }) => {
    const { dataList, parentId } = data;
    dataList.forEach((da) => {
      da.parentId = parentId;
      da.type = 3;
      da.size = 1;
      da.widgetId = da.serviceId;
      da.widgetName = da.serviceName;
      da.serviceCode = da.serviceCode;
      da.icon = da.serviceIcon;
      da.size = da.widgetTemplate.size;
      da.serviceType = da.widgetTemplate.serviceType;
    });
    state.manageList.forEach((da, i) => {
      if (da.widgetId == parentId) {
        da.children = [...da.children, ...dataList];
      }
    });
    const newManageList = JSON.parse(JSON.stringify(state.manageList));
    return {
      ...state,
      manageList: newManageList,
      isEdit: true,
    };
  },
  [getAllServicesByLabelGroup]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    const applicationsMap = {};
    payload.applications.forEach((da, i) => {
      applicationsMap[da.applicationId] = da;
      da.service.forEach((serviceDa, j) => {
        applicationsMap[serviceDa.serviceId] = serviceDa;
      });
    });
    setDefaultSelected(state.manageList, applicationsMap);
    return {
      ...state,
      applicationsMap,
      allServicesByLabelGroup: payload,
    };
  },
  [setCurrentSelectWidgetMap]: (state, { payload, error }) => ({
    ...state,
  }),
  [batchDelect]: (state, { payload }) => {
    let manageList = state.manageList;
    // 选中之后将id 都放到这个组中
    const selectList = state.selectList;
    const newList = [];
    manageList.forEach(({ children }) => {
      for (var i = 0, flag = true, len = children.length; i < len; flag ? i++ : i) {
        selectList.forEach((select) => {
          if (children[i] && children[i].widgetId === select) {
            children.splice(i, 1);
            flag = false;
          } else {
            flag = true;
          }
        });
      }
    });
    manageList = JSON.parse(JSON.stringify(manageList));
    return {
      ...state,
      manageList,
      selectList: [],
      selectGroup: [],
      isEdit: true,
      currEditonlyId: '',
    };
  },
  [batchMove]: (state, { payload: toGroupIndex }) => {
    let manageList = state.manageList;
    // 选中之后将id 都放到这个组中
    const selectList = state.selectList;
    const newList = [];
    manageList.forEach(({ children }) => {
      for (var i = 0, flag = true, len = children.length; i < len; flag ? i++ : i) {
        selectList.forEach((select) => {
          if (children[i] && children[i].widgetId === select) {
            newList.push(children[i]);
            children.splice(i, 1);
            flag = false;
          } else {
            flag = true;
          }
        });
      }
    });
    newList.forEach((item) => {
      manageList[toGroupIndex].children.push(item);
    });
    manageList = JSON.parse(JSON.stringify(manageList));
    return {
      ...state,
      manageList,
      selectList: [],
      selectGroup: [],
      isEdit: true,
      currEditonlyId: '',
    };
  },
  [selectGroupActions]: (state, { payload: selectGroup }) => ({
    ...state,
    selectGroup: [...selectGroup],
    currEditonlyId: '',
  }),
  [selectListActions]: (state, { payload: selectList }) => ({
    ...state,
    selectList,
    currEditonlyId: '',
  }),
  [addGroup]: (state, { payload: { index, widgetId, widgetName = '' } }) => {
    const manageList = state.manageList;
    const newGroup = {
      ...defaultGroup,
      widgetId: widgetId || guid(),
      widgetName,
      children: [],
    };
    manageList.splice(index + 1, 0, newGroup);
    return {
      ...state,
      manageList: [...manageList],
      selectGroup: [],
      selectList: [],
      isEdit: true,
      currEditonlyId: newGroup.widgetId,
    };
  },
  [delectGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;
    const newList = manageList.filter((item, i) => index !== i);
    /* if (!newList.length) {
      newList.push({
        ...defaultGroup,
        children: [],
      })
    } */
    const children = manageList[index].children;
    children.forEach((da, i) => {
      delete state.currentSelectWidgetMap[da.widgetId];
    });
    return {
      ...state,
      manageList: newList,
      selectGroup: [],
      selectList: [],
      isEdit: true,
      currEditonlyId: '',
      currentSelectWidgetMap: state.currentSelectWidgetMap,
    };
  },
  [setCurrGroupIndex]: (state, { payload: index }) => ({
    ...state,
    currGroupIndex: index,
    // currEditonlyId:""
  }),
  [renameGroup]: (state, {
    payload: {
      name, index, id, dontChangeCurrEditonlyId,
    },
  }) => {
    const manageList = state.manageList;
    let group;
    let currEditonlyId;
    if (typeof id !== 'undefined') {
      group = manageList.find(({ widgetId }) => widgetId === id);
    } else if (typeof index !== 'undefined') {
      group = manageList[index];
    }
    if (dontChangeCurrEditonlyId) {
      currEditonlyId = state.currEditonlyId;
    } else {
      currEditonlyId = '';
    }
    group.widgetName = name;
    group.isNew = false;
    return {
      ...state,
      manageList,
      isEdit: true,
      currEditonlyId,
    };
  },
  [moveGroup]: (state, { payload: { id, afterId } }) => {
    let manageList = state.manageList;
    const item = manageList.filter(({ widgetId }) => widgetId === id)[0];
    const afterItem = manageList.filter(({ widgetId }) => widgetId === afterId)[0];
    const itemIndex = manageList.indexOf(item);
    const afterIndex = manageList.indexOf(afterItem);

    manageList = update(manageList, {
      $splice: [
        [itemIndex, 1],
        [afterIndex, 0, item],
      ],
    });
    // 深拷贝
    // manageList = JSON.parse(JSON.stringify(manageList));

    return {
      ...state,
      isEdit: true,
      selectGroup: [],
      selectList: [],
      manageList,
      currEditonlyId: '',
    };
  },
  [stickGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;
    const curr = manageList[index];
    const newList = manageList.filter((item, i) => index !== i);
    newList.unshift(curr);
    return {
      ...state,
      manageList: newList,
      isEdit: true,
      currEditonlyId: '',
    };
  },
  [moveTopGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;
    const newList = swapItems(manageList, index, index - 1);
    return {
      ...state,
      manageList: [...newList],
      selectGroup: [],
      selectList: [],
      isEdit: true,
      currEditonlyId: '',
    };
  },
  [moveBottomGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;
    const newList = swapItems(manageList, index, index + 1);
    return {
      ...state,
      manageList: [...newList],
      selectGroup: [],
      selectList: [],
      isEdit: true,
      currEditonlyId: '',
    };
  },
  [addFolder]: (state, {
    payload: {
      groupIndex, id, preParentId, preType, afterId, parentId, afterType,
    },
  }) => {
    const { manageList } = state;
    if (groupIndex === '') {
      groupIndex = manageList.findIndex((value, index, arr) => value.widgetId === parentId);
    }
    const group = manageList[groupIndex];
    const newId = guid();
    let num = 1;
    group.children.forEach((da, i) => {
      da.type === 2 && (num++);
    });
    const _fileName = group.children ? (num) : 1;

    const folderNameArr = [];
    const nameArr = manageList.forEach((group, k) => {
      group.children.forEach((v, k) => {
        v.type === 2 && folderNameArr.push(v.widgetName);
      });
    });
    const newFolderName = avoidSameName(folderNameArr, '$i18n{index.js0}$i18n-end');
    const newdefaultFolder = {
      type: 2,
      widgetName: newFolderName, // "文件夹"+_fileName,
      children: [],
    };
    const temp = {
      ...newdefaultFolder,
      widgetId: newId,
      parentId: group.widgetId,
    };
    // group.children = group.children.concat({
    //   ...newdefaultFolder,
    //   widgetId: newId,
    //   parentId:group.widgetId,
    // });
    // 拖拽创建文件夹
    if (typeof afterId !== 'undefined') {
      const dataAfter = findById(manageList, afterId);
      group.children.splice(group.children.indexOf(dataAfter), 0, temp);
      const dataPre = findById(manageList, id);
      // let dataAfter = findById(manageList,afterId);
      const groupData = findById(manageList, newId);
      dataPre.parentId = groupData.widgetId;
      dataAfter.parentId = groupData.widgetId;
      // 放进文件夹
      groupData.children.push(dataPre);
      groupData.children.push(dataAfter);
      // 给文件夹赋值parentId
      typeof groupData.parentId === 'undefined' && (groupData.parentId = parentId);
      if (preParentId !== parentId) {
        const dataPreParent = findById(manageList, preParentId);
        const dataAfterParent = findById(manageList, parentId);
        // 删掉
        dataPreParent.children.splice(dataPreParent.children.indexOf(dataPre), 1);
        dataAfterParent.children.splice(dataAfterParent.children.indexOf(dataAfter), 1);
      } else {
        // 删掉
        group.children.splice(group.children.indexOf(dataPre), 1);
        group.children.splice(group.children.indexOf(dataAfter), 1);
      }
    } else {
      group.children.push(temp);
    }
    manageList.splice(groupIndex, 1, {
      ...group,
    });
    return {
      ...state,
      curEditFolderId: newId,
      isEdit: true,
      manageList: [...manageList],
      currEditonlyId: newId,
    };
  },
  [deleteFolder]: (state, { payload: folderId }) => {
    const { manageList } = state;
    let groupIndex;
    let widgetIndex;
    if (
      !manageList.some((group, i) => {
        groupIndex = i;
        return group.children.some(({ widgetId }, j) => {
          widgetIndex = j;
          return folderId === widgetId;
        });
      })
    ) {
      return state;
    }
    const group = manageList[groupIndex];
    group.children.splice(widgetIndex, 1);
    group.children = [...group.children];
    manageList.splice(groupIndex, 1, {
      ...group,
    });
    delete state.currentSelectWidgetMap[folderId];
    return {
      ...state,
      isEdit: true,
      manageList: [...manageList],
      currEditonlyId: '',
      currentSelectWidgetMap: state.currentSelectWidgetMap,
    };
  },
  [setFolderEdit]: (state, { payload: curEditFolderId }) => ({
    ...state,
    curEditFolderId,
  }),
  [cancelFolderEdit]: (state, { payload: cnaceFolder }) => {
    const { manageList } = state;
    return {
      ...state,
      curEditFolderId: false,
      manageList: [...manageList],
      currEditonlyId: '',
    };
  },
  [renameFolder]: (state, { payload: { id: folderId, value: newName } }) => {
    const { manageList } = state;
    let groupIndex;
    let widgetIndex;
    if (
      !manageList.some((group, i) => {
        groupIndex = i;
        return group.children.some(({ widgetId }, j) => {
          widgetIndex = j;
          return folderId === widgetId;
        });
      })
    ) {
      return state;
    }
    const group = manageList[groupIndex];
    const folder = group.children[widgetIndex];
    group.children.splice(widgetIndex, 1, {
      ...folder,
      widgetName: newName,
    });
    group.children = [...group.children];
    manageList.splice(groupIndex, 1, {
      ...group,
    });

    return {
      ...state,
      isEdit: true,
      curEditFolderId: false,
      manageList: [...manageList],
      currEditonlyId: '',
    };
  },
  [splitFolder]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
    currEditonlyId: '',
  }),
  [addService]: (state, { payload: { index: groupIndex, service } }) => {
    const { manageList } = state;
    const group = manageList[groupIndex];
    group.children = group.children.concat(service);
    manageList.splice(groupIndex, 1, {
      ...group,
    });
    return {
      ...state,
      isEdit: true,
      manageList: [...manageList],
      currEditonlyId: '',
    };
  },
  [delectService]: (state, { payload: { index, folder, widgetId } }) => {
    const manageList = state.manageList;
    let curDisplayFolder = state.curDisplayFolder;

    curDisplayFolder.children.forEach((item, index) => {
      if (widgetId == item.widgetId) {
        return curDisplayFolder.children.splice(index, 1);
      }
    });
    curDisplayFolder.children = [...curDisplayFolder.children];
    /* manageList[index].children.forEach((item,key)=>{
      if ( item.widgetId == folder ){
        item.children.forEach((list,i)=>{
          if(list.widgetId == widgetId){
            return manageList[index][key].splice(i,1);
          }
        })
      }
    }); */
    curDisplayFolder = JSON.parse(JSON.stringify(curDisplayFolder));
    return {
      ...state,
      isEdit: true,
      manageList: [...manageList],
      curDisplayFolder,
      currEditonlyId: '',
    };
  },
  [editTitle]: (state, { payload: { id, name } }) => {
    const manageList = state.manageList;
    // manageList = JSON.parse(JSON.stringify(manageList));
    return {
      ...state,
      title: name,
      drag: 'zoomIn',
      // manageList,
      manageList: [...manageList],
      currEditonlyId: '',
      // manageList: [...manageList],
    };
  },
  [moveService]: (state, {
    payload: {
      id, preParentId, preType, afterId, parentId, afterType, ifIntoFile, timeFlag,
    },
  }) => {
    function isSameParent(preParentId, parentId) {
      return preParentId == parentId;
    }
    function compareIndex(manageAllList, id, afterId, preParentId, parentId) {
      let parentData = {},
        curIndex = 0,
        afterIndex = 0;
      if (preParentId == parentId) {
        parentData = findById(manageAllList, preParentId);
      }
      parentData.children.forEach((v, k) => {
        if (v.widgetId == id) {
          curIndex = k;
        }
        if (v.widgetId == afterId) {
          afterIndex = k;
        }
      });
      return curIndex < afterIndex;
    }
    const manageAllList = state.manageList;
    const sourceData = preParentId && findById(manageAllList, preParentId); // 拖拽前 父级源对象
    const targetData = parentId && findById(manageAllList, parentId); // 拖拽后 父级目标对象
    const preParentType = sourceData.type;
    const afterParentType = targetData.type;
    // 判断是否为文件夹里面元素拖拽
    let manageList = (preParentType === 2 && afterParentType === 2 && preType === 3 && afterType === 3) ? [sourceData] : manageAllList;
    const itemIn = findById(manageAllList, id);
    const itemAfter = findById(manageAllList, afterId);
    if (preType === 3 && afterType === 2 && timeFlag) {
      // 从外面拖入文件夹里面
      sourceData.children.splice(sourceData.children.indexOf(itemIn), 1); // 删掉
      if (preParentId !== afterId) {
        itemIn.parentId = afterId;
      }
      itemAfter.children.push(itemIn); // 添加
    } else if (
      (preType === 2 && preParentId !== parentId) ||
      (preType === 3 && afterType === 2 && preParentId !== parentId && !timeFlag) ||
      (
        (
          (preParentType === 2 && afterParentType === 1) ||
          (preParentType === 1 && afterParentType === 1 && preParentId !== parentId)
        ) && preType === 3 && afterType === 3
      )
    ) {
      // 从文件夹里面往外面拖拽 或 跨分组拖拽
      sourceData.children.splice(sourceData.children.indexOf(itemIn), 1); // 删掉
      if (preParentId !== parentId) {
        itemIn.parentId = parentId;
      }
      if (ifIntoFile == 'left') {
        targetData.children.splice(targetData.children.indexOf(itemAfter), 0, itemIn); // 添加
      } else {
        targetData.children.splice(targetData.children.indexOf(itemAfter) + 1, 0, itemIn); // 添加
      }
    } else if (preParentId !== parentId && preType === 3 && afterType === 1) {
      // 跨分组拖拽 放到组内 而不是元素上
      sourceData.children.splice(sourceData.children.indexOf(itemIn), 1); // 删掉
      if (preParentId !== parentId) {
        itemIn.parentId = parentId;
      }
      targetData.children.splice(targetData.children.length, 0, itemIn); // 添加
    } else {
      const dataPre = manageList.filter(({ widgetId }) => widgetId === preParentId)[0].children;
      const data = manageList.filter(({ widgetId }) => widgetId === parentId)[0].children;
      const item = dataPre.filter(({ widgetId }) => widgetId === id)[0];
      const afterItem = data.filter(({ widgetId }) => widgetId === afterId)[0];
      const itemIndex = data.indexOf(item);
      const afterIndex = data.indexOf(afterItem);
      if (ifIntoFile == 'left') {
        if (itemIndex < afterIndex) {
          manageList.filter(({ widgetId }) => widgetId === parentId)[0].children = update(data, {
            $splice: [
              [itemIndex, 1],
              [afterIndex - 1, 0, item],
            ],
          });
        } else {
          manageList.filter(({ widgetId }) => widgetId === parentId)[0].children = update(data, {
            $splice: [
              [itemIndex, 1],
              [afterIndex, 0, item],
            ],
          });
        }
      } else if (itemIndex < afterIndex) {
        manageList.filter(({ widgetId }) => widgetId === parentId)[0].children = update(data, {
          $splice: [
            [itemIndex, 1],
            [afterIndex, 0, item],
          ],
        });
      } else {
        manageList.filter(({ widgetId }) => widgetId === parentId)[0].children = update(data, {
          $splice: [
            [itemIndex, 1],
            [afterIndex + 1, 0, item],
          ],
        });
      }
    }
    let curDisplayFolder = state.curDisplayFolder;
    if (preParentType === 2 && afterParentType === 2 && preType === 3 && afterType === 3) {
      curDisplayFolder = JSON.parse(JSON.stringify(targetData));
    }
    manageList = JSON.parse(JSON.stringify(manageAllList));
    return {
      ...state,
      isEdit: true,
      manageList,
      curDisplayFolder,
      currEditonlyId: '',
    };
  },
  [openFolder]: (state, { payload: curDisplayFolder }) => ({
    ...state,
    curDisplayFolder,
    folderModalDisplay: true,
    currEditonlyId: '',
  }),
  [closeFolder]: state => ({
    ...state,
    folderModalDisplay: false,
    currEditonlyId: '',
  }),
  [openBatchMove]: state => ({
    ...state,
    batchMoveModalDisplay: true,
    currEditonlyId: '',
  }),
  [closeBatchMove]: state => ({
    ...state,
    batchMoveModalDisplay: false,
    currEditonlyId: '',
  }),
  [setEditState]: (state, { payload: isEdit }) => ({
    ...state,
    isEdit,
    currEditonlyId: '',
  }),

  [setEditonlyId]: (state, { payload: currEditonlyId }) => ({
    ...state,
    currEditonlyId,
  }),
  [returnDefaultState]: state => ({
    curEditFolderId: '',
    manageList: [],
    isEdit: false,
    isFocus: false,
    curDisplayFolder: {
      widgetName: '',
      children: [],
    },
    folderModalDisplay: false,
    batchMoveModalDisplay: false,
    selectList: [], // 勾选的服务列表
    // selectWidgetList:[],
    selectGroup: [],
    currGroupIndex: 0,
    currentSelectWidgetMap: {},
    title: '',
    currEditonlyId: '',

    applicationsMap: {},
    // selectWidgetItem:true,
    allServicesByLabelGroup: {},

    dragState: true, // 是否可拖拽
  }),
  [emptySelectGroup]: state => ({
    ...state,
    selectGroup: [],
  }),
}, defaultState);

export default reducer;
