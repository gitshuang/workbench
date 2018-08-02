import React, { Component } from 'react';

import{
    FooterConPanel
} from './index.css';


class Footer extends Component {
  constructor(props){
    super(props);
    
  }
  componentWillMount(){
    
  }
  componentDidMount(){
    
  }
  
  render() {
   
    return (
        <div className={FooterConPanel}>
             <div className="footerTop">
                <div className="topSection topOne">
                    <span className="title">客户端下载</span>
                    <div className="allIcons">
                        <span className="iconItem">
                            <span className="iconInner iconOne"></span>
                        </span>
                        <span className="iconItem">
                            <span className="iconInner iconTwo"></span>
                        </span>
                        <span className="iconItem">
                            <span className="iconInner iconThree"></span>
                        </span>
                        
                        <span className="iconItem">
                            <span className="iconInner iconFour"></span>
                        </span>
                    </div>
                </div>
                <div className="topSection toptwo">
                    <div className="topTwoItem">
                        <span className="title">用友集团</span>
                        <span className="con">用友官网</span>
                        <span className="con">用友云官网</span>
                        <span className="con">用友云市场</span>
                    </div>
                    <div className="topTwoItem">
                        <span className="title">联系我们</span>
                        <span className="con">热线电话：010-86393388转4</span>
                        <span className="con">联系邮箱：esnservice@yonyou.com</span>
                    </div>
                </div>
             </div>
        </div>
    );
  }
}

export default Footer;
