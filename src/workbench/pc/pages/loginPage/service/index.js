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
                      <span className="title">定制服务</span>
                      <span className="desc">专家咨询团队提供一对一解决方案</span>
                      <div className="serviceBtn" onClick={()=>this.scrollToAnchor('apply')}>马上定制</div>
                  </div>
            </div>
            <div className="serviceTwo">
                  <div className="mainContent">
                      <div className="leftTop twoItem">
                        <img src={icon1} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">免费咨询</span>
                             <span className="subcon">专家团队，根据企业需求，提供产品方案</span>
                        </div>
                      </div>
                      <div className="rightTop twoItem">
                        <img src={icon2} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">产品模块定制</span>
                             <span className="subcon">提供产品部署方案，可随意选择需要的产品</span>
                        </div>
                      </div>
                      <div className="leftBottom twoItem">
                        <img src={icon3} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">专属化定制</span>
                             <span className="subcon">产品模块可部署到专属机房，免去您的安全担忧</span>
                        </div>
                      </div>
                      <div className="rightBottom twoItem">
                        <img src={icon4} alt="" className="icon"/>
                        <div className="con">
                             <span className="title">上门演示</span>
                             <span className="subcon">遍布全国的专业售前团队，整装待命</span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceThree}>
                  <div className="mainContent">
                      <span className="title">服务流程</span>
                      <div className="processCon">
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">1</span>
                            <span className={tipTitle}>填写信息</span>
                            <span className={tipCon}>录入您的个人信息，方便我们与您取得联系</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">2</span>
                            <span className={tipTitle}>电话沟通</span>
                            <span className={tipCon}>售前人员将与您取得联系，和您讨论定制需求</span>
                        </div>
                        <div className="process">
                            <img src={dot} alt="" className="processDot"/>
                            <span className="dotNum">3</span>
                            <span className={tipTitle}>专家团队上门</span>
                            <span className={tipCon}>根据您的需求，我们可以提供专家团队上门解决方案</span>
                        </div>
                      </div>
                  </div>
            </div>
            <div className={serviceFour} id="apply">
                  <div className="mainContent">
                      <span className="title">申请服务</span>
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
