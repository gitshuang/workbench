import { getContext, postMessageToWin, getNewEvent } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import store from "store";
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
	addBrm_prevent(type, event) {
		dispatchMessageTypeHandler(event);
		window.brmClickPrevent = {type, source: this.source};
	},
  popBrm(type, event) {
    dispatchMessageTypeHandler(event);
    postMessageToWin(this.source, {
      type,
    });
  },
  getBrm(type, event) {
    const data = store.getState().work.brm;
    postMessageToWin(this.source, {
      type,
      data,
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
  refreshUserInfo(type, event) {
    dispatchMessageTypeHandler(event);
  },
  switchChatTo(type, event) {
    dispatchMessageTypeHandler(event);
    postMessageToWin(this.source, {
      type,
    });
  },
  openMessage(type, event) {
    dispatchMessageTypeHandler(event);
    postMessageToWin(this.source, {
      type,
    });
  },
  showDialog(type, event) {
    dispatchMessageTypeHandler(event);
    postMessageToWin(this.source, {
      type,
    });
  },
  closeDialogNew(type, event) {
    dispatchMessageTypeHandler(event);
    postMessageToWin(this.source, {
      type,
    });
  },
  openFrame(type, event){
    dispatchMessageTypeHandler(event);
    postMessageToWin(this.source,{
      type,
    });
  },
  closeFrame(type, event){
    dispatchMessageTypeHandler(event);
    postMessageToWin(this.source,{
      type,
    });
  },
  getPageParam(type, event) {
    const data = store.getState().frameParam.pageParam;
    postMessageToWin(this.source, {
      type,
      data,
    });
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
    //兼容财务云组件消息处理
    if (typeof data === 'string' && data.indexOf('fc|parent__Messenger__') > -1) {
    }else{
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
  }
});
