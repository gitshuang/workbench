import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EnterSetting from './enterSetting';
import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';
import Select from 'bee/select';
import Dropdown from 'bee/dropdown';
import Menu from 'bee/menus';
import Button from 'bee/button';
import { ButtonDefaultLine } from 'components/button';

import Icon from 'components/icon';

import { page_enterprise ,enter_title,enter_cont,hr,hr2,title,appBreadcrumb
,enter_setting} from './style.css';

const { Item } = Menu;

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

  setOption=()=>{

  }

  render() {

    const { params } = this.props.match;
    // const {  teamList  } = this.props;
    const menu1 = (
      <Menu
        onSelect={this.setOption}>
        {/* <Item key="1">移交团队</Item> */}
        <Item key="1">相关操作</Item>
        <Item key="2">23123</Item>
      </Menu>
    );

    return (
      <div className="um-win">
        {
          params.data == "home" ? <div className="um-header" style={{ background: "white" }}>
            <Header onLeftClick={this.goBack} iconName={"home"} >
            <div>
              <span>设置企业</span>
            </div>
            </Header>
          </div>
            : null
        }
        <div className={appBreadcrumb}>
          <Breadcrumbs data={[{ name:"设置企业" }]} goback={this.goBack}/>
        </div>

        <div className={`${page_enterprise} um-content`}>
          <div className={enter_title}>
            <div className={title}>用友网络科技股份有限公司</div>
            <Dropdown
                trigger={['click']}
                overlay={menu1}
                animation="slide-up"
              >
              <ButtonDefaultLine>相关操作<Icon type="pull-down" /></ButtonDefaultLine>
            </Dropdown>
          </div>
          <hr className={hr}/>
          <div className={`${enter_cont} enter_setting`} >
            <EnterSetting />
          </div>
          <hr className={hr, hr2}/>
        </div>
      </div>
    );
  }
}
export default Enterprise;

