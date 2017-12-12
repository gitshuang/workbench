import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import Menu, { Item as MenuItem } from 'bee-menus';
import Dropdown from 'bee-dropdown';
import PopDialog from 'components/pop';
import Button from 'bee-button';
import {ButtonDefaultAlpha,ButtonCheckClose,ButtonCheckSelected} from 'components/button';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import manageActions from 'store/root/manage/actions';
import Icon from 'components/icon';
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
  setEditGroup
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
  beginDrag(props) {
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
      if(folderType==="folder" || (typeof dataItem==="undefined" || (dataItem && dataItem.widgetId !==draggedId))){
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
    moveTopGroup,
    moveBottomGroup,
    addFolder,
    selectListActions,
    selectGroupActions,
    setEditGroup
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
      inEdit: false,
      inFoucs: false,
      showModal: false,
    }
  }
  componentDidMount() {

    const {
      data: {
        widgetName: groupName,
      },
      manageList
    } = this.props;
    let i = 0;
    manageList.forEach((item,index)=>{
      if(item.widgetName.indexOf("默认分组") == 0 ) {
        i += 1
      };
    });

    const currName = i > 0 ? "默认分组"+ i : "默认分组";

    if (groupName && groupName!="默认分组") {
      this.setState({
        groupName,
      });

    } else {
      this.setState({
        groupName : currName
      });
      setTimeout(() => {
        this.refs.groupName.focus();
        this.refs.groupName.select();
      }, 0);
    }
  }
  // 添加文件夹
  addFolderFn(groupIndex) {
    const { addFolder } = this.props;
    addFolder({ groupIndex });
  }
  // 打开编辑分组形态
  openRenameGroupFn = (id) => {
    const {setEditGroup} = this.props;
    this.setState({
      inEdit: true
    });
    setEditGroup(id);
    setTimeout(() => {
      this.refs.groupName.focus();
      this.refs.groupName.select();
    }, 0);
  }
  // 点击取消编辑分组按钮
  renameGroupCancel = (index) => {
    const { renameGroup } = this.props;
    const {
      data: {
        widgetName: groupName,
      },
    } = this.props;
    const stateGroupName = this.state.groupName;
    this.setState({
      inEdit: false,
      groupName : groupName ? groupName : stateGroupName,
    });
    if(!groupName){
      renameGroup({
        index,
        name: stateGroupName,
      });
    }
  }
  // 点击按钮执行 action   重新构造
  renameGroupFn = (index) => {
    const { renameGroup } = this.props;
    const name = this.state.groupName;
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
    this.setState({
      groupName: e.target.value
    })
  }
  //输入框聚焦更改背景颜色
  handleFocus = ()=>{
    this.setState({
      inFoucs: true,
    })
  }
  // 输入框失焦
  handleBlur = () => {
    this.setState({
      inFoucs: false,
    })
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
    const checkFlag = e.target.checked;
    const aa = manageList[index].children.map((item,index)=>{
      return item.widgetId;
    });
    if(checkFlag){
      selectGroup.push(index);
      selectList = Array.from(new Set(selectList.concat(aa)));
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
  delectGroupFn =(data) =>{
    const { delectGroup } = this.props;
    delectGroup(data.index);
  }
  // 添加新分组
  addGroupFn(index) {
    const { addGroup } = this.props;
    addGroup(index);
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
        this.popOpen();
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

    return (
      <Dropdown
        trigger={['click']}
        overlay={menu}
        animation="slide-up" >
        <Icon title="更多" type="more" />
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
    } = this.props;
    const {
      inEdit,
      inFoucs,
      groupName,
      showModal,
    } = this.state;
    const checkType = selectGroup.indexOf(index) >= 0 ? true : false
    const opacity = isDragging ? 0 : 1;
    let groupTitle;
    if(inEdit || !widgetName) {
      groupTitle = (
        <div className={widgetTitle} >
          <div className={titleInputArea}>
            <input
              className={`${newGroupName} input`}
              value={groupName}
              autoFocus="autofocus"
              onChange={this.editGroupName}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              ref="groupName" />
          </div>
          <ButtonCheckSelected className={btn} onClick={ ()=>{this.renameGroupFn(index)} }><span>√</span></ButtonCheckSelected>
          <ButtonCheckClose className={btn} onClick={ ()=>{this.renameGroupCancel(index)} }><span>×</span></ButtonCheckClose>
        </div>
      );
    }else {
      groupTitle = (
        <div className={`${widgetTitle} um-box-justify`} >
          <label>
            <input type="checkbox" checked={checkType} onChange={ this.selectFn(index) }/>
            <span>{widgetName}</span>
          </label>
          <div className="clearfix">
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

    console.log("this.props");
    console.log(this.props);

    return connectDragSource(connectDropTarget(
      <div className={groupArea}>
        <section style={{ ...opacity }} className={inFoucs ? selectedBackClass : ""} >
          { groupTitle }
          <div>
            <WidgetList index={index} data={children} parentId={this.props.data.widgetId}  />
          </div>
        </section>
        <div className={addBtn} >
          <ButtonDefaultAlpha className={addGroupBtn} onClick={this.addGroupFn.bind(this, index)}>
            <Icon type="add" ></Icon>
            添加组
          </ButtonDefaultAlpha>
        </div>
        <PopDialog className="pop_dialog_delete" show={ showModal } close={this.popClose} btns={pop_btn} data={{ index }}>
          <div>
            <span>您确认要删除吗?</span>
          </div>
        </PopDialog>
      </div>
    ));
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(ManageGroup));
