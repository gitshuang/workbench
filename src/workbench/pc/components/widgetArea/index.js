import React, {
  Component
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import Button from 'bee-button';
import Popconfirm from 'bee-popconfirm';
import {
  widgetList,
  widgetItem,
  title,
  file_context,
  title_left,
  file_icon,
  title_right,
  context,
  bottom
} from './style.css'
import WidgetItem from './widgetItem';

class WidgetArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showRotate: false
    }
  }

  change = (da) => {

    let _modal = this.state.showModal ? false : true;

    this.state.showModal = _modal;

    this.setState({
      ...this.state
    });
    if (da.fileList) {
      this.props.change(_modal, da.fileList);
    } else {
      console.log("数据错误!");
    }
  }

  render() {
    let self = this;
    let lis = []; {
      this.props.data.map(function(da, i) {

        // let _width = self.getLiSize(da);
        // let _width = (self.state.width * da.width) + (self.state.marginRight*(da.width-1));
        // lis.push(<li key={'widgetList' + da.id + i }  style={{width:_width,marginRight:10,}} >
        if (da.type && da.type == "file") {

          lis.push(<li className={widgetItem} key={'widgetList' + da.id + i }  >

                      <div className={title}>
                        <div className={[title_left,file_icon].join(' ')}></div>
                        <div className={title_right}>{da.title}</div>
                      </div>

                      <div className={[context, file_context].join(' ')} onClick={ () =>{self.change(da)} }>
                           <div></div>
                           <div></div>
                           <div></div>
                           <div></div>
                      </div>

                    </li>)

        } else {

          lis.push(<WidgetItem key={`widget-${da.id}-${i}`} data={da}/>)
        }

      })
    }

    return (<ul className={widgetList} >{lis}</ul>);
  }
}

export default WidgetArea;
