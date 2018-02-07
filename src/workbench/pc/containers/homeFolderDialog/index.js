import React, { Component } from 'react';
import Button from 'bee/button';
import PopDialog from 'components/pop';
import { withRouter } from 'react-router-dom'
import WidgetMaker from 'components/widget';
import { content ,home_file_item_dailog,close,home} from './style.css';
import { mapStateToProps } from '@u';
import { connect } from 'react-redux';
import homeActions from 'store/root/home/actions';

const {closeFolder} = homeActions;

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
          history,
        } = this.props;

        const list = children.map((child, i) => {
            const {type, widgetId, serviceCode, jsurl } = child;
            const Widget = WidgetMaker(child);
            const props = {
                key: `widget-${widgetId}-${i}`,
                data: child,
            };
            if (type === 3 && !jsurl){
              props.clickHandler = () => {
                history.push(`/service/${serviceCode}`);
              }
            }
            return (
                <Widget { ...props }/>
            );
        })
        return (
          <div className={home}>
            <PopDialog
              className={home_file_item_dailog}
              show={ folderModalDisplay }
              title={title}
              backup={false}
              close={closeFolder} >
              <div className={content} >
                { list }
              </div>
            </PopDialog>
          </div>
        );
    }
}

export default homeFolderDialog;

