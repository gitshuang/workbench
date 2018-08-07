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
                  <div className="mainTitle">“loginPageDefault”</div>
                  <div className="clickMe clearfix">
                    <span  className="loginBtn clickBtn " onClick={props.loginClick}>loginPageDefault</span>
                    <a target="_blank" href={props.registryUrl} className="registryBtn clickBtn">loginPageDefault</a>
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
                    <span className="title">loginPageDefault</span>
                    <div className="sub">
                      <span className="directives">loginPageDefault</span>
                      <span className="directives">loginPageDefault</span>
                      <span className="directives">loginPageDefaultApp</span>
                    </div>
                  </div>
                  <div className="footerSection sectionTwo">
                    <span className="title">loginPageDefault</span>
                    <div className="sub">
                      <span className="directives">loginPageDefault
                          <li className="item">loginPageDefault</li>
                          <li className="item">loginPageDefault</li>
                      </span>
                      <span className="directives">loginPageDefault
                          <li className="item">loginPageDefault</li>
                          <li className="item">loginPageDefault</li>
                          <li className="item">loginPageDefault</li>
                      </span>
                      <span className="directives">loginPageDefault</span>
                    </div>
                  </div>
                  <div className="footerSection sectionThird">
                    <span className="title">loginPageDefault</span>
                    <div className="sub">
                      <span className="directives">loginPageDefault
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
