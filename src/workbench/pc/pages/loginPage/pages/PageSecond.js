
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
                        <span className="wordsTitle">“我是一位企业家”</span>
                        <span className="wordsCon">经营企业，我不再焦虑</span>
                        <span className="wordsCon">用友云提供了企业所需要的各种数字化服务 </span>
                        <span className="wordsCon">让我能够运筹帷幄，时刻掌握公司的经营情况 </span>
                    </div>
                )
            }
            
            </div>
         </div>   
      )
  }