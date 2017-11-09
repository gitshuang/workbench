import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Icon from 'bee-icon';
import { widgetList ,title,title_left,title_right,context,bottom} from './style.css'

class WidgetArea extends Component {

    // static propTypes = {
    //     widgeList: PropTypes.array.isRequired,
    // }

     constructor(props) {
        super(props);

        this.state = {
          width:158,
          marginRight:10
        }
    }
 
    render() { 
        let self = this;
        let lis = [];
        {
            this.props.data.map(function(da,i){

                let _width = (self.state.width * da.width) + (self.state.marginRight*(da.width-1));

                lis.push(<li key={'widgetList' + da.id + i }  style={{width:_width,marginRight:10,}} >

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
