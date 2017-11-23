import React, { Component } from 'react';
import {pop_cont} from "./style.css";
import PropTypes from "prop-types";
// import WidgetArea from 'components/widgetArea';
//TODO 此处代码不应该调用containers中的容器，后续修改
import WidgetArea from 'containers/widgetArea';
import WidgeOption from 'components/widge_option';
import PopDialog from 'components/pop';
import { WidgetCont, WidgetTitle,item ,form_control,
edit_cont,save_btn,close_btn,} from './style.css';
import Button from 'bee-button';
import FormControl from 'bee-form-control';

class WidgeList extends Component{

	render(){
    const { data } = this.props;
    const {
      widgetName: name,
      widgetId: id,
      children: widgeList,
    } = data;

		return(
      <div name={`nav${id}`} className={item} >
        {
          this.props.index == 0 ? null : (
            <div className={WidgetTitle} >
                <div>{ name }</div>
            </div>
          )
        }
        <div className={WidgetCont} name={id} >
          <WidgetArea data={widgeList} />
        </div>
      </div>
    )
	}

}

// PopDialog.PropTypes = propTypes;
export default WidgeList;
