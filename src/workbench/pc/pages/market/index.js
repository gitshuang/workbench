import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { getHost } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import workActions from 'store/root/work/actions';
const {addBrm} = workActions;
import {
  bg,
  frameElm,
} from './style.css';

@withRouter
@connect(
  mapStateToProps(
      'brm',
      {
          namespace: 'work',
      },
  ),
  {
    addBrm
  }
)
class Account extends Component {

  componentDidMount(){
    this.props.addBrm({name:'全部应用',url:'/market'})
    this.props.addBrm({name:'应用市场',url:'/market'})
  }
 

  goBack = () => {
    this.props.history.go(-1);
   
  }

  func = () =>{
    if(this.props.brm.length ==1){
    }
  }

  render() {
    let brmVal = this.props.brm;
    console.log('1111112222226666渲染之前的brm的是多少呢',brmVal)
    return (
      <ApplicationWrap name={brmVal.length <= 1?'应用市场':brmVal[brmVal.length-1].name} brms={brmVal.length == 0?[{name:'全部应用'}]:brmVal.slice(0,brmVal.length-1)} goBack={this.goBack}>
        <div className={bg+" um-content um-vbox"}>
          <iframe className={frameElm} src={'http://localhost:3005'} />
          {/* <iframe className={frameElm} src={'/diwork-market/appMarket'} /> */}
        </div>
      </ApplicationWrap>
    );
  }
}

export default Account;
