import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EnterSetting from './enterSetting';
import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';
import {Select } from 'tinper-bee';
import { page_enterprise ,enter_title,enter_cont,hr,title,appBreadcrumb} from './style.css';


@withRouter
class Enterprise extends Component {

  constructor(props) {
    super(props);
    this.tenantIndustry ={
      name:"tenantIndustry",
      value:"A",
      verify:true,
    }
  }
  goBack = () => {
    this.props.history.goBack();
  }

  setOptherData(obj){
    this.tenantIndustry.value = obj.value;
  }

  render() {

    const { params } = this.props.match;
    // const {  teamList  } = this.props;
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
        <div className={appBreadcrumb}>
          <Breadcrumbs data={[{ name:"创建企业" }]} goback={this.goBack}/>
        </div> 

        <div className={`${page_enterprise} um-content`}>
          <div className={enter_title}>
            <div className={title}>用友网络科技股份有限公司</div>
            <Select className="enter_title_select"
                defaultValue="Ten"
                onChange={(e)=>{this.setOptherData({name:"scale",value:e})} }
                >
                <Option value="Ten">相关操作</Option>
                <Option value="234">23123</Option>
            </Select>
          </div> 
          <hr className={hr}/>
          <div className={enter_cont} >
            <EnterSetting />
          </div> 
        </div>
      </div>
    );
  }
}
export default Enterprise;

