import React, { Component } from 'react';
import MainNav from './navs/MainNav.js';
import TopNav from './navs/TopNav.js';
import PageFirst from './pages/PageFirst.js';
import PageSecond from './pages/PageSecond.js';
import PageSeven from './pages/PageSeven.js';
import LoginPng from './login.png';
import{
  HomePagePanel,
  rightDotMenu,
  HomeOnePage
} from './index.css'

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      curIndex:0,//处于展示的是
      alldata:[1,2,3,4,5,6,7],
      preTime:new Date().getTime(),//上次执行的时间
      duration:1200,//执行的间隔
      loginModalShow:false,//登录的modal是否展示
    }
    this.amBody = null;
    this.scrollFunc = this.scrollFunc.bind(this);
  }

  componentDidMount(){
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
    }
    //W3C
    window.onmousewheel = document.onmousewheel = this.scrollFunc;//IE/Opera/Chrome
  }
  
  scrollFunc = function (e) {
      let {preTime, duration,curIndex, alldata} = this.state;
      //如果动画还没执行完，则return
      var now = new Date().getTime();
      if( preTime && now < preTime  + duration){
          return;
      }
      this.setState({preTime:now});
      e = e || window.event;
      var t = 0;
      if (e.wheelDelta) {//IE/Opera/Chrome
          t = e.wheelDelta;
          if (t > 0 && curIndex > 0) {
              //上滚动
              this.movePrev();
          } else if (t < 0 && curIndex < alldata.length - 1) {
              //下滚动
              this.moveNext();
          }
      } else if (e.detail) {//Firefox
          t = e.detail;
          if (t < 0 && curIndex > 0) {
              //上滚动
              this.movePrev();
          } else if (t > 0 && curIndex < alldata.length - 1) {
              //下滚动
              this.moveNext();
          }
      }
  }
  moveNext =() =>{
      let preIndex = this.state.curIndex;
      this.setState({curIndex:preIndex+1},()=>{
        this.amBody.classList.remove(`animation${preIndex}`);
        this.amBody.classList.add(`animation${preIndex+1}`);
      })
  }
  movePrev =()=>{
    let preIndex = this.state.curIndex;
    this.setState({curIndex:preIndex-1},()=>{
      this.amBody.classList.remove(`animation${preIndex}`);
      this.amBody.classList.add(`animation${preIndex-1}`);
    })

  }
  changePage = (index) =>{
    if(this.state.curIndex === index) return;
    this.amBody.classList.remove(`animation${this.state.curIndex}`);
    this.amBody.classList.add(`animation${index}`);
    this.setState({
      curIndex:index
    });
  }
  renderDot = () =>{
    let {alldata,curIndex} = this.state;
    return alldata.map((item,index)=>{
      return (
        <div key={`dot${index}`} className={`menudot ${index == curIndex? 'active':''}`} onClick={() =>{this.changePage(index)}}></div>
      )
    })
  }
  loginClick = () =>{
    document.removeEventListener("DOMMouseScroll", this.scrollFunc);
    window.onmousewheel = document.onmousewheel = null;
    this.setState({loginModalShow:true})
  }
  closeLoginMoal = () =>{
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
    }
    //W3C
    window.onmousewheel = document.onmousewheel = this.scrollFunc;//IE/Opera/Chrome
    this.setState({loginModalShow:false})
  }
  render() {
    let {curIndex,loginModalShow} = this.state;
    return (
        <div className={HomePagePanel}>
          <TopNav />
          <MainNav btnShow={curIndex === 1} loginClick={this.loginClick}/>
          <div className={rightDotMenu}>
              {!loginModalShow && this.renderDot()}
          </div>
          <div ref={(ref) =>{this.amBody = ref}}className={`${HomeOnePage} amBody animation0`}>
              <div className="videoContainer"></div>
              <PageFirst/>
              <PageSecond />
              <PageFirst />
              <PageSecond />
              <PageFirst />
              <PageSecond />
              <PageSeven />
          </div>
            {
              loginModalShow&&(
                <div className="popbox">
                  <div className="popmask"></div>
                  {/* <div className="loginbox"></div> */}
                  <div className="close" onClick={this.closeLoginMoal}>X</div>
                  <img src={LoginPng} alt="" className="loginFake">
                  </img>
                </div>
              )
            }
        </div>
    );
  }
}

export default HomePage;
