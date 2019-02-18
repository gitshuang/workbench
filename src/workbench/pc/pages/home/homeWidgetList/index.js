import React, { Component } from 'react';
// import Collapse from 'bee-collapse';
import Icon from 'pub-comp/icon';
import { openService } from 'public/regMessageTypeHandler';
// 加载components
import WidgetMaker from '../widget';
import * as utilService from '../../manage/utils';
// 加载样式 
import {
  WidgetCont,
  WidgetTitle,
  item,
  WidgetList,
} from './style.css';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

@connect(
	mapStateToProps(
    "layout",
		{
			namespace: 'manage',
    },
	)
)
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
      height
    } = this.props;
    // 新增元数据  控制groupTitle 样式
    const list = children.map((child, i) => {
      const {
        jsurl,
        serviceType,
        widgetId,
        serviceCode,
        background,
        gridx,
        gridy,
        width,
        height
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
      const { margin, rowHeight, calWidth } = this.props.layout;
      
      const { x, y } = utilService.calGridItemPosition(gridx, gridy, margin, rowHeight, calWidth);
      
      const { wPx, hPx } = utilService.calWHtoPx(width, height, margin, rowHeight, calWidth);

      const style = {
        width: wPx,
        height: hPx,
        transform: `translate(${x}px, ${y}px)`
      }
      if (background) {
        style.backgroundImage = `url(${background})`;
      }
  
  
          
      
      return (
        <Widget {...props} 
        viewport={this.props.viewport} 
        loadOk={this.props.loadOk}
        style={style}
        />
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
              style={{ height }}
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
