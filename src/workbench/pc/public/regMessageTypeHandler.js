import workActions from 'store/root/work/actions';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home';
import { openGlobalDialog, closeGlobalDialog } from 'pub-comp/pop';
import store from "store";
import { postMessageToWin, get, logout } from "@u";
import { enter_or_team } from "./regMessageTypeHandler.css";
import { trigger } from "./componentTools";

const { addBrm , popBrm} = workActions;
const { popMessage, changeMessageType, hideIm } = rootActions;
const { getUserInfo } = homeActions;
const handlers = {
  openService({ serviceCode, data, type,tenantId }) {
    if (tenantId && serviceCode) {
      get('/service/getServiceByTenantIdAndServiceCode', {
        serviceCode,
        tenantId,
      }).then((data) => {
        const { crossTenant, serveName, url } = data;
        if (!crossTenant) {
          openGlobalDialog({
            type:"warning",
            className:enter_or_team,
            title: '即将切换租户',
            content: '是否切换租户？',
            btns: [
              {
                label: '切换',
                fun: () => {
                  const {
                location: {
                  origin,
                    pathname,
                    hash,
                },
              } = window;
                  window.localStorage.setItem('openServiceData', data);
                  window.location.replace(
                    `${origin ? origin : ''}${pathname ? pathname : ''}?tenantId=${tenantId}&switch=true#/service/${serviceCode}`,
                  );
                },
              },
              {
                label: '不切换',
              },
            ],
          });
        } else {
          openGlobalDialog({
            title: serveName,
            content: (<iframe style={{width: '100%', height: 300}} src={url} />),
          });
        }
      }, (err) => {
        console.log(err);
      });
    } else if (serviceCode) {
      if (data && typeof data === 'object') {
        openServiceData[serviceCode] = data;
      }
      if(type === 2 ){
        this.props.history.push(`/app/${serviceCode}`);
      }else{
        this.props.history.push(`/service/${serviceCode}`);
      }
    }
  },
  openDialog({ options }) {
    openGlobalDialog(options);
  },
  closeDialog() {
    closeGlobalDialog();
  },
  checkServiceOpen({ serviceCode }) {
    const serveCode = serviceCode;
    const state = store.getState();
    const tabs = state.work.tabs;
    const target = tabs.filter(({ serviceCode })=>{
      return serviceCode === serveCode;
    })[0];
    if (target) {
      return true;
    }
    return false;
  },
  postDataToService({ serviceCode, data }) {
    const serveCode = serviceCode;
    const state = store.getState();
    const tabs = state.work.tabs;
    const target = tabs.filter(({ serviceCode })=>{
      return serveCode === serviceCode;
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
  popBrm(data) {
    store.dispatch(popBrm(data));
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
  refreshUserInfo() {
    store.dispatch(getUserInfo());
  },
  logout() {
    logout();
  },
  switchChatTo({ yht_id }) {
    trigger('IM', 'switchChatTo', {
      yht_id,
    });
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
  let data = {};
  if (typeof window.localStorage.getItem('openServiceData') !== 'undefined') {
    data = window.localStorage.getItem('openServiceData');
    window.localStorage.removeItem('openServiceData');
  }
  if (typeof openServiceData[serviceCode] !== 'undefined') {
    data = openServiceData[serviceCode];
    delete openServiceData[serviceCode];
  }
  return data;
}
