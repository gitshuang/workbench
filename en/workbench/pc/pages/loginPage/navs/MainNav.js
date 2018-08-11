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
    }
  }
  return(
    <div className={MainNav}>
        <div className={leftCon} onClick={()=>{open('login')}} >
          {/* <img src={Logo} alt="" className="companylogo"/> */}
          <img src={LogoSvg} className="companylogoSvg"/>
          <span className={headerDesc}>Digital Portal</span>
          {/* <div className="leftConFake" onClick={()=>{open('login')}}></div> */}
        </div>
        <div className={middleCon}>
          <a  className={`middleItem ${props.activeIndex*1 === 1?'actived':null}`} onClick={()=>{open('login')}}>Homepage</a>
          <a  className={`middleItem ${props.activeIndex*1 === 2?'actived':null}`} onClick={()=>{open('service')}}>Service Support</a>
          <a   href="https://open.yonyoucloud.com" target="_blank" className={`middleItem ${props.activeIndex*1 === 3?'actived':null}`}>开放平台</a>
          <a  className={`middleItem ${props.activeIndex*1 === 4?'actived':null}`} onClick={()=>{open('aboutus')}}>Contact Us</a>
        </div>
        {
            props.btnShow &&(
            <div className={rightCon}>
                <a className="loginBtn" onClick={props.loginClick}>Log In</a>
                <a className="registryBtn" target="_blank" href={props.registryUrl}>Sign Up Now</a>
            </div>
            )
        }
    </div>
  )
}
