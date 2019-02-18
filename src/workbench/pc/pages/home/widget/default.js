import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types';


import * as utilService from '../../manage/utils';

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
        gridx,
        gridy,
        width,
        height,
      },
      clickHandler,
      style
    } = this.props;

   
    const defaultImgArray = [default1Icon, default2Icon, default3Icon, default4Icon];
    return (
      <li ref="default_widget" className={`${widgetItem} ${defaultArea}`}
        onClick={clickHandler}
        onKeyDown={clickHandler}
        role="presentation"
        style={style}
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
