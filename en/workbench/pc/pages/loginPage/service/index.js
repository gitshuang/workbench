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
    // this.registryUrl = CAS_SERVER + '/register?sysid=market&mode=light&yhtrealservice=' + realservice;
 
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
            <MainNav btnShow={false} loginClick={this.loginClick} registryUrl={''} activeIndex={'2'} history={this.props.history}/>
            <div className="serviceOne">
                  <div className="mainContent">
                      <span className="title">Customization Services</span>
                      <span className="desc">One-on-one solutions provided by expert teams</span>
                      <div className="serviceBtn" onClick={()=>this.scrollToAnchor('apply')}>Customize</div>
                  </div>
            </div>
            <div className="serviceTwo">
                  <div className="mainContent">
                      <div className="leftTop twoItem">
                        <img src={icon1} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">Free Consultation</span>
                             <span className="subcon">Expert teams provide product solutions according to enterprise requirements </span>
                        </div>
                      </div>
                      <div className="rightTop twoItem">
                        <img src={icon2} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">Product Module Customization</span>
                             <span className="subcon">Provide product deployment solutions, that you're free to choose the products you need</span>
                        </div>
                      </div>
                      <div className="leftBottom twoItem">
                        <img src={icon3} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">Exclusive Customizations</span>
                             <span className="subcon">Product modules can be deployed in your exclusive computer room, eliminating your security concerns</span>
                        </div>
                      </div>
                      <div className="rightBottom twoItem">
                        <img src={icon4} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">On-site Demonstration</span>
                             <span className="subcon">Professional pre-sales team across the country, ready to go anytime</span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceThree}>
                  <div className="mainContent">
                      <span className="title">Service Process</span>
                      <div className="processCon">
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">1</span>
                            <span className={tipTitle}>Fill in Information</span>
                            <span className={tipCon}>Enter your personal information so that we can get in touch with you</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">2</span>
                            <span className={tipTitle}>Telephone Communication</span>
                            <span className={tipCon}>Pre-sales staff will get in touch with you to discuss your customization needs</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">3</span>
                            <span className={tipTitle}>Expert Team On-site Services</span>
                            <span className={tipCon}>According to your needs, we can provide expert team on-site solutions</span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceFour} id="apply">
                  <div className="mainContent">
                      <span className="title">Service Application</span>
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
