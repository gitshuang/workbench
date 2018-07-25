
import{
    amPage,
    amBg
  }from './PageSplit.css'
  export default function PageSecond(props){
      return(
         <div className={`${amPage} PageSecond `}>
           <div className={amBg} ></div>
            <div className="mainContent viewTwo">
              <div className="laymid">
                <div className="logo"></div>
              </div>
            </div>
         </div>   
      )
  }