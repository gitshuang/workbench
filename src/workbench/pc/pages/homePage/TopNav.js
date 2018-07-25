import{
   TopNav 
  } from './MainNav.css';
  export default function TopNavPanel(props){
    return(
      <div className={TopNav}>
            <a href="http://www.yonyoucloud.com"  className="TopNavLink">用友云官网</a>
            <a href="http://www.yonyoucloud.com"  className="TopNavLink">下载</a>
      </div>
    )
  }