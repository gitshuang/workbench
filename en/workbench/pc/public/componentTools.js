import { dispatchMessageTypeHandler } from './regMessageTypeHandler';

const tools = {};
const openInterface = {
  openService: true,
  openDialog: true,
  onMessage: true,
  hideIm: true,
  logout: true,
  openHomePage: true,
};

function dispatch(action, params) {
  if (openInterface[action]) {
    dispatchMessageTypeHandler({
      type: action,
      detail: params,
    });
  }
}

class Tool {
  constructor(namespace) {
    if (namespace) {
      this.callbackLists = {}
      this.namespace = namespace;
      tools[namespace] = this;
    } else {
      throw(new Error('need namespace'));
    }
  }
  dispatch = dispatch
  on(event, callback) {
    const { callbackLists } = this;
    const callbackList = callbackLists[event];
    if (callbackList) {
      callbackList.push(callback);
    } else {
      callbackLists[event] = [callback];
    }
    return () => {
      this.remove(event, callback);
    }
  }
  remove(event, callback) {
    const { callbackLists } = this;
    if (callback) {
      if (callbackLists[event]) {
        var index = callbackLists[event].indexOf(callback);
        if (index !== -1) {
          callbackLists[event].splic(index, 1);
        }
      }
    } else {
      callbackLists[event] = [];
    }
  }
  destroy() {
    tools[this.namespace] = null;
  }
};

const trigger = (namespace, event, data) => {
  if (namespace && event) {
    const tool = tools[namespace];
    if (tool) {
      const { callbackLists } = tool;
      const callbackList = callbackLists[event];
      if (callbackList) {
        callbackList.forEach((callback) => {
          callback(data);
        });
      }
    }
  }
};

export default Tool;
export {
  tools,
  trigger,
  dispatch,
};
