import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { DragDropContext } from 'react-dnd';
import update from 'react/lib/update';
import HTML5BackendGroup from 'react-dnd-html5-backend';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import manageActions from 'store/root/manage/actions';

import Header from 'containers/header';
import ManageGroup from 'containers/manageGroup';
import ManageFolderDialog from 'containers/manageFolderDialog';

import MoveToGroup from 'components/moveToGroup';

import Button from 'bee-button';
import 'assets/style/iuapmobile.um.css';

import { HeaderLeft ,umBoxJustify,umBoxJustify1,umBoxJustify2,batchDeletion,preserve,cancel,pin,um_content} from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;
const { setManageList,getManageList,batchDelect,batchMove,moveGroup } = manageActions;

@withRouter
@connect(
  mapStateToProps(
    'manageList',
    'isEdit',
    'selectList',
    {
      namespace: 'manage',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    setManageList,
    getManageList,
    batchDelect,
    batchMove,
    moveGroup,
  }
)

class Home extends Component {
  constructor(props) {
    super(props);
    this.state ={
      isOpenMove: false,
      isGroup: false,
    }
    this.moveGroupDrag = this.moveGroupDrag.bind(this);
  }
  moveGroupDrag(id, afterId) {
    const { moveGroup } = this.props;
    moveGroup({ id, afterId });
  }
  componentDidMount() {
    const {
      requestStart,
      requestError,
      requestSuccess,
      getManageList
    } = this.props;
    requestStart();
    getManageList().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
  }
  batchDelect() {
    const { batchDelect } = this.props;
    batchDelect();
  }
  batchMove(index) {
    const { batchMove } = this.props;
    batchMove(index);
  }
  save() {
    const { setManageList, manageList } = this.props;
    setManageList(manageList).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
  }
  cancel() {
    const { isEdit, getManageList } = this.props;
    if(isEdit){
      getManageList().then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        requestSuccess();
      });
    }else{
      this.goBack();
    }
  }
  goBack() {
    this.props.history.goBack();
  }
  openGroupTo() {
    this.setState({
      isOpenMove: true
    });
  }
  openDeleteMark() {
    this.batchDelect()
  }
  moveAddGroup = () => {
    this.setState({
      isGroup: true
    });
  }
  moveConfirmFn() {
    const { batchMove } = this.props;
    batchMove(0);
  }

  moveCancelFn() {
    this.setState({
      isOpenMove: false
    })
  }
  addNewGroup(name,id) {
    const { setAddGroup, requestError } = this.props;
    let newGroup = {
      id: id,
      name: name,
    };
    setAddGroup().then( ({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      let menuData = this.state.menuData;
      menuData.push(newGroup);
      this.setState({
        menuData: menuData,
      });
    });
  }
  groupCancelFn() {
    this.setState({
      isGroup: false,
    });
  }
  renderContent() {
    let { manageList } = this.props;
    let list = [];
    if(manageList.length == 0) return;
    manageList.map((item, index) =>{
      list.push(
        <ManageGroup
          manageData={item}
          index={index}
          key={item.widgetName+index}
          id={item.widgetId}
          moveGroupDrag={this.moveGroupDrag} />
      )
    });
    return list;
  }
  render() {
    const {
      folderModalDisplay,
      selectList,
      isEdit,
    } = this.props;
    return (
      <div className="um-win">
        <div className="um-header">
          <Header onLeftClick={ this.goBack } iconName={"back"} leftContent={"返回"}>
            <span>首页编辑</span>
          </Header>
        </div>
        <div className={um_content}>
          {this.renderContent()}
        </div>
        <div className="um-footer">
          <div className={umBoxJustify}>
            <div className={umBoxJustify1}>
              <Button className={batchDeletion} disabled={!!selectList.length} onClick={this.openDeleteMark}>批量删除</Button>
              <Button className={batchDeletion} disabled={!!selectList.length} onClick={this.openGroupTo}>批量移动</Button>
            </div>
            <div className={umBoxJustify2}>
              <Button className={preserve} disabled={!isEdit} onClick={this.save}>保存</Button>
              <Button className={cancel} onClick={this.cancel}>取消</Button>
            </div>
          </div>
        </div>
        <ManageFolderDialog />
        {
          this.state.isOpenMove ? (
            <div className={pin +" um-css3-center"}>
              <MoveToGroup
                isGroup={this.state.isGroup}
                addGroup={this.moveAddGroup}
                confirmFn={this.moveConfirmFn}
                cancelFn={this.moveCancelFn}
                addNewGroup={this.addNewGroup }
                groupCancelFn={this.groupCancelFn}
              />
            </div>
          ): null
        }
      </div>
    );
  }
}

export default DragDropContext(HTML5BackendGroup)(Home);
