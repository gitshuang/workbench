import React, { Component } from 'react';
// import Collapse from 'bee-collapse';
import Icon from 'pub-comp/icon';
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
    this.state = {
      open: true,
    };
  }

  componentDidMount() {

  }

  collapse = () => {
    // this.props.updateViewport();
    const { open } = this.state;
    this.setState({
      open: !open,
    }, () => {
      const h = open ? 0 : this._container.offsetHeight;
      this.props.updataView(h);
    });
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
        <div
          className={WidgetTitle}
          // onClick={() => { this.collapse() }}
        >
          {/* <Icon type = {this.state.open ? "pull-down" : "upward"} /> */}
          <div>{name}</div>
        </div>

        <div className={WidgetCont}>
          {/* <Collapse in={this.state.open} > */}
            <ul
              ref={c => this._container = c}
              className={WidgetList}
            // style={{ height: 0 }}
            >
              {list}
            </ul>
          {/* </Collapse> */}
        </div>

      </div>
    );
  }
}

export default HomeWidgeList;
