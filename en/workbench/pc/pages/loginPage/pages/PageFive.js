
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
                        <span className="wordsTitle">“loginPageDefault”</span>
                        <span className="wordsCon">loginPageDefault loginPageDefault</span>
                        <span className="wordsCon">loginPageDefault </span>
                        {/* <span className="wordsCon"></span> */}
                    </div>
                )
            }
           
            </div>
         </div>   
      )
  }
