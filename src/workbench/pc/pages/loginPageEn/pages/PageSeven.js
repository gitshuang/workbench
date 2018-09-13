import Footer from '../footer/index.js';
import {
  amPage,
  amBg,
  words,
} from './PageSplit.css'
// import footerPng from './images/footer.png'
export default function PageSeven(props) {
  return (
    <div className={`${amPage} PageSevenEn `}>
      <div className={amBg} ></div>
      <div className="mainContent viewSevenEn">
        {
          !props.loginModalShow && (
            <div className={`laymid`}>
              {/* <div className="logo"></div> */}
              <div className="mainTitle">Where Digital Work Begins</div>
              <div className="mainCon">A new powerful digital workspace integrating HR , </div>
              <div className="mainCon2">Finance, Collaboration tools..., all in yonyou cloud</div>
              <div className="clickMe clearfix">
                <span className="loginBtn clickBtn " onClick={props.loginClick}>Sign in</span>
                <a target="_blank" href={props.registryUrl} className="registryBtn clickBtn">Get started</a>
              </div>
            </div>
          )
        }

      </div>

      <div className="mainFooter">
        <Footer />
      </div>

    </div>
  )
}