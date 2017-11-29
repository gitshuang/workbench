import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { Loading } from 'tinper-bee';
import Icon from 'components/icon';
import Icon1 from 'bee-icon';
import Checkbox from 'bee-checkbox';
import PopDialog from 'components/pop';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {deleteFolder, renameFolder,addFolder, setFolderEdit,selectListActions,selectGroupActions } = manageActions;
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
  clearfix
} from './style.css'

const type='item';

const itemSource = {
  beginDrag(props) {
    timestamp=new Date().getTime();
    return { id: props.id , parentId:props.parentId,type:props.preType || props.type};
  },

  endDrag(props, monitor, component){
    return monitor.getClientOffset();
  }
};


const itemTarget = {
  //hover 悬浮调用 drop落在目标上时调用
  hover(props, monitor){

  },
  drop(props, monitor) {
    const draggedId = monitor.getItem().id;
    const previousParentId = monitor.getItem().parentId;
    const preType = monitor.getItem().type;

    if (draggedId !== props.id) {
      if(new Date().getTime() - timestamp > 1500 && preType === 3 && props.data.type === 3){
        //放上去停留大于1.5s添加文件夹
        props.addFolderDrag("",draggedId,previousParentId,preType, props.id, props.data.parentId, props.data.type);
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
    {
      namespace: 'manage',
    }
  ),
  {
    deleteFolder,
    renameFolder,
    setFolderEdit,
    selectListActions,selectGroupActions,
    addFolder
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
      showModal:false
    }
  }


  popSave = (data)=>{
    // this.state.data
    const { deleteFolder } = this.props;
    deleteFolder(data.widgetId);
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
    const { connectDragSource, connectDropTarget,isDragging,selectList } = this.props;
    const opacity = isDragging ? 0 : 1;
    const checkType = selectList.indexOf(id) > -1 ? true : false;
    return connectDragSource(connectDropTarget(
      <li className={widgetItem} style={{...widgetStyle[size],...opacity }} >
        <div className={title}>
          <div className={title_right}>{widgetName}</div>
        </div>
        <div className={widgetItemCont}>

        </div>

        <div className={`${clearfix} ${footer}`}>
          <div><Checkbox className="test" checked={checkType} onChange={ this.onHandChange }/></div>
          <div className={`${editDele} ${clearfix}`}>
            <div onClick={this.fileDele}><Icon type="dustbin" /></div>
          </div>
        </div>

        <PopDialog className="pop_dialog_delete" show = { this.state.showModal } data={this.props.data} btns={pop_btn} >
            <div className={pop_cont}>
              <Icon1 type="uf-exc-t" />
              <span>您确认要删除服务此项?</span>
            </div>
        </PopDialog>

      </li>
    ));
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(WidgetItem));
