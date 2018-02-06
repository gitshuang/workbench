import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from 'containers/header';
import TeamconfigContent from 'containers/teamconfig';

@withRouter
class Teamconfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    componentDidMount() {
        console.log(this.props)
    }

    goBack =()=>{
        this.props.history.replace("/");
    }

    render(){
        return(
            <div className="um-win">
                <div className="um-header" style={{background:"white"}}>
                    <Header onLeftClick={ this.goBack } iconName={"home"} >
                        <div>
                            <span>团队设置</span>
                        </div>
                    </Header>
                </div> 
                <div className="um-content">
                    <TeamconfigContent />    
                </div>
            </div>
        )
    }
}

export default Teamconfig;
