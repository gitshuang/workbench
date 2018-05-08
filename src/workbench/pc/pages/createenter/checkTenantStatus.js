
function loading() {  // eslint-disable-line
  const loadingElm = document.getElementById('loading');
  const loadingText = '.';
  function loop() {
    setTimeout(() => {
      if (loadingElm.innerText.length === 3) {
        loadingElm.innerText = loadingText;
      } else {
        loadingElm.innerText += loadingText;
      }
      loop();
    }, 300);
  }
  loop();
}
// let fuuu = 0;
function check(tenantId, loadingFunc, successFunc) {
  //  ++fuuu;
  const xhr = new XMLHttpRequest();
  xhr.onload = loop; // eslint-disable-line
  xhr.open('get', `/manager/teamEnter/check?tenantId=${tenantId}&switch=true&ts=${new Date().getTime()}`);
  xhr.send();
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
}

export { check }; // eslint-disable-line
