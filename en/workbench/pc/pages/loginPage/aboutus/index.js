import React, { Component } from 'react';
import MainNav from '../navs/MainNav.js';
import TopNav from '../navs/TopNav.js';
import footerPng from '../pages/images/footer.png';
import { Map, Marker } from 'react-amap';
import Footer from '../footer/index.js';

import{
  AboutUsPanel,
 
} from './index.css';
 
const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
  }
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class AboutUs extends Component {
  constructor(props){
    super(props);
    this.markerEvents = {
        click: (e) => {
          console.log("You clicked this icon; call parameter:");
          console.log(e);
        }
    }
    this.mapPlugins = ['ToolBar'];
    this.mapCenter = {longitude: 116.234732, latitude: 40.068463};
    this.markerPosition = {longitude: 116.234732, latitude: 40.068463};
  }
  componentDidMount(){
    document.getElementById('root').className = '';
    document.getElementsByTagName('body')[0].className = '';
  }
  
  render() {
    
    return (
        <div className={AboutUsPanel}>
            {/* <TopNav /> */}
            <MainNav btnShow={false} loginClick={this.loginClick} registryUrl={this.registryUrl} activeIndex={'4'} history={this.props.history}/>
           <div className="mainCon">
                <div className="title">Contact Us</div>
                <div className="absoutUsCon">
                    <div className="lefCon">
                        <span className="subtitle">Beijing Headquarters</span>
                        <span className="desc">[object Object]</span>
                        <span className="desc">Tel: 010-86393388Ext. No. 4</span>
                        <span className="desc">Email:esnservice@yonyou.com</span>

                    </div>
                    <div className="rightCon">
                        <Map amapkey={"4e34b3708df7f3f82680e55b9d178e60"}
                            plugins={this.mapPlugins}
                            center={this.mapCenter}
                            zoom={12}
                            events={this.markerEvents}
                            >
                            <Marker position={this.markerPosition} />
                        </Map>
                    </div>
                </div>
           </div>
            {/* <div className="mainFooter mainFooterFake">
              <img src={footerPng} alt="" className="footerImg"/>
            </div> */}
            <div className="mainFooter ">
              <Footer/>
            </div>
        </div>
    );
  }
}

export default AboutUs;