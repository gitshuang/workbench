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
                  <div className="mainTitle">“相信美好，立刻开始数字化工作”</div>
                  <div className="clickMe clearfix">
                    <span  className="loginBtn clickBtn " onClick={props.loginClick}>登录</span>
                    <a target="_blank" href={props.registryUrl} className="registryBtn clickBtn">立即注册</a>
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
                    <span className="title">优质商家服务</span>
                    <div className="sub">
                      <span className="directives">订阅号</span>
                      <span className="directives">服务号</span>
                      <span className="directives">用友云App</span>
                    </div>
                  </div>
                  <div className="footerSection sectionTwo">
                    <span className="title">全年运维保障</span>
                    <div className="sub">
                      <span className="directives">服务与支持
                          <li className="item">在线客服</li>
                          <li className="item">帮助中心</li>
                      </span>
                      <span className="directives">快速入口
                          <li className="item">免费注册</li>
                          <li className="item">最新活动</li>
                          <li className="item">云市场</li>
                      </span>
                      <span className="directives">其他</span>
                    </div>
                  </div>
                  <div className="footerSection sectionThird">
                    <span className="title">多渠道服务支持</span>
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