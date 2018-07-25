
import{
  amPage,
  amBg,
  words,
}from './PageSplit.css'
export default function PageFirst(props){
    return(
       <div className={`${amPage} PageFirst `}>
         <div className={amBg} ></div>
          <div className="mainContent viewOne">
            <div className="laymid">
              <div className="logo"></div>
              <div className="clickMe clearfix">
                <a href="http://www.yonyoucloud.com" className="loginBtn clickBtn ">登录</a>
                <a href="http://www.yonyoucloud.com" className="registryBtn clickBtn">注册</a>
              </div>
            </div>
          </div>
       </div>   
    )
}