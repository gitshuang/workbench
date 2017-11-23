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


//TUDO 数据中的 size ： sm 、lg、xg （小[标准]、中、大）


class WidgetArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showRotate: false
    }
    this.moveItemDrag = this.moveItemDrag.bind(this);
  }

  moveItemDrag(id, afterId) {
    const { data } = this.state;

    const item = data.filter(i => i.id === id)[0];
    const afterItem = data.filter(i => i.id === afterId)[0];
    const itemIndex = data.indexOf(item);
    const afterIndex = data.indexOf(afterItem);

    this.setState(update(this.state, {
      data: {
        $splice: [
          [itemIndex, 1],
          [afterIndex, 0, item]
        ]
      }
    }));
  }

  change = (da) => {

    let _modal = this.state.showModal ? false : true;

    // static propTypes = {
    //     widgeList: PropTypes.array.isRequired,
    // }
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            showRotate: false
        }
    }
  }

  render() {
    let self = this;
    const { index,connectDragSource, connectDropTarget,isDragging } = this.props;
    let liList = this.props.data;
    (typeof this.state.data === "undefined" || (this.state.data && this.state.data.length===0)) ? (this.state.data=liList,this.state.showModal=false,this.state.showRotate=false) : (liList=this.state.data);

    let lis = []; {
      liList.map((da, i) => {

        // let _width = self.getLiSize(da);
        // let _width = (self.state.width * da.width) + (self.state.marginRight*(da.width-1));
        // lis.push(<li key={'widgetList' + da.id + i }  style={{width:_width,marginRight:10,}} >
        if (da.type && da.type == "file") {
            this.props.change(_modal, da.fileList);
        } else {


          lis.push(<WidgetItem key={`widget-${da.id}-${i}`} data={da} id={da.id} index={da.id} moveItemDrag={this.moveItemDrag}/>)

        }
    }


    render() {
        let self = this;
        let lis = [];
        this.props.data.map(function(da, i) {

          if (da.type && da.type == "file") {

              lis.push(<WidgeFileItem key={`widget-file-${da.id}-${i}`} data={da} change={self.change} />);
          } else {

              lis.push(<WidgetItem key={`widget-${da.id}-${i}`}  data={da}/>);
          }
        })
      return (<ul className={widgetList} >{lis}</ul>);
    }
}

export default WidgetArea;
