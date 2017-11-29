import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { mapStateToProps } from '@u';
import MoveToGroup from 'components/moveToGroup';
import manageActions from 'store/root/manage/actions';
import { pin } from './style.css';

const { closeBatchMove, batchMove } = manageActions;

@connect(
  mapStateToProps(
    'batchMoveModalDisplay',
    'manageList',
    {
      key: 'moveData',
      value: ({ manageList }) => manageList.map(group => ({
        ...group,
        children: [],
      })),
    },
    {
      namespace: 'manage',
    }
  ),
  {
    closeBatchMove,
    batchMove,
  }
)
class ManageBatchMoveDialog extends Component {
  constructor(props) {
    super(props);
  }
  confirmFn = (selectId) => {
    const { batchMove, manageList } = this.props;
    const index = manageList.findIndex(({widgetId}) => widgetId === selectId);
    if (index !== -1) {
      batchMove(index);
    }
    this.cancelFn();
  }
  cancelFn = () => {
    const { closeBatchMove } = this.props;
    closeBatchMove();
  }
  render() {
    const {
      batchMoveModalDisplay,
      moveData,
    } = this.props;
    const content = batchMoveModalDisplay ? (
      <div className={pin +" um-css3-center"}>
        <MoveToGroup
          data={moveData}
          onSave={this.confirmFn}
          onCancel={this.cancelFn}
        />
      </div>
    ) : null;
    return (
      <CSSTransitionGroup
        transitionName={ {
          enter: 'animated',
          enterActive: 'fadeIn',
          leave: 'animated',
          leaveActive: 'fadeOut',
        } }
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300} >
        { content }
      </CSSTransitionGroup>
    );
  }
}

export default ManageBatchMoveDialog;
