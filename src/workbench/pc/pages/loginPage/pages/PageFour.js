
import{
    amPage,
    amBg,
    words,
  }from './PageSplit.css'
  export default function PageFiv(props){
      return(
         <div className={`${amPage} PageFour `} ref={ref=>props.pagesRef[3] = ref}>
           <div className={amBg} ></div>
            <div className="mainContent viewFour">
            {
                !props.loginModalShow &&(
                    <div className={`oneArtical ${words}`}>
                        <span className="wordsTitle">“我是一名人力资源经理”</span>
                        <span className="wordsCon">用友云，提供的人力共享服务 </span>
                        <span className="wordsCon">让我从很多重复性的事务工作中解放出来</span>
                        <span className="wordsCon">能够有精力更关注每一位员工，赋能与激活团队</span>
                    </div>
                )
            }
            
            </div>
         </div>   
      )
  }