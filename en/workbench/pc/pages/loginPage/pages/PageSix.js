
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
                        <span className="wordsTitle">“loginPageDefaultITloginPageDefault”</span>
                        <span className="wordsCon">loginPageDefault loginPageDefault</span>
                        <span className="wordsCon">loginPageDefault loginPageDefault</span>
                    </div>
                )
            }
            </div>
         </div>   
      )
  }
