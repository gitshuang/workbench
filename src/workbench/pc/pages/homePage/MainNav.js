import{
  MainNav,
  headerDesc,
  leftCon,
  middleCon,
  rightCon,
} from './MainNav.css';
export default function MainNavPanel(props){
  return(
    <div className={MainNav}>
        <div className={leftCon}>
          <img src="https://yyy.yonyoucloud.com/ycm-appmonitor/img/logo/site_logo.svg" alt="" className="companylogo"/>
          <span className={headerDesc}>数字化工作入口</span>
        </div>
        <div className={middleCon}>
          <a href="http://www.yonyoucloud.com" className="middleItem">我们</a>
          <a href="http://www.yonyoucloud.com" className="middleItem">服务支持</a>
          <a href="http://www.yonyoucloud.com" className="middleItem">开放平台</a>
          <a href="http://www.yonyoucloud.com" className="middleItem">联系我们</a>
        </div>
        {
            props.btnShow &&(
            <div className={rightCon}>
                <span className="loginBtn" onClick={props.loginClick}>登陆</span>
                <span className="registryBtn">注册</span>
            </div>
            )
        }
    </div>
  )
}