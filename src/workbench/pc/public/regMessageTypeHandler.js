import workActions from 'store/root/work/actions';
import rootActions from 'store/root/actions';
import { dialog } from 'components/pop';
const { addBrm } = workActions;
const { popMessage } = rootActions;

import store from "store";

const handlers = {
  openService({ serviceCode, data }) {
    if (serviceCode) {
      this.props.history.push(`/serve/${serviceCode}`);
    }
  },
  openDialog(options) {
    dialog(options);
  },
  postDataToServe() {

  },
  checkServeOpen() {

  },
  addBrm(data) {
    store.dispatch(addBrm(data));
  },
  popMessage() {
    store.dispatch(popMessage());
  }
}

export function regMessageTypeHandler() {
    Object.keys(handlers).forEach((key) => {
        const handler = handlers[key];
        document.addEventListener(key, ({detail}) => {
            handler.call(this, detail);
        });
    });
}
export function dispathMessageTypeHandler({ type, detail }) {
  if (type) {
    const event = new CustomEvent(type, {
      detail,
    });
    document.dispatchEvent(event);
  } else {
    throw new Error('dispathMessageTypeHandler need type');
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



