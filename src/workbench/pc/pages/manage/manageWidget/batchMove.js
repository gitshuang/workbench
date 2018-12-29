
import React, { Component } from 'react';
import ManageBatchMoveDialog from './manageBatchMoveDialog';


export default class BatchMove extends Component{
  constructor(props){
    super(props);
  }
  static defaultProps = {}
  render(){
    var {
      batchMoveModalDisplay,
      manageList,
      moveData,
      closeBatchMove,
      batchMove,
      languagesJSON
    } = this.props;
    var batchMoveDialogProps = {
      batchMoveModalDisplay,
      manageList,
      moveData,
      closeBatchMove,
      batchMove,
    }
    return (
        <ManageBatchMoveDialog
        {...batchMoveDialogProps}
        languagesJSON={languagesJSON}
        />
    )
  }
}




