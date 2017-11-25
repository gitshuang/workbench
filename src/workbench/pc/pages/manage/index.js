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
const { setManageList,getManageList,batchDelect,moveGroup } = manageActions;

@withRouter
@connect(
  mapStateToProps(
    'manageList',
    'isEdit',
    'folderModalDisplay',
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
    moveGroup
  }
)

class Home extends Component {

  constructor(props) {
    super(props);
    this.state ={
      selectGroup: []
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
  // 将此方法传递给manageGroup 组件中
  selectGroupFn = (flag, index) => {
    let selectGroup = this.state.selectGroup;
    if(flag){
      selectGroup.push(index);
    }else{
      selectGroup =  selectGroup.filter((item,i) => {
        return index !== item;
      });
    }
    // console.log(selectGroup);
    this.setState({
      selectGroup
    });
  }
  // 批量删除
  batchDelect =() => {
    const { batchDelect } = this.props;
    let selectGroup = this.state.selectGroup;
    this.setState({
      selectGroup:[]
    });
    batchDelect(selectGroup);
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
          selectGroupFn={this.selectGroupFn}
          id={item.widgetId}
          moveGroupDrag={this.moveGroupDrag} />
      )
    });
    return list;
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
     const {
          folderModalDisplay,
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
              <Button className={batchDeletion} disabled={this.state.selectGroup.length ? false : true } onClick={this.batchDelect}>批量删除</Button>
              <Button className={batchDeletion} disabled={this.state.selectGroup.length ? false : true } onClick={this.batchMove}>批量移动</Button>
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
        <div className={pin +" um-css3-center"}>
          <MoveToGroup
            data={this.state.data}
            hand
          />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5BackendGroup)(Home);
