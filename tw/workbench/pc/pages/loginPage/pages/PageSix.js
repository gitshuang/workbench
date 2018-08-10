
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
                        <span className="wordsTitle">“我是一名IT運維經理”</span>
                        <span className="wordsCon">每天維護公司的上百台伺服器，總是怕出現一些問題， 影響公司業務發展</span>
                        <span className="wordsCon">用友雲，完全公有雲化的企業服務，讓我從傳統的運維 工作解放出來，成為公司資料資產的建設者</span>
                    </div>
                )
            }
            </div>
         </div>   
      )
  }
