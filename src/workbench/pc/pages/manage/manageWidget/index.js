import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Content from './content'

import judgedBackend from './backend';
import { DragDropContext } from 'react-dnd';
import languagesJSON from 'yutils/languages';


class CreateManageModule extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
          <Content {...this.props} languagesJSON={languagesJSON}/>
      </div>
    );
  }
}

export default DragDropContext(judgedBackend)(CreateManageModule);
