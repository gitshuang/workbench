
import{
    amPage,
    amBg,
    words,
  }from './PageSplit.css'
  export default function PageFiv(props){
      return(
         <div className={`${amPage} PageFour `}>
           <div className={amBg} ></div>
            <div className="mainContent viewFour">
            {
                !props.loginModalShow &&(
                    <div className={`oneArtical ${words}`}>
                        <span className="wordsTitle">“$i18n{PageFour.js0}$i18n-end”</span>
                        <span className="wordsCon">$i18n{PageFour.js1}$i18n-end </span>
                        <span className="wordsCon">$i18n{PageFour.js2}$i18n-end</span>
                        <span className="wordsCon">$i18n{PageFour.js3}$i18n-end</span>
                    </div>
                )
            }
            
            </div>
         </div>   
      )
  }
