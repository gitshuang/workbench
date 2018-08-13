
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
                        <span className="wordsTitle">“I am anIToperation and maintenance manager.”</span>
                        <span className="wordsCon">Maintaining the company's hundreds of servers every day makes me really anxious. I'm afraid potential problems may affect the company's business development.</span>
                        <span className="wordsCon">Yonyou Cloud, a completely publicized enterprise cloud service, frees me from the traditional operation and maintenance work, so that I can become a builder of the company's data assets.</span>
                    </div>
                )
            }
            </div>
         </div>   
      )
  }
