import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { widgetList } from './style.css'

class WidgetArea extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  }
  render() {
    return (
      <ul className={widgetList}>
        {
          this.props.data.map((widget, i) => (
            <li key={i}><Link to={`/work/${widget.id}`}>{widget.name}</Link></li>
          ))
        }
      </ul>
    );
  }
}

export default WidgetArea;
