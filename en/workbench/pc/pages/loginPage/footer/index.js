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
                    <span className="title" >Download Client</span>
                    <a className="allIcons" href="http://ec.yonyoucloud.com/html/index/down.html " target="_blank">
                        <div className="diff" onMouseEnter={this.hover} onMouseLeave={this.hoverLeave}>
                            <span className="iconItem" >
                                <span className="iconInner iconOne"></span>
                                <span className="iconDesc">Mobile</span>
                                <span className="lgCode"></span>
                            </span>
                            <span className="iconItem codeItem " ref={(ref)=>{this.iconCode = ref;}}>
                                <span className="iconInner2 iconCode"></span>
                                <span className="iconDesc">Scan to Download Client</span>
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
                        
                    </a>
                </div>
                <div className="topSection toptwo">
                    <div className="topTwoItem">
                        <span className="title">Yonyou Group</span>
                        <a className="con" href="http://www.yonyou.com" target="_blank">用友官网</a>
                        <a className="con" href="http://www.yonyoucloud.com" target="_blank">用友云官网</a>
                        <a className="con" href="http://market.yonyoucloud.com" target="_blank">用友云市场</a>
                    </div>
                    <div className="topTwoItem">
                        <span className="title">Contact Us</span>
                        <span className="con">Hotline: 010-62438888</span>
                        <span className="con">Email:diwork@yonyou.com</span>
                    </div>
                </div>
             </div>
             <div className={FooterBottom}>
                {/* <span className="police">Beijing Computer Information Network International Networking Unit Filing 11010802020548No.</span> */}
                <span className="company">Yonyou Network Technology Co., Ltd © Copyright 2018 BeijingICPICP No. 5007539-24</span>
             </div>
        </div>
    );
  }
}

export default Footer;
