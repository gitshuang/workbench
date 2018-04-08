import React, {Component} from 'react';
import { findDOMNode } from 'react-dom'
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import Checkbox from 'bee/checkbox';
import PopDialog from 'pub-comp/pop';

import {
  widgetItem,
  title,
  title_left,
  title_right,
  content,
  footer,
  pop_cont,
  widgetItemCont,
  editDele,
  clearfix,
  widget_node
} from './style.css'

const type='item';
var timestamp;
const itemSource = {
  beginDrag(props, monitor, component) {
    //let diffOffset = monitor.getDifferenceFromInitialOffset();
    // props.editTitle(props.id,props.data.widgetName);
    timestamp=new Date().getTime();
    window.timestamp = timestamp;
    return { id: props.id , parentId:props.parentId,type:props.preType || props.type,folderType:props.folderType,dragType:props.dragType,props:props};
  },
  endDrag(props, monitor, component){
    return {offSetItem:monitor.getDifferenceFromInitialOffset()}
  }
};
const itemTarget = {
  //hover 悬浮调用 drop落在目标上时调用
  hover(props, monitor,component){
    const draggedId = monitor.getItem().id;
    const previousParentId = monitor.getItem().parentId;
    const preType = monitor.getItem().type;
    let targetId = props.id;
    let timeFlag=new Date().getTime();
    if (draggedId !== props.id){
      component.setState({
        drag:'fadeInLeft'
      });
      //let diff = monitor.getDifferenceFromInitialOffset();
      if(timeFlag - timestamp <100){
        //console.log(timeFlag - timeFlag);
        //props.editTitle(props.id,props.data.widgetName);
      }
    }
    const clientOffset = monitor.getClientOffset();
    var componentRect = 0;
    if(component){
      componentRect = findDOMNode(component).getBoundingClientRect();
    }
    // const componentRect = findDOMNode(component).getBoundingClientRect();
    var xGap = componentRect.left-clientOffset.x;
    var yGap = componentRect.top-clientOffset.y;
    var moveLine = 'none'
    if(Math.abs(xGap)<180){
      if(Math.abs(xGap)<60){
        moveLine = 'left'
      }else if(Math.abs(xGap)<120){
        moveLine = 'center'
      }else{
        moveLine = 'right'
      }
    }
    if(new Date().getTime() % 10 == 0){
      props.savePosition(props.id,moveLine);
    }


  },
  drop(props, monitor,component) {
    const ifIntoFile = props.moveLine;
    const draggedId = monitor.getItem().id;
    const previousParentId = monitor.getItem().parentId;
    const preType = monitor.getItem().type;
    const preFolderType = monitor.getItem().folderType;
    const dragType = monitor.getItem().dragType;

    if (draggedId !== props.id && preType !==1  && ((preFolderType!=="folder" && props.folderType!=="folder") || (dragType==="dragInFolder" && props.dragType =="dragInFolder"))) {
      let timeOut = ifIntoFile=='center'//||(new Date().getTime() - timestamp > 1500);
      if(timeOut && preType === 3 && props.data.type === 3 && preFolderType!=="folder"){
        //放上去停留大于2s创建文件夹
        props.addFolderDrag("",draggedId,previousParentId,preType, props.id, props.data.parentId, props.data.type,timeOut);
      }else {
        props.moveItemDrag(draggedId,previousParentId,preType, props.id, props.data.parentId, props.data.type,ifIntoFile);
      }
    }
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}


function collectTaget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver:monitor.isOver(),
    canDrop:monitor.canDrop(),
    offSet:monitor.getDifferenceFromInitialOffset(),
    getItemType:monitor.getItem(),
  }
}

function getItemStyles() {
  return{
    pointerEvents: 'none',
    background:'red',
  }
}

const widgetStyle = [
  // 小
  {
    width: 176
  },
  // 中
  {
    width: 360
  },
  // 大
  {
    width: 360,
    height: 360
  }
];



class WidgetItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    // index: PropTypes.any.isRequired,
    isDragging: PropTypes.bool.isRequired,
    // id: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);


    this.popSave = this.popSave.bind(this);
    this.popClose = this.popClose.bind(this);

    this.state = {
      showModal:false,
      title:'',
      timer:0,
      timeEnough:false,
      moveLine:'none',
    }
  }

  // shouldComponentUpdate(nextProps,nextState){
  //   if( nextProps.isOver && this.props.moveLine === nextProps.moveLine){
  //     return false
  //   }
  //   return true
  // }
  componentWillReceiveProps(nextProps){
    var { canDrop, isDragging , isOver,getItemType,dragType} = this.props;
    // if( nextProps.isOver == true ){
    //   var timer = setTimeout(()=>{
    //     this.setState({
    //       timeEnough:true,
    //     })
    //   },1500)
    //   this.setState({
    //     timer 
    //   })
    // }else{
    //   clearTimeout(this.state.timer);
    //   this.setState({
    //     timer: 0,
    //     timeEnough:false,
    //   })
    // }
    /*
    */
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
        if(getItemType.type == 2 ||getItemType.dragType =='dragInFolder'){
          this.setState({
            moveLine : 'none',
            timeEnough : false,
          })
        }
      }else{
        this.setState({
          moveLine : 'right',
          timeEnough : false,
        })
      }
      if( getItemType.dragType =='dragInFolder' && !dragType){
        this.setState({
          moveLine : 'none',
          timeEnough : false,
        })
      }
      if(getItemType.type ===1){
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

  popSave = (data)=>{
    const { deleteFolder,type,currGroupIndex,delectService,parentId } = this.props;
    if(type === "pop"){
     delectService({index:currGroupIndex,folder:parentId,widgetId:data.widgetId});
    }else{
      deleteFolder(data.widgetId);
    }
    this.setState({
        showModal:false
    })
  }

  popClose = ()=>{
      this.setState({
        showModal:false
      })
  }

  fileDele = () =>{
    this.setState({
      showModal:true
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

  render() {
    const pop_btn = [
      {label:"确认",fun:this.popSave,className:""},
      {label:"取消",fun:this.popClose,className:""}
    ]   //设置操作按钮

    const {
      data: {
        widgetId: id,
        size,
        widgetName,
      }
    } = this.props;
    const { connectDragSource, connectDropTarget,isDragging,selectList,drag } = this.props;
    const opacity = isDragging ? 0 : 1;
    const checkType = selectList.indexOf(id) > -1 ? true : false;
    if (isDragging) {
      // return null
    }
    const { isOver, canDrop,offSet } = this.props;
    var styleOverLine={},styleOver={};

    if(isOver && canDrop){
      if(this.state.timeEnough){
        styleOver = {
          'opacity':'0.7',
          'boxShadow': '0 0 0 5px #ddd,0 0 0 8px rgba(0,205,195,1)',
          'transform': 'scale(1.01,1.01)',
          'borderRadius':'0',
        }
      }
      // if(offSet){
      //   var styleOverLine = {
      //     'transform': 'scale(1,1)',
      //     'boxShadow' :'5px 0 0 0 #ddd,8px 0 0 0 #fff',
      //   }
      //   if(offSet.x <0){
      //     var styleOverLine = {
      //       'transform': 'scale(1,1)',
      //       'boxShadow' :'-5px 0 0 0 #ddd,-8px 0 0 0 #fff',
      //     }
      //   }
        // if(offSet.x>0){
        //   var styleOverLine = {
        //     'transform': 'scale(1,1)',
        //     'boxShadow' :'5px 0 0 0 #ddd,8px 0 0 0 #fff',
        //   }
        // }
      // }
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
    const {title} = this.state;
    return connectDragSource(connectDropTarget(
      <li title={title} className={`${widgetItem} ${widget_node} animated ${isDragging ? 'zoomOut':'zoomIn'} ${drag}` } style={{...widgetStyle[size - 1],...opacity,...styleOverLine,...styleOver }} >
        <div className={title}>
          <div className={title_right}>{widgetName}</div>
        </div>
        <div className={widgetItemCont}>

        </div>

        <div className={`${clearfix} ${footer}`}>
          {this.props.type == "pop"?null:<Checkbox className="test" checked={checkType} onChange={ this.onHandChange } />}
          <div className={`${editDele} ${clearfix}`}>
            <div onClick={()=>{this.popSave(this.props.data)}}><Icon title="删除服务" type="dustbin" /></div>
          </div>
        </div>

        <PopDialog className="pop_dialog_delete" show = { this.state.showModal } type="delete" close={this.popClose} data={this.props.data} btns={pop_btn} >
            <div className="pop_cont">
              <span>您确认要删除此项服务?</span>
            </div>
        </PopDialog>

      </li>
    ));
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(WidgetItem));
