import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import { widgetList ,title,title_left,title_right,context,bottom} from './style.css'

class WidgetArea extends Component {

    //TUDO 数据中的 size ： sm 、lg、xg （小[标准]、中、大）

    // static propTypes = {
    //     widgeList: PropTypes.array.isRequired,
    // }

     constructor(props) {
        super(props);


        let _width = {
          sm:{width:176},
          lg:{width:360},
          xg:{width:360,height:360}
        }

        this.width =  _width;

        this.state = {
          marginRight:10
        }
    }

    getLiSize(da){
        let width = this.width.sm;
        switch(da.size){
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
 
    render() { 
        let self = this;
        let lis = [];
      

        {
            this.props.data.map(function(da,i){

                let _width = self.getLiSize(da);
                // let _width = (self.state.width * da.width) + (self.state.marginRight*(da.width-1));
                // lis.push(<li key={'widgetList' + da.id + i }  style={{width:_width,marginRight:10,}} >
                lis.push(<li key={'widgetList' + da.id + i } style={{..._width}}  >

                  <div className={title}>
                    <div className={title_left}><Icon type="uf-add-c-o" /></div>
                    <div className={title_right}>{da.title}</div>
                  </div>
                  <div className={context}>
                    
                  </div>
                  <div className={bottom}>
                    <Link to={`/work/${da.id}`} >{da.optionTitle}</Link>
                  </div>

                </li>)

            })
         }

        return (<ul className={widgetList} >{lis}</ul>);
    }
}

export default WidgetArea;
