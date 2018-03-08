import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import Button from 'bee/button';
import Icon from 'components/icon';
import Menu from 'bee/menus';
import Dropdown from 'bee/dropdown';
import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';
import TeamDismissModal from 'containers/teamDismissModal';
import TeamExitModal from 'containers/teamExitModal';

const { Item } = Menu;
const { requestStart, requestSuccess, requestError } = rootActions;
const {openDismissModal,openExitModal} = teamconfigActions;

import { enter_option} from './style.css';

@withRouter
@connect(
  mapStateToProps(
    'dismissModal',     //  解散团队弹窗开关
    'exitModal',        //  退出团队弹窗开关
    {
      key: 'userInfo',
      value: (teamconfig,ownProps,root) => {
        return root.home.userInfo
      }
    },
    {
      namespace: "teamconfig"
    },
  ),

  {
    requestStart,
    requestSuccess,
    requestError,
    openDismissModal,
    openExitModal
  }
)

class EnterOption extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      serverApi:""
    }
    this.data = null;
  }
  
  onVisibleChange = (visible) => {
    console.log(visible);
  }

  onSelectDrop = (da) => {
    const { data,openTransferModal,openDismissModal,openExitModal ,compType} = this.props;
    if(compType=="userCenter"){
      this.data = da;
      openExitModal();
      return;
    }
    let item = data.find((_da)=>_da.value ==da.key);
    const {key,serverApi} = item;
    this.data = item;
    if( key == "2" ){
      openDismissModal();
    }else{
      openExitModal();
    }
  }

  render() {
    let lis = [];  
    const { data,type,compType ,dismissModal, exitModal ,userInfo} = this.props;
    
    data.forEach((da)=>{
      lis.push(<Item key={da.value} id={da.serverApi} >{da.name}</Item>);
    })
    let menus = (<Menu onClick={this.onSelectDrop}>{lis}</Menu>);

    return (
      <div className={enter_option}>
          {
            compType=="userCenter"?<Button shape="border" onClick={this.onSelectDrop} ><Icon type="staff" />{"退出"+type}</Button>:(<Dropdown
              trigger={['click']}
              overlay={menus}
              animation="slide-up"
              onVisibleChange={this.onVisibleChange}
            >
              <Button className="um-box-vc um-box-center">相关操作<Icon type="pull-down" /></Button>
            </Dropdown>)
          }
          
          {
            dismissModal ? <TeamDismissModal type={type} data={this.data} /> : null
          }
          {
            exitModal ? <TeamExitModal type={type} data={this.data} isManage={userInfo.admin} userId={userInfo.userId} close={true}/> : null
          }
          
        </div>
    )
  }
}

export default EnterOption;