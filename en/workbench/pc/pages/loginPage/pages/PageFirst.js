
import{
  amPage,
  amBg,
  words,
}from './PageSplit.css'
export default function PageFirst(props){
    return(
       <div className={`${amPage} PageFirst `} ref={ref=>props.pagesRef[0] = ref}>
         <div className={amBg} ></div>
          <div className="mainContent viewOne">
          {
            !props.loginModalShow && (
              <div className="laymid">
                <div className="logo"></div>
                <div className="clickMe clearfix">
                  <span className="loginBtn clickBtn " onClick={props.loginClick}>Log In</span>
                  <a target="_blank" href={props.registryUrl}  className="registryBtn clickBtn">Sign Up</a>
                </div>
              </div>
            )
          }
           
          </div>
       </div>   
    )
}
