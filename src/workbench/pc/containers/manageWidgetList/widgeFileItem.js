import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { widgetList, widgetItem, title, file_context, title_left,
  file_icon, title_right, context, bottom ,footer,
  title_cont,form_control,edit_cont,save_btn,close_btn,title_edit,pop_cont,edit_btn,editDele,clearfix,widgetFileItem,file_title_right,file_num,btn} from './style.css'
import WidgetItem from './widgetItem';
import Checkbox from 'bee-checkbox';
import FormControl from 'bee-form-control';
import Button from 'bee-button';
import PopDialog from 'components/pop';
import Icon from 'components/icon';
import BeeIcon from 'bee-icon';
import {ButtonDefaultLine,ButtonCheckClose,ButtonCheckSelected} from 'components/button';

import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {deleteFolder, renameFolder, setFolderEdit,selectListActions,selectGroupActions,cancelFolderEdit,openFolder,setEditonlyId } = manageActions;

const type='item';

const itemSource = {
  beginDrag(props) {
    return { id: props.id , parentId:props.parentId,type:props.preType || props.type};
  }
};


const itemTarget = {
  drop(props, monitor) {
    const draggedId = monitor.getItem().id;
    const previousParentId = monitor.getItem().parentId;
    const preType = monitor.getItem().type;
    const preFolderType = monitor.getItem().folderType;

    //添加大于1.5s的标记 判断是否拖入文件夹里面
    const timeFlag = (new Date().getTime() - timestamp > 1500);
    if (draggedId !== props.id && preFolderType!=="folder") {
      props.moveItemDrag(draggedId,previousParentId,preType, props.id, props.data.parentId, props.data.type,timeFlag,props.data);
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
    'curEditFolderId',
    'selectList',
    'selectGroup',
    'currEditonlyId',
    'drag',
    {
      namespace: 'manage',
    }
  ),
  {
    deleteFolder,
    renameFolder,
    setFolderEdit,selectListActions,selectGroupActions,
    cancelFolderEdit,
    openFolder,
    setEditonlyId
  }
)
class WidgeFileItem extends Component {

  constructor(props) {
    super(props);

    this.popSave = this.popSave.bind(this);
    this.popClose = this.popClose.bind(this);
    let ed = true;
    if(props.curEditFolderId){
      ed = true;
    }else{
      ed = false;
    }

    this.state = {
      value:props.data.widgetName,
      editShow: ed,
      showModal:false
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.curEditFolderId !== this.props.data.widgetId){
      this.setState({
        editShow:false
      })
    }
  }
  //点击文件夹编辑按钮
  fileEdit = (e) =>{
    e.stopPropagation();
    const { setFolderEdit, data, setEditonlyId } = this.props;
    setFolderEdit(data.widgetId);
    setEditonlyId(data.widgetId);
    this.setState({
      editShow:true
    })
  }

  //输入框修改data数据源
  inputOnChange = (e) => {
    this.setState({
      value:e
    });
  }

  fileDele = () =>{
    this.setState({
      showModal:true
    })
  }

  save = (e) => {
    //TODO 此处最好只处理一次即可。setState
    this.setState({
      editShow:false,
    });
    let data = {
      id: this.props.data.widgetId,
      value: this.state.value
    };
    const { renameFolder,setEditonlyId } = this.props;
    renameFolder(data);
    setEditonlyId("");
  }

  close = (e) => {
    const { cancelFolderEdit,setEditonlyId } = this.props;
    cancelFolderEdit(this.props.data.widgetId);
    this.setState({
      value:this.props.data.widgetName,
      editShow:false
    });
    setEditonlyId("");
  }

  popSave = (data)=>{
    // this.state.data
    const { deleteFolder } = this.props;
    deleteFolder(data.widgetId);
  }

  popClose = ()=>{
    this.setState({
      showModal:false
    })
  }
  isContained =(a, b)=>{
    if(!(a instanceof Array) || !(b instanceof Array)) return false;
    if(a.length < b.length) return false;
    var aStr = a.toString();
    for(var i = 0, len = b.length; i < len; i++){
      if(aStr.indexOf(b[i]) == -1) return false;
    }
    return true;
  }
  onHandChange =(flag) =>{
    const {selectList,selectGroup,selectListActions,selectGroupActions,propsIndex,manageList} = this.props;
    const {
      data: {
        widgetId
        }
      } = this.props;
    console.log(flag);
    let selectList2;
    if(!flag){
      selectList2 = selectList.filter((item,i) => {
        return item !== widgetId;
      });
      const selectGroup2 =  selectGroup.filter((item,i) => {
        return propsIndex !== item;
      });
      selectGroupActions(selectGroup2);
    }else{
      selectList2 = [widgetId, ...selectList];
      // 判断当前分组下的子节点是否都在selectList中
      let newArr = manageList[propsIndex].children.map((item,index)=>{
        return item.widgetId;
      })
      if(this.isContained(selectList2,newArr)){
        selectGroup.push(propsIndex);
        selectGroupActions(selectGroup);
      }
    }
    selectListActions(selectList2);
  }

  render() {

    const da = this.props.data;
    const id = da.widgetId;
    const {selectList} = this.props;
    const checkType = selectList.indexOf(id) > -1 ? true : false;
    const pop_btn = [
      {label:"确认",fun:this.popSave,className:""},
      {label:"取消",fun:this.popClose,className:""}
    ]   //设置操作按钮

    const edit = <div className={edit_cont}>
      <FormControl className={`${form_control} input`} value={this.state.value} onChange={this.inputOnChange}/>

      <ButtonCheckSelected className={btn} onClick={this.save}><Icon type="right"></Icon></ButtonCheckSelected>
      <ButtonCheckClose className={btn} onClick={this.close}>
        <Icon type="cancel"></Icon>
      </ButtonCheckClose>
    </div>;

    const btns = <div className={`${clearfix} ${footer}`}>
      <div>
        <Checkbox className="test" size="sm" checked={checkType} onChange={ this.onHandChange } />
      </div>
      <div className={`${editDele} ${clearfix}`}>
        <div onClick={this.fileEdit}><Icon title="重命名文件夹" type="record" /></div>
        <div onClick={()=>{this.popSave(da)}}><Icon title="删除文件夹" type="dustbin" /></div>
      </div>
    </div>
    const { connectDragSource, connectDropTarget,isDragging,drag } = this.props;
    const opacity = isDragging ? 0 : 1;
    if (isDragging) {
      //return null
    }
    // ${isDragging ? 'rollOut':'slideInRight'}
    return connectDragSource(connectDropTarget(
      <li name="file" className={`${widgetItem} ${widgetFileItem} animated ${isDragging ? 'zoomOut':'zoomIn'} ${drag} `} style={{...opacity }} onClick={this.props.onClick}>
        <div className={title}>
          <div className={[title_left,file_icon].join(' ')}></div>
          <div className={`${title_right} ${file_title_right}`}> {da.widgetName} </div>
        </div>
        {/*<div name="file" className={[context,file_context].join(' ')}>
         { da.children.map((da,i) => (<div key={"file_1001"+i}></div>)).slice(0, 9) }
         </div> */}
        {this.props.currEditonlyId == id ? edit : null }
        {this.props.currEditonlyId==id ? null : btns }

        {/*<div className={file_num}>
         (3)
         </div>*/}
        <PopDialog className="pop_dialog_delete" show = { this.state.showModal } type="delete" close={this.popClose} data={da} btns={pop_btn} >
          <div className="pop_cont">
            <BeeIcon type="uf-exc-t" className="icon"/>
            <span>您确认要删除服务[{this.props.data.widgetName}]?</span>
          </div>
        </PopDialog>
      </li>
    ));
  }
}

//export default WidgeFileItem;
export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(WidgeFileItem));
