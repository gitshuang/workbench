import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import update from 'react/lib/update';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import Button from 'bee/button';
import { widgetList, widgetItem, title, file_context, title_left,
  file_icon, title_right, context, bottom ,footer,clearfix,addModule,pop_dialog_widge_list} from './style.css'
import WidgetItem from './widgetItem';
import WidgeFileItem from './widgeFileItem';
import PopDialog from 'pub-comp/pop';
import SelectWidgetList from 'containers/manageSelectWidgetList';

import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {deleteFolder, renameFolder, setFolderEdit,moveService, openFolder,addFolder,closeFolder,setCurrGroupIndex,editTitle } = manageActions;
const {requestStart, requestSuccess, requestError, } = rootActions;

@connect(
  mapStateToProps(
    'manageList',
    'curEditFolderId',
    'drag',
    {
      namespace: 'manage',
    }
  ),
  {
    openFolder,
    deleteFolder,
    renameFolder,
    setFolderEdit,
    moveService,
    addFolder,
    closeFolder,
    setCurrGroupIndex,
    editTitle,
  }
)
class WidgetList extends Component {

    //TUDO 数据中的 size ： sm 、lg、xg （小[标准]、中、大）

    // static propTypes = {
    //     widgeList: PropTypes.array.isRequired,
    // }
    constructor(props) {
      super(props);
      this.state = {
        showModal:false,
        moveLine:'none',
        checkId:'',
      }
    }

  // 添加文件夹
  addFolderFn = (data)=> {
    const { addFolder } = this.props;
    const index = {groupIndex:data};
    addFolder(index);
  }

  openSelectWidget = ()=> {
      this.setState({
        showModal:true
      })
  }
  savePosition = (id,moveLine) => {
    this.setState({
      checkId:id,
      moveLine,
    })
  }
  moveLine = (id,moveLinePara)=>{
    if(id == this.state.checkId){
      return moveLinePara;
    }else{
      return 'none'
    }
  }
  moveItemDrag = (id,preParentId, preType,afterId,parentId,afterType,ifIntoFile,timeFlag,dataFolder) => {
    let data = {id,preParentId,preType,afterId,parentId,afterType,ifIntoFile,timeFlag,dataFolder}
    const { moveService,openFolder } = this.props;
    moveService(data);
    preType === 3 && afterType === 2 && timeFlag && dataFolder && openFolder(dataFolder);
  }
  addFolderDrag = (groupIndex,id,preParentId, preType,afterId,parentId,afterType) => {
    let data = {groupIndex,id,preParentId, preType,afterId,parentId,afterType}
    const { addFolder } = this.props;
    addFolder(data);
  }
  editTitle = (id,name) => {
    let data = {id,name}
    const { editTitle } = this.props;
    editTitle(data);
  }

  widgeOnclick = (e,da) => {
    const {index,setCurrGroupIndex} = this.props;
    setCurrGroupIndex(index);
    if(e.target.getAttribute("name") == "file"){
      this.props.openFolder(da);
    }

  }

  popSave = (data)=>{

  }

  popClose = ()=>{
      this.setState({
        showModal:false
      })
  }

  render() {

      const { data,index,drag } = this.props;
      // const pop_btn = [
      //   {label:"确认",fun:this.popSave,className:""},
      //   {label:"取消",fun:this.popClose,className:""}
      // ]   //设置操作按钮

      // const { data } = this.props;

      const list = data.map((item, i) => {
        const {
          type,
          parentId,
          widgetId: id,
          widgetName: name,
        } = item;
        switch (type) {
          case 2:
            return (
              <WidgeFileItem
                key={`widget-file-${id}-${i}`}
                data={item}
                id={id}
                parentId={parentId}
                index={id}
                drag={drag}
                propsIndex={index}
                type={type}
                savePosition = {this.savePosition}
                moveLine = {this.moveLine(id,this.state.moveLine)}
                moveItemDrag={this.moveItemDrag}
                editTitle={this.editTitle}
                onClick={(e)=>{this.widgeOnclick(e,item)}}
              />
            );
          default:
            return (
              <WidgetItem
                ref={id}
                drag={drag}
                key={`widget-${id}-${i}`}
                data={item}
                id={id}
                parentId={parentId}
                index={id}
                propsIndex={index}
                type={type}
                savePosition = {this.savePosition}
                moveLine = {this.moveLine(id,this.state.moveLine)}
                moveItemDrag={this.moveItemDrag}
                editTitle={this.editTitle}
                addFolderDrag={this.addFolderDrag}
              />
            );
        }
      })

    let _da = {};
    // let _parentId = "";
    // if(this.props.data.length != 0){
    //   _parentId = this.props.data[0].parentId;
    //   console.log("this.props.data[0].parentId ---- " + this.props.data[0].parentId );
    // }

    return (<ul className={`${widgetList} ${clearfix}`} >
        {list}
        <div className={addModule} onClick={this.openSelectWidget} >
          <Icon title="添加快捷方式至首页" type="add"  />
        </div>

        <PopDialog className={pop_dialog_widge_list} type="info" title="添加快捷方式至首页" close={this.popClose} backdrop={false} show = { this.state.showModal } data={_da} >
            <SelectWidgetList close={this.popClose} parentId={this.props.parentId} />
        </PopDialog>

      </ul>);
  }
}

export default WidgetList;