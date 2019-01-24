import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import Button from 'bee/button';
import Icon from 'pub-comp/icon';
import Menu from 'bee/menus';
import Dropdown from 'bee/dropdown';
import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';
import TeamExitModal from 'components/teamExitModal';


const { Item } = Menu;
const { requestStart, requestSuccess, requestError } = rootActions;
const {  openExitModal } = teamconfigActions;

import { enter_option, item_li, up } from './style.css';

@withRouter
@connect(
  mapStateToProps(
    'exitModal',        //  退出团队弹窗开关
    {
      key: 'userInfo',
      value: (home, ownProps, root) => {
        return root.userInfo
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
    openExitModal
  }
)

class EnterOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverApi: "",
      visible: false
    }
    this.data = null;
  }

  onVisibleChange = (visible) => { 
    this.setState({
      visible
    });
  }

  onSelectDrop = (da) => {
    const { data, openExitModal, compType } = this.props;
    if (compType == "userCenter") {
      this.data = da;
      openExitModal();
      return;
    }
    let item = data.find((_da) => _da.value == da.key);
    this.data = item;
    openExitModal();
  }

  render() {
    let lis = [];
    const { data, type, compType, exitModal, userInfo, userInfo: { currentTeamConfig: { allowExit } } } = this.props;
    data.forEach((da) => {
      if (da.id == "allowExit") {
        if (allowExit == "1") {
          lis.push(<Item className={item_li} key={da.value} id={da.serverApi} >{da.name}</Item>);
        }
      } else {
        lis.push(<Item className={item_li} key={da.value} id={da.serverApi} >{da.name}</Item>);
      }
    })
    let menus = (<Menu onClick={this.onSelectDrop}>{lis}</Menu>);

    return (
      <div className={enter_option}>
        {
          compType == "userCenter" ?
            <Button shape="border" onClick={() => { this.onSelectDrop(data[0]) }} >
              <Icon type="staff" />{"" + type}
            </Button>
            :
            <Dropdown
              trigger={['click']}
              overlay={menus}
              animation="slide-up"
              onVisibleChange={this.onVisibleChange}
            >
              <Button className="um-box-vc um-box-center"><Icon type="pull-down" className={this.state.visible ? up : ''} /></Button>
            </Dropdown>
        }
        {
          exitModal ? <TeamExitModal type={type} data={this.data} isManage={userInfo.admin} userId={userInfo.userId} close={true} /> : null
        }
      </div>
    )
  }
}

export default EnterOption;
