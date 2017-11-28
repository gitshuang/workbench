import workActions from 'store/root/work/actions';
import rootActions from 'store/root/actions';
const { addBrm } = workActions;
const { popMessage } = rootActions;

import store from "store";

const handlers = {
  jump(url) {
    this.props.history.push(url);
  },
  notice(url) {
    this.props.history.push(url);
  },
  mail(url) {
    this.props.history.push(url);
  },
  tips(url) {
    this.props.history.push(url);
  },
  test(data) {
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
export function dispathMessageTypeHandler(type) {
    const firstColonIndex = type.indexOf(':');
    let detail;
    if ( firstColonIndex !== -1) {
      detail = type.slice(firstColonIndex + 1);
      type = type.slice(0, firstColonIndex);
    }
    const event = new CustomEvent(type, {
      detail,
    });
    document.dispatchEvent(event);
}



