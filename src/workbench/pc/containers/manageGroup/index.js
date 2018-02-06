import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import Menu, { Item as MenuItem } from 'bee/menus';
import Dropdown from 'bee/dropdown';
import PopDialog from 'components/pop';
import Button from 'bee/button';
import {ButtonDefaultAlpha,ButtonCheckClose,ButtonCheckSelected,ButtonDefaultWhite} from 'components/button';

import { mapStateToProps, avoidSameName ,getStrLenSubstr} from '@u';
import rootActions from 'store/root/actions';
import manageActions from 'store/root/manage/actions';
import Icon from 'components/icon';
import BeeIcon from 'bee/icon';
import Checkbox from 'bee/checkbox';
import Message from 'bee/message';
import WidgetList from 'containers/manageWidgetList';
import {
  widgetTitle,
  addGroupBtn,
  addBtnContainer,
  complete,
  cancel,
  newGroupName,
  addBtn,
  groupArea,
  selectedBackClass,
  titleInputArea,
  icon,
  iconBox,
  btn,
  newGroupName_focus,
  newGroupName_blur,
  widgetTitleInit
} from './style.css';
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
  moveTopGroup,
  moveBottomGroup,
  addFolder,
  selectListActions,
  selectGroupActions,
  setEditonlyId,
  setDragInputState,
} = manageActions;

function findItemById(manageList,id) {
  let dataItem;
  for(let i = 0;i<manageList.length;i++){
    if(manageList[i].children){
      dataItem = findItemById(manageList[i].children,id)
    }
    if(dataItem){
      break;
    }
    if(manageList[i].widgetId && manageList[i].widgetId === id){
      dataItem = manageList[i];
      break;
    }
  }
  return dataItem;
}
const type='item';

const itemSource = {
  beginDrag(props,monitor) {
    return { id: props.id,type:props.type,parentId:props.parentId,folderType:props.folderType };
  }
};

const itemTarget = {
  drop(props, monitor) {
    const draggedId = monitor.getItem().id;
    const preParentId = monitor.getItem().parentId;
    const draggedType = monitor.getItem().type;
    const folderType = monitor.getItem().folderType;
    let afterParentId = props.data.parentId;

    if (draggedId !== props.id && draggedType===1 && props.data.type===1) {
      props.moveGroupDrag(draggedId, props.id);
    }else if((draggedType===2 || draggedType===3) && props.data.type===1){
      !props.data.parentId && (afterParentId = props.data.widgetId);
      //因为冒泡 所以已经有的话 不需要执行move
      let dataItem = findItemById(props.data.children,draggedId);
      if(folderType==="folder" || typeof dataItem==="undefined" || (dataItem && dataItem.widgetId !==draggedId)){
        //folderType==="folder" 从文件夹把元素往分组里拖拽
        props.moveItemDrag(draggedId,preParentId,draggedType, props.id, afterParentId, props.data.type);
      }
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

Array.prototype.distinct = function (){
  var arr = this,
      i,obj = {},
      result = [],
      len = arr.length;
  for(i = 0; i< arr.length; i++){
    if(!obj[arr[i]]){  
      obj[arr[i]] = 1;
      result.push(arr[i]);
    }
  }
  return result;
};

@connect(
  mapStateToProps(
    'manageList',
    'selectGroup',
    'selectList',
    'currEditonlyId',
    'dragState',
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
    moveTopGroup,
    moveBottomGroup,
    addFolder,
    selectListActions,
    selectGroupActions,
    setEditonlyId,
    setDragInputState,
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
      groupName:  "",
      inFoucs: false,
      showModal: false
    }
  }
  componentWillMount() {
    const {
      data: {
        widgetName,
        isNew,
      },
      manageList,
    } = this.props;
 
    if (isNew) {
      setTimeout(() => {

        const nameArr = manageList.map(({ widgetName }) => {
          return widgetName;
        });
        const newGroupName = avoidSameName(nameArr, '分组');
        this.setState({
          groupName: newGroupName,
        });
        this.refs.groupName.focus();
        this.refs.groupName.select();
        
        const { checkFun ,currEditonlyId} = this.props;
        checkFun(currEditonlyId+"_btn");
      }, 0);
    } else {
      this.setState({
        groupName: widgetName,
      });
    }
  }
 
  componentWillReceiveProps(nextProps) {
    if (
      this.props.currEditonlyId !== nextProps.currEditonlyId &&
      this.props.data.isNew
    ) {
      this.props.renameGroup({
        id: this.props.data.widgetId,
        name: this.state.groupName,
        dontChangeCurrEditonlyId: true,
      });
    }
  }
  // 添加文件夹
  addFolderFn(groupIndex) {
    const { addFolder } = this.props;
    addFolder({ groupIndex });
  }
  // 打开编辑分组形态
  openRenameGroupFn = (id) => {
    const {setEditonlyId} = this.props;
    setEditonlyId(id);
    setTimeout(() => {
      this.refs.groupName.focus();
      this.refs.groupName.select();
    }, 0);
    this.setState({
      inFoucs: false,
    })
  }
  // 点击取消编辑分组按钮
  renameGroupCancel = (index) => {

    const { renameGroup,setEditonlyId } = this.props;
    const {
      data: {
        widgetName: groupName,
      },
    } = this.props;
    const stateGroupName = this.state.groupName;
    this.setState({
      groupName : groupName ? groupName : stateGroupName,
    });
    setEditonlyId("");
    if(!groupName){
      renameGroup({
        index,
        name: stateGroupName,
      });
    }
    this.setState({
      inFoucs: false,
    })
  }
  // 点击按钮执行 action   重新构造
  renameGroupFn = (index) => {
    const { renameGroup, manageList } = this.props;
    const name = this.state.groupName;
    if( name == manageList[index].widgetName){
      this.renameGroupCancel(index);
      return false;
    }
    let widgetNameArr = manageList.map((item,index)=>{
      return item.widgetName
    });
    if( widgetNameArr.includes(name) ){
      Message.create({content: '已有分组名',duration:2,position: 'top', color: "light"});
      return false;
    }
    renameGroup({
      index,
      name,
    });
    this.renameGroupCancel(index);
  }
  //点击清空输入框
  clearInput = () => {
    this.setState({
      groupName: "",
    });
  }
  // 输入框的更改
  editGroupName = (e) =>{
    let _groupName = e.target.value;
    _groupName = getStrLenSubstr(_groupName,11,21,true)
    this.setState({
      groupName:_groupName
    })
  }
  //输入框聚焦更改背景颜色
  handleFocus = ()=>{
    this.setState({
      inFoucs: true,
    });
    const { setDragInputState,dragState } = this.props;
    if(!dragState)return;
    setDragInputState(false);
  }
  //输入框失焦
  handleBlur = () => {
    this.setState({
      inFoucs: false,
    });
    const { setDragInputState,dragState } = this.props;
    if(dragState)return;
    setDragInputState(true);
  }
  
  // 选择框  选择
  selectFn = (index) => (e) => {
    let {
      selectList,
      selectListActions,
      manageList,
      selectGroupActions,
      selectGroup,
    } = this.props;
    //const checkFlag = e.target.checked;
    // 换成checkbox插件
    const checkFlag = e;
    const aa = manageList[index].children.map((item,index)=>{
      return item.widgetId;
    });
    if(checkFlag){
      selectGroup.push(index);
      if(!!window.ActiveXObject || "ActiveXObject" in window){ //ie?
        selectList = Array.from(selectList.concat(aa).distinct());
      }else{
        selectList = Array.from(new Set(selectList.concat(aa)));
      }
    }else{
      selectList = selectList.filter(v => !aa.includes(v));
      selectGroup =  selectGroup.filter((item,i) => {
        return index !== item;
      });
    }
    selectListActions(selectList);
    selectGroupActions(selectGroup);
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
  // 上移分组
  moveTopFn = (index)=>{
    const { moveTopGroup } = this.props;
    moveTopGroup(index);
  }
  // 下移分组
  moveBottomFn = (index) => {
    const { moveBottomGroup } = this.props;
    moveBottomGroup(index);
  }
  // 删除群组
  delectGroupFn =(index) =>{
    const { delectGroup } = this.props;
    delectGroup(index);
  }
  // 添加新分组
  addGroupFn(index) {
    const { addGroup } = this.props;
    addGroup({index});
  }
  // menu组件 方法
  onDropSelect = (index) => ({ key }) => {
    switch(key) {
      case '1':
        this.moveBottomFn(index);
        break;
      case '2':
        this.moveTopFn(index);
        break;
      default:
        this.delectGroupFn(index);
        break;
    }
  }

  renderDrop =(index) => {
    const { manageList } = this.props;
    let menu = (
      <Menu onClick={this.onDropSelect(index)}>
        {
          index !== manageList.length - 1 ? (
            <MenuItem key="1">下移</MenuItem>
          ) : null
        }
        {
          index ? (
            <MenuItem key="2">上移</MenuItem>
          ) : null
        }
        <MenuItem key="3">删除</MenuItem>
      </Menu>
    );

    // btnSelectedFun=()=>{
    //    this.btn_selected.onClick()
    // }

    return (
      <Dropdown
        trigger={['click']}
        overlay={menu}
        animation="slide-up" >
        <div><Icon title="更多" type="more" /></div>
      </Dropdown>
    )
  }
  render() {
    const {
      data: {
        widgetId,
        widgetName,
        children,
      },
      index,
      connectDragSource,
      connectDropTarget,
      isDragging,
      selectGroup,
      currEditonlyId,
      dragState
    } = this.props;
    const {
      inFoucs,
      groupName,
      showModal,
    } = this.state;
    const checkType = selectGroup.indexOf(index) >= 0 ? true : false
    const opacity = isDragging ? 0 : 1;
    let groupTitle;
    if( currEditonlyId == widgetId) {
      groupTitle = (
        <div className={widgetTitle} >
          <div className={titleInputArea}>
            <input
              className={`${inFoucs?newGroupName_focus:newGroupName_blur} ${newGroupName} input`}
              value={groupName}
              autoFocus="autofocus"
              onChange={this.editGroupName}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              placeholder="分组名称,最多4个字符"
              ref="groupName" />
          </div>
          <ButtonCheckSelected id={`${widgetId}_btn`} className={btn} onClick={ ()=>{this.renameGroupFn(index)} }><Icon type="right"></Icon></ButtonCheckSelected>
          <ButtonCheckClose className={btn} onClick={ ()=>{this.renameGroupCancel(index)} }><Icon type="cancel"></Icon></ButtonCheckClose>
        </div>
      );
    }else {
      groupTitle = (
        <div className={`${widgetTitle} ${widgetTitleInit} um-box-justify`} >
          <div>
            <Checkbox checked={checkType} onChange={ this.selectFn(index) }>{widgetName}</Checkbox>
          </div>
          <div>
            <div className={iconBox}>
              <Icon title="重命名分组" type="record" onClick={ ()=>{this.openRenameGroupFn(widgetId)}} />
            </div>
            <div className={iconBox}>
              <Icon title="添加文件夹" type="add-files" onClick={this.addFolderFn.bind(this, index)} />
            </div>
            {this.renderDrop(index)}
          </div>
        </div>
      );
    }

    const pop_btn = [
      {
        label: "确认",
        fun: this.delectGroupFn,
        className: "",
      },
      {
        label: "取消",
        fun: this.popClose,
        className: "",
      }
    ]

    if (isDragging) {
      //return null
    }

    let _html = ( <div className={`${groupArea} animated zoomIn`}>
      <section style={{ ...opacity }} className={inFoucs ? selectedBackClass : ""} >
        { groupTitle }
        <div>
          <WidgetList index={index} data={children} parentId={this.props.data.widgetId}  />
        </div>
      </section>

      <div className={addBtn} >
        <ButtonDefaultWhite className={addGroupBtn} onClick={this.addGroupFn.bind(this, index)}>
          <Icon type="add"></Icon>
          添加分组
        </ButtonDefaultWhite>
      </div>
      <PopDialog className="pop_dialog_delete" show={ showModal } type="delete" close={this.popClose} btns={pop_btn} data={{ index }}>
        <div className="pop_cont">
          <BeeIcon type="uf-exc-t" className="icon"/>
          <span>您确认要删除此项?</span>
        </div>
      </PopDialog>
    </div>);
    return dragState?connectDragSource(connectDropTarget(_html)):_html;
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(ManageGroup));
