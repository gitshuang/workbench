import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { widgetList } from './style.css'

class WidgetArea extends Component {

    // static propTypes = {
    //     widgeList: PropTypes.array.isRequired,
    // }

     constructor(props) {
        super(props);

    }


    render() { 

        return (
            <ul className={widgetList} >
         {
            this.props.data.map(function(da,i){

                return(<li key={'widgetList' + da.id + i } ><Link to={`/work/${da.id}`} >{da.title}</Link></li>)

            })
         }
      </ul>
        );
    }
}

export default WidgetArea;
