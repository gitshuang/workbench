import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { widgetList, widgetItem, title, file_context, title_left,
  file_icon, title_right, context, bottom ,footer,
title_cont,form_control,edit_cont,save_btn,close_btn,title_edit,pop_cont,edit_btn,editDele,clearfix} from './style.css'
import WidgetItem from './widgetItem';
import Checkbox from 'bee-checkbox';
import FormControl from 'bee-form-control';
import Button from 'bee-button';
import PopDialog from 'components/pop';
import Icon from 'components/icon';
import Icon1 from 'bee-icon';

import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {deleteFolder, renameFolder, setFolderEdit,selectListActions,selectGroupActions } = manageActions;

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

    if (draggedId !== props.id) {
      props.moveItemDrag(draggedId,previousParentId,preType, props.id, props.data.parentId, props.data.type);
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
    {
      namespace: 'manage',
    }
  ),
  {
    deleteFolder,
    renameFolder,
    setFolderEdit,selectListActions,selectGroupActions
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
  fileEdit = () =>{
    const { setFolderEdit, data } = this.props;
    setFolderEdit(data.widgetId);
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
      editShow:false
    });
    let data = {
      id: this.props.data.widgetId,
      value: this.state.value
    };
    const { renameFolder } = this.props;
    renameFolder(data);
  }

  close = (e) => {
      this.setState({
          value:this.props.data.widgetName,
          editShow:false
      });
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
        <FormControl className={form_control} value={this.state.value} onChange={this.inputOnChange}/>

        <div className={edit_btn}>
          <Button className={save_btn} onClick={this.save} >完成</Button>
          <Button className={close_btn} onClick={this.close} >取消</Button>
        </div>
    </div>;

    const btns = <div className={`${clearfix} ${footer}`}>
      <div>
        <Checkbox className="test" checked={checkType} onChange={ this.onHandChange } />
        </div>
      <div className={`${editDele} ${clearfix}`}>
        <div onClick={this.fileEdit}><Icon type="record" /></div>
        <div onClick={this.fileDele}><Icon type="dustbin" /></div>
      </div>
    </div>
    const { connectDragSource, connectDropTarget,isDragging } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <li className={widgetItem} style={{...opacity }} onClick={this.props.onClick}>
        <div className={title}>
          <div className={[title_left,file_icon].join(' ')}></div>
          <div className={title_right}> {da.widgetName} </div>
        </div>
        <div name="file" className={[context,file_context].join(' ')}>
          {/* { da.children.map((da,i) => (<div key={"file_1001"+i}></div>)).slice(0, 9) } */}
        </div>
        {this.state.editShow ? edit : null }
        {this.state.editShow ? null : btns }
        <PopDialog className="pop_dialog_delete" show = { this.state.showModal } data={da} btns={pop_btn} >
            <div className={pop_cont}>
              <Icon type="uf-exc-t" />
              <span>您确认要删除服务[{this.props.data.widgetName}]?</span>
            </div>
        </PopDialog>
      </li>
    ));
  }
}

//export default WidgeFileItem;
export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(WidgeFileItem));
