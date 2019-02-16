import React, { Component } from 'react';

//定义 增强功能的函数 把组件入参
function IronMan(Component) {
    //定义 包装组件
     class IronManComponent extends React.Component{
         constructor(props){
             super(props)
         }
         render(){
             //把传入的组件的props展开，这样就能把所有的窜见来props 继承过来
             return(<div>
                 <Component {...this.props} />
                 <p></p>
             </div>)
         }
     }
     //返回包装加强后的组件
     return IronManComponent
 }

@IronMan
class De extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        console.log(this.isTestable)
    }


    render() {
        return <div style={{height:"40px",background:"red"}} />

    }
}
export default De;
