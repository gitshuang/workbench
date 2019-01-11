import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Content from './content'

import judgedBackend from './backend';
import { DragDropContext } from 'react-dnd';
import languagesJSON from 'yutils/languages';
import Sider from './sider';
import { management } from './style.css'
import CustomDragLayer from './dragLayer/customDragLayer.js';


class CreateManageModule extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  componentDidMount(){
    window.addEventListener('resize',()=>{
      const documentElement = document.documentElement||document.body;
       this.setState({height: documentElement.clientHeight})
       console.log("resize===================");
    })
  }
  componentWillUnmount(){
    window.removeEventListener('resize')
  }
  render() {
    const {height} = this.state;
    return (
      <div className={management}>
          <Sider height={height?height:"auto"}/>
          <Content {...this.props} languagesJSON={languagesJSON}/>
          <CustomDragLayer/>
      </div>
    );
  }
}

export default DragDropContext(judgedBackend)(CreateManageModule);
