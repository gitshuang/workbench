
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
                        <span className="wordsTitle">“loginPageDefault”</span>
                        <span className="wordsCon">loginPageDefault </span>
                        <span className="wordsCon">loginPageDefault</span>
                        <span className="wordsCon">loginPageDefault</span>
                    </div>
                )
            }
            
            </div>
         </div>   
      )
  }
