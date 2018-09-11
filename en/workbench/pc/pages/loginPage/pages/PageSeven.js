import Footer from '../footer/index.js';
import{
    amPage,
    amBg,
    words,
  }from './PageSplit.css'
  import footerPng from './images/footer.png'
  export default function PageSeven(props){
      return(
         <div className={`${amPage} PageSeven `} ref={ref=>props.pagesRef[6] = ref}>
           <div className={amBg} ></div>
            <div className="mainContent viewSeven">
            {
              !props.loginModalShow &&(
                <div className={`laymid`} style={{marginTop:`${props.sevenSpace}px`}}>
                  {/* <div className="logo"></div> */}
                  <div className="mainTitle">“Trust us, and start digital working right away”</div>
                  <div className="clickMe clearfix">
                    <span  className="loginBtn clickBtn " onClick={props.loginClick}>Log In</span>
                    <a target="_blank" href={props.registryUrl} className="registryBtn clickBtn">Sign Up</a>
                  </div>
                </div>
              )
            }
              
            </div>
            {/* <div className="mainFooter mainFooterFake">
              <img src={footerPng} alt="" className="footerImg"/>
            </div> */}
            <div className="mainFooter">
                <Footer/>
            </div>
            {/* <div className="mainFooter">
               <div className="mainFooterCon">
                  <div className="footerSection sectionOne">
                    <span className="title">Premium Merchant Services</span>
                    <div className="sub">
                      <span className="directives">Subscriptions</span>
                      <span className="directives">Service Account</span>
                      <span className="directives">Yonyou CloudApp</span>
                    </div>
                  </div>
                  <div className="footerSection sectionTwo">
                    <span className="title">Around-the-clock operation and maintenance guarantee</span>
                    <div className="sub">
                      <span className="directives">Service and Support
                          <li className="item">Online Customer Service</li>
                          <li className="item">Help Center</li>
                      </span>
                      <span className="directives">Quick Entrance
                          <li className="item">Free Registration</li>
                          <li className="item">Latest Events</li>
                          <li className="item">Cloud Market</li>
                      </span>
                      <span className="directives">Others</span>
                    </div>
                  </div>
                  <div className="footerSection sectionThird">
                    <span className="title">Multi-channel Service Support</span>
                    <div className="sub">
                      <span className="directives">Pre-sales Customer Service
                      </span>
                      <span className="directives">010-2323231998
                      </span>
                    </div>
                  </div>
               </div>
               <footer className="copyright">
                    copyrightcopyrightcopyrightcopyrightcopyrightcopyrightcopyright
               </footer>
            </div> */}
         </div>   
      )
  }
