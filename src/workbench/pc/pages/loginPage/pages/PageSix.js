
import{
    amPage,
    amBg,
    words,
  }from './PageSplit.css'
  export default function PageSix(props){
      return(
         <div className={`${amPage} PageSix `} ref={ref=>props.pagesRef[5] = ref}>
           <div className={amBg} ></div>
            <div className="mainContent viewThree">
            {
                !props.loginModalShow &&(
                    <div className={`oneArtical ${words}`}>
                        <span className="wordsTitle">“我是一名IT运维经理”</span>
                        <span className="wordsCon">每天维护公司的上百台服务器，总是怕出现一些问题， 影响公司业务发展</span>
                        <span className="wordsCon">用友云，完全公有云化的企业服务，让我从传统的运维 工作解放出来，成为公司数据资产的建设者</span>
                    </div>
                )
            }
            </div>
         </div>   
      )
  }