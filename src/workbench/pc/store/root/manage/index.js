import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setManageList,
  getManageList,
  batchDelect,
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
  } = actions;

const defaultState = {
  manageList : [],
  isEdit : false,
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


const findDeleteTreeById = (data, curId) => {
  for (let i = 0, l = data.length; i < l; i++) {
    const menu = data[i];
    const { id, children } = menu;

    if (id === curId) {
      delete data[i];
      i--;
      return ;
    }else if(children && children.length) {
      findTreeById(children, curId);
    }
  }
}


const reducer = handleActions({
  [setManageList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
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
  [batchDelect]: (state, {payload:selectGroup}) => {
    const manageList = state.manageList;
    selectGroup.map((item,index)=>{
      manageList[item] = false;
    });
    const newList =  manageList.filter((val,key) => {
      return val != false;
    });

    console.log(newList);
    return {
      ...state,
      manageList: newList
    }
  },
  [addGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;
    manageList.splice(index+1,0,{
      name: '默认分组',
      id: '',
      icon: '',
      "widgeList": [],
    });
    return{
      ...state,
      manageList: [...manageList],
    }
  },
  [delectGroup]: (state, { payload: index }) => {
    const manageList = state.manageList;
    const newList =  manageList.filter((item,i) => {
      return index !== i;
    });
    if (!newList.length) {
      newList.push({
        name: '默认分组',
        id: '',
        icon: '',
        "widgeList": [],
      })
    }
    return{
      ...state,
      manageList: newList,
    }
  },
  [renameGroup]: (state, { payload: {name,index} }) => {
    let manageList = state.manageList;
    manageList[index].name = name;
    return{
      ...state,
      manageList,
      isEdit: true
    }
  },

  [moveGroup]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
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
      //isedit:true
    }
  },
  [addFolder]: (state, { payload: manageList }) => {
      let d = new Date();
      let id = d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds();
      let obj = {id:id+"",optionTitle:"文件夹",size:"sm",title:"文件夹",type:"file",fileList:[]};
      manageList.widgeList.push(obj);

      let _manageList = JSON.parse(JSON.stringify(state.manageList));
      return{
        ...state,
        id,
        manageList:_manageList
      }
  },
  [deleteFolder]: (state, { payload: manageList })  => {
      let { id } = manageList;
      let _manageList = JSON.parse(JSON.stringify(state.manageList));
      let current = null;
      for (let i = 0, l = _manageList.length; i < l; i++) {
           let da = _manageList[i];
           current = findDeleteTreeById(da.widgeList, id);
           if(current)break;
      }
      return{
        ...state,
        manageList:_manageList
      }
  },
  [setFolderEdit]: (state, { payload: id }) => {
      return{
        ...state,
        id
      }
  },
  [renameFolder]: (state, { payload: {id,value} }) => {
      let _manageList = JSON.parse(JSON.stringify(state.manageList));
      let current = null;
      for (let i = 0, l = _manageList.length; i < l; i++) {
           let da = _manageList[i];
           current = findTreeById(da.widgeList, id);
           if(current)break;
      }
      current.title = value;
      return{
        ...state,
        manageList:_manageList
      }
  },
  [splitFolder]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
  [addServe]: (state, { payload: {index,newServe} }) => {
    let manageList = state.manageList;
    manageList[index].push(newServe);
    return{
      ...state,
      manageList,
    }
  },
  [delectServe]: (state, { payload: {index,folder,id} }) => {
    let manageList = state.manageList;
    manageList[index].map((item,key)=>{
      if(!folder && item.id == id ){
        return manageList[index].splice(key,1);
      }
      if (folder && item.id == folder ){
        item.map((list,i)=>{
          if(list.id == id){
            return manageList[index][key].splice(i,1);
          }
        })
      }
    });
    return{
      ...state,
      manageList,
    }
  },
  [moveServe]: (state, { payload: manageList }) => ({
    ...state,
    manageList,
  }),
}, defaultState);


export default reducer;
