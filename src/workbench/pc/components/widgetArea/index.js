import React, {
  Component
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import Button from 'bee-button';
import {
  Loading
} from 'tinper-bee';
import Popconfirm from 'bee-popconfirm';
import {
  widgetList,
  title,
  file_context,
  title_left,
  file_icon,
  title_right,
  context,
  bottom
} from './style.css'

class WidgetArea extends Component {

  //TUDO 数据中的 size ： sm 、lg、xg （小[标准]、中、大）

  // static propTypes = {
  //     widgeList: PropTypes.array.isRequired,
  // }

  constructor(props) {
    super(props);


    let _width = {
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

    this.width = _width;

    this.state = {
      marginRight: 10,
      showModal: false,
      showRotate: false
    }
    this.a = null;
  }

  handleShow = () => {
    this.setState({
      showRotate: true
    })
    setTimeout(() => {
      this.setState({
        showRotate: false
      })
    }, 5000)

  }

  getLiSize(da) {
    let width = this.width.sm;
    switch (da.size) {
      case "sm":
        width = this.width.sm;
        break;
      case "lg":
        width = this.width.lg;
        break;
      case "xg":
        width = this.width.xg;
        break;
    }
    return width;
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

        let _width = self.getLiSize(da);
        // let _width = (self.state.width * da.width) + (self.state.marginRight*(da.width-1));
        // lis.push(<li key={'widgetList' + da.id + i }  style={{width:_width,marginRight:10,}} >
        if (da.type && da.type == "file") {

          lis.push(<li key={'widgetList' + da.id + i } style={{..._width}}  >

                      <div className={title}>
                        <div className={title_left,file_icon}></div>
                        <div className={title_right}>{da.title}</div>
                      </div>

                      <div className={context,file_context} onClick={ () =>{self.change(da)} }>
                           <div></div>
                           <div></div>
                           <div></div>
                           <div></div>
                      </div>

                    </li>)

        } else {

          lis.push(<li key={'widgetList' + da.id + i } style={{..._width}}  >

                      <div className={title}>
                        <div className={title_left}><Icon type="uf-add-c-o" /></div>
                        <div className={title_right}>{da.title}</div>
                      </div>
                      <div style={{position: 'relative'}} ref={da.id =="1101"?(para) => { self.contain = para; }:null} >
                        <div className={context}>
                          {da.id =="1101"?<Button colors="primary" onClick={ () => {self.handleShow()} }>Loading按钮</Button>:null}
                        </div>
                        <div className={bottom}>
                          {da.id =="1101"?<Loading container={self.contain} show={self.state.showRotate} />:null}
                          <Link to={`/work/${da.id}`} >{da.optionTitle}</Link>}
                        </div>
                       
                      </div>
                      
                    </li>)
        }

      })
    }

    return (<ul className={widgetList} >{lis}</ul>);
  }
}

export default WidgetArea;