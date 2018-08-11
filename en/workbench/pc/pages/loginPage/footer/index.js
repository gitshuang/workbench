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
                    <span className="title">Download Client</span>
                    <div className="allIcons">
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
                        
                    </div>
                </div>
                <div className="topSection toptwo">
                    <div className="topTwoItem">
                        <span className="title">Yonyou Group</span>
                        <span className="con">Yonyou Official Website</span>
                        <span className="con">Yonyou Cloud Official Website</span>
                        <span className="con">Yonyou Cloud Market</span>
                    </div>
                    <div className="topTwoItem">
                        <span className="title">Contact Us</span>
                        <span className="con">Hotline: 010-86393388Ext. No. 4</span>
                        <span className="con">Email:esnservice@yonyou.com</span>
                    </div>
                </div>
             </div>
             <div className={FooterBottom}>
                {/* <span className="police">Beijing Computer Information Network International Networking Unit Filing 11010802020548No.</span> */}
                <span className="company">Yonyou Network Technology Co., Ltd © Copyright 2017 BeijingICPICP No. 5007539-24</span>
             </div>
        </div>
    );
  }
}

export default Footer;
