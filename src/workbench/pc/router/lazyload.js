import React, { Component } from "react";
import Loading from 'pub-comp/loading/loading.js';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }
    asyncGetComp = ()=>{
        var self = this;
        new Promise(function(resolve,reject){
            var asyncCom = importComponent();
            resolve(asyncCom);
        }).then(function(asyncCom){
            const { default : component } = asyncCom;
            self.setState({
                component
            })
        })
    }
    componentDidMount(){
        this.asyncGetComp();
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : <Loading text='正在加载中...' />;
    }
  }
  return AsyncComponent;
}