import { getContext, postMessageToWin, getNewEvent } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

//注册事件
const keys = [
  'JDIWORK',
	// "TEST_IFRAME_EVENT"  //测试数据的api注册
];

const handlerList = {
  openService(type, event) {
    dispatchMessageTypeHandler(event);
    postMessageToWin(this.source, {
      type,
    });
  },
  openDialog(type, event) {
    const postMessageToWinProxy = (callbackId) => {
      postMessageToWin(this.source, {
        type: callbackId,
        destroy: false,
      });
    };
    const options = event.detail.options;
    if (options) {
      if (options.btns && options.btns.length) {
        options.btns.forEach((btn) => {
          const btnCallbackId = btn.fun;
          btn.fun = () => {
            postMessageToWinProxy(btnCallbackId);
          }
        })
      }
      options.close = () => {
        postMessageToWinProxy(options.onClose);
      };
      dispatchMessageTypeHandler(event);
    } else {
      postMessageToWin(this.source, {
        type,
        data: false,
      });
    }
  },
  closeDialog(type, event) {
    dispatchMessageTypeHandler(event);
  },
  addBrm(type, event) {
    dispatchMessageTypeHandler(event);
    postMessageToWin(this.source, {
      type,
    });
  },
  popBrm(type, event) {
    dispatchMessageTypeHandler(event);
    postMessageToWin(this.source, {
      type,
    });
  },
  checkServiceOpen(type, event) {
    const result = dispatchMessageTypeHandler(event);
    postMessageToWin(this.source, {
      type,
      data: result,
    });
  },
  postDataToService(type, event) {
    const result = dispatchMessageTypeHandler(event);
    postMessageToWin(this.source, {
      type,
      data: result,
    });
  },
  getContext(type, event) {
    const data = getContext();
    postMessageToWin(this.source, {
      type,
      data,
    });
  },
  rootClick() {
    const event = getNewEvent('mousedown');
    window.document.getElementById('root').dispatchEvent(event);
  },
}

function messageHandler({ detail, callbackId }, event) {
  if (callbackId && typeof callbackId === 'string') {
    const type = callbackId.split(':')[0];
    handlerList[type].call(event, callbackId, { type, detail });
  }
}

window.addEventListener('message', (event) => {
  if (event.data) {
    let data = event.data;
    try {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
    } catch(e) {
      console.log(e);
      return;
    }
    const { messType } = data;
    if (messType && keys.indexOf(messType) > -1) {
      messageHandler(data, event);
    }
  }
});
