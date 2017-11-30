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
import Icon from 'components/icon';
import Icon1 from 'bee-icon';
import WidgetList from 'containers/manageWidgetList';
import {WidgetTitle,addGroupBtn,addBtnContainer,complete,cancel,newGroupName,addBtn,groupArea,selected_Back_Class} from './style.css';
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
      selectGroup : [],
      selectedBackClass:""
    }
  }
  componentDidMount () {
    const {selectGroup,manageData} = this.props;
    this.setState({
      selectGroup,
      groupName: manageData.widgetName
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
    const index = {groupIndex:data};
    addFolder(index);
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
    })
  }
  // 点击按钮执行 action   重新构造
  renameGroupFn =(index) =>{
    const { renameGroup } = this.props;
    let groupName = this.state.groupName ? this.state.groupName : "默认分组";
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
  //输入框聚焦更改背景颜色
  handleFocus = ()=>{
    this.setState({
      selectedBackClass:selected_Back_Class
    })
  }
  // 输入框失焦
  handleBlur =() => {
    this.setState({
      selectedBackClass:""
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
        <Icon type="more" />
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
            <input className={newGroupName} value={this.state.groupName} autoFocus="autofocus" onChange={(e) => {this.editGroupName(e)} } onFocus={()=>{this.handleFocus()}} onBlur={()=>{this.handleBlur()}}/>
            <Icon1 type="uf-close-c" onClick={ this.clearInput.bind(this) }></Icon1>
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
          <Icon type="record" onClick={ ()=>{this.openRenameGroupFn(index)} }/>
          <Icon type="add-files" onClick={()=>{this.addFolderFn(index)}}/>
          {this.renderDrop(index)}
        </div>
      </div>;
    }
    return connectDragSource(connectDropTarget(
      <div className={groupArea}>
        <section id={_id} style={{ ...opacity }} className={this.state.selectedBackClass?selected_Back_Class:""}>
          { groupTitle }
          <div>
            <WidgetList index={index} data={manageData.children}  />
          </div>
        </section>
        <div className={addBtn}>
          <button className={`'btn' ${addGroupBtn}`} onClick={()=>{this.addGroupFn(index)}}><Icon type="add"></Icon>添加组</button>
        </div>
      </div>
    ));
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(ManageGroup));
