
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
          {
            !props.loginModalShow && (
              <div className="laymid">
                <div className="logo"></div>
                <div className="clickMe clearfix">
                  <span className="loginBtn clickBtn " onClick={props.loginClick}>登錄</span>
                  <a target="_blank" href={props.registryUrl}  className="registryBtn clickBtn">立即註冊</a>
                </div>
              </div>
            )
          }
           
          </div>
       </div>   
    )
}