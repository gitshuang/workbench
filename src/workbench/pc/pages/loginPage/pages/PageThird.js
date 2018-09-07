
import{
    amPage,
    amBg,
    words,
  }from './PageSplit.css'
  export default function PageThird(props){
      return(
         <div className={`${amPage} PageThird `} ref={ref=>props.pagesRef[2] = ref}>
           <div className={amBg} ></div>
            <div className="mainContent viewThree">
            {
                !props.loginModalShow &&(
                    <div className={`oneArtical ${words}`}>
                        <span className="wordsTitle">“我是一名研发工程师”</span>
                        <span className="wordsCon">用友云，让我的工作越来越有章法</span>
                        <span className="wordsCon">工作效率越来越高，和团队间沟通、协作的更便捷。 </span>
                    </div>
                )
            }
           
            </div>
         </div>   
      )
  }