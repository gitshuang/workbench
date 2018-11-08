import React, { Component } from 'react';
import MainNav from '../navs/MainNav.js';
import TopNav from '../navs/TopNav.js';
import icon1 from './images/icon1.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import icon4 from './images/icon4.png';
import dot from './images/dot.png';
import CreateEnter from './createEnter';
import footerPng from '../pages/images/footer.png';
import Footer from '../footer/index.js';
import{
  ServicePanel,
  serviceThree,
  tipTitle,
  tipCon,
  serviceFour,
} from './index.css';

// const  CAS_SERVER = "https://idtest.yyuap.com",
// realservice="http://workbenchdev.yyuap.com";
class Service extends Component {
  constructor(props){
    super(props);
    this.state = {
     
    }
    // this.registryUrl = CAS_SERVER + '/register?sysid=diwork&mode=light&yhtrealservice=' + realservice;
 
  }

  componentDidMount(){
    document.getElementById('root').className = '';
    document.getElementsByTagName('body')[0].className = '';
  }
  loginClick = () =>{
    document.removeEventListener("DOMMouseScroll", this.scrollFunc);
    window.onmousewheel = document.onmousewheel = null;
    this.setState({loginModalShow:true})
  }

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if(anchorElement) { anchorElement.scrollIntoView({behavior: 'smooth'}); }
    }
  }
  render() {
    return (
        <div className={ServicePanel}>
            {/* <TopNav /> */}
            <MainNav btnShow={false} loginClick={this.loginClick} registryUrl={''} activeIndex={'2'} history={this.props.history} lanCallBack={()=>{}} />
            <div className="serviceOne">
                  <div className="mainContent">
                      <span className="title">定制服務</span>
                      <span className="desc">專家諮詢團隊提供一對一解決方案</span>
                      <div className="serviceBtn" onClick={()=>this.scrollToAnchor('apply')}>馬上定制</div>
                  </div>
            </div>
            <div className="serviceTwo">
                  <div className="mainContent">
                      <div className="leftTop twoItem">
                        <img src={icon1} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">免費諮詢</span>
                             <span className="subcon">專家團隊，根據企業需求，提供產品方案</span>
                        </div>
                      </div>
                      <div className="rightTop twoItem">
                        <img src={icon2} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">產品模組定制</span>
                             <span className="subcon">提供產品部署方案，可隨意選擇需要的產品</span>
                        </div>
                      </div>
                      <div className="leftBottom twoItem">
                        <img src={icon3} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">專屬化定制</span>
                             <span className="subcon">產品模組可部署到專屬機房，免去您的安全擔憂</span>
                        </div>
                      </div>
                      <div className="rightBottom twoItem">
                        <img src={icon4} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">上門演示</span>
                             <span className="subcon">遍佈全國的專業售前團隊，整裝待命</span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceThree}>
                  <div className="mainContent">
                      <span className="title">服務流程</span>
                      <div className="processCon">
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">1</span>
                            <span className={tipTitle}>填寫資訊</span>
                            <span className={tipCon}>錄入您的個人資訊，方便我們與您取得聯繫</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">2</span>
                            <span className={tipTitle}>電話溝通</span>
                            <span className={tipCon}>售前人員將與您取得聯繫，和您討論定制需求</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">3</span>
                            <span className={tipTitle}>專家團隊上門</span>
                            <span className={tipCon}>根據您的需求，我們可以提供專家團隊上門解決方案</span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceFour} id="apply">
                  <div className="mainContent">
                      <span className="title">申請服務</span>
                      {/* <div className="applyService">
                      </div> */}
                      <CreateEnter />
                  </div>
            </div>
            {/* <div className="mainFooter mainFooterFake">
              <img src={footerPng} alt="" className="footerImg"/>
            </div> */}
            <div className="mainFooter">
                <Footer />
            </div>
        </div>
    );
  }
}

export default Service;
