
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
                        <span className="wordsTitle">“I am a financial manager.”</span>
                        <span className="wordsCon">At the end of each month and each year, we always have to work overtime on various financial statements.</span>
                        <span className="wordsCon">Yonyou Cloud enables us to track the company's financial data in real-time every day, really making finance a part of the business. </span>
                        {/* <span className="wordsCon"></span> */}
                    </div>
                )
            }
           
            </div>
         </div>   
      )
  }
