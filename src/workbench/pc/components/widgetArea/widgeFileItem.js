import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import { widgetList, widgetItem, title, file_context, title_left, 
  file_icon, title_right, context, bottom ,footer} from './style.css'
import WidgetItem from './widgetItem';
import Checkbox from 'bee-checkbox';


const widgetStyle = {
    sm: {
        width: 176
    },
    lg: {
        width: 360
    },
    xg: {
        width: 360,
        height: 360
    }
}

class WidgeFileItem extends Component {

    //TUDO 数据中的 size ： sm 、lg、xg （小[标准]、中、大）

    // static propTypes = {
    //     widgeList: PropTypes.array.isRequired,
    // }

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            showRotate: false
        }
    }

    // change = (da) => {

    //     let _modal = this.state.showModal ? false : true;

    //     this.state.showModal = _modal;

    //     this.setState({
    //         ...this.state
    //     });

    //     if (da.fileList) {
    //         this.props.change(_modal, da.fileList);
    //     } else {
    //         console.log("数据错误!");
    //     }
    // }
    
    render() {

        const  da = this.props.data;

        // let _width = (self.state.width * da.width) + (self.state.marginRight*(da.width-1));
        // lis.push(<li key={'widgetList' + da.id + i }  style={{width:_width,marginRight:10,}} >

        return (<li className={widgetItem} style={widgetStyle[da.size]} >
            <div className={title}>
              <div className={title_left,file_icon}></div>
              <div className={title_right} >{da.title}</div>
            </div>

            <div className={context,file_context} onClick={ (da) => {this.props.change(da)} }>
                 <div></div>
                 <div></div>
                 <div></div>
                 <div></div>
                 <div></div>
                 <div></div>
                 <div></div>
            </div>

           <div className={footer}>
              <div><Checkbox disabled className="test" /></div>
              <div onClick={self.fileAdd}><Icon type="uf-pencil" /></div>
              <div onClick={self.fileDele}><Icon type="uf-del"></Icon></div>
            </div>
        </li>)
    }
}

export default WidgeFileItem;
