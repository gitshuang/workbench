import workActions from 'store/root/work/actions';
import rootActions from 'store/root/actions';
import { openGlobalDialog, closeGlobalDialog } from 'components/pop';
import store from "store";
import { postMessageToWin } from "@u";

const { addBrm } = workActions;
const { popMessage, changeMessageType, hideIm } = rootActions;
const handlers = {
  openService({ serviceCode, data }) {
    if (serviceCode) {
      if (data && typeof data === 'object') {
        openServiceData[serviceCode] = data;
      }
      this.props.history.push(`/service/${serviceCode}`);
    }
  },
  openDialog(options) {
    openGlobalDialog(options);
  },
  closeDialog() {
    closeGlobalDialog();
  },
  checkServiceOpen() {
    const state = store.getState();
    const tabs = state.work.tabs;
    const target = tabs.filter(({ serveCode })=>{
      return serviceCode === serveCode;
    })[0];
    if (target) {
      return true;
    }
    return false;
  },
  postDataToService({ serviceCode, data }) {
    const state = store.getState();
    const tabs = state.work.tabs;
    const target = tabs.filter(({ serveCode })=>{
      return serviceCode === serveCode;
    })[0];
    if (target) {
      const { id } = target;
      const frameElm = document.getElementById(id);
      if (frameElm) {
        postMessageToWin(frameElm.contentWindow, {
          type: 'data',
          data,
        });
        return true;
      }
    }
    return false;
  },
  addBrm(data) {
    store.dispatch(addBrm(data));
  },
  popMessage() {
    store.dispatch(popMessage());
  },
  // for IM
  onMessage({ unreadTotalNum }) {
    store.dispatch(changeMessageType(!!unreadTotalNum));
  },
  hideIm() {
    store.dispatch(hideIm());
  },
}

const openServiceData = {};

function bind(target, obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'function') {
      obj[key] = obj[key].bind(target);
    }
  })
}

export function regMessageTypeHandler(app) {
  bind(app, handlers);
}

export function dispatchMessageTypeHandler({ type, detail }) {
  if (type && handlers[type]) {
    return handlers[type](detail);
  } else {
    throw new Error('dispatchMessageTypeHandler need type');
  }
}

export function parseType(type) {
  const firstColonIndex = type.indexOf(':');
  let detail;
  if ( firstColonIndex !== -1) {
    detail = type.slice(firstColonIndex + 1);
    type = type.slice(0, firstColonIndex);
  }
  return {
    type,
    detail,
  };
}

export function getOpenServiceData(serviceCode) {
  const data = openServiceData[serviceCode];
  delete openServiceData[serviceCode];
  return data || {};
}
