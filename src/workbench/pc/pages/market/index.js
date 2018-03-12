import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { getHost } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import workActions from 'store/root/work/actions';
const {addBrm,popBrm} = workActions;
import {
  bg,
  frameElm,
} from './style.css';

@withRouter
@connect(
  mapStateToProps(
      'brm',
      'brmBackVal',
      {
          namespace: 'work',
      },
  ),
  {
    addBrm,
    popBrm
  }
)
class Account extends Component {

  componentDidMount(){
    //[
    //  [{name:'全部应用'},
    //  [{name:'全部应用'},{name:"应用市场"}],
    //  [{name:'全部应用'},{name:'应用市场'},{name:'应用详情'}]
    //]
    if(this.props.brm.length == 0){
      this.props.addBrm({name:'全部应用',url:'/application'})
      this.props.addBrm({name:'应用市场',url:'/market'})
    }else if(this.props.brm.length  == 1){
      this.props.addBrm({name:'应用市场',url:'/market'})
    }else if(this.props.brm.length == 3){
      this.props.popBrm(1);
    }
    
  }
 
  goBack = (i,backVal) => {
    this.props.popBrm(i);
    backVal>0 && this.props.history.go(-backVal)

  }

  
  render() {
    let brmVal = this.props.brm;
    let brmLastVal = brmVal.length > 0 && brmVal[brmVal.length-1];
    let brmLastLen = brmVal.length > 0 && brmVal[brmVal.length-1].length;
    return (
      <ApplicationWrap name={brmVal.length>0 ? brmLastVal[brmLastLen-1].name:''} brms={brmVal.length>1?brmVal[brmVal.length-2]:[{name:''}]}  goBack={this.goBack}>
        <div className={bg+" um-content um-vbox"}>
          {/* <iframe className={frameElm} src={'http://localhost:3005'} /> */}
          <iframe className={frameElm} src={'/diwork-market/appMarket'} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default Account;
