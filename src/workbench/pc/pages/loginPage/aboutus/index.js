import React, { Component } from 'react';
import MainNav from '../navs/MainNav.js';
import TopNav from '../navs/TopNav.js';
import footerPng from '../pages/images/footer.png'
import{
  AboutUsPanel,
 
} from './index.css';

class AboutUs extends Component {
  constructor(props){
    super(props);
    this.state = {
     
    }
 
  }

  componentDidMount(){
    document.getElementById('root').className = 'rootSpec3';
    document.getElementsByTagName('body')[0].className = 'bodySpec3';
  }
  
  render() {
    
    return (
        <div className={AboutUsPanel}>
            <TopNav />
            <MainNav btnShow={false} loginClick={this.loginClick} registryUrl={this.registryUrl} activeIndex={'4'}/>
           <div className="mainCon">
                <div className="title">联系我们</div>
                <div className="lefCon">
                    <span className="subtitle">北京总部</span>
                    <span className="desc">地址：北京市海淀区北清路68号用友产业园</span>
                    <span className="desc">电话：010-86393388</span>
                    <span className="desc">邮箱：abcaasdasd@yonyou.com</span>

                </div>
                <div className="rightCon">
                  
                </div>
           </div>
            <div className="mainFooter mainFooterFake">
              <img src={footerPng} alt="" className="footerImg"/>
            </div>
        </div>
    );
  }
}

export default AboutUs;
