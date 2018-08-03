import{
  MainNav,
  headerDesc,
  leftCon,
  middleCon,
  rightCon,
} from './MainNav.css';
import Logo from './logo1.png';
import LogoSvg from './logo.svg';
export default function MainNavPanel(props){
  function open(type){
    if(type =='service'){
      props.history.push('/service')
    }else if(type == 'aboutus'){
      props.history.push('/aboutus')
    }else if(type == 'login'){
      props.history.push('/')
    }
  }
  return(
    <div className={MainNav}>
        <div className={leftCon} >
          {/* <img src={Logo} alt="" className="companylogo"/> */}
          <iframe src={LogoSvg} width='100px' height='66px' frameBorder='0' className="companylogoSvg" onClick={()=>{open('login')}}/>
          <span className={headerDesc}>数字化工作入口</span>
          <div className="leftConFake" onClick={()=>{open('login')}}></div>
        </div>
        <div className={middleCon}>
          <a  className={`middleItem ${props.activeIndex*1 === 1?'actived':null}`} onClick={()=>{open('login')}}>首页</a>
          <a  className={`middleItem ${props.activeIndex*1 === 2?'actived':null}`} onClick={()=>{open('service')}}>服务支持</a>
          <a   href="https://open.yonyoucloud.com" target="_blank" className={`middleItem ${props.activeIndex*1 === 3?'actived':null}`}>开放平台</a>
          <a  className={`middleItem ${props.activeIndex*1 === 4?'actived':null}`} onClick={()=>{open('aboutus')}}>联系我们</a>
        </div>
        {
            props.btnShow &&(
            <div className={rightCon}>
                <a className="loginBtn" onClick={props.loginClick}>登录</a>
                <a className="registryBtn" target="_blank" href={props.registryUrl}>立即注册</a>
            </div>
            )
        }
    </div>
  )
}