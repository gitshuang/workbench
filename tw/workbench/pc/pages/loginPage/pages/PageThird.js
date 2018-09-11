
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
                        <span className="wordsTitle">“我是一名研發工程師”</span>
                        <span className="wordsCon">用友雲，讓我的工作越來越有章法</span>
                        <span className="wordsCon">工作效率越來越高，和團隊間溝通、協作的更便捷。 </span>
                    </div>
                )
            }
           
            </div>
         </div>   
      )
  }
