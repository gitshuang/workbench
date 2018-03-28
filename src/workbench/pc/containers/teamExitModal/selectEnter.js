import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions';
import homeActions from 'store/root/home/actions';
import PopDialog from 'pub-comp/pop';
import {content,select_enter} from './index.css';
import DropdownButton from 'components/dropdown';

const { exitTeam, closeExitModal } = teamconfigActions; 
const { changeUserInfoDisplay,hideUserInfoDisplay, getUserInfo, changeRequestDisplay,getSearchEnterOrTeam } = homeActions;

@withRouter
@connect(
  mapStateToProps(
    'searchEnterOrTeamList',
    'userInfoDisplay',
    'userInfo',
    {
      namespace: 'home',
    }
  ),
  {
    exitTeam,
    closeExitModal,
    changeUserInfoDisplay,
    hideUserInfoDisplay,
    getSearchEnterOrTeam
  }
)
class SelectEnter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allowTenants:[],
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.searchEnterOrTeamList != nextProps.searchEnterOrTeamList){
      this.setState({
        allowTenants:nextProps.searchEnterOrTeamList
      })
    }
  }

  changeTenant(tenantId){
    const {
      location: {
        origin,
        pathname,
        hash,
      },
    } = window;
    window.location.replace(
      `${origin?origin:''}${pathname?pathname:''}?tenantId=${tenantId}&switch=true`,
    );
  }
 

  openMenu=()=>{
    const {getSearchEnterOrTeam} = this.props;
    getSearchEnterOrTeam();//调用新接口
  }

  closeFun = ()=>{
    const {
      changeUserInfoDisplay,
      hideUserInfoDisplay,
      userInfoDisplay
    } = this.props;
    if(userInfoDisplay){
      hideUserInfoDisplay();
    } 
  }

  render() { 
    const {
      userInfo: {
        logo,
        allowTenants,
        company,
      }
    } = this.props;

    let _dataItem = []; 
    allowTenants.forEach(({ tenantId: name, tenantName: value, type }) => {
      if(company != value){
        let obj = {
          name,
          value,
          type,
          fun: this.changeTenant,
        };
        _dataItem.push(obj);
      }
    }) 
    return (
       <div id="open_select" className={select_enter}>
         <span>请选择企业/团队:</span>
         <DropdownButton
          openMenu={this.openMenu}
          marginLeft={-187}
          getPopupContainer={() => document.getElementById("open_select")}
          lastIem={true}
          label="请选择企业/团队" type="home" dataItem={_dataItem} /> 
       </div>
    )
  }
}
export default SelectEnter;
