
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
                        <span className="wordsTitle">“loginPageDefault”</span>
                        <span className="wordsCon">loginPageDefault</span>
                        <span className="wordsCon">loginPageDefault </span>
                        <span className="wordsCon">loginPageDefault </span>
                    </div>
                )
            }
            
            </div>
         </div>   
      )
  }
