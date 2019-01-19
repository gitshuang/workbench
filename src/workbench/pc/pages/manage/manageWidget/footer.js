import React, { Component } from 'react';
import {ButtonDefaultLine,ButtonBrand,ButtonDanger} from 'pub-comp/button';
import { um_footer, umBoxJustify, batchArea, saveArea } from './style.css';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const { } = manageActions;

@connect(
  mapStateToProps(
    'selectList',
    'isEdit',
    'isSiderDisplay',
  {
    namespace: 'manage',
  }
  )
)
export default class Footer extends Component{
  constructor(props){
    super(props);
  }
  

  render(){
    var {
      batchDelectFn,
      selectList,
      openGroupTo,
      isEdit,
      save,
      popOpenCancel,
      languagesJSON,
    } = this.props;
    
    return (
        <div className={um_footer} >
          <div className={umBoxJustify}>
             <div className={`${batchArea}  horizontalParent`}>
              <ButtonDefaultLine onClick={batchDelectFn} disabled={selectList.length ? false:true} className="horizontal">{languagesJSON.delete}</ButtonDefaultLine>
              <ButtonDefaultLine onClick={openGroupTo} disabled={selectList.length ? false:true} className="horizontal">{languagesJSON.moveTo}</ButtonDefaultLine>
            </div>
            <div className={`${saveArea}  horizontalParent`}>
              <ButtonBrand disabled={!isEdit} onClick={save} className="save">{languagesJSON.save}</ButtonBrand>
              <ButtonDefaultLine onClick={popOpenCancel} className="cancel">{languagesJSON.cancel}</ButtonDefaultLine>
              {/*<ButtonDefaultLine onClick={this.goBack}>取消</ButtonDefaultLine>*/}
            </div>
          </div>
        </div>
    )
  }
}




