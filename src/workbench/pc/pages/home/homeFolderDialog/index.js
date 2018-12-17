import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { mapStateToProps } from '@u';
import { openService } from 'public/regMessageTypeHandler';

import PopDialog from 'pub-comp/pop';
import WidgetMaker from '../widget';
import { content, home_file_item_dailog, home, noDataStyle } from './style.css';

import homeActions from 'store/root/home/actions';
const { closeFolder } = homeActions;

@withRouter
@connect(
  mapStateToProps(
    'curDisplayFolder',
    'folderModalDisplay',
    {
      namespace: 'home',
    }
  ),
  {
    closeFolder,
  }
)
class homeFolderDialog extends Component {
  componentWillUnmount() {
    const {
      folderModalDisplay,
      closeFolder,
    } = this.props;
    if (folderModalDisplay) {
      closeFolder();
    }
  }
  render() {
    const {
      curDisplayFolder: {
        widgetName: title,
        children
      },
      folderModalDisplay,
      closeFolder,
    } = this.props;

    const list = children.map((child, i) => {
      const { type, widgetId, serviceCode, jsurl, serviceType } = child;
      const Widget = WidgetMaker(child);
      const props = {
        key: `widget-${widgetId}-${i}`,
        data: child,
      };
      if (type === 3 && !jsurl) {
        props.clickHandler = () => {
          openService(serviceCode, serviceType);
        }
      }
      return (
        <Widget {...props} from="folder" />
      );
    });
    const noData = <div className={noDataStyle}>该文件夹为空</div>;
    return (
      <div className={home}>
        <PopDialog
          className={home_file_item_dailog}
          show={folderModalDisplay}
          title={title}
          backup={false}
          close={closeFolder} >
          <div className={content} >
            {list.length ? list : noData}
          </div>
        </PopDialog>
      </div>
    );
  }
}

export default homeFolderDialog;

