const applicationServerPublicKey =
  "BBHGeRtAab5_l6HS9gVhQt779IZogkCsP-B2qkaa7M44oB0fSpIMG3HYwnK3WviU22CCdsZ6PX7xgTw3sn-JO60"

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const SERVICE_WORKER_API = 'serviceWorker';
const SERVICE_WORKER_FILE_PATH = './sw.js'
// const SERVICE_WORKER_FILE_PATH = 'http://iuap-market-test.oss-cn-beijing.aliyuncs.com/000testservice/sw.js'
const isSupportServiceWorker = () => {
  let flag = false;
  try {
    flag = navigator &&
      SERVICE_WORKER_API in navigator &&
      navigator.serviceWorker.__proto__.register &&
      typeof (navigator.serviceWorker.__proto__.register) === 'function'
  } catch (err) {
    console.log('workerservice未被启用:', err)
  }
  return flag;
}

const NOTIFICATION_API = 'Notification';
const PERMISSION_GRANTED = 'granted';
const PERMISSION_DENIED = 'denied';
const isSupportNotification = () => NOTIFICATION_API in window;
const getPermission = () => Notification.permission;
const isPermissionGranted = permission => permission === PERMISSION_GRANTED;
function askNotificationPermission() {
  if (!(NOTIFICATION_API in window)) {
    throw new Error("This browser does not support desktop notification");
  } else if (getPermission() === PERMISSION_GRANTED) {
    //todo nothing
    return true
  } else if (getPermission() !== PERMISSION_GRANTED) {
    return new Promise(function (resolve, reject) {
      var permissionResult = Notification.requestPermission(function (permission) {
        resolve(permission)
      })
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then(function (permission) {
      if (permission !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
      if (permission === 'granted') {
        var notification = new Notification('welcome1', {
          body: 'welcome to diwork',
          icon: '/yonyouSpace.png'
        });
      }
    })
  }
  if (notification) {
    notification.onclick = () => {
      notification.close()
    }
  }
}

// window.addEventListener('message', function (event) {
//   console.log(event.data)
// })

function sendMsg(msg) {
  const controller = navigator.serviceWorker.controller;
  if (!controller) {
    return;
  }
  controller.postMessage(msg, []);
}
function sendMsgWithMessageChannel(msg) {
  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    }
    navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(msg,[messageChannel.port2]);
  })
}

if (isSupportServiceWorker()) {
  navigator.serviceWorker
    .register(SERVICE_WORKER_FILE_PATH, {
      scope: '/'
    })
    .catch(err => console.log('ServiceWorker 注册失败: ', err))
    .then(registration => {
      console.log('ServiceWorker 注册成功！作用域为: ', registration.scope);
      return registration
    })
    .then(registration => Promise.all([
      registration,
      askNotificationPermission()
    ]))
    .then(values => {
      var registration = values[0]
      return registration.pushManager.getSubscription().then(subscription => {
        if (!subscription) {
          var options = {
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)
          };
          console.log('subscripte')
          return registration.pushManager.subscribe(options)
        }
        console.log('getSubscription')
        return subscription
      })
    })
    .then(subscription => {
      console.log('订阅成功！', subscription);
      const endpoint = subscription.endpoint;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint,
          subscription
        })
      };
      const SUBSCRIBE_API = '/456789'
      return fetch(SUBSCRIBE_API, options);
    })
    .catch(error => console.error('Subscribe Failure: ', error.message))
    .then(() => sendMsgWithMessageChannel('hello 222sw222'))
    .then(console.log)
    .catch(() => console.error('Send message error.'));
} else {
  console.info('Browser not support Service Worker.');
}
window.addEventListener('offline', function () {
  Notification.requestPermission().then(function (grant) {
    if (grant !== 'granted') {
      return;
    }
    var notification = new Notification("Hi，网络不给力哟", {
      body: '您的网络貌似离线了,need online',
      icon: ''
    });
    notification.onclick = function () {
      notification.close();
    };
  });
})

// function notifyMe() {
//   // 先检查浏览器是否支持
//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//   } else if (Notification.permission === PERMISSION_GRANTED) {
//     var notification = new Notification('test grantde', {
//       body: 'test notification granted',
//       icon: '/yonyouSpace.png'
//     });
//   } else if (Notification.permission !== PERMISSION_DENIED) {
//     Notification.requestPermission(function (permission) {
//       if (permission === PERMISSION_GRANTED) {
//         alert('走回调了')
//         var notification = new Notification('test request', {
//           body: 'test notification request',
//           icon: '/favicon.ico'
//         });
//       }
//     });
//   }
//   notification.onclick = () => {
//     notification.close()
//   }
// }
// (notifyMe())()