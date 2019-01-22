import React, { Component } from 'react';
import MainNav from '../../navs/MainNav.js';
import TopNav from '../../navs/TopNav.js';
import icon1 from '../../service/images/icon1.png'; //注意使用的图片是loginPage的
import icon2 from '../../service/images/icon2.png';
import icon3 from '../../service/images/icon3.png';
import icon4 from '../../service/images/icon4.png';
import dot from '../../service/images/dot.png';
import CreateEnter from './createEnter';
import Footer from '../../footer';
import{
  ServicePanel,
  serviceThree,
  tipTitle,
  tipCon,
  serviceFour,
} from '../../service/index.css';

class Service extends Component {
  constructor(props){
    super(props);
    this.state = {
     
    }
 
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
            <MainNav 
              btnShow={false} 
              loginClick={this.loginClick} 
              registryUrl={''} 
              activeIndex={'2'} 
              history={this.props.history} 
              lanCallBack={()=>{}}
              currentLan='en_US'
            />
            <div className="serviceOne">
                  <div className="mainContent">
                      <span className="title">Customized Service</span>
                      <span className="desc">The expert consulting team provides one-to-one solutions</span>
                      <div className="serviceBtn" onClick={()=>this.scrollToAnchor('apply')}>Customize Now</div>
                  </div>
            </div>
            <div className="serviceTwo">
                  <div className="mainContent">
                      <div className="leftTop twoItem">
                        <img src={icon1} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">Free Consultation</span>
                             <span className="subcon">The expert consulting team provides product solutions according to business needs.</span>
                        </div>
                      </div>
                      <div className="rightTop twoItem">
                        <img src={icon2} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">Product Modular Customization</span>
                             <span className="subcon">Provide product development plans, choose any product according to business needs.</span>
                        </div>
                      </div>
                      <div className="leftBottom twoItem">
                        <img src={icon3} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">Exclusive Customization</span>
                             <span className="subcon">Product modules can be deployed to exclusive computer labs, eliminating your security concerns.</span>
                        </div>
                      </div>
                      <div className="rightBottom twoItem">
                        <img src={icon4} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">On-Site Demonstration</span>
                             <span className="subcon">Professional pre-sales team all over the country and ready to go.</span>
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
                            <span className={tipTitle}>Information</span>
                            <span className={tipCon}>Enter your personal information so that we can get in touch with you. </span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">2</span>
                            <span className={tipTitle}>Communication</span>
                            <span className={tipCon}>The pre-sales staff will contact you to discuss your customization needs.</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">3</span>
                            <span className={tipTitle}>On-Site Service</span>
                            <span className={tipCon}>The expert consulting team provides on-site solutions according to your business needs. </span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceFour} id="apply">
                  <div className="mainContent">
                      <span className="title">Applicaiton</span>
                      <CreateEnter/>
                  </div>
            </div>
            <div className="mainFooter">
                <Footer />
            </div>
        </div>
    );
  }
}

export default Service;
