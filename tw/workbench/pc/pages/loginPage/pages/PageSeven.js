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
                  <div className="mainTitle">“相信美好，立刻開始數位化工作”</div>
                  <div className="clickMe clearfix">
                    <span  className="loginBtn clickBtn " onClick={props.loginClick}>登錄</span>
                    <a target="_blank" href={props.registryUrl} className="registryBtn clickBtn">立即註冊</a>
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
                    <span className="title">優質商家服務</span>
                    <div className="sub">
                      <span className="directives">訂閱號</span>
                      <span className="directives">服務號</span>
                      <span className="directives">用友雲App</span>
                    </div>
                  </div>
                  <div className="footerSection sectionTwo">
                    <span className="title">全年運維保障</span>
                    <div className="sub">
                      <span className="directives">服務與支持
                          <li className="item">線上客服</li>
                          <li className="item">幫助中心</li>
                      </span>
                      <span className="directives">快速入口
                          <li className="item">免費註冊</li>
                          <li className="item">最新活動</li>
                          <li className="item">雲市場</li>
                      </span>
                      <span className="directives">其他</span>
                    </div>
                  </div>
                  <div className="footerSection sectionThird">
                    <span className="title">多管道服務支持</span>
                    <div className="sub">
                      <span className="directives">售前客服
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
