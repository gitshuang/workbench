import{
  MainNav,
  headerDesc,
  leftCon,
  middleCon,
  rightCon,
} from './MainNav.css';
import Logo from './logo1.png';
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
        <div className={leftCon} onClick={()=>{open('login')}}>
          <img src={Logo} alt="" className="companylogo"/>
          {/* <span className={headerDesc}>数字化工作入口</span> */}
        </div>
        <div className={middleCon}>
          <a href="http://www.diwork.com" className={`middleItem ${props.activeIndex*1 === 1?'actived':null}`}>我们</a>
          <a  className={`middleItem ${props.activeIndex*1 === 2?'actived':null}`} onClick={()=>{open('service')}}>服务支持</a>
          <a href="http://www.diwork.com" className={`middleItem ${props.activeIndex*1 === 3?'actived':null}`}>开放平台</a>
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