import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import EnterSetting from './enterSetting';
import Header from 'containers/header';
import Breadcrumbs from 'components/breadcrumb';
import Select from 'bee/select';
import Dropdown from 'bee/dropdown';
import Menu from 'bee/menus';
import Button from 'bee/button';
import { ButtonDefaultLine } from 'pub-comp/button';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import Icon from 'pub-comp/icon';
import EnterOption from 'containers/enterOption';

import { page_enterprise ,enter_title,enter_cont,hr,hr2,title,appBreadcrumb
,enter_setting} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter,getEnterInfo } = homeActions;

const { Item } = Menu;

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'enterInfo',
    {
      namespace: 'home',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    setCreateEnter,
    getEnterInfo,
  }
)
class Enterprise extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enterData:null
    }
    this.tenantIndustry ={
      name:"tenantIndustry",
      value:"A",
      verify:true,
    }
  }

  componentWillMount(){
    const { requestSuccess, requestError, getEnterInfo} = this.props;
    let param = "123";
    getEnterInfo(param).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
      this.setState({
        enterData:payload
      })
    });
  }

  goBack = () => {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  setOptherData(obj){
    this.tenantIndustry.value = obj.value;
  }

  setOption=()=>{

  }

  render() {
    const {match:{params},userInfo:{company}   } = this.props;
    const {enterData} = this.state;

    return (
      <div className="um-win">
        {
          params.data == "home" ? <div className="um-header" style={{ background: "white" }}>
            <Header onLeftClick={this.goHome} iconName={"home"} >
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
            <div className={title}>{company}</div>
            <EnterOption data={[
              {id:"aa",name:"解散企业",value:"2",serverApi:"enter/remove",msg:"解散后，当期企业下的应用将不能再使用，相应的数据也将被删除，请确认数据已备份"},
              {id:"allowExit",name:"退出企业",value:"3",serverApi:"enter/leave",msg:"退出后，您在当前企业下的应用将不能再使用，相应的数据也将被删除，请确认数据已备份"},
            ]}  type="企业" />

          </div>
          <hr className={hr}/>
          <div className={`${enter_cont} enter_setting`} >
            <EnterSetting updateenter="update_enter" data={enterData}/>
          </div>
          <hr className={`${hr} ${hr2}`}/>
        </div>
      </div>
    );
  }
}
export default Enterprise;

