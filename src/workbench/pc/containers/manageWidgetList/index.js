import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import update from 'react/lib/update';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import Button from 'bee-button';
import Popconfirm from 'bee-popconfirm';
import { widgetList, widgetItem, title, file_context, title_left,
  file_icon, title_right, context, bottom ,footer,clearfix,addModule} from './style.css'
import WidgetItem from './widgetItem';
import WidgeFileItem from './widgeFileItem';
import Checkbox from 'bee-checkbox';

import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {deleteFolder, renameFolder, setFolderEdit,moveServe, openFolder } = manageActions;
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
    moveServe
  }
)
class WidgetList extends Component {

    //TUDO 数据中的 size ： sm 、lg、xg （小[标准]、中、大）

    // static propTypes = {
    //     widgeList: PropTypes.array.isRequired,
    // }
    constructor(props) {
      super(props);
      this.moveItemDrag = this.moveItemDrag.bind(this);
    }

  moveItemDrag(id, afterId,parentId) {
    let data = { data: this.props.data,id,afterId,parentId}
    const { moveServe } = this.props;
    moveServe(data);
  }

  widgeOnclick = (e,da) => {
    this.props.openFolder(da);
  }

  render() {
      const { data } = this.props;

      const list = data.map((item, i) => {
        const {
          type,
          WidgetId: id,
          widgetName: name
        } = item;
        switch (type) {
          case 2:
            return (
              <WidgeFileItem
                key={`widget-file-${id}-${i}`}
                data={item}
                id={id}
                index={id}
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
                index={id}
                moveItemDrag={this.moveItemDrag}
              />
            );
        }
      })
    return (<ul className={`${widgetList} ${clearfix}`} >{list}<div className={addModule}><Icon type="uf-plus"></Icon></div></ul>);
  }
}

export default WidgetList;
