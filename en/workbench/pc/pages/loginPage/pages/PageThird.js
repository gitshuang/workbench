
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
                        <span className="wordsTitle">“I am a research and development engineer.”</span>
                        <span className="wordsCon">Yonyou Cloud improves</span>
                        <span className="wordsCon">my work efficiency, and facilitates team communication and collaboration. </span>
                    </div>
                )
            }
           
            </div>
         </div>   
      )
  }
