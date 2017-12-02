import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import Menu, { Item as MenuItem } from 'bee-menus';
import Dropdown from 'bee-dropdown';
import Button from 'bee-button';
import PopDialog from 'components/pop';

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
    moveTopGroup,
    moveBottomGroup,
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
    } = this.props;
    this.setState({
      groupName,
    });
  }
  // 添加文件夹
  addFolderFn(groupIndex) {
    const { addFolder } = this.props;
    addFolder({ groupIndex });
  }
  // 打开编辑分组形态
  openRenameGroupFn = () => {
    this.setState({
      inEdit: true
    })
  }
  // 点击取消编辑分组按钮
  renameGroupCancel = () => {
    const {
      data: {
        widgetName: groupName,
      },
    } = this.props;
    this.setState({
      inEdit: false,
      groupName,
    })
  }
  // 点击按钮执行 action   重新构造
  renameGroupFn = (index) => {
    const { renameGroup } = this.props;
    const name = this.state.groupName || "默认分组";
    renameGroup({
      index,
      name,
    });
    this.renameGroupCancel();
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
        this.moveTopFn(index);
        break;
      case '2':
        this.moveBottomFn(index);
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
        <Icon type="more" />
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
    if(inEdit) {
      groupTitle = (
        <div className={widgetTitle} >
          <div className={titleInputArea}>
            <input
              className={newGroupName}
              value={groupName}
              autoFocus="autofocus"
              onChange={this.editGroupName}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur} />
            <Icon
              className={icon}
              type="error3"
              onClick={ this.clearInput } />
          </div>
          <Button className={complete} onClick={ ()=>{this.renameGroupFn(index)} }>确定</Button>
          <Button className={cancel} onClick={ ()=>{this.renameGroupCancel(index)} }>取消</Button>
        </div>
      );
    }else {
      groupTitle = (
        <div className={`${widgetTitle} um-box-justify`} >
          <label>
            <input type="checkbox" checked={checkType} onChange={ this.selectFn(index) }/>
            <span>{widgetName}</span>
          </label>
          <div>
            <Icon type="record" onClick={ this.openRenameGroupFn }/>
            <Icon type="add-files" onClick={this.addFolderFn.bind(this, index)}/>
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
    return connectDragSource(connectDropTarget(
      <div className={groupArea}>
        <section style={{ ...opacity }} className={inFoucs ? selectedBackClass : ""} >
          { groupTitle }
          <div>
            <WidgetList index={index} data={children} />
          </div>
        </section>
        <div className={addBtn} >
          <button
            className={addGroupBtn}
            onClick={this.addGroupFn.bind(this, index)} >
            <Icon type="add" ></Icon>
            添加组
          </button>
        </div>
        <PopDialog className="pop_dialog_delete" show={ showModal } btns={pop_btn} data={{ index }}>
          <div>
            <span>您确认要删除吗?</span>
          </div>
        </PopDialog>
      </div>
    ));
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(ManageGroup));
