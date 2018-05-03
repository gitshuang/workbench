import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'
import Loading from 'bee/loading';
import {
  widgetItem,
  title,
  file_context,
  title_left,
  file_icon,
  title_right,
  context,
  file_num,
  file_title_right,
  widget_file_item
} from './style.css'

const style={
  'position':'absolute',
  'right':'11px',
  'bottom':'9px',
  'color':'#fff'
}
class FolderWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldLoad:false,
    }
  }
  static defaultProps = {
    viewport: {
      top: 0,
      height: 0
    }
  }
  setShowImage(show){
    this.setState({
      shouldLoad : !!(show)
    })
    this.props.loadOk();
  }
  updataLoadState(top,height){
    if (this.state.shouldLoad) {
      return;
    }
    var min = this.props.viewport.top;
    var max = this.props.viewport.top + this.props.viewport.height;
    if ((min <= (top + height) && top <= max )) {
      this.setShowImage(true);
    }
  }
  componentDidUpdate(prevProps){
    if( !this.state.shouldLoad && prevProps.viewport ){
      var el = findDOMNode(this.refs.folderl_widget);
      this.updataLoadState(el.offsetTop, el.offsetHeight)
    }
  }
  render() {
    const {
      data,
      clickHandler,
    } = this.props;
    const {
      widgetName: name,
      children,
      type
    } = data;
    return (
      this.state.shouldLoad?(
      <li className={`${widgetItem} ${type==2?widget_file_item:""}`} onClick={ clickHandler } >
        <div className={title}>
          <div className={`${title_right} ${file_title_right}`}>{name}</div>
        </div>
        {/*<div className={[context, file_context].join(' ')} >
          { children.map(() => (<div></div>)).slice(0, 9) }
        </div>*/}
        <div className={file_num} style={style}>
          ({children.length})
        </div>
      </li>):(<li ref="folder_widget" className={`${widgetItem} ${type==2?widget_file_item:""}`} >
              <Loading container={this} show={true} />
            </li>)
    )
  }
}

export default FolderWidget;
