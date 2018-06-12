import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types';
import defaultIcon from 'assets/image/default.png';
import {
  widgetItem,
  title,
  titleRight,
  defaultArea,
  iconImg,
} from './style.css'
import Loading from 'bee/loading';

const widgetStyle = [
  // 小
  {
    width: 176,
  },
  // 中
  {
    width: 360,
  },
  // 大
  {
    width: 360,
    height: 360,
  },
];

class WidgetItem extends Component {
  static propTypes = {
    data: PropTypes.shape({
      background: PropTypes.string,
      size: PropTypes.number,
      widgetName: PropTypes.string,
      icon: PropTypes.string,
    }),
    clickHandler: PropTypes.func,
    listMeta: PropTypes.shape({
      titleStyle: PropTypes.string,
      imageStyle: PropTypes.string,
      background: PropTypes.string,
    }),
  };
  static defaultProps = {
    data: {},
    clickHandler: () => {},
    listMeta: {},
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
  
  componentDidMount(){
    const { from } = this.props;
    if(from === "folder"){
      this.setState({
        shouldLoad: true
      });
      return false;
    }
    if( !this.state.shouldLoad && this.props.viewport ){
      var el = findDOMNode(this.refs.default_widget);
      this.updataLoadState(el.offsetTop, el.offsetHeight)
    }
  }

  componentDidUpdate(prevProps){
    if( !this.state.shouldLoad && prevProps.viewport ){
      var el = findDOMNode(this.refs.default_widget);
      this.updataLoadState(el.offsetTop, el.offsetHeight)
    }
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

  setShowImage(show){
    this.setState({
      shouldLoad : !!(show)
    })
    this.props.loadOk();
  }

  render() {
    const {
      data: {
        background,
        size,
        widgetName: name,
        icon,
      },
      clickHandler,
      listMeta,
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
    const mergeStyle = Object.assign(style, backStyle);

    return (
      <li ref="default_widget" className={`${widgetItem} ${defaultArea}`}
        style={mergeStyle}
        onClick={clickHandler}
        onKeyDown={clickHandler}
        role="presentation" 
      >
        {this.state.shouldLoad?(
          <div>
            <div className={title}>
              <div className={titleRight} style={titleStyle}>{name}</div>
            </div>
            <img alt="" src={icon || defaultIcon} className={iconImg} style={imageStyle}/>
          </div>):(
          <Loading container={this} show={true} />)
        }
      </li>
    );
  }
}

export default WidgetItem;
