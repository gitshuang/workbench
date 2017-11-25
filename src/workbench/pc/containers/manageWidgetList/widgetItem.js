import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { Loading } from 'tinper-bee';
import Icon from 'bee-icon';
import Checkbox from 'bee-checkbox';
import PopDialog from 'components/pop';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {deleteFolder, renameFolder, setFolderEdit } = manageActions;
import {
  widgetItem,
  title,
  title_left,
  title_right,
  content,
  footer,
  pop_cont,
  widgetItemCont,
} from './style.css'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const type='item';

const itemSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};


const itemTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.moveItemDrag(draggedId, props.id, props.data.parentId);
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
    {
      namespace: 'manage',
    }
  ),
  {
    deleteFolder,
    renameFolder,
    setFolderEdit
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
    const { connectDragSource, connectDropTarget,isDragging } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <li className={widgetItem} style={{...widgetStyle[size],...style, opacity }} >
        <div className={title}>
          <div className={title_left}><Icon type="uf-add-c-o" /></div>
          <div className={title_right}>{widgetName}</div>
        </div>
        <div className={widgetItemCont}>
          
        </div>

        <div className={footer}>
          <div><Checkbox disabled className="test" /></div>
          <div onClick={this.fileEdit}><Icon type="uf-pencil" /></div>
          <div onClick={this.fileDele}><Icon type="uf-del" /></div>
        </div>

        <PopDialog show = { this.state.showModal } data={this.props.data} btns={pop_btn} >
            <div className={pop_cont}>
              <Icon type="uf-exc-t" />
              <span>您确认要删除服务此项?</span>
            </div>
        </PopDialog>

      </li>
    ));
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(WidgetItem));
