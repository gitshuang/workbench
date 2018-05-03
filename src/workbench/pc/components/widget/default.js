import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import {
  widgetItem,
  title,
  title_left,
  title_right,
  content,
  defaultArea,
  iconImg,
  default_icon
} from './style.css'
import _default_icon from 'assets/image/default.png';
import { findDOMNode } from 'react-dom'
import Loading from 'bee/loading';

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
      var el = findDOMNode(this.refs.default_widget);
      this.updataLoadState(el.offsetTop, el.offsetHeight)
    }
  }

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
      listMeta
    } = this.props;

    const style = {
      ...widgetStyle[size - 1],
    };
    if (background) {
      style.backgroundImage = `url(${background})`;
    }

    // 取元数据
    const titleStyle = listMeta && listMeta.titleStyle && JSON.parse(listMeta.titleStyle);
    const imageStyle = listMeta && listMeta.imageStyle && JSON.parse(listMeta.imageStyle);
    const backStyle = listMeta && listMeta.background && JSON.parse(listMeta.background);
    const mergeStyle = Object.assign(style,backStyle);

    return (
      // this.state.shouldLoad?(
      <li ref="default_widget" className={`${widgetItem} ${defaultArea}`}
        style={mergeStyle}
        onClick={clickHandler} >
        <div className={title}>
          <div className={title_right} style={titleStyle}>{name}</div>
        </div>
        <img src={icon?icon:_default_icon} className={iconImg} style={imageStyle}/>
      </li>
      // ):(<li ref="default_widget" className={`${widgetItem} ${defaultArea}`} >
      //         <Loading container={this} show={true} />
      //       </li>)
    );
  }
}

export default WidgetItem;
