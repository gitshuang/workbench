import React, { Component } from 'react';
import { getHost } from '@u';
import MainNav from './navs/MainNav.js';
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
    }
    this.amBody = null;
    this.registryUrl = CAS_SERVER + '/register?sysid=market&locale=zh_CN&service=' + encodeURIComponent(realservice) +'&locale=en_US';
    this.loginUrl = CAS_SERVER + '/cas/login?sysid=market&mode=light&service=' + encodeURIComponent(yhtssoisloginUrl + '?yhtdesturl=' + _destUrl + '&yhtrealservice=' + realservice)+'&locale=en_US';
    if (process.env.NODE_ENV == 'daily') {
      this.loginUrl = 'https://sso-daily.yyuap.com' + '/cas/login?sysid=market&mode=light&service=' + encodeURIComponent(yhtssoisloginUrl + '?yhtdesturl=' + _destUrl + '&yhtrealservice=' + realservice)+'&locale=en_US';
    }
    this.sevenSpace;
  }
  componentWillMount() {
    // //最后因为footer屏幕居中手动计算，图片1677-358
    // let dom = document.documentElement || document.body;
    // // let screenWidth = dom.clientWidth ;
    // let screenHeight = dom.clientHeight;
    // let header = 66;
    // // let footer =Math.round((screenWidth*358)/1677);
    // let footer = 306;//这边确定
    // let fontHeight = 225;
    // let space = Math.round((screenHeight + header - footer - fontHeight) / 2);
    // this.sevenSpace = space;
  }
  componentDidMount() {
  
  }
  lanCallBack = (lanCode) =>{
    // this.registryUrl = this.registryUrl + `&locale=${lanCode}`;
    // this.loginUrl = this.loginUrl + `&locale=${lanCode}`;
    // 这里不需要，因为切换语言之后就会走loginPage
  }
  
  loginClick = () => {
    this.setState({ loginModalShow: true })
  }
  closeLoginMoal = () => {
    if (document.addEventListener) {
    }
    this.setState({ loginModalShow: false })
  }

  render() {
    let { curIndex, loginModalShow } = this.state;
    let btnShow = (curIndex !== 0 && curIndex !== 6);
    let sevenStyle = {
      top: 0,
      marginTop: this.sevenSpace + 'px'
    }
    return (
      <div className={HomePagePanel}>
        <MainNav btnShow={btnShow} loginClick={this.loginClick} registryUrl={this.registryUrl} history={this.props.history} activeIndex={'1'} lanCallBack={this.lanCallBack}/>
        <div className={`${HomeOnePage} amBody`}>
          <div className="videoContainer"></div>
          <PageSeven loginClick={this.loginClick} registryUrl={this.registryUrl} curIndex={curIndex} sevenSpace={this.sevenSpace} loginModalShow={loginModalShow} />
        </div>
        {
          loginModalShow && (
            <div className="popbox">
              <div className="close" onClick={this.closeLoginMoal}></div>
              <div id="yhtFrameLogin" className="loginFramePanel">
                <iframe id="yhtloginIframe"
                  src={this.loginUrl}
                  width="390px" height="356" name="yhtloginIframe"
                  scrolling="Yes"
                  // noresize="noresize"
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
