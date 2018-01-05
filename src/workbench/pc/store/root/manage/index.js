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
  getAllServesByLabelGroup,
  setCurrentSelectWidgetMap,
  openBatchMove,
  closeBatchMove,
  setEditState,
  cancelFolderEdit,
  setCurrGroupIndex,
  editTitle,
  setEditonlyId,
  returnDefaultState
} = actions;

const defaultState = {
  curEditFolderId: '',
  manageList: [],
  isEdit: false,
  isFocus:false,
  curDisplayFolder: {
    widgetName: '',
    children: [],
  },
  folderModalDisplay: false,
  batchMoveModalDisplay: false,
  selectList:[],  // 勾选的服务列表
  // selectWidgetList:[],
  selectGroup: [],
  currGroupIndex:0,
  currentSelectWidgetMap:{},
  title:'',
  currEditonlyId:"",

  applicationsMap:{},
  selectWidgetItem:true,
  allServesByLabelGroup:{}
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
// 定义上下移动数组
const swapItems = function(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};
const defaultGroup = {
  widgetName: '',
  type: 1,
  children: [],
  isNew: true,
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
        manageList: payload.workList,
        currEditonlyId:""
      };
    }
  },
  [addDesk]: (state, { payload: data}) => {

    const { dataList, parentId} = data ;
    let defaultCar = {
      "widgetId":"",
      "icon": "",
      "serviceCode": "",
      "type": 3,
      "parentId": parentId,
      "widgetName": "",
      "jsurl": "",
      "size": 1
    };

    let newCar = [];
    let currentSelectWidgetMap = state.currentSelectWidgetMap;
    for(let da of dataList){
      da.selected = "1";
      let service = currentSelectWidgetMap[da.serviceId];
      if(service){
        currentSelectWidgetMap[da.serviceId].selected = da.selected;
      }else{
        currentSelectWidgetMap[da.serviceId] = da;
      }
      let newCarObn = {...defaultCar};
      newCarObn.widgetId = da.serviceId;
      newCarObn.widgetName = da.serviceName;
      newCarObn.serviceCode = da.serviceCode;
      newCarObn.icon = da.serviceIcon;
      newCarObn.size = da.widgetTemplate.size;
      newCar.push(newCarObn);
    }
    state.manageList.forEach((da,i)=>{
        if(da.widgetId == parentId){
          da.children = [...da.children,...newCar];
        }
    })
    console.log("====currentSelectWidgetMap : ");
    console.log(currentSelectWidgetMap);
    let newManageList = JSON.parse(JSON.stringify(state.manageList));

    return{
      ...state,
      manageList: newManageList,
      isEdit: true,
      currEditonlyId:"",
      currentSelectWidgetMap//备份本次勾选了哪些磁贴
    }
  },
  [getAllServesByLabelGroup]: (state, { payload, error }) => {
    if (error) {
      return state;
    } else {
      let applicationsMap ={};
      payload.applications.forEach((da,i)=>{
        applicationsMap[da.applicationId] = da;
        let  _serviceMap = {};
        da.service.forEach((serviceDa,j)=>{
          _serviceMap[serviceDa.serviceId] = serviceDa;
          da.serviceMap = _serviceMap;
        })
      });

      return {
        ...state,
        applicationsMap,
        allServesByLabelGroup:payload,
        // selectWidgetList: payload,
        // currEditonlyId:""
      };
    }
  },
  [setCurrentSelectWidgetMap]: (state, { payload, error }) => {
    payload.forEach((da,i)=>{
      let _service = state.applicationsMap[da.serviceId];
      if(_service){
        _service.selected = "3";
      }
    })
    // let {data,currentAppId,selected} = payload;
    // if(currentAppId == "all"){
    //   for(let key in state.applicationsMap){
    //     let _da = state.applicationsMap[key];
    //     let _server = _da.service.find((server)=>server.serviceId === data.serviceId)
    //     _server?_server.selected = selected:"";
    //   }
    // }else{
    //   let currentApp = state.applicationsMap[currentAppId];
    //   if(currentApp){
    //     let _server = currentApp_da.service.find((server)=>server.serviceId === data.serviceId)
    //     _server?_server.selected = selected:"";
    //   }
    // }
    return {
      ...state,
      selectWidgetItem:false,
      applicationsMap:state.applicationsMap
    };
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
      currEditonlyId:""
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
      currEditonlyId:""
    }
  },
  [selectGroupActions]: (state, {payload:selectGroup }) => {
    let selectGroup2 = [];
    Object.assign(selectGroup2,selectGroup)
    return {
      ...state,
      selectGroup: selectGroup2,
      currEditonlyId:""
    }
  },
  [selectListActions]: (state, {payload:selectList }) => {
    return {
      ...state,
      selectList: selectList,
      currEditonlyId:""
    }
  },
  [addGroup]: (state, { payload: { index, widgetId, widgetName = '' } }) => {
    const manageList = state.manageList;
    const newGroup = {
      ...defaultGroup,
      widgetId: widgetId || guid(),
      widgetName,
      children: [],
    };
    manageList.splice(index+1, 0, newGroup);
    return{
      ...state,
      manageList: [...manageList],
      isEdit: true,
      currEditonlyId: newGroup.widgetId,
    }
  },
  [delectGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;
    const newList =  manageList.filter((item,i) => {
      return index !== i;
    });
    /*if (!newList.length) {
      newList.push({
        ...defaultGroup,
        children: [],
      })
    }*/
    let children =  manageList[index].children;
    children.forEach((da,i)=>{
      delete state.currentSelectWidgetMap[da.widgetId]
    })
    return{
      ...state,
      manageList: newList,
      isEdit: true,
      currEditonlyId:"",
      currentSelectWidgetMap:state.currentSelectWidgetMap
    }
  },
  [setCurrGroupIndex]: (state, { payload: index }) => {
    return{
      ...state,
      currGroupIndex: index,
      //currEditonlyId:""
    }
  },
  [renameGroup]: (state, { payload: { name, index, id, dontChangeCurrEditonlyId } }) => {
    const manageList = state.manageList;
    let group;
    let currEditonlyId;
    if (typeof id !== 'undefined') {
      group = manageList.find(({widgetId}) => {
        return widgetId === id;
      });
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
    return{
      ...state,
      manageList,
      isEdit: true,
      currEditonlyId,
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
      currEditonlyId:""
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
      currEditonlyId:""
    }
  },
  [moveTopGroup]: (state, { payload: index }) => {
    let manageList = state.manageList;
    const newList = swapItems(manageList, index, index - 1);
    return{
      ...state,
      manageList: [...newList],
      isEdit: true,
      currEditonlyId:""
    }
  },
  [moveBottomGroup]: (state, { payload: index }) => {
    let manageList = state.manageList;
    const newList = swapItems(manageList, index, index + 1);
    return{
      ...state,
      manageList: [...newList],
      isEdit: true,
      currEditonlyId:""
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
    let num = 1;
    group.children.forEach((da,i)=>{
      da.type===2 && (num++);
    })
    let _fileName = group.children?(num):1;
    const newdefaultFolder = {
      type: 2,
      widgetName:"文件夹"+_fileName,
      children:[],
    };
    let dataAfter = findById(manageList,afterId);
    let temp = {
      ...newdefaultFolder,
      widgetId: newId,
      parentId:group.widgetId,
    };
    group.children.splice(group.children.indexOf(dataAfter),0,temp);
    // group.children = group.children.concat({
    //   ...newdefaultFolder,
    //   widgetId: newId,
    //   parentId:group.widgetId,
    // });
    //拖拽创建文件夹
    if(typeof afterId !== "undefined"){
      let dataPre = findById(manageList,id);
      // let dataAfter = findById(manageList,afterId);
      let groupData = findById(manageList,newId);
      dataPre.parentId =groupData.widgetId;
      dataAfter.parentId =groupData.widgetId;
      //放进文件夹
      groupData.children.push(dataPre);
      groupData.children.push(dataAfter);
      //给文件夹赋值parentId
      typeof groupData.parentId === "undefined" && (groupData.parentId = parentId);
      if(preParentId !== parentId){
        let dataPreParent = findById(manageList,preParentId);
        let dataAfterParent = findById(manageList,parentId);
        //删掉
        dataPreParent.children.splice(dataPreParent.children.indexOf(dataPre),1);
        dataAfterParent.children.splice(dataAfterParent.children.indexOf(dataAfter),1);
      }else{
        //删掉
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
      manageList: [ ...manageList ],
      currEditonlyId: newId,
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
    delete state.currentSelectWidgetMap[folderId];
    return{
      ...state,
      isEdit: true,
      manageList: [ ...manageList ],
      currEditonlyId:"",
      currentSelectWidgetMap:state.currentSelectWidgetMap
    }
  },
  [setFolderEdit]: (state, { payload: curEditFolderId }) => {
    return{
      ...state,
      curEditFolderId,
    }
  },
  [cancelFolderEdit]: (state, { payload: cnaceFolder }) => {
    const { manageList } = state;
    return{
      ...state,
      curEditFolderId: false,
      manageList: [ ...manageList ],
      currEditonlyId:""
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
      curEditFolderId: false,
      manageList: [ ...manageList ],
      currEditonlyId:""
    }
  },
  [splitFolder]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
    currEditonlyId:""
  }),
  [addServe]: (state, { payload: { index: groupIndex, service } }) => {
    const { manageList } = state;
    const group = manageList[groupIndex];
    group.children = group.children.concat(service);
    manageList.splice(groupIndex, 1, {
      ...group,
    });
    return{
      ...state,
      isEdit: true,
      manageList: [ ...manageList ],
      currEditonlyId:""
    }
  },
  [delectServe]: (state, { payload: {index,folder,widgetId} }) => {
    let manageList = state.manageList;
    let curDisplayFolder = state.curDisplayFolder;

    curDisplayFolder.children.forEach((item,index)=>{
      if(widgetId == item.widgetId){
        return curDisplayFolder.children.splice(index,1);
      }
    });
    curDisplayFolder.children = [...curDisplayFolder.children];
    /*manageList[index].children.forEach((item,key)=>{
      if ( item.widgetId == folder ){
        item.children.forEach((list,i)=>{
          if(list.widgetId == widgetId){
            return manageList[index][key].splice(i,1);
          }
        })
      }
    });*/
    curDisplayFolder = JSON.parse(JSON.stringify(curDisplayFolder))
    return{
      ...state,
      isEdit: true,
      manageList: [...manageList],
      curDisplayFolder: curDisplayFolder,
      currEditonlyId:""
    }
  },
  [editTitle]: (state, { payload: {id,name} }) => {
    let manageList = state.manageList;
    //manageList = JSON.parse(JSON.stringify(manageList));
    return{
      ...state,
      title: name,
      drag:'zoomIn',
      //manageList,
      manageList: [...manageList],
      currEditonlyId:""
      // manageList: [...manageList],
    }
  },
  [moveServe]: (state, { payload: {id,preParentId,preType,afterId,parentId,afterType,timeFlag} }) => {
    let manageAllList = state.manageList;
    let sourceData= preParentId && findById(manageAllList,preParentId); //拖拽前 父级源对象
    let targetData = parentId && findById(manageAllList,parentId); //拖拽后 父级目标对象
    let preParentType = sourceData.type;
    let afterParentType = targetData.type;
    //判断是否为文件夹里面元素拖拽
    let manageList = (preParentType === 2 && afterParentType === 2 && preType === 3 && afterType === 3) ? [sourceData] : manageAllList;
    let itemIn = findById(manageAllList,id);
    let itemAfter = findById(manageAllList,afterId);
    if(preType === 3 && afterType === 2 && timeFlag){
      //从外面拖入文件夹里面
      sourceData.children.splice(sourceData.children.indexOf(itemIn),1); //删掉
      if(preParentId !== afterId){
        itemIn.parentId = afterId;
      }
      itemAfter.children.push(itemIn); //添加
    }else if((preType === 2 && preParentId !== parentId)|| (preType === 3 && afterType === 2 && preParentId !== parentId && !timeFlag)||(((preParentType===2 && afterParentType===1)||(preParentType===1 && afterParentType===1 && preParentId !== parentId)) && preType === 3 && afterType === 3)){
      //从文件夹里面往外面拖拽 或 跨分组拖拽
      sourceData.children.splice(sourceData.children.indexOf(itemIn),1); //删掉
      if(preParentId !== parentId){
        itemIn.parentId = parentId;
      }
      targetData.children.splice(targetData.children.indexOf(itemAfter),0,itemIn); //添加
    }else if(preParentId !== parentId && preType === 3 && afterType === 1){
      //跨分组拖拽 放到组内 而不是元素上
      sourceData.children.splice(sourceData.children.indexOf(itemIn),1); //删掉
      if(preParentId !== parentId){
        itemIn.parentId = parentId;
      }
      targetData.children.splice(targetData.children.length,0,itemIn); //添加
    }else {
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
    let curDisplayFolder = state.curDisplayFolder;
    if(preParentType === 2 && afterParentType === 2 && preType === 3 && afterType === 3){
      curDisplayFolder = JSON.parse(JSON.stringify(targetData));
    }
    manageList = JSON.parse(JSON.stringify(manageAllList));
    return{
      ...state,
      isEdit: true,
      manageList,
      curDisplayFolder,
      currEditonlyId:""
    }
  },
  [openFolder]: (state, { payload: curDisplayFolder }) => {
    return{
      ...state,
      curDisplayFolder,
      folderModalDisplay: true,
      currEditonlyId:""
    }
  },
  [closeFolder]: (state) => ({
    ...state,
    folderModalDisplay: false,
    currEditonlyId:""
  }),
  [openBatchMove]: (state) => ({
    ...state,
    batchMoveModalDisplay: true,
    currEditonlyId:""
  }),
  [closeBatchMove]: (state) => ({
    ...state,
    batchMoveModalDisplay: false,
    currEditonlyId:""
  }),
  [setEditState]: (state, { payload: isEdit }) => ({
    ...state,
    isEdit,
    currEditonlyId:""
  }),

  [setEditonlyId]: (state, { payload: currEditonlyId }) => {
    return{
      ...state,
      currEditonlyId,
    }

  },
  [returnDefaultState]: state => defaultState,
}, defaultState);

export default reducer;
