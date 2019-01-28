import React, { Component } from 'react';
import {ButtonDefaultLine,ButtonBrand,ButtonDanger,ButtonU8c,ButtonU8cPrimary,ButtonU8cDefault} from 'pub-comp/button';
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
              <ButtonU8c onClick={batchDelectFn} disabled={selectList.length ? false:true} className="horizontal">{languagesJSON.delete}</ButtonU8c>
              <ButtonU8c onClick={openGroupTo} disabled={selectList.length ? false:true} className="horizontal">{languagesJSON.moveTo}</ButtonU8c>
            </div>
            <div className={`${saveArea}  horizontalParent`}>
              <ButtonU8cPrimary disabled={!isEdit} onClick={save} className="save">{languagesJSON.save}</ButtonU8cPrimary>
              <ButtonU8cDefault onClick={popOpenCancel} className="cancel">{languagesJSON.cancel}</ButtonU8cDefault>
              {/*<ButtonDefaultLine onClick={this.goBack}>取消</ButtonDefaultLine>*/}
            </div>
          </div>
        </div>
    )
  }
}




