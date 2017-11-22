import React, { Component } from 'react';
import { connect } from 'react-redux';


import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import manageActions from 'store/root/manage/actions';

import Icon from 'components/icon';
import WidgetArea from 'components/widgetArea';
import {WidgetTitle} from './style.css';
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
  moveGroup
} = manageActions;

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const type='group';

const itemSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

const itemTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.moveItem(draggedId, props.id);
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
    'workList',
    {'namespace':'manage'}
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    addGroup,
    delectGroup,
    renameGroup,
    moveGroup
  }
)



class ManageGroup extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    //text: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      manageData: [],  // 可直接更改加工的渲染页面的list   actions中worklist为最后提交的
      groupName:  "",
      editFlag: false
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps){

  }

  // 打开编辑分组形态
  openRenameGroupFn =(index) =>{
    this.setState({
      editFlag: true
    })
  }
  // 点击取消编辑分组按钮
  renameGroupCancel = (index) =>{
    this.setState({
      editFlag: false,
      groupName:""
    })
  }
  // 点击按钮执行 action   重新构造
  renameGroupFn =(index) =>{
    const { renameGroup } = this.props;
    let groupName = this.state.groupName;
    let param = {
      index: index,
      name: groupName
    }
    renameGroup(param);
    this.renameGroupCancel(index);
  }
  // 输入框的更改
  editGroupName = (e) =>{
    this.setState({
      groupName: e.target.value
    })
  }


  delectGroupFn =(index) =>{
    const { delectGroup } = this.props;
    delectGroup(index);
  }

  addGroupFn =(index) =>{
    const { addGroup } = this.props;
    addGroup(index);
  }
  addFolderFn = ()=> {

  }
  moveGroupFn =() => {

  }


  render() {
    const { manageData,index,connectDragSource, connectDropTarget,isDragging } = this.props;
    const opacity = isDragging ? 0 : 1;
    let _id = manageData.id + "_" + index;
    let groupTitle = null;
    if(this.state.editFlag) {
      groupTitle = <div className={WidgetTitle + ' um-box-justify'}>
        <div>
          <input type="text" value={this.state.groupName} onChange={(e) => {this.editGroupName(e)} }/>
          <button className="btn btn-inline" onClick={ ()=>{this.renameGroupFn(index)} }>完成</button>
          <button className="btn btn-inline" onClick={ ()=>{this.renameGroupCancel(index)} }>取消</button>
        </div>
      </div>;
    }else {
      groupTitle = <div className={WidgetTitle + ' um-box-justify'}>
        <h6>{manageData.name}</h6>
        <div>
          <Icon type="dingzhi" onClick={ ()=>{this.openRenameGroupFn(index)} }/>
          <Icon type="momozhushou" onClick={ ()=>{this.delectGroupFn(index)} }/>
          <Icon type="add" onClick={this.addFolderFn}/>
        </div>
      </div>;
    }
    return connectDragSource(connectDropTarget(
      <div key={index} id={_id} style={{ ...style, opacity }}>
        { groupTitle }
        <div>
          <WidgetArea data={manageData.widgeList} />
        </div>
        <div>
          <button className="btn" onClick={()=>{this.addGroupFn(index)}}>添加分组</button>
        </div>
      </div>
    ));
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(ManageGroup));
