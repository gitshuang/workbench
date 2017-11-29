import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import manageActions from 'store/root/manage/actions';

import Menu, { Item as MenuItem, Divider, SubMenu, MenuItemGroup } from 'bee-menus';
import Dropdown from 'bee-dropdown';
import Button from 'bee-button';
import Icon1 from 'components/icon';
import Icon from 'bee-icon';
import WidgetList from 'containers/manageWidgetList';
import {WidgetTitle,addGroupBtn,addBtnContainer,complete,cancel,newGroupName,addBtn} from './style.css';
import 'assets/style/iuapmobile.um.css';
const {
  requestStart,
  requestSuccess,
  requestError
} = rootActions;
const {
  addGroup,
  delectGroup,
  renameGroup,
  moveGroup,
  stickGroup,
  addFolder,
  selectListActions,
  selectGroupActions,

  } = manageActions;

const style = {
  width:'1290px',
  border: '1px solid #fff',
  borderRadius:'2px',
  padding: '0.5rem 4rem',
  paddingRight:'0',
  margin: '0 auto',
  marginBottom: '.5rem',
  marginTop: '.5rem',
  background:'rgba(79,86,98,0.1)',
  cursor: 'move'
};

const type='group';

const itemSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

const itemTarget = {
  drop(props, monitor) {
    const draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.moveGroupDrag(draggedId, props.id);
    }
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


function collectTaget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

@connect(
  mapStateToProps(
    'manageList',
    'selectGroup',
    'selectList',
    {
      namespace:'manage'
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    addGroup,
    delectGroup,
    renameGroup,
    moveGroup,
    stickGroup,
    addFolder,
    selectListActions,
    selectGroupActions,
  }
)
class ManageGroup extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      // manageData: [],  // 可直接更改加工的渲染页面的list   actions中worklist为最后提交的
      groupName:  "",
      editFlag: false,
      selectGroup : []
    }
  }
  componentDidMount () {
    const {selectGroup} = this.props;
    this.setState({
      selectGroup
    });
  }
  componentWillReceiveProps(nextProps){
    const {selectGroup} = nextProps;
    this.setState({
      selectGroup
    });
  }
  // 添加文件夹
  addFolderFn = (data)=> {
    // alert("添加文件夹功能");
    const { addFolder } = this.props;
    addFolder(data);
  }
  // 移动分组
  moveGroupFn =() => {

  }
  // 打开编辑分组形态
  openRenameGroupFn =(index) =>{
    this.setState({
      editFlag: true
    })
  }
  // 点击取消编辑分组按钮
  renameGroupCancel = (index) =>{
    this.setState({
      editFlag: false,
      groupName:""
    })
  }
  // 点击按钮执行 action   重新构造
  renameGroupFn =(index) =>{
    const { renameGroup } = this.props;
    let groupName = this.state.groupName;
    let param = {
      index: index,
      name: groupName
    }
    renameGroup(param);
    this.renameGroupCancel(index);
  }
  //点击清空输入框
  clearInput = () => {
    this.setState({groupName:""});
  }
  // 输入框的更改
  editGroupName = (e) =>{
    this.setState({
      groupName: e.target.value
    })
  }
  /*         ********            *****                      */
  // 选择框  选择
  selectFn =(e,index) => {
    let {selectList,selectListActions,manageList,selectGroupActions,selectGroup} = this.props;
    let checkFlag = e.target.checked;
    let aa = [];
    manageList[index].children.map((item,index)=>{
      aa.push(item.widgetId);
    });
    if(checkFlag){
      selectGroup.push(index);
      selectList = selectList.concat(aa);
    }else{
      selectList = selectList.concat(aa).filter(v => !selectList.includes(v) || !selectList.includes(v))
      selectGroup =  selectGroup.filter((item,i) => {
        return index !== item;
      });
    }
    selectListActions(selectList);
    selectGroupActions(selectGroup);
  }





  // 置顶分组
  stickFn =(index)=>{
    const { stickGroup } = this.props;
    stickGroup(index);
  }
  // 删除群组
  delectGroupFn =(index) =>{
    const { delectGroup } = this.props;
    delectGroup(index);
  }
  // 添加新分组
  addGroupFn =(index) =>{
    const { addGroup } = this.props;
    addGroup(index);
  }

  //
  onDropSelect =(e, index) =>{
    if( e.key == 1 ){
      this.stickFn(index);
    }else{
      this.delectGroupFn(index);
    }
  }

  renderDrop =(index) => {
    const menu1 = (
      <Menu
        onClick={(e) => {this.onDropSelect(e,index)} }>
        <MenuItem key="1">置顶</MenuItem>
        <MenuItem key="2">删除</MenuItem>
      </Menu>
    );
    return (
      <Dropdown
        trigger={['click']}
        overlay={menu1}
        animation="slide-up"
      >
        <Icon type="uf-3dot-h" />
      </Dropdown>
    )
  }

  render() {

    const {
      manageData,
      index,
      connectDragSource,
      connectDropTarget,
      isDragging,
      selectGroup,
    } = this.props;
    const checkType = this.state.selectGroup.indexOf(index) >= 0 ? true : false
    const opacity = isDragging ? 0 : 1;
    let _id = manageData.widgetId + "_" + index;
    let groupTitle = null;
    if(this.state.editFlag || manageData.widgetName=="") {
      groupTitle = <div className={WidgetTitle + ' um-box-justify'}>
        <div>
          <span>
            <input className={newGroupName} value={this.state.groupName} onChange={(e) => {this.editGroupName(e)} }/>
            <Icon type="uf-close-c" onClick={ this.clearInput.bind(this) }></Icon>
          </span>
          <Button className={complete} onClick={ ()=>{this.renameGroupFn(index)} }>确定</Button>
          <Button className={cancel} onClick={ ()=>{this.renameGroupCancel(index)} }>取消</Button>
        </div>
      </div>;
    }else {
      groupTitle = <div className={WidgetTitle + ' um-box-justify'}>
        <label>
          <input type="checkbox" checked={checkType} onChange={ (e)=>{this.selectFn(e,index)} }/>
          <span>{manageData.widgetName}</span>
        </label>
        <div>
          <Icon1 type="record" onClick={ ()=>{this.openRenameGroupFn(index)} }/>
          <Icon type="uf-plus" onClick={()=>{this.addFolderFn(index)}}/>
          {this.renderDrop(index)}
        </div>
      </div>;
    }
    return connectDragSource(connectDropTarget(
      <div>
        <div id={_id} style={{ ...style, opacity }}>
          { groupTitle }
          <div>
            <WidgetList index={index} data={manageData.children}  />
          </div>
        </div>
        <div className={addBtn}>
          <button className={`'btn' ${addGroupBtn}`} onClick={()=>{this.addGroupFn(index)}}><Icon type="uf-plus"></Icon>添加组</button>
        </div>
      </div>
    ));
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(ManageGroup));
