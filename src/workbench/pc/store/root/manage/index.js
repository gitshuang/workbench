import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import update from 'react/lib/update';
import { guid } from '@u';
import actions from './actions';

const {
  setManageList,
  getManageList,
  batchDelect,
  batchMove,
  addGroup,
  delectGroup,
  renameGroup,
  moveGroup,
  stickGroup,
  addFolder,
  setFolderEdit,
  deleteFolder,
  renameFolder,
  splitFolder,
  addServe,
  delectServe,
  moveServe,
  openFolder,
  closeFolder,
  getSelectWidgetList,
  } = actions;

const defaultState = {
  curEditFolderId: '',
  manageList: [],
  isEdit: false,
  curDisplayFolder: {},
  folderModalDisplay: false,
  selectWidgetList:[],
};

const findTreeById = (data, curId) => {
  let result;
  for (let i = 0, l = data.length; i < l; i++) {
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
}

const defaultGroup = {
  widgetName: '默认分组',
  type: 1,
  children: [],
};
const defaultFolder = {
  type: 2,
  widgetName:"文件夹",
  children:[],
};

const reducer = handleActions({
  [setManageList]: (state, { payload, error }) => {
    return state;
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
  [getSelectWidgetList]: (state, { payload, error }) => {
    if (error) {
      return state;
    } else {
      return {
        ...state,
        selectWidgetList: payload,
      };
    }
  },
  [batchDelect]: (state, {payload:selectGroup}) => {
    const manageList = state.manageList;
    selectGroup.forEach((item,index)=>{
      manageList[item] = false;
    });
    const newList = manageList.filter(val => val != false);

    return {
      ...state,
      isEdit: true,
      manageList: newList
    }
  },
  [batchMove]: (state, {payload:{selectGroup,toGroupIndex} }) => {
    let manageList = state.manageList;
    let newList = [];
    manageList.forEach(({children})=>{
      children.forEach((child, key)=>{
        const { widgetId } = child;
        selectGroup.forEach((select)=>{
          if(widgetId === select){
            newList.push(child);
            delete children[key];
          }
        })
      });
    });
    newList.forEach((item)=>{
      manageList[toGroupIndex].children.push(item);
    });
    return {
      ...state,
      manageList: manageList,
      isEdit: true,
    }
  },
  [addGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;
    manageList.splice(index+1, 0, {
      ...defaultGroup,
      widgetId: guid(),
    });
    return{
      ...state,
      manageList: [...manageList],
      isEdit: true,
    }
  },
  [delectGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;
    const newList =  manageList.filter((item,i) => {
      return index !== i;
    });
    if (!newList.length) {
      newList.push({
        ...defaultGroup
      })
    }
    return{
      ...state,
      manageList: newList,
      isEdit: true,
    }
  },
  [renameGroup]: (state, { payload: {name,index} }) => {
    let manageList = state.manageList;
    manageList[index].widgetName = name;
    return{
      ...state,
      manageList,
      isEdit: true,
    }
  },
  [moveGroup]: (state, { payload: {id,afterId} }) => {
    let manageList = state.manageList;
    const item = manageList.filter(({widgetId}) => widgetId === id)[0];
    const afterItem = manageList.filter(({widgetId}) => widgetId === afterId)[0];
    const itemIndex = manageList.indexOf(item);
    const afterIndex = manageList.indexOf(afterItem);

    manageList = update(manageList, {
      $splice: [
        [itemIndex, 1],
        [afterIndex, 0, item]
      ]
    })
    //深拷贝
    //manageList = JSON.parse(JSON.stringify(manageList));

    return{
      ...state,
      isEdit: true,
      manageList,
    }
  },
  [stickGroup]: (state, { payload: index }) => {
    let manageList = state.manageList;
    const curr = manageList[index];
    const newList =  manageList.filter((item,i) => {
      return index !== i;
    });
    newList.unshift(curr);
    return{
      ...state,
      manageList: newList,
      isEdit: true,
    }
  },
  [addFolder]: (state, { payload: groupIndex }) => {
    const { manageList } = state;
    const group = manageList[groupIndex];
    const newId = guid()
    group.children = group.children.concat({
      ...defaultFolder,
      widgetId: newId,
    });
    manageList.splice(groupIndex, 1, {
      ...group,
    });
    return{
      ...state,
      curEditFolderId: newId,
      isEdit: true,
      manageList: [ ...manageList ]
    }
  },
  [deleteFolder]: (state, { payload: folderId })  => {
    const { manageList } = state;
    let groupIndex;
    let widgetIndex;
    if (
      !manageList.some((group, i) => {
        groupIndex = i;
        return group.children.some(({ widgetId }, j) => {
          widgetIndex = j;
          return folderId === widgetId;
        })
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
    return{
      ...state,
      isEdit: true,
      manageList: [ ...manageList ]
    }
  },
  [setFolderEdit]: (state, { payload: curEditFolderId }) => {
    return{
      ...state,
      curEditFolderId
    }
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
        })
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

    return{
      ...state,
      isEdit: true,
      manageList: [ ...manageList ]
    }
  },
  [splitFolder]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
  [addServe]: (state, { payload: { index: groupIndex, serve } }) => {
    const { manageList } = state;
    const group = manageList[groupIndex];
    group.children = group.children.concat(serve);
    manageList.splice(groupIndex, 1, {
      ...group,
    });
    return{
      ...state,
      isEdit: true,
      manageList: [ ...manageList ],
    }
  },
  [delectServe]: (state, { payload: {index,folder,widgetId} }) => {
    let manageList = state.manageList;
    manageList[index].forEach((item,key)=>{
      if(!folder && item.widgetId == widgetId ){
        return manageList[index].splice(key,1);
      }
      if (folder && item.widgetId == folder ){
        item.children.forEach((list,i)=>{
          if(list.widgetId == widgetId){
            return manageList[index][key].splice(i,1);
          }
        })
      }
    });
    return{
      ...state,
      isEdit: true,
      manageList: [...manageList],
    }
  },
  [moveServe]: (state, { payload: {dataList,id,afterId,parentId} }) => {
    let manageList = state.manageList;
    let data = manageList.filter(({widgetId}) => widgetId === parentId)[0].children;
    const item = data.filter(({widgetId}) => widgetId === id)[0];
    const afterItem = data.filter(({widgetId}) => widgetId === afterId)[0];
    const itemIndex = data.indexOf(item);
    const afterIndex = data.indexOf(afterItem);

    manageList.filter(({widgetId}) => widgetId)[0].children = update(data, {
        $splice: [
          [itemIndex, 1],
          [afterIndex, 0, item]
        ]
    })
    manageList = JSON.parse(JSON.stringify(manageList));
    return{
      ...state,
      manageList,
    }
  },
  [openFolder]: (state, { payload: curDisplayFolder }) => ({
    ...state,
    curDisplayFolder,
    folderModalDisplay: true,
  }),
  [closeFolder]: (state) => ({
    ...state,
    curDisplayFolder: {},
    folderModalDisplay: false,
  }),
}, defaultState);

export default reducer;
