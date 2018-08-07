
import{
    amPage,
    amBg,
    words
  }from './PageSplit.css'
  export default function PageSecond(props){
      return(
         <div className={`${amPage} PageSecond `}>
           <div className={amBg} ></div>
            <div className="mainContent viewTwo">
            {
                !props.loginModalShow &&(
                    <div className={`oneArtical ${words}`}>
                        <span className="wordsTitle">“$i18n{PageSecond.js0}$i18n-end”</span>
                        <span className="wordsCon">$i18n{PageSecond.js1}$i18n-end</span>
                        <span className="wordsCon">$i18n{PageSecond.js2}$i18n-end </span>
                        <span className="wordsCon">$i18n{PageSecond.js3}$i18n-end </span>
                    </div>
                )
            }
            
            </div>
         </div>   
      )
  }
