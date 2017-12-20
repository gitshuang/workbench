import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { Loading } from 'tinper-bee';
import Icon from 'components/icon';
import BeeIcon from 'bee-icon';
import Checkbox from 'bee-checkbox';
import PopDialog from 'components/pop';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {deleteFolder,delectServe, renameFolder,addFolder, setFolderEdit,selectListActions,selectGroupActions } = manageActions;
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
    return { id: props.id , parentId:props.parentId,type:props.preType || props.type,folderType:props.folderType,dragType:props.dragType};
  },

  endDrag(props, monitor, component){
    return monitor.getDifferenceFromInitialOffset();
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
  },
  drop(props, monitor,component) {
    const draggedId = monitor.getItem().id;
    const previousParentId = monitor.getItem().parentId;
    const preType = monitor.getItem().type;
    const preFolderType = monitor.getItem().folderType;
    const dragType = monitor.getItem().dragType;

    if (draggedId !== props.id && preType !==1  && ((preFolderType!=="folder" && props.folderType!=="folder") || (dragType==="dragInFolder" && props.dragType==="dragInFolder"))) {
      let timeOut = (new Date().getTime() - timestamp > 1500);
      if(timeOut && preType === 3 && props.data.type === 3){
        //放上去停留大于2s创建文件夹
        props.addFolderDrag("",draggedId,previousParentId,preType, props.id, props.data.parentId, props.data.type,timeOut);
      }else {
        props.moveItemDrag(draggedId,previousParentId,preType, props.id, props.data.parentId, props.data.type);
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


@connect(
  mapStateToProps(
    'manageList',
    'curEditFolderId',
    'selectList',
    'selectGroup',
    'currGroupIndex',
    'title',
    'drag',
    {
      namespace: 'manage',
    }
  ),
  {
    deleteFolder,
    renameFolder,
    setFolderEdit,
    selectListActions,selectGroupActions,
    addFolder,
    delectServe
  }
)
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
    }
  }


  popSave = (data)=>{
    const { deleteFolder,type,currGroupIndex,delectServe,parentId } = this.props;
    if(type === "pop"){
     delectServe({index:currGroupIndex,folder:parentId,widgetId:data.widgetId});
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
    const {title} = this.state;
    return connectDragSource(connectDropTarget(
      <li title={title} className={`${widgetItem} ${widget_node} animated ${isDragging ? 'zoomOut':'zoomIn'} ${drag}` } style={{...widgetStyle[size - 1],...opacity }} >
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
              <BeeIcon type="uf-exc-t" className="icon"/>
              <span>您确认要删除此项服务?</span>
            </div>
        </PopDialog>

      </li>
    ));
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(WidgetItem));
