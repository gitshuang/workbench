import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

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

 class Item  extends Component{
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
  }
  render(){
    const { text, connectDragSource, connectDropTarget,isDragging} = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>{text}</div>
    ));
  }
}


export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(Item));
