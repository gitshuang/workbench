
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
}

export function regMessageTypeHandler() {
  Object.keys(handlers).forEach((key)=>{
    const handler = handlers[key];
    document.addEventListener(key, ({detail}) => {
      handler.call(this, detail);
    });
  });
}

export function dispathMessageTypeHandler(type) {
  const typeParser = type.split(':');
  const dataProp = typeParser[0];
  const param = typeParser[1];
  const event = new CustomEvent(dataProp, { detail: param });
  document.dispatchEvent(event);
}



