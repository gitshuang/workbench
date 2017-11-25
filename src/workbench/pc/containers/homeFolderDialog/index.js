import React, { Component } from 'react';
import Modal from 'bee-modal';
import Button from 'bee-button';
import WidgetMaker from 'components/widget';
import { content } from './style.css';
import { mapStateToProps } from '@u';
import { connect } from 'react-redux';
import homeActions from 'store/root/home/actions';

const { closeFolder } = homeActions;

@connect(
  mapStateToProps(
    'workList',
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
class homeFolderDialog extends Component{
	render(){
    const {
      curDisplayFolder: {
        widgetName: title,
        children,
      },
      closeFolder,
    } = this.props;
    const list = children.map((child, i) => {
      const {
        type,
        widgetId,
      } = child;
      const Widget = WidgetMaker(3);
      const props = {
        key: `widget-${widgetId}-${i}`,
        data: child,
      };
      return (
        <Widget { ...props }/>
      );
    })
		return(
      <Modal show={true} onHide={ closeFolder } >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
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
