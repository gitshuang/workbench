
import{
    amPage,
    amBg,
    words,
  }from './PageSplit.css'
  export default function PageThird(props){
      return(
         <div className={`${amPage} PageThird `}>
           <div className={amBg} ></div>
            <div className="mainContent viewThree">
            {
                !props.loginModalShow &&(
                    <div className={`oneArtical ${words}`}>
                        <span className="wordsTitle">“$i18n{PageThird.js0}$i18n-end”</span>
                        <span className="wordsCon">$i18n{PageThird.js1}$i18n-end</span>
                        <span className="wordsCon">$i18n{PageThird.js2}$i18n-end </span>
                    </div>
                )
            }
           
            </div>
         </div>   
      )
  }
