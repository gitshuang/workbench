import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import { widgetList, widgetItem, title, file_context, title_left,
  file_icon, title_right, context, bottom ,footer,
title_cont,form_control,edit_cont,save_btn,close_btn,title_edit,pop_cont,edit_btn} from './style.css'
import WidgetItem from './widgetItem';
import Checkbox from 'bee-checkbox';
import FormControl from 'bee-form-control';
import Button from 'bee-button';

class WidgeFileItem extends Component {
    render() {
        const { data } = this.props;
        const {
          widgetName: name,
          children,
        } = data;

        return (
          <li className={widgetItem}>
            <div className={title}>
              <div className={[title_left, file_icon].join(' ')}></div>
              <div className={title_right}> {name} </div>
            </div>
            <div className={[context, file_context].join(' ')} >
              { children.map(() => (<div></div>)) }
            </div>
          </li>
        )
    }
}

export default WidgeFileItem;
