
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
                        <span className="wordsTitle">“loginPageDefault”</span>
                        <span className="wordsCon">loginPageDefault</span>
                        <span className="wordsCon">loginPageDefault </span>
                    </div>
                )
            }
           
            </div>
         </div>   
      )
  }
