import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Content from './content'

import judgedBackend from './backend';
import { DragDropContext } from 'react-dnd';
import Sider from './sider';
import { management } from './style.css'
import CustomDragLayer from './dragLayer/customDragLayer.js';
// import Simple from './Simple'

class CreateManageModule extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div className={management}>
          <Sider languagesJSON={this.props.languagesJSON}/>
          <Content {...this.props} />
          <CustomDragLayer/>
          {/* <Simple /> */}
      </div>
    );
  }
}

export default DragDropContext(judgedBackend)(CreateManageModule);
