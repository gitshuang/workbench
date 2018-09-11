
import{
    amPage,
    amBg,
    words,
  }from './PageSplit.css'
  export default function PageFiv(props){
      return(
         <div className={`${amPage} PageFive `} ref={ref=>props.pagesRef[4] = ref}>
           <div className={amBg} ></div>
            <div className="mainContent viewFive">
            {
                !props.loginModalShow &&(
                    <div className={`oneArtical ${words}`}>
                        <span className="wordsTitle">“我是一名財務經理”</span>
                        <span className="wordsCon">每到月底和年底，我們總是加班加點，才勉強完成 各種各樣的財務報表</span>
                        <span className="wordsCon">用友雲，讓我們每天都可以跟蹤公司的即時財務資料，真正使財務成為業務的一部分 </span>
                        {/* <span className="wordsCon"></span> */}
                    </div>
                )
            }
           
            </div>
         </div>   
      )
  }
