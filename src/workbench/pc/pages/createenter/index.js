import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateEnter from './createEnter';
import Breadcrumbs from 'components/breadcrumb';
import Header from 'containers/header';
import { page_enterprise ,enter_title,enter_cont,hr,hr2,appBreadcrumb,home_none} from './style.css';

@withRouter
class Enterprise extends Component {

  constructor(props) {
    super(props);
  }
  goBack = () => {
    this.props.history.replace('');
  }

  render() {
    const {match:{params},teamList } = this.props;
    let _class = params.data == "home"?home_none:"";
    return (
      <div className={`um-win ${_class}`}>
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
        <div className={appBreadcrumb}>
          <Breadcrumbs data={[{ name:"创建企业" }]} goback={this.goBack}/>
        </div> 
        <div className={`${page_enterprise} um-content`}>
          <div className={enter_title} >创建企业</div>
          <hr className={hr}/>
          <div className={enter_cont} >
            <CreateEnter  />
          </div> 
          <hr className={hr, hr2}/>
        </div>
      </div>
    );
  }
}
export default Enterprise;

