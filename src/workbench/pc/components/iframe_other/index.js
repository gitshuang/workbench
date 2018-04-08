import React, { Component } from 'react';
import {iframe} from "./style.css";
import PropTypes from "prop-types";

const propTypes = {
  url:PropTypes.string,
}

class Iframe extends Component{

  constructor(props) {
    super(props); 
    this.state = {
      _height: 0
    }
    window.addEventListener('onresize',this.changeFrameHeight);
  }
  
  componentWillMount(){
    this.changeFrameHeight();
  }

  componentWillUnmount(){
    removeEventListener('onresize',this.changeFrameHeight);
  }

  changeFrameHeight=()=>{
    let h = document.documentElement.clientHeight;
    this.setState({
      _height:(h-110)
    })
  }

  render() {
    const {
      title,
      url,
    } = this.props;
    const {_height} = this.state;
    return (<iframe id={title} title={title} src={url} className={iframe} style={{height:_height+"px"}}/>);
  }
}

Iframe.propTypes = propTypes;

export default Iframe;
