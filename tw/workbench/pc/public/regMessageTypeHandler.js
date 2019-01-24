import store from "store";
import { postMessageToWin, get, logout } from "@u";
import { pushYA, appendSearchParam } from "yutils/utils";
import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
import { getServiceInfoWithDetail } from 'store/root/work/api';
import { trigger } from "./componentTools";
import { openMessage } from 'components/message';
import { openMess } from 'pub-comp/notification';
import { openGlobalDialog, closeGlobalDialog } from 'pub-comp/pop';

import { enterOrTeam, crossTenantDialog, iframeElm } from "./regMessageTypeHandler.css";

const {
  popMessage,
  changeMessageType,
  hideIm,
  showDialog,
  closeDialogNew,
  openFrame,
  closeFrame,
  getUserInfo,
  requestError,
} = rootActions;
const { addTabs, delTabs, } = wrapActions;
const handlers = {
  openWin(data) {
    if (store.getState().wrap.tabs.length >= 20) {
      openMess({
        title: '',
        duration: 2,
        type: 'warning',
        closable: false,
      });
      return false;
    }
    if (typeof data !== 'object') {
      throw new Error('data is must be a object.');
    }
    if (data.id === undefined) {
      throw new Error('id is required.');
    }
    if (data.title === undefined) {
      throw new Error('title is required.');
    }
    const param = Object.assign({ type: 'locale', url: data.id, hasWidget: false }, data);
    store.dispatch(addTabs(param));
  },
  closeWin(param) {
    let data = store.getState().wrap.currItem;
    if (typeof param === "object" && param.id) {
      data = param;
    }
    store.dispatch(delTabs(data));
  },
  openService({ serviceCode, data, type, tenantId }) {
    if (tenantId && serviceCode) {
      get('/service/getServiceByTenantIdAndServiceCode', {
        serviceCode,
        tenantId,
      }).then((app) => {
        const { crossTenant, serveName, url } = app;
        if (!crossTenant) {
          openGlobalDialog({
            type: "warning",
            className: enterOrTeam,
            title: '切換團隊/企業',
            content: '需要切換到對應的團隊/企業查看詳情，是否切換?',
            btns: [
              {
                label: '切換',
                fun: () => {
                  const {
                    location: {
                      origin,
                      pathname,
                      hash,
                    },
                  } = window;
                  try {
                    window.localStorage.setItem('openServiceData', JSON.stringify(data));
                  } catch (e) {
                    console.log(e);
                  }
                  window.location.replace(
                    `${origin ? origin : ''}${pathname ? pathname : ''}?tenantId=${tenantId}&switch=true#/service/${serviceCode}`,
                  );
                },
              },
              {
                label: '不切換',
              },
            ],
          });
        } else {
          openGlobalDialog({
            title: serveName,
            className: crossTenantDialog,
            content: (<iframe className={iframeElm} src={url} />),
          });
        }
      }, (err) => {
        console.log(err);
      });
    } else if (serviceCode) {
      if (store.getState().wrap.tabs.length >= 20) {
        openMess({
          title: '',
          duration: 2,
          type: 'warning',
          closable: false,
        });
        return false;
      }
      if (data && typeof data === 'object') {
        openServiceData[serviceCode] = data;
      }
      const serviceType = type === 2 ? '1' : '0';
      getServiceInfoWithDetail(serviceCode, serviceType).then((payload) => {
        const {
          serviceName,
          url,
          workspaceStyle,
          serviceCode: subCode,
          hasWidget,
        } = payload;
        const locationProtocol = window.location.protocol;
        if (workspaceStyle === '_blank' || (locationProtocol === 'https:' && url.split(':')[0] === "http")) {
          window.open(url);
        } else {
          const locations = appendSearchParam(url, {
            ...getOpenServiceData(subCode),
            serviceCode: subCode,
          });
          store.dispatch(addTabs({
            id: subCode,
            type: 'service',
            url: locations,
            title: serviceName,
            hasWidget: hasWidget
          }));
        }
        pushYA(subCode);
      }, (err) => {
        console.log(err);
        store.dispatch(requestError(err));
      });
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
    const target = tabs.filter(({ serviceCode }) => {
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
    const target = tabs.filter(({ serviceCode }) => {
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
  switchChatTo({ id, yht_id, type }) {
    trigger('IM', 'switchChatTo', {
      id,
      yht_id,
      type,
    });
  },
  openMessage(param) {
    openMessage(param);
  },
  showDialog(data) {
    store.dispatch(showDialog(data));
  },
  closeDialogNew() {
    store.dispatch(closeDialogNew());
  },
  openFrame(data) {
    store.dispatch(openFrame(data));
  },
  closeFrame() {
    store.dispatch(closeFrame());
  },
  // TODO 后期想干掉， 这个现在diwork-public-components中搜索用到， 协同的个人主页中也用到
  openHomePage(data) {
    const key = data.key || 'info';
    dispatchMessageTypeHandler({
      type: "openWin",
      detail: {
        id: 'HomePage',
        title: "",
        data: {
          userId: data.userId,
          key: key
        }
      }
    });
  },
}
window.handlers = handlers;
const openServiceData = {};
let initData = {};
try {
  if (window.location.search) {
    const urlObj = new URL(window.location.href);
    const keys = urlObj.searchParams.keys();
    while (1) {
      let { done, value: key } = keys.next();
      if (done) {
        break;
      }
      initData[key] = urlObj.searchParams.getAll(key);
    }
  }
} catch (e) {
  console.log(e.message);
}

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
  if (type.lastIndexOf('_prevent') > 0) {
    type = type.substring(0, type.lastIndexOf('_prevent'));
  }
  if (type && handlers[type]) {
    return handlers[type](detail);
  } else {
    throw new Error('dispatchMessageTypeHandler need type');
  }
}

export function parseType(type) {
  const firstColonIndex = type.indexOf(':');
  let detail;
  if (firstColonIndex !== -1) {
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
  if (initData) {
    data = initData;
    initData = null;
  }
  if (typeof window.localStorage.getItem('openServiceData') !== 'undefined') {
    try {
      data = {
        ...data,
        ...JSON.parse(window.localStorage.getItem('openServiceData')),
      };
    } catch (e) {
      console.log(e);
    }
    window.localStorage.removeItem('openServiceData');
  }
  if (typeof openServiceData[serviceCode] !== 'undefined') {
    data = {
      ...data,
      ...openServiceData[serviceCode],
    };
    delete openServiceData[serviceCode];
  }
  return data;
}

export function openService(serviceCode, type) {
  handlers.openService({ serviceCode, type });
}

export function openWin(data) {
  handlers.openWin(data);
}

