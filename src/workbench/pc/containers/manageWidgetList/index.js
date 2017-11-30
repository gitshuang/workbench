import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import update from 'react/lib/update';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Button from 'bee-button';
import Popconfirm from 'bee-popconfirm';
import { widgetList, widgetItem, title, file_context, title_left,
  file_icon, title_right, context, bottom ,footer,clearfix,addModule} from './style.css'
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
const {deleteFolder, renameFolder, setFolderEdit,moveServe, openFolder,addFolder } = manageActions;
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
    addFolder
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

  moveItemDrag = (id,preParentId, preType,afterId,parentId,afterType) => {
    let data = {id,preParentId,preType,afterId,parentId,afterType}
    const { moveServe } = this.props;
    moveServe(data);
  }
  addFolderDrag = (groupIndex,id,preParentId, preType,afterId,parentId,afterType) => {
    let data = {groupIndex,id,preParentId, preType,afterId,parentId,afterType}
    const { addFolder } = this.props;
    addFolder(data);
  }

  widgeOnclick = (e,da) => {
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

      const pop_btn = [
        {label:"确认",fun:this.popSave,className:""},
        {label:"取消",fun:this.popClose,className:""}
      ]   //设置操作按钮

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

    return (<ul className={`${widgetList} ${clearfix}`} >
        {list}
        <div className={addModule} onClick={this.openSelectWidget} >
          <Icon type="add"  />
        </div>

        <PopDialog show = { this.state.showModal } data={_da} btns={pop_btn} >
            <SelectWidgetList close={this.popClose}/>
        </PopDialog>

      </ul>);
  }
}

export default WidgetList;
