import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import update from 'react/lib/update';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import Button from 'bee-button';
import Popconfirm from 'bee-popconfirm';
import { widgetList, widgetItem, title, file_context, title_left,
  file_icon, title_right, context, bottom ,footer} from './style.css'
import WidgetItem from './widgetItem';
import WidgeFileItem from './widgeFileItem';
import Checkbox from 'bee-checkbox';

import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {deleteFolder, renameFolder, setFolderEdit,moveServe } = manageActions;
const {requestStart, requestSuccess, requestError, } = rootActions;

// TODU id
// 'currtEditFiledI',
@connect(
  mapStateToProps(
    'manageList',
    'id',
    {
      namespace: 'manage',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    deleteFolder,
    renameFolder,
    setFolderEdit,
    moveServe
    // addGroup
  }
)
class WidgetArea extends Component {

    //TUDO 数据中的 size ： sm 、lg、xg （小[标准]、中、大）

    // static propTypes = {
    //     widgeList: PropTypes.array.isRequired,
    // }
    constructor(props) {
        super(props);

        this.state = {
            // showModal: false,
            showRotate: false
        }
      this.moveItemDrag = this.moveItemDrag.bind(this);
    }

  moveItemDrag(id, afterId,parentId) {
    let data = { data: this.props.data,id,afterId,parentId}
    const { moveServe } = this.props;
    moveServe(data);

  }

    change = (da) => {
        if (da.fileList) {
            this.props.change(da.fileList);
        } else {
            console.log("数据错误!");
        }
    }

    render() {

        let self = this;
        let lis = [];
        let liList = this.props.data;
        if(liList){
          liList.map((da, i) => {

            if (da.type && da.type == "file") {

                lis.push(<WidgeFileItem key={`widget-file-${da.id}-${i}`} data={da} change={self.change} id={da.id} index={da.id} moveItemDrag={this.moveItemDrag}/>);

            } else {

                lis.push(<WidgetItem key={`widget-${da.id}-${i}`}  data={da} id={da.id} index={da.id} moveItemDrag={this.moveItemDrag}/>);
            }
          })
        }
      return (<ul className={widgetList} >{lis}</ul>);
    }
}

export default WidgetArea;
