import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import Modal from 'bee-modal';
import Button from 'bee-button';
import WidgetMaker from 'components/widget';
import { content } from './style.css';
import { mapStateToProps } from '@u';
import { connect } from 'react-redux';
import homeActions from 'store/root/home/actions';
import manageActions from 'store/root/manage/actions';

const {moveServe } = manageActions;

const {closeFolder} = homeActions;

@connect(
    mapStateToProps(
        'manageList',
        'curDisplayFolder',
        'folderModalDisplay',
        {
            namespace: 'manage',
        }
    ),
    {
        closeFolder,
        moveServe
    }
)
class ManageFolderDialog extends Component {

    constructor(props) {
        super(props);
        this.moveItemDrag = this.moveItemDrag.bind(this);
    }
    moveItemDrag(id,preParentId,preType, afterId,parentId) {
      let data = {id,preParentId,preType,afterId,parentId}
      const { moveServe } = this.props;
      moveServe(data);
    }
    render() {
        const {curDisplayFolder: {widgetName: title, children, }, closeFolder, } = this.props;
        const list = children.map((child, i) => {
            const {type, parentId, widgetId: id, } = child;
            const Widget = WidgetMaker(3);
            const props = {
                key: `widget-${id}-${i}`,
                data: child,
            };
            return (
                <Widget { ...props } id={id} parentId={parentId} index={id} preType={type} moveItemDrag={this.moveItemDrag}/>
            );
        })
        return (
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

export default ManageFolderDialog;
