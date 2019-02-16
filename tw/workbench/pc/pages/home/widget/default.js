import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types';
import default1Icon from 'assets/image/default1.png';
import default2Icon from 'assets/image/default2.png';
import default3Icon from 'assets/image/default3.png';
import default4Icon from 'assets/image/default4.png';

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
  {
    width: 544,
  },
  {
    width: 544,
    height: 360,
  },
  {
    width: 728,
  },
  {
    width: 728,
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
  };
  static defaultProps = {
    data: {},
    clickHandler: () => {},
    viewport: {
      top: 0,
      height: 0
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      shouldLoad: false,
      defaultImgIndex: -1
    }
  }

  componentWillMount() {
    this.setState({defaultImgIndex: parseInt(Math.random() * 4 + 1, 10)})
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
    } = this.props;

    const style = {
      ...widgetStyle[size - 1],
    };
    if (background) {
      style.backgroundImage = `url(${background})`;
    }

    const defaultImgArray = [default1Icon, default2Icon, default3Icon, default4Icon];
    return (
      <li ref="default_widget" className={`${widgetItem} ${defaultArea}`}
        onClick={clickHandler}
        onKeyDown={clickHandler}
        role="presentation"
      >
        {this.state.shouldLoad?(
          <div>
            <div className={title}>
              <div className={titleRight}>{name}</div>
            </div>
            <img alt="" src={icon || defaultImgArray[this.state.defaultImgIndex - 1]} className={iconImg} />
          </div>):(
          <Loading container={this} show={true} />)
        }
      </li>
    );
  }
}

export default WidgetItem;