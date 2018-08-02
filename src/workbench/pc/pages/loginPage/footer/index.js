import React, { Component } from 'react';

import{
    FooterConPanel,
    FooterBottom
} from './index.css';


class Footer extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
    this.iconCode  = null;//二维码的code
    this.timeVal = null;//要执行延迟
  }
  componentWillMount(){
    
  }
  componentDidMount(){
    
  }
  hover =(e) =>{
    if(this.timeVal){
        //已经触发延迟但是还没有执行
        clearTimeout(this.timeVal);
    }else{
        //是个空的
        if(this.iconCode.className !== 'iconItem codeItem fadeIn '){
            this.iconCode.className = 'iconItem codeItem fadeIn ';

        }
    }
  }
  hoverLeave = () =>{
      this.timeVal = setTimeout(() => {
        this.iconCode.className = 'iconItem codeItem';
        this.timeVal = null;
      }, 2000);
  }
  
  render() {
   
    return (
        <div className={FooterConPanel}>
             <div className="footerTop">
                <div className="topSection topOne">
                    <span className="title">客户端下载</span>
                    <div className="allIcons">
                        <div className="diff" onMouseEnter={this.hover} onMouseLeave={this.hoverLeave}>
                            <span className="iconItem" >
                                <span className="iconInner iconOne"></span>
                                <span className="iconDesc">移动端</span>
                                <span className="lgCode"></span>
                            </span>
                            <span className="iconItem codeItem " ref={(ref)=>{this.iconCode = ref;}}>
                                <span className="iconInner2 iconCode"></span>
                                <span className="iconDesc">扫描下载客户端</span>
                            </span>
                        </div>
                        <span className="iconItem">
                            <span className="iconInner iconTwo"></span>
                            <span className="iconDesc">Mac</span>
                        </span>
                        <span className="iconItem">
                            <span className="iconInner iconThree"></span>
                            <span className="iconDesc">Windows</span>
                        </span>
                        
                        <span className="iconItem">
                            <span className="iconInner iconFour"></span>
                            <span className="iconDesc">Win xp</span>
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
             <div className={FooterBottom}>
                <span className="police">京公网安备 11010802020548号</span>
                <span className="company">用友网络科技股份有限公司 © Copyright 2017 京ICP备15057199号</span>
             </div>
        </div>
    );
  }
}

export default Footer;
