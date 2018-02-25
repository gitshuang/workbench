import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateEnter from './createEnter';
import Header from 'containers/header';
import { page_enterprise ,enter_title,enter_cont,hr} from './style.css';

@withRouter
class Enterprise extends Component {

  constructor(props) {
    super(props);
  }
  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { params } = this.props.match;
    const {  teamList  } = this.props;
    return (
      <div className="um-win">
        {
          params.data == "home" ? <div className="um-header" style={{ background: "white" }}>
            <Header onLeftClick={this.goBack} iconName={"home"} >
              <div>
                <span>创建企业</span>
              </div>
            </Header>
          </div>
            : null
        }
        <div className={`${page_enterprise} um-content`}>
          <div className={enter_title} >创建企业</div>
          <hr className={hr}/>
          <div className={enter_cont} >
            <CreateEnter />
          </div> 
        </div>
      </div>
    );
  }
}
export default Enterprise;

