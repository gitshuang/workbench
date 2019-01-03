import React, { Component } from 'react';
import {ButtonDefaultLine,ButtonBrand,ButtonDefaultAlpha} from 'pub-comp/button';
import { um_footer, umBoxJustify, batchArea, saveArea } from './style.css';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const { } = manageActions;

@connect(
  mapStateToProps(
    'selectList',
    'isEdit',
  {
    namespace: 'manage',
  }
  )
)
export default class Footer extends Component{
  constructor(props){
    super(props);
  }
  static defaultProps = {

  }
  render(){
    var {
      batchDelectFn,
      selectList,
      openGroupTo,
      isEdit,
      save,
      popOpenCancel,
      languagesJSON
    } = this.props;

    return (
        <div className={um_footer}>
          <div className={umBoxJustify}>
             <div className={`${batchArea}  horizontalParent`}>
              <ButtonDefaultLine onClick={batchDelectFn} disabled={selectList.length ? false:true} className="horizontal">{languagesJSON.delete}</ButtonDefaultLine>
              <ButtonDefaultLine onClick={openGroupTo} disabled={selectList.length ? false:true} >{languagesJSON.moveTo}</ButtonDefaultLine>
            </div>
            <div className={`${saveArea}  horizontalParent`}>
              <ButtonBrand disabled={!isEdit} onClick={save}>{languagesJSON.save}</ButtonBrand>
              <ButtonDefaultLine onClick={popOpenCancel} >{languagesJSON.cancel}</ButtonDefaultLine>
              {/*<ButtonDefaultLine onClick={this.goBack}>取消</ButtonDefaultLine>*/}
            </div>
          </div>
        </div>
    )
  }
}




