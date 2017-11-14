import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setContentSrc,
  setExpandedSidebar,
  getTabsList,
  setTabsCurrent,
  delTabs,
} = actions;


const defaultState = {
  contentSrc: '',
  expanded:false,
  current:{},
  tabsList:[],
};

const reducer = handleActions({
  [setContentSrc]: (state, { payload: contentSrc }) => ({
    ...state,
    contentSrc,
  }),
  [setExpandedSidebar]:(state,{ payload: expanded }) => ({
    ...state,
    expanded
  }),
  [getTabsList]:(state,{payload:tabsList}) => ({
    ...state,
    tabsList
  }),
  [setTabsCurrent]:(state,{payload:current}) => {
      const item = state.tabsList.filter((element) => {
        return element.id == current.id
      });
      if(item.length==0) {
        state.tabsList.push(current);
      }

      return {
        ...state,
        current:current,
        tabsList:state.tabsList
      }
  },
  [delTabs]:(state,{payload:id}) => {
      const newItem = state.tabsList.filter((element,index) => {
          return element.id != id;
      });
      let nextId = '',tabs =state.tabsList;
      for(let i=0;i<tabs.length;i++){
        if(tabs.length==1) return {
          ...state,
        };
        if(tabs[i].id==id){
          nextId = (i==0)?tabs[i+1]:tabs[i-1];
        }
      }

      console.log(nextId.url);

      return {
        ...state,
        tabsList:newItem,
        current:nextId,
        contentSrc:nextId.url
      }
  }
}, defaultState);

export default reducer;
