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
      props.activeIndex!=='2'&&  props.history.push('/service')
    }else if(type == 'aboutus'){
      props.activeIndex!=='4'&&props.history.push('/aboutus')
    }else if(type == 'login'){
      props.activeIndex!=='1' &&props.history.push('/')
    }else if(type == 'open'){
      window.open('https://open.diwork.com');
    }
  }
  return(
    <div className={MainNav}>
        <div className={leftCon} onClick={()=>{open('login')}} >
          {/* <img src={Logo} alt="" className="companylogo"/> */}
          <img src={LogoSvg} className="companylogoSvg"/>
          <span className={headerDesc}>数字化工作入口</span>
          {/* <div className="leftConFake" onClick={()=>{open('login')}}></div> */}
        </div>
        <div className={middleCon}>
          <a  className={`middleItem ${props.activeIndex*1 === 1?'actived':null}`} onClick={()=>{open('login')}}>首页</a>
          <a  className={`middleItem ${props.activeIndex*1 === 2?'actived':null}`} onClick={()=>{open('service')}}>服务支持</a>
          <a  className={`middleItem ${props.activeIndex*1 === 3?'actived':null}`} onClick={()=>{open('open')}}> 开放平台 </a>
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