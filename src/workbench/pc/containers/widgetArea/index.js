import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import Button from 'bee-button';
import Popconfirm from 'bee-popconfirm';
import { widgetList, widgetItem, title, file_context, title_left, 
  file_icon, title_right, context, bottom ,footer} from './style.css'
import WidgetItem from './widgetItem';
import WidgeFileItem from './widgeFileItem';
import Checkbox from 'bee-checkbox';


class WidgetArea extends Component {

    //TUDO 数据中的 size ： sm 、lg、xg （小[标准]、中、大）

    // static propTypes = {
    //     widgeList: PropTypes.array.isRequired,
    // }
    constructor(props) {
        super(props);

        this.state = {
            // showModal: false,
            showRotate: false
        }
    }

    change = (da) => {
        if (da.fileList) {
            this.props.change(da.fileList);
        } else {
            console.log("数据错误!");
        }
    }
    
    render() {

        let self = this;
        let lis = []; 

        this.props.data.map(function(da, i) {
          
          if (da.type && da.type == "file") {

              lis.push(<WidgeFileItem key={`widget-file-${da.id}-${i}`} data={da} change={self.change} />);

          } else {

              lis.push(<WidgetItem key={`widget-${da.id}-${i}`}  data={da}/>);
          }
        })
      return (<ul className={widgetList} >{lis}</ul>);
    }
}

export default WidgetArea;
