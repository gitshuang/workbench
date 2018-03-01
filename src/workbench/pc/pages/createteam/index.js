import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Breadcrumbs from 'components/breadcrumb';
import Header from 'containers/header';
import CreateTeamContent from 'containers/createTeam';
import { appBreadcrumb} from './style.css';

@withRouter
class CreateTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    componentDidMount() {
        console.log(this.props)
    }

    goBack =()=>{
        this.props.history.goBack();
    }

    render(){
        
        const { params } = this.props.match;
        return(
            <div className="um-win">
                
                { 
                    params.data == "home" ? <div className="um-header" style={{background:"white"}}>
                        <Header onLeftClick={ this.goBack } iconName={"home"} >
                            <div>
                                <span>创建团队</span>
                            </div>
                        </Header>
                    </div> 
                    : null 
                }
                <div className="um-content">
                    <div className={appBreadcrumb}>
                        <Breadcrumbs data={[{ name:"创建团队" }]} goback={this.goBack}/>
                    </div>

                    <CreateTeamContent />    
                </div>
            </div>
        )
       
    }
}

export default CreateTeam;
