import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setContentSrc,
  getProductInfo,
  getTitleService,
  titleServiceDisplay,
  titleServiceHidden,
  pinDisplayBlock,
  pinDisplayNone,
  setPinAdd,
  setPinCancel,
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
  productInfo: '',
  titleServiceList: [],
  titleServiceType: false,
  pinType: false,
  pinDisplay: false
};

const reducer = handleActions({
  [setContentSrc]: (state, { payload: contentSrc }) => ({
    ...state,
    contentSrc,
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
  [setPinCancel]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      pinType: payload,
    };
  },
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

    return {
      ...state,
      tabsList:newItem,
      current:nextId,
      contentSrc:nextId.url
    }
  },
  [getProductInfo]: (state, { payload: productInfo, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      productInfo,
    };
  },
  [getTitleService]: (state, { payload: titleServiceList, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      titleServiceList,
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
}, defaultState);

export default reducer;
