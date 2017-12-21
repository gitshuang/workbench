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
const {openFolder} = homeActions;

@withRouter
@connect(
  mapStateToProps(),
  {
    openFolder,
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
      openFolder,
      history,
      style,
      groupMeta,
      listMeta
    } = this.props;
    // 新增元数据  控制groupTitle 样式
    const titleStyle = groupMeta && groupMeta.titleStyle && JSON.parse(groupMeta.titleStyle);
    const list = children.map((child, i) => {
      const {
        type,
        jsurl,
        widgetId,
        serveCode,
      } = child;
      const Widget = WidgetMaker(child);
      const props = {
        key: `widget-${widgetId}-${i}`,
        data: child,
      };
      if (type === 2) {
        props.clickHandler = () => {
          openFolder(child);
        }
      } else if (type === 3 && !jsurl){
        props.clickHandler = () => {
          history.push(`/serve/${serveCode}`);
        }
      }
      return (
        <Widget { ...props } listMeta={listMeta}/>
      );
    })
		return(
      <div className={item} style={style} >
        {
          noTitle ? null : (
            <div className={WidgetTitle} style={titleStyle} >
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
