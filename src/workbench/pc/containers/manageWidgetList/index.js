import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import update from 'react/lib/update';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Button from 'bee-button';
import Popconfirm from 'bee-popconfirm';
import { widgetList, widgetItem, title, file_context, title_left,
  file_icon, title_right, context, bottom ,footer,clearfix,addModule,pop_dialog_widge_list} from './style.css'
import WidgetItem from './widgetItem';
import WidgeFileItem from './widgeFileItem';
import Checkbox from 'bee-checkbox';
import PopDialog from 'components/pop';
import SelectWidgetList from 'containers/manageSelectWidgetList';

import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {deleteFolder, renameFolder, setFolderEdit,moveServe, openFolder,addFolder,closeFolder,setCurrGroupIndex } = manageActions;
const {requestStart, requestSuccess, requestError, } = rootActions;

@connect(
  mapStateToProps(
    'manageList',
    'curEditFolderId',
    {
      namespace: 'manage',
    }
  ),
  {
    openFolder,
    deleteFolder,
    renameFolder,
    setFolderEdit,
    moveServe,
    addFolder,
    closeFolder,
    setCurrGroupIndex
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
        showModal:false
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
  moveItemDrag = (id,preParentId, preType,afterId,parentId,afterType,timeFlag,dataFolder) => {
    let data = {id,preParentId,preType,afterId,parentId,afterType,timeFlag,dataFolder}
    const { moveServe,openFolder } = this.props;
    moveServe(data);
    preType === 3 && afterType === 2 && timeFlag && dataFolder && openFolder(dataFolder);
  }
  addFolderDrag = (groupIndex,id,preParentId, preType,afterId,parentId,afterType) => {
    let data = {groupIndex,id,preParentId, preType,afterId,parentId,afterType}
    const { addFolder } = this.props;
    addFolder(data);
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

      const { data,index } = this.props;
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
                propsIndex={index}
                type={type}
                moveItemDrag={this.moveItemDrag}
                onClick={(e)=>{this.widgeOnclick(e,item)}}
              />
            );
          default:
            return (
              <WidgetItem
                key={`widget-${id}-${i}`}
                data={item}
                id={id}
                parentId={parentId}
                index={id}
                propsIndex={index}
                type={type}
                moveItemDrag={this.moveItemDrag}
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
          <Icon title="添加服务" type="add"  />
        </div>

        <PopDialog className={pop_dialog_widge_list} close={this.popClose} backdrop={true} show = { this.state.showModal } data={_da} >
            <SelectWidgetList close={this.popClose} parentId={this.props.parentId} />
        </PopDialog>

      </ul>);
  }
}

export default WidgetList;
