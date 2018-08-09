import Footer from '../footer/index.js';
import{
    amPage,
    amBg,
    words,
  }from './PageSplit.css'
  import footerPng from './images/footer.png'
  export default function PageSeven(props){
      return(
         <div className={`${amPage} PageSeven `}>
           <div className={amBg} ></div>
            <div className="mainContent viewSeven">
            {
              !props.loginModalShow &&(
                <div className={`laymid`} style={{marginTop:`${props.sevenSpace}px`}}>
                  {/* <div className="logo"></div> */}
                  <div className="mainTitle">“$i18n{PageSeven.js0}$i18n-end”</div>
                  <div className="clickMe clearfix">
                    <span  className="loginBtn clickBtn " onClick={props.loginClick}>$i18n{PageSeven.js1}$i18n-end</span>
                    <a target="_blank" href={props.registryUrl} className="registryBtn clickBtn">$i18n{PageSeven.js2}$i18n-end</a>
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
                    <span className="title">$i18n{PageSeven.js3}$i18n-end</span>
                    <div className="sub">
                      <span className="directives">$i18n{PageSeven.js4}$i18n-end</span>
                      <span className="directives">$i18n{PageSeven.js5}$i18n-end</span>
                      <span className="directives">$i18n{PageSeven.js6}$i18n-endApp</span>
                    </div>
                  </div>
                  <div className="footerSection sectionTwo">
                    <span className="title">$i18n{PageSeven.js7}$i18n-end</span>
                    <div className="sub">
                      <span className="directives">$i18n{PageSeven.js8}$i18n-end
                          <li className="item">$i18n{PageSeven.js9}$i18n-end</li>
                          <li className="item">$i18n{PageSeven.js10}$i18n-end</li>
                      </span>
                      <span className="directives">$i18n{PageSeven.js11}$i18n-end
                          <li className="item">$i18n{PageSeven.js12}$i18n-end</li>
                          <li className="item">$i18n{PageSeven.js13}$i18n-end</li>
                          <li className="item">$i18n{PageSeven.js14}$i18n-end</li>
                      </span>
                      <span className="directives">$i18n{PageSeven.js15}$i18n-end</span>
                    </div>
                  </div>
                  <div className="footerSection sectionThird">
                    <span className="title">$i18n{PageSeven.js16}$i18n-end</span>
                    <div className="sub">
                      <span className="directives">$i18n{PageSeven.js17}$i18n-end
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
