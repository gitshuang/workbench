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

const  CAS_SERVER = "https://idtest.yyuap.com",
realservice="http://workbenchdev.yyuap.com";
class Service extends Component {
  constructor(props){
    super(props);
    this.state = {
     
    }
    this.registryUrl = CAS_SERVER + '/register?sysid=market&mode=light&yhtrealservice=' + realservice;
 
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
            <MainNav btnShow={false} loginClick={this.loginClick} registryUrl={this.registryUrl} activeIndex={'2'} history={this.props.history}/>
            <div className="serviceOne">
                  <div className="mainContent">
                      <span className="title">$i18n{index.js0}$i18n-end</span>
                      <span className="desc">$i18n{index.js1}$i18n-end</span>
                      <div className="serviceBtn" onClick={()=>this.scrollToAnchor('apply')}>$i18n{index.js2}$i18n-end</div>
                  </div>
            </div>
            <div className="serviceTwo">
                  <div className="mainContent">
                      <div className="leftTop twoItem">
                        <img src={icon1} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">$i18n{index.js3}$i18n-end</span>
                             <span className="subcon">$i18n{index.js4}$i18n-end$i18n{index.js5}$i18n-end</span>
                        </div>
                      </div>
                      <div className="rightTop twoItem">
                        <img src={icon2} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">$i18n{index.js6}$i18n-end</span>
                             <span className="subcon">$i18n{index.js7}$i18n-end</span>
                        </div>
                      </div>
                      <div className="leftBottom twoItem">
                        <img src={icon3} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">$i18n{index.js8}$i18n-end</span>
                             <span className="subcon">$i18n{index.js9}$i18n-end</span>
                        </div>
                      </div>
                      <div className="rightBottom twoItem">
                        <img src={icon4} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">$i18n{index.js10}$i18n-end</span>
                             <span className="subcon">$i18n{index.js11}$i18n-end</span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceThree}>
                  <div className="mainContent">
                      <span className="title">$i18n{index.js12}$i18n-end</span>
                      <div className="processCon">
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">1</span>
                            <span className={tipTitle}>$i18n{index.js13}$i18n-end</span>
                            <span className={tipCon}>$i18n{index.js14}$i18n-end</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">2</span>
                            <span className={tipTitle}>$i18n{index.js15}$i18n-end</span>
                            <span className={tipCon}>$i18n{index.js16}$i18n-end</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">3</span>
                            <span className={tipTitle}>$i18n{index.js17}$i18n-end</span>
                            <span className={tipCon}>$i18n{index.js18}$i18n-end</span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceFour} id="apply">
                  <div className="mainContent">
                      <span className="title">$i18n{index.js19}$i18n-end</span>
                      <div className="applyService">
                         <CreateEnter />
                      </div>
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
