import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { widgetList, widgetItem, title, file_context, title_left,
  file_icon, title_right, context, bottom ,footer,
  title_cont,form_control,edit_cont,save_btn,close_btn,title_edit,pop_cont,edit_btn,editDele,clearfix,widgetFileItem,file_title_right,btn} from './style.css'
import WidgetItem from './widgetItem';
import Checkbox from 'bee/checkbox';
import FormControl from 'bee/form-control';
import Button from 'bee/button';
import PopDialog from 'pub-comp/pop';
import Icon from 'pub-comp/icon';
import {ButtonDefaultLine,ButtonCheckClose,ButtonCheckSelected} from 'pub-comp/button';

const type='item';
const itemSource = {
  beginDrag(props) {
    return { id: props.id , parentId:props.parentId,type:props.preType || props.type};
  },
  // endDrag(props, monitor){
  //   var timeEnough = new Date().getTime() - timestamp > 1500
  //   return {timeEnough}
  // }
};


const itemTarget = {

  drop(props, monitor,component) {
    const ifIntoFile = props.moveLine;
    const draggedId = monitor.getItem().id;
    const previousParentId = monitor.getItem().parentId;
    const preType = monitor.getItem().type;
    const preFolderType = monitor.getItem().folderType;
    //添加大于1.5s的标记 判断是否拖入文件夹里面
    const timeFlag = ifIntoFile=='center'//||(new Date().getTime() - timestamp > 1500);
    if (draggedId !== props.id && preFolderType!=="folder" && preType !==1) {
      props.moveItemDrag(draggedId,previousParentId,preType, props.id, props.data.parentId, props.data.type,ifIntoFile,timeFlag,props.data);
    }
    // return { moveLine: timeFlag }
  },
  // canDrop(props,monitor){
  //   const draggedId = monitor.getItem().id;
  //   const previousParentId = monitor.getItem().parentId;
  //   const preType = monitor.getItem().type;
  //   const preFolderType = monitor.getItem().folderType;
  //   return (draggedId !== props.id && preType!==2)
  // },
  hover(props, monitor, component){
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();
    var xGap = componentRect.left-clientOffset.x;
    var yGap = componentRect.top-clientOffset.y;
    const dirDistance = 176;
    var moveLine = 'none'
    if(Math.abs(xGap)<dirDistance){
      if(Math.abs(xGap)<(dirDistance/3)){
        moveLine = 'left'
      }else if(Math.abs(xGap)<(dirDistance/3*2)){
        moveLine = 'center'
      }else{
        moveLine = 'right'
      }
    }
    if(new Date().getTime() % 10 == 0){
      props.savePosition(props.id,moveLine);
    }
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // offSet:monitor.getClientOffset(),
  };
}

function collectTaget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver:monitor.isOver(),
    canDrop:monitor.canDrop(),
    getItemType:monitor.getItem(),
    offSet:monitor.getDifferenceFromInitialOffset(),
    offSet2:monitor.getClientOffset(),
  }
}


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
      showModal:false,
      timer:0,
      timeEnough:false,
      position:{},
      moveLine:'none',
    }
  }
  componentDidMount(){
    var position =  findDOMNode(this).getBoundingClientRect();
    this.setState({
      position :{
        x:position.x,
        y:position.y,
      }
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.curEditFolderId !== this.props.data.widgetId){
      this.setState({
        editShow:false
      })
    }
    if( nextProps.isOver == true){
      var position =  findDOMNode(this).getBoundingClientRect();
      this.setState({
        position :{
          x:position.x,
          y:position.y,
        }
      })
    }
    var { canDrop, isDragging , isOver ,getItemType} = this.props;
   
    if( nextProps.isOver == true && nextProps.moveLine !== 'none' ){
        if(nextProps.moveLine == 'left'){
          this.setState({
            moveLine : 'left',
            timeEnough : false
          })
        }else if(nextProps.moveLine == 'center'){
          this.setState({
            timeEnough : true
          })
          if(getItemType.type == 2||getItemType.folderType=="folder"){
            this.setState({
              moveLine : 'none',
              timeEnough : false,
            })
          }
        }else{
          this.setState({
            moveLine : 'right',
            timeEnough : false
          })
        }
        if(getItemType.dragType =='dragInFolder'){
          this.setState({
            moveLine : 'none',
            timeEnough : false,
          })
        }
        if(getItemType.type === 1){
          this.setState({
            moveLine : 'none',
            timeEnough : false,
          })
        }
    }else{
      this.setState({
        moveLine : 'none',
        timeEnough : false,
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
  //输入框聚焦更改背景颜色
  handleFocus = ()=>{
    const { setDragInputState,dragState } = this.props;
    if(!dragState)return;
    setDragInputState(false);
  }
  // 输入框失焦
  handleBlur = () => {
    const { setDragInputState,dragState } = this.props;
    if(dragState)return;
    setDragInputState(true);
  }

  render() {

    const da = this.props.data;
    const id = da.widgetId;
    const {selectList,dragState,languagesJSON} = this.props;
    const checkType = selectList.indexOf(id) > -1 ? true : false;
    const pop_btn = [
      {label:languagesJSON.confirm,fun:this.popSave,className:""},
      {label:languagesJSON.cancel,fun:this.popClose,className:""}
    ]   //设置操作按钮

    const edit = <div className={edit_cont}>
      <FormControl className={`${form_control} input`} value={this.state.value} onChange={this.inputOnChange} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
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
        <div onClick={this.fileEdit}><Icon title={languagesJSON.rename_folder} type="record" /></div>
        <div onClick={()=>{this.popSave(da)}}><Icon title={languagesJSON.delete_folder} type="dustbin" /></div>
      </div>
    </div>
    const { connectDragSource, connectDropTarget,isDragging,drag,isOver,canDrop,offSet,offSet2} = this.props;
    const { position } = this.state;
    const opacity = isDragging ? 0 : 1;
    var styleOver={},styleOverLine={};
    if (isDragging) {
      // return null
    }
    // ${isDragging ? 'rollOut':'slideInRight'}
    if(isOver && canDrop ){
      if(this.state.timeEnough){
        styleOver = {
          'opacity':'0.7',
          'boxShadow': '0 0 0 5px #ddd,0 0 0 8px rgba(0,205,195,1)',
          'transform': 'scale(1.01,1.01)',
        }
      }
    
      if(this.state.moveLine !=='none'  ){
        if( this.state.moveLine == 'left' ){
          styleOverLine = {
            'transform': 'scale(1,1)',
            'boxShadow' :'-3px 0 0 0 #ddd,-6px 0 0 0 rgba(0,205,195,1)',
            'borderRadius':'0',
          }
        }
        if( this.state.moveLine == 'right' ){
          styleOverLine = {
            'transform': 'scale(1,1)',
            'boxShadow' :'3px 0 0 0 #ddd,6px 0 0 0 rgba(0,205,195,1)',
            'borderRadius':'0',
          }
        }
      }else{
        styleOverLine = {
          'transform': 'scale(1,1)',
          'boxShadow' :'0 0 0 0 #ddd,0 0 0 0 #ddd',
        }
      }
    }
    var { folderBgSrc } = this.props;
    var pngImport = {  backgroundImage: `url("${folderBgSrc}")`,'backgroundRepeat':'no-repeat'}
    let _html = (
      <li name="file" className={`${widgetItem} ${widgetFileItem} animated ${isDragging ? 'zoomOut':'zoomIn'} ${drag} `} style={{...opacity,...styleOverLine,...styleOver,...pngImport}} onClick={this.props.onClick}>
        <div className={title}>
          {/* <div className={[title_left,file_icon].join(' ')}></div> */}
          <div className={`${title_right} ${file_title_right}`}> {da.widgetName} </div>
        </div>
        {/*<div name="file" className={[context,file_context].join(' ')}>
         { da.children.map((da,i) => (<div key={"file_1001"+i}></div>)).slice(0, 9) }
         </div> */}
        {this.props.currEditonlyId == id ? edit : null }
        {this.props.currEditonlyId==id ? null : btns }

        <PopDialog className="pop_dialog_delete" show = { this.state.showModal } type="delete" close={this.popClose} data={da} btns={pop_btn} >
          <div className="pop_cont">
            {/*<span>您确认要删除服务[{this.props.data.widgetName}]?</span>*/}
            <span>{languagesJSON.confirm_delete_service}[{this.props.data.widgetName}]?</span>
          </div>
        </PopDialog>
      </li>
    );
    return dragState?connectDragSource(connectDropTarget(_html)):_html;
  }
}

//export default WidgeFileItem;
export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(WidgeFileItem));
