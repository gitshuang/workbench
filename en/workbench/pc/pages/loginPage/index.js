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
import{
  HomePagePanel,
  rightDotMenu,
  HomeOnePage
} from './index.css';
const windowLocationOrigin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');//ie8-ie10不兼容的原因

const  CAS_SERVER = getHost('euc'),//"https://user-daily.yyuap.com",
//yhtssoisloginUrl = CAS_SERVER + '/cas/iframeloginredirect',
yhtssoisloginUrl = windowLocationOrigin + '/login_light.jsp',
_destUrl=`${getHost('api')}/yhtssoislogin`, //只有这个不是登陆成功后跳转的链接
realservice= getHost('api');

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      curIndex:0,//处于展示的是
      alldata:[1,2,3,4,5,6,7],
      preTime:new Date().getTime(),//上次执行的时间
      duration:1200,//执行的间隔
      loginModalShow:false,//登录的modal是否展示
    }
    this.amBody = null;
    this.scrollFunc = this.scrollFunc.bind(this);
    this.registryUrl = CAS_SERVER + '/register?sysid=market&mode=light&yhtrealservice=' + realservice;  ;
    this.loginUrl = CAS_SERVER + '/cas/login?sysid=market&mode=light&service=' + encodeURIComponent(yhtssoisloginUrl + '?yhtdesturl=' + _destUrl + '&yhtrealservice=' + realservice);
    if(process.env.NODE_ENV == 'daily'){
      this.loginUrl = 'https://sso-daily.yyuap.com'+ '/cas/login?sysid=market&mode=light&service=' + encodeURIComponent(yhtssoisloginUrl);
    }
    this.sevenSpace ;
  }
  componentWillMount(){
     //最后因为footer屏幕居中手动计算，图片1677-358
    let dom = document.documentElement ||document.body ;
    // let screenWidth = dom.clientWidth ;
    let screenHeight = dom.clientHeight ;
    let header = 110;
    // let footer =Math.round((screenWidth*358)/1677);
    let footer = 360;//这边确定
    let fontHeight = 150;
    let space =Math.round((screenHeight + header-footer- fontHeight)/2);
    this.sevenSpace = space;
  }
  componentDidMount(){
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
    }
    //W3C
    window.onmousewheel = document.onmousewheel = this.scrollFunc;//IE/Opera/Chrome
    document.getElementById('root').className = 'rootSpec';
    document.getElementsByTagName('body')[0].className = 'bodySpec';
  }
  
  scrollFunc = function (e) {
      let {preTime, duration,curIndex, alldata} = this.state;
      //如果动画还没执行完，则return
      var now = new Date().getTime();
      if( preTime && now < preTime  + duration){
          return;
      }
      this.setState({preTime:now});
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
  moveNext =() =>{
      let preIndex = this.state.curIndex;
      this.setState({curIndex:preIndex+1},()=>{
        this.amBody.classList.remove(`animation${preIndex}`);
        this.amBody.classList.add(`animation${preIndex+1}`);
      })
  }
  movePrev =()=>{
    let preIndex = this.state.curIndex;
    this.setState({curIndex:preIndex-1},()=>{
      this.amBody.classList.remove(`animation${preIndex}`);
      this.amBody.classList.add(`animation${preIndex-1}`);
    })

  }
  changePage = (index) =>{
    if(this.state.curIndex === index) return;
    this.amBody.classList.remove(`animation${this.state.curIndex}`);
    this.amBody.classList.add(`animation${index}`);
    this.setState({
      curIndex:index
    });
  }
  renderDot = () =>{
    let {alldata,curIndex} = this.state;
    return alldata.map((item,index)=>{
      return (
        <div key={`dot${index}`} className={`menudot ${index == curIndex? 'active':''}`} onClick={() =>{this.changePage(index)}}></div>
      )
    })
  }
  loginClick = () =>{
    document.removeEventListener("DOMMouseScroll", this.scrollFunc);
    window.onmousewheel = document.onmousewheel = null;
    this.setState({loginModalShow:true})
  }
  closeLoginMoal = () =>{
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
    }
    //W3C
    window.onmousewheel = document.onmousewheel = this.scrollFunc;//IE/Opera/Chrome
    this.setState({loginModalShow:false})
  }
  
  render() {
    let {curIndex,loginModalShow} = this.state;
    let btnShow =(curIndex !== 0 && curIndex !== 6);
    let sevenStyle = {
      top:0,
      marginTop:this.sevenSpace+'px'
    }
    return (
        <div className={HomePagePanel}>
          {/* <TopNav /> */}
          <MainNav btnShow={btnShow} loginClick={this.loginClick} registryUrl={this.registryUrl} history={this.props.history} activeIndex={'1'}/>
          <div className={rightDotMenu} style={curIndex== 6?{marginTop:`${this.sevenSpace + 15}px`,top:0}:null} >
              {!loginModalShow && this.renderDot()}
          </div>
          <div ref={(ref) =>{this.amBody = ref}}className={`${HomeOnePage} amBody animation0`}>
              <div className="videoContainer"></div>
              <PageFirst loginClick={this.loginClick} registryUrl={this.registryUrl} loginModalShow={loginModalShow}/>
              <PageSecond loginModalShow={loginModalShow}/>
              <PageThird loginModalShow={loginModalShow}/>
              <PageFour loginModalShow={loginModalShow}/>
              <PageFive loginModalShow={loginModalShow}/>
              <PageSix loginModalShow={loginModalShow}/>
              <PageSeven loginClick={this.loginClick} registryUrl={this.registryUrl} curIndex={curIndex} sevenSpace={this.sevenSpace} loginModalShow={loginModalShow}/>
          </div>
          {curIndex!==6 && !loginModalShow && <div className="goNextArrow" onClick={this.moveNext}> </div>}
            {
              loginModalShow&&(
                <div className="popbox">
                  <div className="close" onClick={this.closeLoginMoal}></div>
                  <div id="yhtFrameLogin" className="loginFramePanel">
                    <iframe id="yhtloginIframe"
                      src={this.loginUrl}
                      width="390px" height= "356" name="yhtloginIframe" 
                      scrolling="No"  
                      noresize="noresize" 
                      frameborder="0">
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