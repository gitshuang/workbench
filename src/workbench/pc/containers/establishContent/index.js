import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Button } from 'tinper-bee';
import {
  wrap,
  desc,
  box
} from './index.css';

@withRouter
class EstablishContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentWillMount() {

  }
  
  openTeam = () => {
    console.log(this.props);
    const { history } = this.props;
    const { userInfo } = this.props;

    //let data = userInfo.allowTenants.length ? "home" : "login" ;
    const path = '/createteam/login';
    history.push(path);
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div className={wrap}>
        <h5>{userInfo.userName}，欢迎来到用友Diwork</h5>  
        <p className={desc}>在正式使用之前，您需要先有所属的团队或企业。</p>
        <div className="um-box">
          <div className={box}>
            <h6>创建团队</h6>
            <div></div>
            <div>
              <Button onClick={this.openTeam}>开始创建</Button>  
            </div>
          </div>
          <div className={box}>
            <h6>创建企业</h6>
            <div></div>
            <div>
              <Button>开始创建</Button>  
            </div>
          </div>
        </div>
      </div>  
    )
  }
}

export default EstablishContent;
