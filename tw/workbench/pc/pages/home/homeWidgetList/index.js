import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { mapStateToProps } from '@u';
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
// 加载actions
import homeActions from 'store/root/home/actions';
const { openFolder } = homeActions;

@withRouter
@connect(
  mapStateToProps(),
  {
    openFolder,
  }
)
class HomeWidgeList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.lastStyle = {
      paddingBottom: '80px',
      minHeight: window.innerHeight
    };
  }

  componentDidMount() {

  }

  render() {
    const {
      data: {
        widgetName: name,
        children
      },
      noTitle,
      openFolder,
      style,
      lastIndex,
    } = this.props;
    // 新增元数据  控制groupTitle 样式
    const list = children.map((child, i) => {
      const {
        type,
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
      if (type === 2) {
        props.clickHandler = () => {
          openFolder(child);
        }
        // } else if ((type === 3 || type === 4 || type === 5 || type === 6 || type === 7) && !jsurl) {
      } else if (type > 2 && !jsurl) {
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
        {
          noTitle ? null : (
            <div className={WidgetTitle}>
              <div>{name}</div>
            </div>
          )
        }
        {
          lastIndex
            ?
            <div className={WidgetCont} style={this.lastStyle}>
              <ul className={WidgetList}>{list}</ul>
            </div>
            :
            <div className={WidgetCont}>
              <ul className={WidgetList}>{list}</ul>
            </div>
        }
      </div>
    );
  }
}

export default HomeWidgeList;
