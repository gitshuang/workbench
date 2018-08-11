
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
                        <span className="wordsTitle">“I'm an entrepreneur.”</span>
                        <span className="wordsCon">Running the business no longer makes me anxious.</span>
                        <span className="wordsCon">Yonyou Cloud provides all kinds of digital services that my company needs, </span>
                        <span className="wordsCon">so I can manage and keep track of business operations anytime. </span>
                    </div>
                )
            }
            
            </div>
         </div>   
      )
  }
