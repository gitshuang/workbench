'use strict';
// 用于标注创建的缓存，也可以根据它来建立版本规范
const CACHE_NAME = "diwork_cache_v1.0.0";
const HOST_NAME = location.host;
// 列举要默认缓存的静态资源，一般用于离线使用
const urlsToCache = [
  '/',
  '/index.html',
];
const defaultOffLineAjax = [
  'font/icomoon',
  'user/getUserInfo',
  'application/getShortcutApps',
  'desktop/getdeskTop',
  'user/getCanLoginTenants',
];
const ignoreCacheList = [

]


// 安装过程
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting()); //跳过waiting阶段 直接active
  event.waitUntil(
    // 使用 cache API 打开指定的 cache 文件
    caches.open(CACHE_NAME).then(cache => {
      console.log(cache);
      // 添加要缓存的资源列表
      return cache.addAll(urlsToCache);
    })
  );
});

//service-workder的更新过程 
self.addEventListener('activate', event => event.waitUntil(
  Promise.all([
    // 更新客户端
    clients.claim(),
    // 清理旧版本
    caches.keys().then(cacheList => Promise.all(
      cacheList.map(cacheName => {
        if (cacheName !== CACHE_NAME) {
          caches.delete(cacheName);
        }
      })
    ))
  ])
));

/**
 * serviceworker通信机制
 */
self.addEventListener('message', function (ev) {
  console.log('2', ev.data);
  ev.ports[0].postMessage('在sw3山的那边住着一群蓝精灵')
});

self.clients.matchAll().then(clientList => {
  clientList.forEach(client => {
    const messageChannel = new MessageChannel();
    client.postMessage('I am from Service worker！');
  })
});
/**
 * 通信机制结束
 */



/**
 * 推送机制
 */
//pushsubscriptionchange
const onPush = function (event) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }
  // const data = event.data.json();
  console.log('Received a push message');
  console.log(event)
  var title = "亲爱的友空间用户：";
  var body = '恭喜你被选为lucky user';
  var icon = '/yonyouSpace.png';
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
      renotify: true,
      silent: false,
    }).then((NotificationEvent) => {
      self.onnotificationclick = function (event) {
        //event.notification
        event.notification.close();
        if (clients.openWindow) {
          clients.openWindow('https://www.diwork.com');
        }
      }
    })
  );
}
self.addEventListener('push', onPush);

/**
 * 推送机制结束
 */

 //判断是否跨域
const isCORSRequest = function(url, host) {
  return url.search(host) === -1;
};
// const request = isCORSRequest(req.url, HOST_NAME) ? new Request(req.url, {mode: 'cors'}) : req;
// fetch(fetchRequest, { credentials: 'include' } );

// 不需要缓存的请求
function shouldAlwaysFetch(request) {
  return
    request.method !== 'GET' ||
    ignoreCacheList.some(ignoreItem => request.url.match(ignoreItem));
}

// 缓存 html 页面
function shouldFetchAndCache(request) {
  return (/text\/html/i).test(request.headers.get('Accept'));
}

// 当网络离线或请求发生了错误，使用离线资源替代 request 请求
function offlineResponse(request) {
  if (request.url.match(/\.(jpg|png|gif|svg|jpeg)(\?.*)?$/)) {
      return caches.match('/default.jpg');
  } else {
      return caches.match('/offline.html');
  }
}
// 从缓存读取或使用离线资源替代
function cachedOrOffline(request) {
  return caches
      .match(request)
      .then((response) => response || offlineResponse(request));
}

function onLineDoCache(request) {
  return fetch(request).then(response => {
    // 需要缓存的资源
    if (response &&
      response.status == 200 &&
      response.headers.get('Content-Type').match(/javascript|text\/css|image/i)
    ) {
      const responseToCache = response.clone();
      caches.open(CACHE_NAME).then(cache => {
        cache.put(response.url, responseToCache);
      })
    }
    defaultOffLineAjax.forEach((v, k) => {
      if (request.url.match(v)) {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(v, responseToCache);
        })
      }
    })
    return response;
  }).catch(() => {
    console.log('onlineCache出错')
  })
}
// fetch 缓存机制 应对离线访问
self.addEventListener('fetch', event => {
  //非get请求;不进行缓存列表
  if(shouldAlwaysFetch(event.request)){
    const request = event.request;
    event.respondWith(
      fetch(request,{ credentials: 'include' })
            .then(response => {
              return response;
            })
            .catch(() =>{
              console.log('不走缓存部分出错')
              // offlineResponse(request)
            })
              
    )
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => {
      var requestClone = event.request.clone();
      console.log('🎯🎯🎯🎯🎯命中缓存🎯🎯🎯🎯🎯🎯')
      if (navigator.onLine) {
        return onLineDoCache(requestClone)
      } else {
        if (response) {
          return response;
        }
        for (let i = 0; i < defaultOffLineAjax.length; i++) {
          var v = defaultOffLineAjax[i]
          if (event.request.url.match(v)) {
            return caches.match(v)
          }
        }
      }
    }).catch(() => {
      console.log('fetch事件监听失败')
    })
  )
})




// fetch 命中缓存机制 方向不对

// 联网状态下执行
// function onlineRequest(fetchRequest) {
//   console.log('fetchRequest', fetchRequest)
//   // 使用 fecth API 获取资源，以实现对资源请求控制
//   return fetch(fetchRequest).then(response => {
//     console.log('response', response)
//     // 在资源请求成功后，将 image、js、css 资源加入缓存列表
//     if (!response ||
//       response.status !== 200 ||
//       !response.headers.get('Content-type').match(/image|javascript|test\/css/i)
//     ) {
//       return response;
//     }

//     const responseToCache = response.clone();
//     caches.open(CACHE_NAME)
//       .then(function (cache) {
//         cache.put(response.url, responseToCache);
//       });

//     return response;
//   }).catch(() => {
//     // 获取失败，离线资源降级替换
//     console.log('请求不到东西 转到离线处理')
//     offlineRequest(fetchRequest);
//   });
// }
// // 离线状态下执行，降级替换
// function offlineRequest(request) {
//   // 使用离线图片
//   if (request.url.match(/\.(png|gif|jpg)/i)) {
//     return caches.match('/images/offline.png');
//   }
//   // 使用离线页面
//   if (request.url.match(/\.html$/)) {
//     return caches.match('/test/offline.html');
//   }
// }

// fetch = fetch(fetchRequest, { credentials: 'include' } );

// fetch 命中缓存机制
// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request)
//         .then(response => {
//             console.log('缓存命中🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯')
//             if (response) {
//                 console.log('Found response in cache:', response);
//                 return response;
//             }
//             console.log('No response found in cache. About to fetch from network...');
//             const fetchRequest = event.request.clone();
//             if (navigator.onLine) {
//                 console.log('onLine fetch')
//                 return onlineRequest(fetchRequest);
//             } else {
//                 console.log('offLine fetch')
//                 return offlineRequest(fetchRequest);
//             }
//         })
//     );
// });
