import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'
import WidgetMaker from 'components/widget';
import {
  WidgetCont,
  WidgetTitle,
  item,
  WidgetList,
} from './style.css';
import homeActions from 'store/root/home/actions';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
const {homeOpenFolder} = homeActions;

@withRouter
@connect(
  mapStateToProps(),
  {
    homeOpenFolder,
  }
)
class HomeWidgeList extends Component{
	render(){
    const {
      data: {
        widgetName: name,
        widgetId: id,
        children,
        type,
      },
      noTitle,
      homeOpenFolder,
      history,
    } = this.props;
    const list = children.map((child, i) => {
      const {
        type,
        jsurl,
        widgetId,
        serviceCode,
      } = child;
      const Widget = WidgetMaker(child);
      const props = {
        key: `widget-${widgetId}-${i}`,
        data: child,
      };
      if (type === 2) {
        props.clickHandler = () => {
          homeOpenFolder(child);
        }
      } else if (type === 3 && !jsurl){
        props.clickHandler = () => {
          history.push(`/service/${serviceCode}`);
        }
      }
      return (
        <Widget { ...props }/>
      );
    })
		return(
      <div className={item} >
        {
          noTitle ? null : (
            <div className={WidgetTitle} >
              <div>{name}</div>
            </div>
          )
        }
        <div className={WidgetCont}>
          <ul className={WidgetList}>{list}</ul>
        </div>
      </div>
    );
	}
}

export default HomeWidgeList;
