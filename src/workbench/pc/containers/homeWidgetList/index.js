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
import workActions from 'store/root/work/actions';
import rootActions from 'store/root/actions';

const {
  getProductInfo
} = workActions;

const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(),
  {
    openFolder,
    requestStart,
    requestSuccess,
    requestError,
    getProductInfo
  }
)
class HomeWidgeList extends Component{

  constructor(props) {
    super(props);
    this.state = {
      blank: false
    };
  }

  getProductInfo = (code, type) => {
    const {
      getProductInfo,
      requestStart,
      requestError,
      requestSuccess,
      history,
    } = this.props;
    requestStart();
    getProductInfo(code, type).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      } else {
        const {
          curService: {
            serviceCode,
            url
          },
          curMenuBar: {
            workspaceStyle
          }
        } = payload;
        if (workspaceStyle === '_blank') {
          window.open(url)
        } else {
          history.replace(`/${type}/${code}/${serviceCode}`);
        }
      }
      requestSuccess();
    });
  }

	render(){
    const {
      data: {
        widgetName: name,
        children
      },
      noTitle,
      openFolder,
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
      } else if (type === 3 && !jsurl){
        let typeVal = serviceType === "2" ? 'app' : 'service';
        props.clickHandler = () => {
          this.getProductInfo(serviceCode, typeVal)
        }
      }
      return (
        <Widget { ...props } listMeta={listMeta}  viewport={this.props.viewport} loadOk = {this.props.loadOk}/>
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
