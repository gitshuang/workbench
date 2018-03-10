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
      'brmBackIndex',
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
    if(this.props.brm.length >0){
      this.props.addBrm({name:'应用市场',url:'/market'})

    }else{
      this.props.addBrm({name:'全部应用',url:'/application'})
      this.props.addBrm({name:'应用市场',url:'/market'})
    }
  }
 
  goBack = (i) => {
    this.props.popBrm(i);
    //跳转
    if(i == -1){
      this.props.history.go(-1);
    }else{
      let stateBrm = this.props.brm;
      let popBrmName = stateBrm[stateBrm.length-1][i].name;//面包屑一直展示的是brm的最后一个元素
      let item,backVal;
      for(let i = 0;i<stateBrm.length ; i++){
          item=stateBrm[i];
          if(item[item.length-1].name == popBrmName){
              backVal = stateBrm.length-1-i;
              break;

          }
      }
      this.props.history.go(-backVal);
    }
  }

  
  render() {
    let brmVal = this.props.brm;
    let brmLastVal = brmVal.length > 0 && brmVal[brmVal.length-1];
    let brmLastLen = brmVal.length > 0 && brmVal[brmVal.length-1].length;
    return (
      <ApplicationWrap name={brmVal.length>0 ? brmLastVal[brmLastLen-1].name:'12'} brms={brmVal.length>1?brmVal[brmVal.length-2]:[{name:''}]} goBack={this.goBack}>
        <div className={bg+" um-content um-vbox"}>
          {/* <iframe className={frameElm} src={'http://localhost:3005'} /> */}
          <iframe className={frameElm} src={'/diwork-market/appMarket'} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default Account;
