
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
                        <span className="wordsTitle">“I am an HR manager.”</span>
                        <span className="wordsCon">The HR shared services of Yonyou Cloud </span>
                        <span className="wordsCon">free me from tedious and repetitive routine tasks.</span>
                        <span className="wordsCon">Now I have the energy to pay more attention to each employee, empowering and activating the team.</span>
                    </div>
                )
            }
            
            </div>
         </div>   
      )
  }
