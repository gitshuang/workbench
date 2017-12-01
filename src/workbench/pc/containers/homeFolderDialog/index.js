import React, { Component } from 'react';
import Modal from 'bee-modal';
import Button from 'bee-button';
import WidgetMaker from 'components/widget';
import { content ,home_file_item_dailog,close} from './style.css';
import { mapStateToProps } from '@u';
import { connect } from 'react-redux';
import homeActions from 'store/root/home/actions';

const {closeFolder} = homeActions;

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
    render() {
        const {curDisplayFolder: {widgetName: title, children, }, folderModalDisplay, closeFolder, } = this.props;
        
        const list = children.map((child, i) => {
            const {type, widgetId, } = child;
            const Widget = WidgetMaker(child);
            const props = {
                key: `widget-${widgetId}-${i}`,
                data: child,
            };
            return (
                <Widget { ...props }/>
            );
        })
        return (
            <Modal className={home_file_item_dailog} show={folderModalDisplay} onHide={ closeFolder } >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <a className={close} onClick={closeFolder} >X</a>
        </Modal.Header>
        <Modal.Body>
          <div className={content} >
            { list }
          </div>
        </Modal.Body>
      </Modal>
        );
    }
}

export default homeFolderDialog;

