
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
                        <span className="wordsTitle">“我是一名财务经理”</span>
                        <span className="wordsCon">每到月底和年底，我们总是加班加点，才勉强完成 各种各样的财务报表</span>
                        <span className="wordsCon">用友云，让我们每天都可以实时跟踪公司的实时财务数据 </span>
                        <span className="wordsCon">真正使财务成为业务的一部分</span>
                    
                    </div>
                )
            }
           
            </div>
         </div>   
      )
  }