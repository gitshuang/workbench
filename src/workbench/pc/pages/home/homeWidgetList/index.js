import React, { Component } from 'react';
import { openService } from 'public/regMessageTypeHandler';
// 加载components
import WidgetMaker from '../widget';
// 加载样式 
import {
  WidgetCont,
  WidgetTitle,
  item,
  WidgetList,
} from './style.css';

class HomeWidgeList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const {
      data: {
        widgetName: name,
        children
      },
      style,
    } = this.props;
    // 新增元数据  控制groupTitle 样式
    const list = children.map((child, i) => {
      const {
        jsurl,
        serviceType,
        widgetId,
        serviceCode,
      } = child;
      const Widget = WidgetMaker(child);
      const props = {
        key: `widget-${widgetId}-${i}`,
        data: child,
      };
      if (!jsurl) {
        props.clickHandler = () => {
          openService(serviceCode, serviceType);
        }
      }
      return (
        <Widget {...props} viewport={this.props.viewport} loadOk={this.props.loadOk} />
      );
    })
    return (
      <div className={item} style={style} >
        <div className={WidgetTitle}>
          <div>{name}</div>
        </div>
        <div className={WidgetCont}>
          <ul className={WidgetList}>{list}</ul>
        </div>
      </div>
    );
  }
}

export default HomeWidgeList;
