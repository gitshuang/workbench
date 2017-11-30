import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import update from 'react/lib/update';
import { guid } from '@u';
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
  addServe,
  delectServe,
  moveServe,
  openFolder,
  closeFolder,
  getSelectWidgetList,
  openBatchMove,
  closeBatchMove,
} = actions;

const defaultState = {
  curEditFolderId: '',
  manageList: [],
  isEdit: false,
  curDisplayFolder: {
    widgetName: '',
    children: [],
  },
  folderModalDisplay: false,
  batchMoveModalDisplay: false,
  selectList:[],  // 勾选的服务列表
  selectWidgetList:[],
  selectGroup: [],
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
  widgetName: '',
  type: 1,
  children: [],
};
const defaultFolder = {
  type: 2,
  widgetName:"文件夹",
  children:[],
};
//递归查找
var data;
function findById(manageList,id) {
  for(let i = 0;i<manageList.length;i++){
    if(manageList[i].widgetId && manageList[i].widgetId === id){
      data = manageList[i];
      break;
    }else{
      manageList[i].children && findById(manageList[i].children,id)
    }
  }
  return data;
}
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
  [addDesk]: (state, { payload: data }) => {
    state.manageList.map(function(da,i){
      da.children.push(data);
    })
    let newManageList = JSON.parse(JSON.stringify(state.manageList));
    return{
      ...state,
      manageList: newManageList
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
  [batchDelect]: (state, {payload}) => {
    let manageList = state.manageList;
    // 选中之后将id 都放到这个组中
    let selectList = state.selectList;
    let newList = [];
    manageList.forEach(({children})=>{
      for(var i=0,flag=true,len=children.length;i<len;flag ? i++ : i){
        selectList.forEach((select)=>{
          if(children[i]&&children[i].widgetId === select){
            children.splice(i,1);
            flag = false;
          }else{
            flag = true;
          }
        })
      }
    });
    manageList = JSON.parse(JSON.stringify(manageList));
    return {
      ...state,
      manageList: manageList,
      selectList:[],
      selectGroup:[],
      isEdit: true,
    }
  },
  [batchMove]: (state, {payload:toGroupIndex }) => {
    let manageList = state.manageList;
    // 选中之后将id 都放到这个组中
    let selectList = state.selectList;
    let newList = [];
    manageList.forEach(({children})=>{
      for(var i=0,flag=true,len=children.length;i<len;flag ? i++ : i){
        selectList.forEach((select)=>{
          if(children[i]&&children[i].widgetId === select){
            newList.push(children[i]);
            children.splice(i,1);
            flag = false;
          }else{
            flag = true;
          }
        })
      }
    });
    newList.forEach((item)=>{
      manageList[toGroupIndex].children.push(item);
    });
    manageList = JSON.parse(JSON.stringify(manageList));
    return {
      ...state,
      manageList: manageList,
      selectList:[],
      selectGroup:[],
      isEdit: true,
    }
  },
  [selectGroupActions]: (state, {payload:selectGroup }) => {
    let selectGroup2 = [];
    Object.assign(selectGroup2,selectGroup)
    return {
      ...state,
      selectGroup: selectGroup2,
    }
  },
  [selectListActions]: (state, {payload:selectList }) => {
    return {
      ...state,
      selectList: selectList,
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
  [moveTopGroup]: (state, { payload: index }) => {
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
  [moveBottomGroup]: (state, { payload: index }) => {
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
  [addFolder]: (state, { payload: {groupIndex,id,preParentId,preType,afterId,parentId,afterType} }) => {
    const { manageList } = state;
    if(groupIndex === ""){
      groupIndex = manageList.findIndex(function(value, index, arr) {
        return value.widgetId === parentId;
      });
    }
    const group = manageList[groupIndex];
    const newId = guid();

    const newdefaultFolder = {
      type: 2,
      widgetName:"文件夹",
      children:[],
    };
    group.children = group.children.concat({
      ...newdefaultFolder,
      widgetId: newId,
    });
    if(typeof afterId !== "undefined"){
      let dataPre = findById(manageList,id);
      let dataAfter = findById(manageList,afterId);
      let groupData = findById(manageList,newId);
      groupData.children.push(dataPre);
      groupData.children.push(dataAfter);
      if(preParentId !== parentId){
        let dataPreParent = findById(manageList,preParentId);
        let dataAfterParent = findById(manageList,parentId);
        dataPreParent.children.splice(dataPreParent.children.indexOf(dataPre),1);
        dataAfterParent.children.splice(dataAfterParent.children.indexOf(dataAfter),1);
      }else{
        group.children.splice(group.children.indexOf(dataPre),1);
        group.children.splice(group.children.indexOf(dataAfter),1);
      }
    }
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
  [moveServe]: (state, { payload: {id,preParentId,preType,afterId,parentId,afterType} }) => {
    let manageAllList = state.manageList;
    let sourceData= findById(manageAllList,preParentId); //拖拽前 父级源对象
    let targetData = findById(manageAllList,parentId); //拖拽后 父级目标对象
    let preParentType = sourceData.type;
    let afterParentType = targetData.type;
    //判断是否为文件夹里面元素拖拽
    let manageList = (preParentType === 2 && afterParentType === 2 && preType === 3 && afterType === 3) ? [sourceData] : manageAllList;
    let itemIn = findById(manageAllList,id);
    let itemAfter = findById(manageAllList,afterId);
    if(preType === 3 && afterType === 2){
      //从外面拖入文件夹里面
      itemAfter.children.push(itemIn); //往文件夹里添加拖拽的数据
      sourceData.children.splice(sourceData.children.indexOf(itemIn),1); //将拖拽的数据从外层删掉
    }else if(((preParentType===2 && afterParentType===1)||(preParentType===1 && afterParentType===1 && preParentId !== parentId)) && preType === 3 && afterType === 3){
      //从文件夹里面往外面拖拽 或 跨分组拖拽
      //targetData.children.push(itemOut);
      sourceData.children.splice(sourceData.children.indexOf(itemIn),1); //删掉
      if(preParentId !== parentId){
        itemIn.parentId = parentId;
      }
      targetData.children.splice(targetData.children.indexOf(itemAfter),0,itemIn); //添加
    } else {
      let dataPre = manageList.filter(({widgetId}) => widgetId === preParentId)[0].children;
      let data = manageList.filter(({widgetId}) => widgetId === parentId)[0].children;
      const item = dataPre.filter(({widgetId}) => widgetId === id)[0];
      const afterItem = data.filter(({widgetId}) => widgetId === afterId)[0];
      const itemIndex = data.indexOf(item);
      const afterIndex = data.indexOf(afterItem);

      manageList.filter(({widgetId}) => widgetId === parentId)[0].children = update(data, {
          $splice: [
            [itemIndex, 1],
            [afterIndex, 0, item]
          ]
      })
    }
    manageList = JSON.parse(JSON.stringify(manageAllList));
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
    folderModalDisplay: false,
  }),
  [openBatchMove]: (state) => ({
    ...state,
    batchMoveModalDisplay: true,
  }),
  [closeBatchMove]: (state) => ({
    ...state,
    batchMoveModalDisplay: false,
  }),
}, defaultState);

export default reducer;
