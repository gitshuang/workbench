/*
function loading() {
    var loadingElm = document.getElementById('loading')
    var loadingText = '.'
    function loop() {
        setTimeout(function () {
            if (loadingElm.innerText.length === 3) {
                loadingElm.innerText = loadingText
            } else {
                loadingElm.innerText += loadingText
            }
            loop()
        }, 300)
    }
    loop()
}
*/
export default function check(tenantId, loadingFunc, successFunc) {
  function loop() {
    if (this.status === 200) {
      let result = {
        data: false,
      };
      try {
        result = JSON.parse(this.responseText);
      } catch (e) {
        console.log(e); // eslint-disable-line
      }
      if (result.data) {
        successFunc();
      } else {
        setTimeout(() => {
          // if(fuuu == 45) {successFunc();return false;}
          loadingFunc(tenantId);
          check(tenantId, loadingFunc, successFunc);
        }, 300);
      }
    } else {
      setTimeout(() => {
        successFunc();
      }, 1000);
    }
  }
  const xhr = new XMLHttpRequest();
  xhr.onload = loop();
  const date = new Date().getTime();
  xhr.open('get', `/manager/teamEnter/check?tenantId=${tenantId}'&switch=true&ts='${date}`);
  xhr.send();
}
