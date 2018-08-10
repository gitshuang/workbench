
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
                        <span className="wordsTitle">“我是一名人力資源經理”</span>
                        <span className="wordsCon">用友雲，提供的人力共用服務 </span>
                        <span className="wordsCon">讓我從很多重複性的事務工作中解放出來</span>
                        <span className="wordsCon">能夠有精力更關注每一位員工，賦能與啟動團隊</span>
                    </div>
                )
            }
            
            </div>
         </div>   
      )
  }
