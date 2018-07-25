import{
  HomePageHeader,
  headerDesc,
  leftCon,
  middleCon,
  rightCon,
} from './header.css';
export default function Header(props){
  return(
    <div className={HomePageHeader}>
        <div className={leftCon}>
          <img src="https://yyy.yonyoucloud.com/ycm-appmonitor/img/logo/site_logo.svg" alt="" className="companylogo"/>
          <span className={headerDesc}>数字化工作入口</span>
        </div>
        <div className={middleCon}>
          <span className="middleItem">我们</span>
          <span className="middleItem">服务支持</span>
          <span className="middleItem">开放平台</span>
          <span className="middleItem">联系我们</span>
        </div>
        {
            props.btnShow &&(
            <div className={rightCon}>
                <span className="loginBtn">登陆</span>
                <span className="registryBtn">注册</span>
            </div>
            )
        }
    </div>
  )
}