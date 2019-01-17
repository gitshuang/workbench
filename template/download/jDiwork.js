(function (f) {
  var g;
  if (typeof window !== "undefined") {
    g = window
  } else if (typeof global !== "undefined") {
    g = global
  } else if (typeof self !== "undefined") {
    g = self
  } else {
    g = this
  }
  g.jDiwork = f()
})(function () {
  var callbackMaps = {};
  var callbackQueue = {};
  var callbackPrevents = {};
  var isReady = false;
  var uid = 0;
  var messType = 'JDIWORK';
  var originList = [
    'http://workbench.yyuap.com',
    'http://workbenchdev.yyuap.com',
    'https://www.diwork.com',
    'https://workbench-daily.yyuap.com',
    window.location.origin || window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : ''),
  ];


  var getUid = function () {
    return ++uid;
  };
  var emit = function (event) {
    try {
      var type = event.type.split(':');
      var name = type[0];
      var id = type[1];
      var data = typeof event.data === 'undefined' ? false : event.data;
      var map = callbackMaps[name];
      var destroy = typeof event.destroy === 'undefined' ? true : event.destroy;
    } catch (e) {
      console.log(e);
      return;
    }
    if (map && map[id]) {
      clearTimeout(map[id].timer);
      var result = map[id].callback(data);
      if (destroy) {
        delete map[id];
      }
      return result;
    }
  }
  var emitPreventCallBack = function (event) {
    try {
      var type = event.type.split(':');
      var name = type[0];
      var id = type[1];
      var data = typeof event.data === 'undefined' ? false : event.data;
      var map = callbackPrevents[name];
      var destroy = typeof event.destroy === 'undefined' ? true : event.destroy;
    } catch (e) {
      console.log(e);
      return;
    }
    if (map && map[id]) {
      var result = map[id].callback(data);
      if (destroy) {
        delete map[id];
      }
      return result;
    }
  }
  var reg = function (name, callback, autoClear) {
    autoClear = typeof autoClear === 'undefined' ? true : autoClear;
    var map = callbackMaps[name];
    var uid = getUid();
    var callbackObj = {
      callback: callback,
      timer: autoClear ? setTimeout(function () {
        callback && callback(false);
        delete map[uid];
      }, 500) : 0
    };
    if (map) {
      map[uid] = callbackObj;
    } else {
      map = {};
      map[uid] = callbackObj;
      callbackMaps[name] = map;
    }
    return name + ':' + uid;
  };
  var regPrevent = function (name, callback) {
    var map = callbackPrevents[name + '_prevent'];
    var uid = getUid();
    var callbackObj = {
      callback: callback
    }
    if (map) {
      map[uid] = callbackObj;
    } else {
      map = {};
      map[uid] = callbackObj;
      callbackPrevents[name + '_prevent'] = map;
    }
    return name + '_prevent:' + uid;
  };
  var cancel = function (type) {
    try {
      type = event.type.split(':');
      var name = type[0];
      var id = type[1];
      var map = callbackMaps[name];
    } catch (e) {
      console.log(e);
      return;
    }
    if (map && id && map[id]) {
      if (map[id].timer) {
        clearTimeout(map[id].timer);
      }
      delete map[id];
    } else if (map && !id) {
      for (var key in map) {
        if (map[key].timer) {
          clearTimeout(map[id].timer);
        }
        delete map[key];
      }
    }
  };
  var trigger = function (event) {
    try {
      var name = event.type;
      var data = event.data;
      var queue = callbackQueue[name];
    } catch (e) {
      console.log(e);
      return;
    }
    if (queue && queue.length) {
      for (var i = 0, l = queue.length; i < l; i++) {
        queue[i](data);
      }
    }
  };
  var on = function (name, callback) {
    var queue = callbackQueue[name];
    if (queue) {
      queue.push(callback);
    } else {
      callbackQueue[name] = [callback];
    }
  };
  var remove = function (name, callback) {
    var queue = callbackQueue[name];
    if (queue) {
      if (callback) {
        var index = queue.indexOf(callback);
        if (index !== -1) {
          queue.splice(index, 1);
        }
      } else {
        delete callbackQueue[name];
      }
    }
  };
  var postMessage = function () {

  }
  var postToDiwork = function (data) {
    data.messType = messType;
    // window.top.postMessage(JSON.stringify(data), '*');
    var origin = window.top.location.origin;
    var param = JSON.stringify(data);
    if (originList.indexOf(origin) < 0) {
      window.parent.postMessage(param, '*');
      return;
    }
    window.top.postMessage(param, '*');
  };
  var ready = function (callback) {
    var event = {
      type: reg('ready', callback)
    }
    if (isReady) {
      emit(event);
    } else {
      setTimeout(function () {
        emit(event);
      }, 0);
    }
  };
  var openService = function (serviceCode, data, type, callback) {
    postToDiwork({
      detail: {
        serviceCode: serviceCode,
        data: data,
        type: type
      },
      callbackId: reg('openService', callback)
    });
  };
  var closeDialog = function () {
    postToDiwork({
      callbackId: 'closeDialog'
    });
    cancel(this.onClose);
    if (this.btns) {
      this.btns.forEach(function (btn) {
        cancel(btn.fun);
      });
    }
    cancel('openDialog');
  }
  var openDialog = function (options, callback) {
    if (options.btns && options.btns.length) {
      options.btns = options.btns.map(function (btn, i) {
        if (btn.fun) {
          var tempBtnFun = btn.fun;
          btn.fun = reg('dialogBtnClick', function () {
            tempBtnFun(closeDialog.bind(options));
          }, false);
        } else {
          btn.fun = reg('dialogBtnClick', closeDialog.bind(options), false);
        }
        return btn;
      });
    }
    if (options.onClose) {
      var onClose = options.onClose;
      options.onClose = reg('dialogOnClose', function () {
        if (onClose()) {
          closeDialog.call(options);
        }
      }, false);
    } else {
      options.onClose = reg('dialogOnClose', closeDialog.bind(options), false);
    }
    postToDiwork({
      detail: {
        options: options
      },
      callbackId: reg('openDialog', callback)
    });
  };
  var addBrm = function (name, callback) {
    postToDiwork({
      detail: {
        name: name,
        url: window.location.href
      },
      callbackId: reg('addBrm', callback)
    });
  };
  var addBrm_prevent = function (name, callback) {
    postToDiwork({
      detail: {
        name: name,
        url: window.location.href
      },
      callbackId: regPrevent('addBrm', callback)
    });
  };
  var popBrm = function (index, callback) {
    postToDiwork({
      detail: {
        index: index,
        url: window.location.href
      },
      callbackId: reg('popBrm', callback)
    });
  };

  var getBrm = function (callback) {
    postToDiwork({
      callbackId: reg('getBrm', callback)
    });
  };
  var checkServiceOpen = function (serviceCode, callback) {
    postToDiwork({
      detail: {
        serviceCode: serviceCode
      },
      callbackId: reg('checkServiceOpen', callback)
    });
  };
  var postDataToService = function (serviceCode, data, callback) {
    postToDiwork({
      detail: {
        serviceCode: serviceCode,
        data: data,
      },
      callbackId: reg('postDataToService', callback)
    });
  };
  var getContext = function (callback) {
    postToDiwork({
      callbackId: reg('getContext', callback)
    });
  };
  var onData = function (callback) {
    on('data', callback);
  };
  // var customMessage = function (type) {
  //   postToDiwork({
  //     callbackId: type,
  //   });
  // };
  // var modifyBrm = function (name, callback) {
  //   postToDiwork({
  //     detail: {
  //       name: name
  //     },
  //     callbackId: reg('modifyBrm', callback)
  //   });
  // };
  var switchChatTo = function (data, callback) {
    if (data.id || data.yht_id) {
      postToDiwork({
        detail: data,
        callbackId: reg('switchChatTo', callback)
      });
    } else {
      console.log('function switchChatTo need id or yht_id');
    }
  };
  var openMessage = function (data, callback) {
    postToDiwork({
      detail: data,
      callbackId: reg('openMessage', callback || function () {
      })
    });
  };
  var refreshUserInfo = function (callback) {
    postToDiwork({
      callbackId: reg('refreshUserInfo', callback || function () {
      })
    });
  };
  var showDialog = function (data, callback) {
    postToDiwork({
      detail: data,
      callbackId: reg('showDialog', callback || function () {
      })
    });
  };
  var closeDialogNew = function (data, callback) {
    postToDiwork({
      detail: data,
      callbackId: reg('closeDialogNew', callback || function () {
      })
    });
  };

  var openFrame = function (data, callback) {
    postToDiwork({
      detail: data,
      callbackId: reg('openFrame', callback || function () { })
    });
  };
  var closeFrame = function (data, callback) {
    postToDiwork({
      detail: data,
      callbackId: reg('closeFrame', callback || function () { })
    });
  };
  var getPageParam = function (callback) {
    postToDiwork({
      callbackId: reg('getPageParam', callback)
    });
  };
  var openWin = function (data, callback) {
    postToDiwork({
      detail: data,
      callbackId: reg('openWin', callback || function () { })
    });
  };
  var openHomePage = function (data, callback) {
    postToDiwork({
      detail: data,
      callbackId: reg('openHomePage', callback || function () {
      })
    });
  };
  var closeWin = function (data, callback) {
    postToDiwork({
      detail: data,
      callbackId: reg('closeWin', callback || function () { })
    });
  };
  var getData = function (data, callback) {
    postToDiwork({
      detail: data,
      callbackId: reg('getData', callback)
    });
  };
  var execScript = function (data, callback) {
    postToDiwork({
      detail: data,
      callbackId: reg('execScript', callback || function () { })
    });
  };

  window.addEventListener('DOMContentLoaded', function () {
    isReady = true;
  }, false);

  window.addEventListener('message', function (event) {
    var data = event.data;
    var origin = event.origin || event.originalEvent.origin;
    if (originList.indexOf(origin) < 0 || !data) {
      return;
    }
    try {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
    } catch (e) {
      console.log(e);
      return;
    }
    if (data && typeof data === 'object' && data.type) {
      if (data.type.indexOf(':') < 0) {
        trigger(data);
      } else {
        if (data.type.indexOf('_prevent') > 0) {
          emitPreventCallBack(data);
        } else {
          emit(data);
        }
      }
    }
  }, false);

  window.addEventListener('click', function () {
    postToDiwork({
      callbackId: 'rootClick',
    })
  }, false);

  return {
    ready: ready,
    openService: openService,
    openDialog: openDialog,
    addBrm: addBrm,
    addBrm_prevent: addBrm_prevent,
    popBrm: popBrm,
    getBrm: getBrm,
    checkServiceOpen: checkServiceOpen,
    postDataToService: postDataToService,
    getContext: getContext,
    onData: onData,
    // customMessage: customMessage,
    // modifyBrm: modifyBrm,
    switchChatTo: switchChatTo,
    openMessage: openMessage,
    refreshUserInfo: refreshUserInfo,
    showDialog: showDialog,
    closeDialogNew: closeDialogNew,
    openFrame: openFrame,
    closeFrame: closeFrame,
    getPageParam: getPageParam,
    openWin: openWin,
    openHomePage: openHomePage,
    closeWin: closeWin,
    getData: getData,
    execScript: execScript,
  };
});
