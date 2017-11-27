import React, {
  Component
} from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { Loading } from 'tinper-bee';
import {
  widgetItem,
  title,
  title_left,
  title_right,
  content,
} from './style.css'

const style = {
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const type='item';

const itemSource = {
  beginDrag(props) {
    return { id: props.id , parentId:props.parentId};
  }
};


const itemTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    const previousParentId = monitor.getItem().parentId;
    const preType = monitor.getItem().type;

    if (draggedId !== props.id) {
      props.moveItemDrag(draggedId,previousParentId,preType, props.id, props.data.parentId);
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

class WidgetItem extends Component {
  render() {
    const {
      data: {
        background,
        widgetId: id,
        size,
        widgetName: name,
        icon,
      },
      clickHandler,
    } = this.props;
    const { connectDragSource, connectDropTarget,isDragging } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <li className={widgetItem}
        style={{...widgetStyle[size],...style, opacity, backgroundImage: background }}
        onClick={clickHandler} >
        <div className={title}>
          <div className={title_left}><img src={icon} /></div>
          <div className={title_right}>{name}</div>
        </div>
      </li>
    ));
  }
}

//export default WidgetItem;
export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(WidgetItem));
