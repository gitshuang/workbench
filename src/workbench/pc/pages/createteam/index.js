import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Breadcrumbs from 'components/breadcrumb';
import Header from 'containers/header';
import CreateTeamContent from 'containers/createTeam';
import { appBreadcrumb,home_none} from './style.css';

@withRouter
@connect(
    mapStateToProps(
        'userInfo',
        'metaData',
        {
            namespace: 'home',
        },
    ),
    { 
    }
)
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
    goHome = () => {
        const {userInfo:{allowTenants}} = this.props;
        if(allowTenants.length <= 0)return;
        this.props.history.replace('');
    }

    render(){
        const {match:{params} ,userInfo:{allowTenants}} = this.props;
        let _class = params.data == "home"?home_none:"";
        return(
            <div className={`um-win ${_class}`}>
                
                { 
                    params.data == "home" ? <div className="um-header" style={{background:"white"}}>
                        <Header onLeftClick={ this.goHome } iconName={allowTenants.length <= 0?"":"home"} >
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
