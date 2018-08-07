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
                    <span className="title">$i18n{index.js0}$i18n-end</span>
                    <div className="allIcons">
                        <div className="diff" onMouseEnter={this.hover} onMouseLeave={this.hoverLeave}>
                            <span className="iconItem" >
                                <span className="iconInner iconOne"></span>
                                <span className="iconDesc">$i18n{index.js1}$i18n-end</span>
                                <span className="lgCode"></span>
                            </span>
                            <span className="iconItem codeItem " ref={(ref)=>{this.iconCode = ref;}}>
                                <span className="iconInner2 iconCode"></span>
                                <span className="iconDesc">$i18n{index.js2}$i18n-end</span>
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
                        <span className="title">$i18n{index.js3}$i18n-end</span>
                        <span className="con">$i18n{index.js4}$i18n-end</span>
                        <span className="con">$i18n{index.js5}$i18n-end</span>
                        <span className="con">$i18n{index.js6}$i18n-end</span>
                    </div>
                    <div className="topTwoItem">
                        <span className="title">$i18n{index.js7}$i18n-end</span>
                        <span className="con">$i18n{index.js8}$i18n-end-86393388$i18n{index.js9}$i18n-end</span>
                        <span className="con">$i18n{index.js10}$i18n-endesnservice@yonyou.com</span>
                    </div>
                </div>
             </div>
             <div className={FooterBottom}>
                {/* <span className="police">$i18n{index.js11}$i18n-end 11010802020548$i18n{index.js12}$i18n-end</span> */}
                <span className="company">$i18n{index.js13}$i18n-end © Copyright 2017 $i18n{index.js14}$i18n-endICP$i18n{index.js15}$i18n-end-24</span>
             </div>
        </div>
    );
  }
}

export default Footer;
