import{
  MainNav,
  headerDesc,
  leftCon,
  middleCon,
  rightCon,
} from './MainNav.css';
import Logo from './logo1.png';
export default function MainNavPanel(props){
  return(
    <div className={MainNav}>
        <div className={leftCon}>
          <img src={Logo} alt="" className="companylogo"/>
          {/* <span className={headerDesc}>数字化工作入口</span> */}
        </div>
        <div className={middleCon}>
          <a href="http://www.diwork.com" className="middleItem">我们</a>
          <a href="http://www.diwork.com" className="middleItem">服务支持</a>
          <a href="http://www.diwork.com" className="middleItem">开放平台</a>
          <a href="http://www.diwork.com" className="middleItem">联系我们</a>
        </div>
        {
            props.btnShow &&(
            <div className={rightCon}>
                <a className="loginBtn" onClick={props.loginClick}>登录</a>
                <a className="registryBtn" target="_blank" href="http://idtest.yyuap.com/register?sysid=market&mode=light&yhtrealservice=http://www.diwork.com">注册</a>
            </div>
            )
        }
    </div>
  )
}