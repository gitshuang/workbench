import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Menu, { Item as MenuItem } from 'bee/menus';
import Dropdown from 'bee/dropdown';
import PopDialog from 'pub-comp/pop';
import Button from 'bee/button';
import {ButtonDefaultAlpha,ButtonCheckClose,ButtonCheckSelected,ButtonDefaultWhite} from 'pub-comp/button';
import { avoidSameName ,getStrLenSubstr} from '@u';
import Icon from 'pub-comp/icon';
import Checkbox from 'bee/checkbox';
import Message from 'bee/message';
import WidgetList from '../manageWidgetList';
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
  widgetTitleInit,
  check_group,
  noChildStyle
} from './style.css';

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
    connectDropTarget: connect.dropTarget(),
    isOver:monitor.isOver(),
    getItemType:monitor.getItem(),
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
      showModal: false,
      selectGroup: [],
      selectList: [],
    }
  }
  componentWillMount() {
    const {
      data: {
        widgetName,
        isNew,
      },
      manageList,
      languagesJSON
    } = this.props;

    if (isNew) {
      setTimeout(() => {

        const nameArr = manageList.map(({ widgetName }) => {
          return widgetName;
        });
        const newGroupName = avoidSameName(nameArr, languagesJSON.group);
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
        name: this.state.groupName ==""?this.props.data.widgetName:this.state.groupName,
        dontChangeCurrEditonlyId: true,
      });
      this.setState({
        inFoucs:false
      })
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
    const {renameGroup, manageList, languagesJSON} = this.props;
    const name = this.state.groupName;
    if( name == manageList[index].widgetName){
      this.renameGroupCancel(index);
      return false;
    }
    let widgetNameArr = manageList.map((item,index)=>{
      return item.widgetName
    });
    if( widgetNameArr.includes(name) ){
      Message.create({
        content: languagesJSON.group_name_exists,
        duration: 1.5,
        position: 'topLeft',
        color: "warning",
        style: {height: 'auto'}
      });
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
    // _groupName = getStrLenSubstr(_groupName,11,21,true)
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
  selectFn = (e,index) => {
    let {
      selectListActions,
      manageList,
      selectList,
      selectGroup,
      selectGroupActions,
    } = this.props;
    //const checkFlag = e.target.checked;
    // 换成checkbox插件
    const checkFlag = e;
    const aa = manageList[index].children.map((item,index)=>{
      return item.widgetId;
    });
    if(checkFlag){
      selectGroup.push(index);
      selectGroupActions(selectGroup);
      if(!!window.ActiveXObject || "ActiveXObject" in window){ //ie?
        selectList = Array.from(selectList.concat(aa).distinct());
      }else{
        selectList = Array.from(new Set(selectList.concat(aa)));
      }

    }else{
      selectList = selectList.filter(v => !aa.includes(v));
      const selectGroup2 =  selectGroup.filter((item,i) => {
        return index !== item;
      });
      selectGroupActions(selectGroup2);
    }
    selectListActions(selectList);
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
    const {manageList, languagesJSON} = this.props;
    let menu = (
      <Menu onClick={this.onDropSelect(index)}>
        {
          index !== manageList.length - 1 ? (
            <MenuItem key="1">{languagesJSON.move_down}</MenuItem>
          ) : null
        }
        {
          index ? (
            <MenuItem key="2">{languagesJSON.move_up}</MenuItem>
          ) : null
        }
        <MenuItem key="3">{languagesJSON.delete}</MenuItem>
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
        <div><Icon title={languagesJSON.more} type="more" /></div>
      </Dropdown>
    )
  }
  render() {

    var {
      manageList,
      curEditFolderId,
      drag,
      dragState,
      selectList,
      selectGroup,
      currEditonlyId,
      currGroupIndex,
      title,
      openFolder,
      deleteFolder,
      renameFolder,
      setFolderEdit,
      moveService,
      addFolder,
      closeFolder,
      setCurrGroupIndex,
      editTitle,
      selectListActions,
      selectGroupActions,
      cancelFolderEdit,
      setEditonlyId,
      setDragInputState,
      applicationsMap,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      addDesk,
      requestSuccess,
      requestError,
      delectService,
      folderBgSrc,
      languagesJSON
    } = this.props;
    var widgetListProps = {
      manageList,
      curEditFolderId,
      drag,
      dragState,
      selectList,
      selectGroup,
      currEditonlyId,
      currGroupIndex,
      title,
      openFolder,
      deleteFolder,
      renameFolder,
      setFolderEdit,
      moveService,
      addFolder,
      closeFolder,
      setCurrGroupIndex,
      editTitle,
      selectListActions,
      selectGroupActions,
      cancelFolderEdit,
      setEditonlyId,
      setDragInputState,
      delectService,
      folderBgSrc
    }
    var widgetSelectListProps={
      applicationsMap,
      manageList,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      deleteFolder,
      addDesk,
      requestSuccess,
      requestError,
    }
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
    } = this.props;
    const {
      inFoucs,
      groupName,
      showModal,
    } = this.state;
    const checkType = selectGroup.indexOf(index) > -1 ? true : false
    const opacity = isDragging ? 0 : 1;
    let groupTitle;
    if( currEditonlyId == widgetId) {
      groupTitle = (
        <div className={widgetTitle} >
          <div className={titleInputArea}>
            <input
              className={`${inFoucs?newGroupName_focus:newGroupName_blur} ${newGroupName} input`}
              value={groupName}
              maxLength="4"
              autoFocus="autofocus"
              onChange={this.editGroupName}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              // placeholder="分组名称,最多4个字符"
              placeholder={languagesJSON.groupName_max_words_four}
              ref="groupName" />
          </div>
          <ButtonCheckSelected id={`${widgetId}_btn`} className={btn} onClick={ ()=>{this.renameGroupFn(index)} }><Icon type="right"></Icon></ButtonCheckSelected>
          <ButtonCheckClose className={btn} onClick={ ()=>{this.renameGroupCancel(index)} }><Icon type="cancel"></Icon></ButtonCheckClose>
        </div>
      );
    }else {
      groupTitle = (
        // um-box-justify
        <div className={`${widgetTitle} ${widgetTitleInit} `} >
          <div className={check_group}>
            <Checkbox checked={checkType} onChange={(e)=>{this.selectFn(e,index)}}>{widgetName}</Checkbox>
            {
              (languagesJSON.noDataGroup && children.length === 0)
              ? 
              <span className={noChildStyle}><Icon type="notice" />{languagesJSON.noDataGroup}</span>
              : 
              null 
            }
          </div>
          <div>
            <div className={iconBox}>
              <Icon title={languagesJSON.rename_group} type="record" onClick={ ()=>{this.openRenameGroupFn(widgetId)}} />
            </div>
            <div className={iconBox}>
              <Icon title={languagesJSON.add_folder} type="add-files" onClick={this.addFolderFn.bind(this, index)} />
            </div>
            {this.renderDrop(index)}
          </div>
        </div>
      );
    }

    const pop_btn = [
      {
        label: `${languagesJSON.confirm}`,
        fun: this.delectGroupFn,
        className: "",
      },
      {
        label: `${languagesJSON.cancel}`,
        fun: this.popClose,
        className: "",
      }
    ]

    if (isDragging) {
      //return null
    }

    var { isOver, getItemType} = this.props;
    var overStyle = {};
    if( isOver && getItemType.type === 1){
      overStyle = {
        'transform': 'scale(1,1)',
        'boxShadow' :'0 0 0 3px #ddd,0 0 0 6px rgba(0,205,195,1)',
        'borderRadius':'0',
      }
    }
    let _html = ( <div className={`${groupArea} animated zoomIn`} style={{...overStyle}}>
      <section style={{ ...opacity }} className={inFoucs ? selectedBackClass : ""} >
        { groupTitle }
        <div>
          <WidgetList index={index} data={children} parentId={this.props.data.widgetId}
                      {...widgetListProps} { ...widgetSelectListProps } languagesJSON={languagesJSON}/>
        </div>
      </section>

      <div className={addBtn} >
        <ButtonDefaultWhite className={addGroupBtn} onClick={this.addGroupFn.bind(this, index)}>
          <Icon type="add"></Icon>
          {languagesJSON.addGroup}
        </ButtonDefaultWhite>
      </div>
      <PopDialog className="pop_dialog_delete" show={ showModal } type="delete" close={this.popClose} btns={pop_btn} data={{ index }}>
        <div className="pop_cont">
          <span>{languagesJSON.confirm_del_this_item}</span>
        </div>
      </PopDialog>
    </div>);
    return dragState?connectDragSource(connectDropTarget(_html)):_html;
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(ManageGroup));
