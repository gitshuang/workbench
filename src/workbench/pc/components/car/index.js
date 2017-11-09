import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { widgetList } from './style.css'

class Car extends Component {

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

                lis.push(<li key={'widgetList' + da.id + i }  style={{width:_width,marginRight:10,}} ><Link to={`/work/${da.id}`} >{da.title}</Link></li>)

            })
         }

        return (<ul className={widgetList} >{lis}</ul>);
    }
}

export default Car;
