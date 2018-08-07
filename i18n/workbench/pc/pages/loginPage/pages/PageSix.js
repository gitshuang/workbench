
import{
    amPage,
    amBg,
    words,
  }from './PageSplit.css'
  export default function PageSix(props){
      return(
         <div className={`${amPage} PageSix `}>
           <div className={amBg} ></div>
            <div className="mainContent viewThree">
            {
                !props.loginModalShow &&(
                    <div className={`oneArtical ${words}`}>
                        <span className="wordsTitle">“$i18n{PageSix.js0}$i18n-endIT$i18n{PageSix.js1}$i18n-end”</span>
                        <span className="wordsCon">$i18n{PageSix.js2}$i18n-end $i18n{PageSix.js3}$i18n-end</span>
                        <span className="wordsCon">$i18n{PageSix.js4}$i18n-end $i18n{PageSix.js5}$i18n-end</span>
                    </div>
                )
            }
            </div>
         </div>   
      )
  }
