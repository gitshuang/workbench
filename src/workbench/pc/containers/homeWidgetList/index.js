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
const { openFolder } = homeActions;
import workActions from 'store/root/work/actions';
import rootActions from 'store/root/actions';

import { pushYA, appendSearchParam } from "../../utils/utils";

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
class HomeWidgeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blank: false,
      lastStyle: {
        height: window.innerHeight
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateViewport, false);
    this.updateViewport();
  }

  componentDidUpdate() {
    // this.updateViewport();
  }  

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewport, false);
  }

  updateViewport = () => {
    const lastW = document.getElementById("lastW");
    // 当子集<UL>元素超过了一屏的高度的时候   将父级  高度设置为子集高度 + 100
    if (lastW && (lastW.offsetHeight > window.innerHeight)) {
      this.setState({
        lastStyle: {
          height: lastW.offsetHeight + 100
        }
      });
    }
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
    getProductInfo(code, type).then(({ error, payload }) => {
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
        const locationProtocol = window.location.protocol;
        const origin = window.location.origin;
        if (workspaceStyle === '_blank' || (locationProtocol === 'https:' && url.split(':')[0] === "http")) {
          const location = `${origin}/service/open/${type}/${code}`;
          window.open(location);
        } else {
          history.replace(`/${type}/${code}/${serviceCode}`);
        }
        pushYA(serviceCode);
      }
      requestSuccess();
    });
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
      groupMeta,
      listMeta,
      lastIndex,
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
      } else if ((type === 3 || type === 4 || type === 5 || type === 6 || type === 7) && !jsurl) {
        let typeVal = serviceType === 2 ? 'app' : 'service';
        props.clickHandler = () => {
          this.getProductInfo(serviceCode, typeVal)
        }
      }
      return (
        <Widget {...props} listMeta={listMeta} viewport={this.props.viewport} loadOk={this.props.loadOk} />
      );
    })
    return (
      <div className={item} style={style} >
        {
          noTitle ? null : (
            <div className={WidgetTitle} style={titleStyle} >
              <div>{name}</div>
            </div>
          )
        }
        {
          lastIndex
            ?
            <div className={WidgetCont} style={this.state.lastStyle}>
              <ul className={WidgetList} id="lastW">{list}</ul>
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
