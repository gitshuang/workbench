
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
                        <span className="wordsTitle">“我是一位企業家”</span>
                        <span className="wordsCon">經營企業，我不再焦慮</span>
                        <span className="wordsCon">用友雲提供了企業所需要的各種數位化服務 </span>
                        <span className="wordsCon">讓我能夠運籌帷幄，時刻掌握公司的經營情況 </span>
                    </div>
                )
            }
            
            </div>
         </div>   
      )
  }
