import React, { Component } from 'react';
import Header from './Header.js';
import PageFirst from './PageFirst.js';
import PageSecond from './PageSecond.js';
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
    }
    this.amBody = null;
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

  render() {
    let {curIndex} = this.state;
    return (
        <div className={HomePagePanel}>
        <Header btnShow={curIndex === 1}/>
        <div className={rightDotMenu}>
            {this.renderDot()}
        </div>
        <div className="HomeHeader"></div>
        <div ref={(ref) =>{this.amBody = ref}}className={`${HomeOnePage} amBody`}>
            <div className="videoContainer"></div>
            {/* 
              {curIndex === 0 && <PageFirst />}
            {curIndex === 1 && <PageSecond />}
            {curIndex === 2 && <PageFirst />}
            {curIndex === 3 && <PageSecond />}
            {curIndex === 4 && <PageFirst />}
            {curIndex === 5 && <PageSecond />}
            {curIndex === 6 && <PageFirst />}
          */}
            <PageFirst/>
            <PageSecond />
            <PageFirst />
            <PageSecond />
            <PageFirst />
            <PageSecond />
            <PageFirst />
        </div>
        </div>
    );
  }
}

export default HomePage;
