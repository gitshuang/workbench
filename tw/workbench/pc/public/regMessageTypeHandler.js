import workActions from 'store/root/work/actions';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home';
import {openGlobalDialog, closeGlobalDialog} from 'pub-comp/pop';
import store from "store";
import {postMessageToWin, get, logout} from "@u";
import {enterOrTeam, crossTenantDialog, iframeElm} from "./regMessageTypeHandler.css";
import {trigger} from "./componentTools";
import {
  getProductInfo
} from 'store/root/work/api';
import {openMessage} from 'components/message';

const {addBrm, popBrm} = workActions;
const {
  popMessage,
  changeMessageType,
  hideIm,
  showDialog,
  closeDialogNew
} = rootActions;
const {getUserInfo} = homeActions;
const handlers = {
  openService({serviceCode, data, type, tenantId}) {
    if (tenantId && serviceCode) {
      get('/service/getServiceByTenantIdAndServiceCode', {
        serviceCode,
        tenantId,
      }).then((app) => {
        const {crossTenant, serveName, url} = app;
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
            content: (<iframe className={iframeElm} src={url}/>),
          });
        }
      }, (err) => {
        console.log(err);
      });
    } else if (serviceCode) {
      if (data && typeof data === 'object') {
        openServiceData[serviceCode] = data;
      }
      let typeVal = type === 2 ? 'app' : 'service';
      getProductInfo(serviceCode, typeVal).then((data) => {
        const {
          curService: {
            serviceCode: subCode,
            url
          },
          curMenuBar: {
            workspaceStyle
          }
        } = data;
        if (workspaceStyle === '_blank') {
          window.open(url)
        } else {
          this.props.history.replace(`/${typeVal}/${serviceCode}/${subCode}`);
        }
      }, (err) => {
        console.log(err);
      });
    }
  },
  openDialog({options}) {
    openGlobalDialog(options);
  },
  closeDialog() {
    closeGlobalDialog();
  },
  checkServiceOpen({serviceCode}) {
    const serveCode = serviceCode;
    const state = store.getState();
    const tabs = state.work.tabs;
    const target = tabs.filter(({serviceCode}) => {
      return serviceCode === serveCode;
    })[0];
    if (target) {
      return true;
    }
    return false;
  },
  postDataToService({serviceCode, data}) {
    const serveCode = serviceCode;
    const state = store.getState();
    const tabs = state.work.tabs;
    const target = tabs.filter(({serviceCode}) => {
      return serveCode === serviceCode;
    })[0];
    if (target) {
      const {id} = target;
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
  onMessage({unreadTotalNum}) {
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
  switchChatTo({id, yht_id, type}) {
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
  }
}
window.handlers = handlers;
const openServiceData = {};
let initData = {};
try {
  if (window.location.search) {
    const urlObj = new URL(window.location.href);
    const keys = urlObj.searchParams.keys();
    while (1) {
      let {done, value: key} = keys.next();
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

export function dispatchMessageTypeHandler({type, detail}) {
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
  handlers.openService({serviceCode, type});
}
