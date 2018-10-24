import React, { Component } from 'react';
import { getHost } from '@u';
import MainNav from './navs/MainNav.js';
import TopNav from './navs/TopNav.js';
import PageFirst from './pages/PageFirst.js';
import PageSecond from './pages/PageSecond.js';
import PageThird from './pages/PageThird.js';
import PageFour from './pages/PageFour.js';
import PageFive from './pages/PageFive.js';
import PageSix from './pages/PageSix.js';
import PageSeven from './pages/PageSeven.js';
import {
  HomePagePanel,
  rightDotMenu,
  HomeOnePage
} from './index.css';
const windowLocationOrigin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');//ie8-ie10不兼容的原因

const CAS_SERVER = getHost('euc'),//"https://user-daily.yyuap.com",
  //yhtssoisloginUrl = CAS_SERVER + '/cas/iframeloginredirect',
  yhtssoisloginUrl = windowLocationOrigin + '/login_light.jsp',
  _destUrl = `${getHost('api')}/yhtssoislogin`, //只有这个不是登陆成功后跳转的链接
  realservice = windowLocationOrigin;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex: 0,//处于展示的是
      alldata: [1, 2, 3, 4, 5, 6, 7],
      preTime: new Date().getTime(),//上次执行的时间
      duration: 1200,//执行的间隔
      loginModalShow: false,//登录的modal是否展示
      pagesRef:[],//放7个分页
      lanChangeFlag:0,//为了解决bug：registryUrl写在this上而没有写在state上，所以callback函数修改url但是不会重新渲染
    }
    this.amBody = null;
    this.scrollFunc = this.scrollFunc.bind(this);
    this.registryUrl = CAS_SERVER + '/register?sysid=market&service=' + encodeURIComponent(realservice);
    this.loginUrl = CAS_SERVER + '/cas/login?sysid=market&mode=light&service=' + encodeURIComponent(yhtssoisloginUrl + '?yhtdesturl=' + _destUrl + '&yhtrealservice=' + realservice);
    if (process.env.NODE_ENV == 'daily') {
      this.loginUrl = 'https://sso-daily.yyuap.com' + '/cas/login?sysid=market&mode=light&service=' + encodeURIComponent(yhtssoisloginUrl + '?yhtdesturl=' + _destUrl + '&yhtrealservice=' + realservice);
    }
    this.sevenSpace;
  }
  componentWillMount() {
    //最后因为footer屏幕居中手动计算，图片1677-358
    let dom = document.documentElement || document.body;
    // let screenWidth = dom.clientWidth ;
    let screenHeight = dom.clientHeight;
    let header = 110;
    // let footer =Math.round((screenWidth*358)/1677);
    let footer = 360;//这边确定
    let fontHeight = 150;
    let space = Math.round((screenHeight + header - footer - fontHeight) / 2);
    this.sevenSpace = space;
  }
  componentDidMount() {
    if (document.addEventListener) {
      document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
    }
    //W3C
    window.onmousewheel = document.onmousewheel = this.scrollFunc;//IE/Opera/Chrome
    document.getElementById('root').className = 'rootSpec';
    document.getElementsByTagName('body')[0].className = 'bodySpec';
    if(this.getQueryString('autoLogin')&&this.getQueryString('autoLogin').indexOf('true')>-1) this.loginClick();

  }
  
  componentWillUnmount(){
    if (document.removeEventListener) {
      document.removeEventListener('DOMMouseScroll', this.scrollFunc, false);
    }
    //W3C
    window.onmousewheel = document.onmousewheel = null;//IE/Opera/Chrome
    document.getElementById('root').className = '';
    document.getElementsByTagName('body')[0].className = '';
  }
  getQueryString = (name) => {  
    var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");  
    // var r = 'http://workbench.yyuap.com/?autoLogin=false#/'.substr(1).match(reg); 
    var r =window.location.href.substr(1).match(reg);  
    if (r != null) return unescape(r[2]).toString().toLocaleLowerCase();  
    return null;  
} 
  scrollFunc = function (e) {
    let { preTime, duration, curIndex, alldata } = this.state;
    //如果动画还没执行完，则return
    var now = new Date().getTime();
    if (preTime && now < preTime + duration) {
      return;
    }
    this.setState({ preTime: now });
    e = e || window.event;
    var t = 0;
    if (e.wheelDelta) {//IE/Opera/Chrome
      t = e.wheelDelta;
      if (t > 0 && curIndex > 0) {
        //上滚动
        this.movePrev();
      } else if (t < 0 && curIndex < alldata.length - 1) {
        //下滚动
        this.moveNext();
      }
    } else if (e.detail) {//Firefox
      t = e.detail;
      if (t < 0 && curIndex > 0) {
        //上滚动
        this.movePrev();
      } else if (t > 0 && curIndex < alldata.length - 1) {
        //下滚动
        this.moveNext();
      }
    }
  }
  moveNext = () => {
    let preIndex = this.state.curIndex;
    if(preIndex < 5  && !this.state.pagesRef[preIndex+2]._loaded){
      if(!this.state.pagesRef[preIndex+1]._loaded){
        //表示本身图片都没有被加载
        let imgVal = preIndex+2;
        let img  = require('./pages/images/'+ imgVal+'.png');
        this.state.pagesRef[preIndex+1].children[0].style.backgroundImage = `url(${img})`
        this.state.pagesRef[preIndex+1]._loaded = true;
      }
      // 从第二张图片开始加载3,preIndex=0，3加载4，4加载5
      let imgVal = preIndex+3;
      let img  = require('./pages/images/'+ imgVal+'.png');
      this.state.pagesRef[preIndex+2].children[0].style.backgroundImage = `url(${img})`
      this.state.pagesRef[preIndex+2]._loaded = true;
    }
    this.setState({ curIndex: preIndex + 1 }, () => {
      this.amBody.classList.remove(`animation${preIndex}`);
      this.amBody.classList.add(`animation${preIndex + 1}`);
    });
    
  }
  movePrev = () => {
    let preIndex = this.state.curIndex;
    if(!this.state.pagesRef[preIndex-1]._loaded){
      // 从第二张图片开始加载3,preIndex=0，3加载4，4加载5
      let imgVal = preIndex-1+1;
      let img  = require('./pages/images/'+ imgVal+'.png');
      this.state.pagesRef[preIndex-1].children[0].style.backgroundImage = `url(${img})`;
      this.state.pagesRef[preIndex-1]._loaded = true;
    }
    this.setState({ curIndex: preIndex - 1 }, () => {
      this.amBody.classList.remove(`animation${preIndex}`);
      this.amBody.classList.add(`animation${preIndex - 1}`);
    })

  }
  changePage = (index) => {
    //添加图片懒加载的
    if(!this.state.pagesRef[index]._loaded){
      // 从第二张图片开始加载3,preIndex=0，3加载4，4加载5
      let imgVal = index+1;
      let img  = require('./pages/images/'+ imgVal+'.png');
      this.state.pagesRef[index].children[0].style.backgroundImage = `url(${img})`;
      this.state.pagesRef[index]._loaded = true;
    }
    if (this.state.curIndex === index) return;
    this.amBody.classList.remove(`animation${this.state.curIndex}`);
    this.amBody.classList.add(`animation${index}`);
    this.setState({
      curIndex: index
    });
  }
  renderDot = () => {
    let { alldata, curIndex } = this.state;
    return alldata.map((item, index) => {
      return (
        <div key={`dot${index}`} className={`menudot ${index == curIndex ? 'active' : ''}`} onClick={() => { this.changePage(index) }}></div>
      )
    })
  }
  loginClick = () => {
    document.removeEventListener && document.removeEventListener("DOMMouseScroll", this.scrollFunc);
    window.onmousewheel = document.onmousewheel = null;
    this.setState({ loginModalShow: true })
  }
  closeLoginMoal = () => {
    if (document.addEventListener) {
      document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
    }
    //W3C
    window.onmousewheel = document.onmousewheel = this.scrollFunc;//IE/Opera/Chrome
    this.setState({ loginModalShow: false })
  }
  lanCallBack = (lanCode) =>{
    if(lanCode.toLowerCase() === 'zh_tw'){
      // 友空间使用的是zh_HK
      this.registryUrl = this.registryUrl + `&locale=zh_HK`;
      this.loginUrl = this.loginUrl + `&locale=zh_HK`;
    }else{
      this.registryUrl = this.registryUrl + `&locale=${lanCode}`;
      this.loginUrl = this.loginUrl + `&locale=${lanCode}`;
    }
    this.setState({lanChangeFlag:++this.state.lanChangeFlag})
  }
  render() {
    let { curIndex, loginModalShow, pagesRef } = this.state;
    let btnShow = (curIndex !== 0 && curIndex !== 6);
    let sevenStyle = {
      top: 0,
      marginTop: this.sevenSpace + 'px'
    }
    return (
      <div className={HomePagePanel}>
        {/* <TopNav /> */}
        <MainNav btnShow={btnShow} loginClick={this.loginClick} registryUrl={this.registryUrl} history={this.props.history} activeIndex={'1'} lanCallBack={this.lanCallBack}/>
        <div className={rightDotMenu} style={curIndex == 6 ? { marginTop: `${this.sevenSpace + 15}px`, top: 0 } : null} >
          {!loginModalShow && this.renderDot()}
        </div>
        <div ref={(ref) => { this.amBody = ref }} className={`${HomeOnePage} amBody animation0`}>
          <div className="videoContainer"></div>
          <PageFirst loginClick={this.loginClick} registryUrl={this.registryUrl} loginModalShow={loginModalShow} pagesRef={pagesRef}/>
          <PageSecond loginModalShow={loginModalShow} pagesRef={pagesRef}/>
          <PageThird loginModalShow={loginModalShow} pagesRef={pagesRef}/>
          <PageFour loginModalShow={loginModalShow} pagesRef={pagesRef}/>
          <PageFive loginModalShow={loginModalShow} pagesRef={pagesRef}/>
          <PageSix loginModalShow={loginModalShow} pagesRef={pagesRef}/>
          <PageSeven loginClick={this.loginClick} registryUrl={this.registryUrl} curIndex={curIndex} sevenSpace={this.sevenSpace} loginModalShow={loginModalShow} pagesRef={pagesRef}/>
        </div>
        {curIndex !== 6 && !loginModalShow && <div className="goNextArrow" onClick={this.moveNext}> </div>}
        {
          loginModalShow && (
            <div className="popbox">
              <div className="close" onClick={this.closeLoginMoal}></div>
              <div id="yhtFrameLogin" className="loginFramePanel">
                <iframe id="yhtloginIframe"
                  src={this.loginUrl}
                  width="390px" height="356" name="yhtloginIframe"
                  scrolling="Yes"
                  frameBorder="0">
                </iframe>
              </div>
              <div className="popmask"></div>
            </div>
          )
        }
      </div>
    );
  }
}

export default LoginPage;
