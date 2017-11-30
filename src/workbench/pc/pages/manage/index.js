import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5BackendGroup from 'react-dnd-html5-backend';
import Button from 'bee-button';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import manageActions from 'store/root/manage/actions';

import Header from 'containers/header';
import ManageGroup from 'containers/manageGroup';
import ManageFolderDialog from 'containers/manageFolderDialog';
import ManageBatchMoveDialog from 'containers/manageBatchMoveDialog';
import PopDialog from 'components/pop';
import 'assets/style/iuapmobile.um.css';

import {
  HeaderLeft,
  umBoxJustify,
  umBoxJustify1,
  umBoxJustify2,
  batchDeletion,
  preserve,
  cancel,
  um_content,
  um_footer,
  saveArea,
  batchArea,
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const {
  setManageList,
  getManageList,
  batchDelect,
  openBatchMove,
  moveGroup,
  setEditState,
} = manageActions;

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
    openBatchMove,
    moveGroup,
    setEditState,
  }
)

class Home extends Component {
  constructor(props) {
    super(props);
    const { manageList } = props;
    this.state = {
      showModal: false,
    };
  }
  moveGroupDrag = (id, afterId) => {
    const { moveGroup } = this.props;
    moveGroup({ id, afterId });
  }
  componentDidMount() {
    this.getManageList();
  }
  getManageList() {
    const {
      requestStart,
      requestError,
      requestSuccess,
      getManageList,
    } = this.props;
    requestStart();
    return getManageList().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
      return error;
    });
  }
  save = () => {
    const {
      requestStart,
      requestError,
      requestSuccess,
      setManageList,
      manageList,
    } = this.props;
    requestStart();
    setManageList(manageList).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
  }
  cancel = () => {
    const {
      isEdit,
      setEditState,
    } = this.props;
    if(isEdit){
      this.getManageList().then((error) => {
        if (!error) {
          setEditState(false);
        }
      });
    }else{
      this.goBack();
    }
  }
  goBack = () => {
    this.props.history.goBack();
  }
  batchDelectFn = () => {
    const { batchDelect } = this.props;
    batchDelect();
    this.popClose();
  }

  openGroupTo = () => {
    const { openBatchMove } = this.props;
    openBatchMove();
  }

  popOpen = () => {
    this.setState({
      showModal: true
    });
  }
  popClose = () => {
    this.setState({
      showModal: false
    });
  }

  renderContent() {
    let { manageList } = this.props;
    let list = [];
    if(manageList.length == 0) return;
    manageList.map((item, index) =>{
      list.push(
        <ManageGroup
          data={item}
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
      selectList,
      isEdit,
    } = this.props;
    const pop_btn = [
      {label:"确认",fun:this.batchDelectFn,className:""},
      {label:"取消",fun:this.popClose,className:""}
    ]
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
        <div className={um_footer}>
          <div className={`${umBoxJustify} um-box-justify`}>
            <div className={batchArea}>
              <Button className={batchDeletion} disabled={selectList.length ? false:true} onClick={this.popOpen}>批量删除</Button>
              <Button className={batchDeletion} disabled={selectList.length? false : true} onClick={this.openGroupTo}>批量移动</Button>
            </div>
            <div className={saveArea}>
              <Button className={preserve} disabled={!isEdit} onClick={this.save}>保存</Button>
              <Button className={cancel} onClick={this.cancel}>取消</Button>
            </div>
          </div>
        </div>
        <ManageFolderDialog />
        <ManageBatchMoveDialog />
        <PopDialog className="pop_dialog_delete" show = { this.state.showModal } btns={pop_btn} >
          <div>
            <span>您确认要批量删除吗?</span>
          </div>
        </PopDialog>
      </div>
    );
  }
}

export default DragDropContext(HTML5BackendGroup)(Home);
