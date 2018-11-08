import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  link,
  icon,
} from './style.css';

@withRouter
class goTo extends Component {
  clickHandler = () => {
    const {
      history,
      to,
    } = this.props;
    history.push(to);
  }
  render() {
    const {
      name,
      icon: src,
    } = this.props;
    return (
      <div onClick={this.clickHandler} className={link}>
        <img className={icon} src={src}/>
        <span>{ name }</span>
      </div>
    )
  }
}

export default goTo;
