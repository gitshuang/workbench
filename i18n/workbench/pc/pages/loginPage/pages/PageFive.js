
import{
    amPage,
    amBg,
    words,
  }from './PageSplit.css'
  export default function PageFiv(props){
      return(
         <div className={`${amPage} PageFive `}>
           <div className={amBg} ></div>
            <div className="mainContent viewFive">
            {
                !props.loginModalShow &&(
                    <div className={`oneArtical ${words}`}>
                        <span className="wordsTitle">“$i18n{PageFive.js0}$i18n-end”</span>
                        <span className="wordsCon">$i18n{PageFive.js1}$i18n-end $i18n{PageFive.js2}$i18n-end</span>
                        <span className="wordsCon">$i18n{PageFive.js3}$i18n-end </span>
                        {/* <span className="wordsCon"></span> */}
                    </div>
                )
            }
           
            </div>
         </div>   
      )
  }
