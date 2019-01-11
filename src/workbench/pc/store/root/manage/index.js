import { handleActions } from 'redux-actions';
import update from 'react/lib/update';
import { guid, avoidSameName } from '@u';
import actions from './actions';
import {updateAllMenuList} from './utils'

const {
  updateShadowCard,
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
  splitFolder,
  addService,
  delectService,
  moveService,
  getAllServicesByLabelGroup,
  setCurrentSelectWidgetMap,
  openBatchMove,
  closeBatchMove,
  setEditState,
  setCurrGroupIndex,
  editTitle,
  setEditonlyId,
  returnDefaultState,
  setDragInputState,
  emptySelectGroup,
  changeSiderState,
  getAllMenuList,
  moveSideCards,
  dropSideCards
} = actions;

const defaultState = {
  manageList: [],
  isEdit: false,
  isFocus: false,
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

  //shadowCard: false, //默认没有
  isSiderDisplay:true,  //左侧默认展开
  allMenuList: [],  // 左侧通过menu查找时的menuList
  shadowCard: {
    size:1,
    type:3,
    widgetId:"shadowCardId",
    widgetName:"阴影卡片"
  },

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
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
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
  [dropSideCards]:(state,{
    payload: {
      id,preParentId, afterId, parentId, afterType, monitor,cardList
    }
  })=>{
    const manageAllList = state.manageList;
    let manageList = manageAllList;
    const data = manageAllList.filter(({ widgetId }) => widgetId === parentId)[0].children;// 拖拽后 父级目标对象
    const afterItem = data.filter(({ widgetId }) => widgetId === afterId)[0]; //被hover对象
    const afterIndex = data.indexOf(afterItem);


    ///只要曾经移入过组内，preParentId就灰从2变成正常的id
    const dataPre = manageList.filter(({ widgetId }) => widgetId === preParentId)[0].children;
    const item = dataPre.filter(({ widgetId }) => widgetId === id)[0];
    const itemIndex = data.indexOf(item);
    manageList.filter(({ widgetId }) => widgetId === parentId)[0].children = update(data, {
      $splice: [
        [itemIndex, 1],
        [afterIndex, 0, ...cardList],
      ],
    });
    updateAllMenuList(state.allMenuList,manageAllList);
      manageList = JSON.parse(JSON.stringify(manageAllList));
      return {
        ...state,
        isEdit: true,
        manageList,
        currEditonlyId: '',
      };
  },
  [moveSideCards]:(state,{
    payload: {
      id,preParentId, afterId, parentId, afterType, monitor,cardList
    }
  })=>{//after可以是3 可以是1
    const manageAllList = state.manageList;
    let manageList = manageAllList;
    const data = manageAllList.filter(({ widgetId }) => widgetId === parentId)[0].children;// 拖拽后 父级目标对象
    const afterItem = data.filter(({ widgetId }) => widgetId === afterId)[0]; //被hover对象
    const afterIndex = data.indexOf(afterItem);
    // 给增加parentId
    cardList.forEach(item=>{item.parentId = parentId});
      if(preParentId==2){
        manageAllList.filter(({ widgetId }) => widgetId === parentId)[0].children = update(data, {
          $splice: [
            [afterIndex, 0, state.shadowCard],// 第一次进组
          ],
        });
        
      }else{  //进组以后，
        const dataPre = manageList.filter(({ widgetId }) => widgetId === preParentId)[0].children;
        const item = dataPre.filter(({ widgetId }) => widgetId === id)[0];
        const itemIndex = data.indexOf(item);
        manageList.filter(({ widgetId }) => widgetId === parentId)[0].children = update(data, {
          $splice: [
            [itemIndex, 1],
            [afterIndex, 0, item],
          ],
        });
      }
      monitor.getItem().parentId = parentId;
      state.shadowCard.parentId = parentId
      
      manageList = JSON.parse(JSON.stringify(manageAllList));
      return {
        ...state,
        manageList,
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
  [changeSiderState]:(state)=>{
    return {
      ...state,
      isSiderDisplay: !state.isSiderDisplay
    };
  },
  [updateShadowCard]: (state, { shadowCard }) => {
    return {
      ...state,
      shadowCard: shadowCard
    };
  },
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
    // 更改了原有数据， 暂时无碍吧， 为了将数据的文件夹平铺到上一级
    const list = payload.workList;
    list.forEach(item => {
      item.children.forEach((list, index) => {
        if (list.type === 2) {
          const arr = list.children;
          item.children.splice(index, 1);
          arr.forEach((data, key) => {
            data.parentId = item.widgetId;
            item.children.splice(index + key, 0, data);
          });
        }
      });
    });
    return {
      ...state,
      manageList: [...list],
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
  [delectService]: (state, { payload: folderId }) => {
    const { manageList,allMenuList } = state;
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
    updateAllMenuList(allMenuList,manageList)
    return {
      ...state,
      isEdit: true,
      manageList: [...manageList],
      currEditonlyId: '',
      currentSelectWidgetMap: state.currentSelectWidgetMap,
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
      id, preParentId, preType, afterId, parentId, afterType, monitor
    }
  }) => {
    const manageAllList = state.manageList;
    let manageList = manageAllList;
     
   
      const sourceData = preParentId && findById(manageAllList, preParentId); // 拖拽前 父级源对象
      const targetData = parentId && findById(manageAllList, parentId); // 拖拽后 父级目标对象
      const preParentType = sourceData.type;
      const afterParentType = targetData.type;
      // 判断是否为文件夹里面元素拖拽
      const itemIn = findById(manageAllList, id);
      const itemAfter = findById(manageAllList, afterId);
      if (preParentType === 1 && afterParentType === 1 && preParentId !== parentId && preType === 3 && afterType === 3) {
        // 跨分组拖拽
        sourceData.children.splice(sourceData.children.indexOf(itemIn), 1); // 删掉
        
        const data = manageList.filter(({ widgetId }) => widgetId === parentId)[0].children;// 当前分组数据

        if (preParentId !== parentId) {
          itemIn.parentId = parentId;
          monitor.getItem().parentId = parentId
        }
        manageList.filter(({ widgetId }) => widgetId === parentId)[0].children = update(data, {
          $splice: [
            [targetData.children.indexOf(itemAfter), 0, itemIn],
          ],
        });
    
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
        if (itemIndex < afterIndex) {
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
              [afterIndex, 0, item],
            ],
          });
        }
      }
    
    manageList = JSON.parse(JSON.stringify(manageAllList));
    return {
      ...state,
      isEdit: true,
      manageList,
      currEditonlyId: '',
    };
  },


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
