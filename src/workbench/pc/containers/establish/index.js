import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'tinper-bee';
import {
  wrap,
  desc,
  box
} from './index.css';

class EstablishContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className={wrap}>
        <h5>文小刀，欢迎来到用友Diwork</h5>  
        <p className={desc}>在正式使用之前，您需要先有所属的团队或企业。</p>
        <div className="um-box">
          <div className={"um-bf1"}>
            <div className={box}>
              <h6>创建团队</h6>
              <div></div>
              <div>
                <Button>开始创建</Button>  
              </div>
            </div>
          </div> 
          <div className={"um-bf1"}>
            <div className={box}>
              <h6>创建团队</h6>
              <div></div>
              <div>
                <Button>开始创建</Button>  
              </div>
            </div>
          </div> 
        </div>
      </div>  
    )
  }
}

export default EstablishContent;
