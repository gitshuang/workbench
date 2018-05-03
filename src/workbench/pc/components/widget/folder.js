import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'
import Loading from 'bee/loading';
import {
  widgetItem,
  title,
  titleRight,
  fileNum,
  fileTitleRight,
  widgetFileItem,
} from './style.css';

const style = {
  position: 'absolute',
  right: '11px',
  bottom: '9px',
  color: '#fff',
};

class FolderWidget extends Component {
  static propTypes = {
    data: PropTypes.shape({
      background: PropTypes.string,
      size: PropTypes.number,
      widgetName: PropTypes.string,
      icon: PropTypes.string,
      type: PropTypes.number,
    }),
    clickHandler: PropTypes.func,
  };
  static defaultProps = {
    data: {},
    clickHandler: () => { },
    viewport: {
      top: 0,
      height: 0
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      shouldLoad:false,
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
  componentDidMount(){
    if( !this.state.shouldLoad && this.props.viewport ){
      var el = findDOMNode(this.refs.folder_widget);
      this.updataLoadState(el.offsetTop, el.offsetHeight)
    }
  }
  componentDidUpdate(prevProps){
    if( !this.state.shouldLoad && prevProps.viewport ){
      var el = findDOMNode(this.refs.folder_widget);
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
      type,
    } = data;
    return (
      <li 
        ref="folder_widget" 
        className={`${widgetItem} ${type === 2 ? widget_file_item : ""}`} 
        onClick={clickHandler} 
        onKeyDown={clickHandler}
        role="presentation"
      >
      {
        this.state.shouldLoad?(
        <div>
          <div className={title}>
            <div className={`${title_right} ${file_title_right}`}>{name}</div>
          </div>
          <div className={file_num} style={style}>
            ({children.length})
          </div>
        </div>
        ):(<Loading container={this} show={true} />)
      }
      </li>
    );
  }
}

export default FolderWidget;
