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
import Dialog from 'containers/manageFolderDialog';

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
    'folderModalDisplay',
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

    let data = {id,afterId}
    const { moveGroup } = this.props;
    moveGroup(data);

  }

  componentDidMount() {
    const { requestError, requestSuccess, getManageList } = this.props;
    getManageList().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
  }

  // 批量删除
  batchDelect =() => {
    const { batchDelect } = this.props;
    batchDelect();
  }
  // 批量删除
  batchMove =(index) => {
    const { batchMove } = this.props;
    batchMove(index);
  }
  // 保存
  save =() => {
    const {setManageList, manageList} = this.props;
    setManageList(manageList).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
  }
  // 取消
  cancelFn = () => {
    const {isEdit,getManageList} = this.props;
    if(isEdit){
      getManageList().then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        requestSuccess();
      });
    }else{
      this.props.history.goBack();
    }
  }

  renderContent =() => {
    let { manageList } = this.props;
    //(typeof this.state.data === "undefined" || (this.state.data && this.state.data.length===0)) ? (this.state.data = manageList) : (manageList=this.state.data);
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

  goBack() {
    this.props.history.goBack();
  }
  // 批量移动
  openGroupTo =() => {
    this.setState({
      isOpenMove: true
    });
  }
  // 批量删除
  openDeleteMark =() => {
    this.batchDelect()
  }

  addGroup = () => {
    this.setState({
      isGroup: true
    });
  }
  confirmFn = () => {
    const { batchMove } = this.props;
    batchMove(0);
  }

  cancelFn = () => {
    this.setState({
      isOpenMove: false
    })
  }

  /*  添加新组  method  */
  addNewGroup =(name,id) => {
    const { setAddGroup, requestError } = this.props;
    let newGroup = {
      id : id,
      name : name,
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
  groupCancelFn =() => {
    this.setState({
      isGroup: false,
    });
  }

  render() {
     const {
       folderModalDisplay,
       selectList
     } = this.props;
    const { isEdit } = this.props;
    return (
      <div className="um-win">
        <div className="um-header">
          <Header onLeftClick={ this.goBack.bind(this) } iconName={"back"} leftContent={"返回"}>
            <span>首页编辑</span>
          </Header>
        </div>
        <div className={um_content}>
          {this.renderContent()}
        </div>
        <div className="um-footer">
          <div className={umBoxJustify}>
            <div className={umBoxJustify1}>
              <Button className={batchDeletion} disabled={selectList.length ? false : true } onClick={this.openDeleteMark}>批量删除</Button>
              <Button className={batchDeletion} disabled={selectList.length ? false : true } onClick={this.openGroupTo}>批量移动</Button>
            </div>
            <div className={umBoxJustify2}>
              <Button className={preserve} disabled={!isEdit} onClick={this.save}>保存</Button>
              <Button className={cancel} onClick={this.cancelFn}>取消</Button>
            </div>
          </div>
        </div>
        {
            folderModalDisplay ? (
              <Dialog/>
            ) : null
          }
        {
          this.state.isOpenMove ? (
            <div className={pin +" um-css3-center"}>
              <MoveToGroup
                isGroup={this.state.isGroup}
                addGroup={this.addGroup}
                confirmFn={this.confirmFn}
                cancelFn={this.cancelFn}
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
