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
                      <span className="title">loginPageDefault</span>
                      <span className="desc">loginPageDefault</span>
                      <div className="serviceBtn" onClick={()=>this.scrollToAnchor('apply')}>loginPageDefault</div>
                  </div>
            </div>
            <div className="serviceTwo">
                  <div className="mainContent">
                      <div className="leftTop twoItem">
                        <img src={icon1} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">loginPageDefault</span>
                             <span className="subcon">loginPageDefaultloginPageDefault</span>
                        </div>
                      </div>
                      <div className="rightTop twoItem">
                        <img src={icon2} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">loginPageDefault</span>
                             <span className="subcon">loginPageDefault</span>
                        </div>
                      </div>
                      <div className="leftBottom twoItem">
                        <img src={icon3} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">loginPageDefault</span>
                             <span className="subcon">loginPageDefault</span>
                        </div>
                      </div>
                      <div className="rightBottom twoItem">
                        <img src={icon4} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">loginPageDefault</span>
                             <span className="subcon">loginPageDefault</span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceThree}>
                  <div className="mainContent">
                      <span className="title">loginPageDefault</span>
                      <div className="processCon">
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">1</span>
                            <span className={tipTitle}>loginPageDefault</span>
                            <span className={tipCon}>loginPageDefault</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">2</span>
                            <span className={tipTitle}>loginPageDefault</span>
                            <span className={tipCon}>loginPageDefault</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">3</span>
                            <span className={tipTitle}>loginPageDefault</span>
                            <span className={tipCon}>loginPageDefault</span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceFour} id="apply">
                  <div className="mainContent">
                      <span className="title">loginPageDefault</span>
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
