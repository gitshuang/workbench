import{
   TopNav 
  } from './MainNav.css';
  export default function TopNavPanel(props){
    return(
      <div className={TopNav}>
            <a href="https://www.yonyoucloud.com" target="_blank" className="TopNavLink">用友云官网</a>
            <a  href="https://www.yonyoucloud.com"  target="_blank" className="TopNavLink">下载</a>
      </div>
    )
  }