import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateTeamContent from 'containers/createTeam'

@withRouter
class CreateTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
        };
    }
    render(){
        return(
            <div>
                <CreateTeamContent />    
            </div>
        )
       
    }
}

export default CreateTeam;
