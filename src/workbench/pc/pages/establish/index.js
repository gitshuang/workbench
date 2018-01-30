import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EstablishContent from 'containers/Establish'

@withRouter
class Establish extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
        };
    }
    render(){
        return(
            <div>
                <EstablishContent />    
            </div>
        )
       
    }
}

export default Establish;
