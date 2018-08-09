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
          <span className={headerDesc}>$i18n{MainNav.js0}$i18n-end</span>
          {/* <div className="leftConFake" onClick={()=>{open('login')}}></div> */}
        </div>
        <div className={middleCon}>
          <a  className={`middleItem ${props.activeIndex*1 === 1?'actived':null}`} onClick={()=>{open('login')}}>$i18n{MainNav.js1}$i18n-end</a>
          <a  className={`middleItem ${props.activeIndex*1 === 2?'actived':null}`} onClick={()=>{open('service')}}>$i18n{MainNav.js2}$i18n-end</a>
          <a   href="https://open.yonyoucloud.com" target="_blank" className={`middleItem ${props.activeIndex*1 === 3?'actived':null}`}>开放平台</a>
          <a  className={`middleItem ${props.activeIndex*1 === 4?'actived':null}`} onClick={()=>{open('aboutus')}}>$i18n{MainNav.js3}$i18n-end</a>
        </div>
        {
            props.btnShow &&(
            <div className={rightCon}>
                <a className="loginBtn" onClick={props.loginClick}>$i18n{MainNav.js4}$i18n-end</a>
                <a className="registryBtn" target="_blank" href={props.registryUrl}>$i18n{MainNav.js5}$i18n-end</a>
            </div>
            )
        }
    </div>
  )
}
