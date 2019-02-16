import React, { Component } from 'react';
import {ButtonDefaultLine,ButtonBrand,ButtonDefaultAlpha} from 'pub-comp/button';
import { um_footer, umBoxJustify, batchArea, saveArea } from './style.css'
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
              <ButtonDefaultLine onClick={this.props.batchDelectFn} disabled={selectList.length ? false:true} className="horizontal">{languagesJSON.delete}</ButtonDefaultLine>
              <ButtonDefaultLine onClick={this.props.openGroupTo} disabled={selectList.length ? false:true} >{languagesJSON.moveTo}</ButtonDefaultLine>
            </div>
            <div className={`${saveArea}  horizontalParent`}>
              <ButtonBrand disabled={!isEdit} onClick={this.props.save}>{languagesJSON.save}</ButtonBrand>
              <ButtonDefaultLine onClick={this.props.popOpenCancel} >{languagesJSON.cancel}</ButtonDefaultLine>
              {/*<ButtonDefaultLine onClick={this.goBack}>取消</ButtonDefaultLine>*/}
            </div>
          </div>
        </div>
    )
  }
}




