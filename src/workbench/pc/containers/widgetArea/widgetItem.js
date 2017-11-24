import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { Loading } from 'tinper-bee';
import Icon from 'bee-icon';
import {
  widgetItem,
  title,
  title_left,
  title_right,
  content,
} from './style.css'

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
      props.moveItemDrag(draggedId, props.id);
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

const widgetStyle = {
  sm: {
    width: 176
  },
  lg: {
    width: 360
  },
  xg: {
    width: 360,
    height: 360
  }
};

function getData(url, callback) {
  fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
  }).then((response) => {
    if (response.ok) {
      return response.text().then((text) => {
        if (text) {
          try {
            var fn = new Function('React', 'return ' + text);
            var result = fn(React);
            callback(result)
          } catch (e) {
            console.log(e);
          }
        } else {
          return Promise.reject(new Error('接口未返回数据'));
        }
      });
    }
    return Promise.reject(new Error('请求失败'));
  });
}


class WidgetItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.any.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      widget: null,
    }
  }
  componentWillMount() {
    const { data: { jsurl } } = this.props;
    if (jsurl) {
      getData(jsurl, (result) => {
        this.setState({
          loaded: true,
          widget: result.default ? result.default : result,
        })
      })
    }
  }
  render() {
    const {
      data: {
        id,
        size,
        title: widgetTitle,
        optionTitle,
        jsurl,
      }
    } = this.props;
    const { index,connectDragSource, connectDropTarget,isDragging } = this.props;
    const { widget: Widget, loaded } = this.state;
    const opacity = isDragging ? 0 : 1;
    let contentElm;
    if (loaded) {
      contentElm = (
        <div className={content} ref={(para) => { this.contain = para }}>
          <Widget/>
        </div>
      );
    } 
    // else if (id == '1101') {
    //   contentElm = (
    //     <div className={content} ref={(para) => { this.contain = para }}>
    //       <Loading id={"war_"+id} container={this.contain} show={true} />
    //     </div>
    //   );
    // }

    return connectDragSource(connectDropTarget(
      <li className={widgetItem} style={{...widgetStyle[size],...style, opacity }} >
        <div className={title}>
          <div className={title_left}><Icon type="uf-add-c-o" /></div>
          <div className={title_right}>{widgetTitle}</div>
        </div>
        {contentElm}
      </li>
    ));
  }
}

export default DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(WidgetItem));
