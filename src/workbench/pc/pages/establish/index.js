import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';

import Header from 'containers/header';
import EstablishContent from 'containers/Establish'

const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
    mapStateToProps(
        {
            key: 'userInfo',
            value: (root) => root.home.userInfo,
        },
    ),
    {
        requestStart,
        requestSuccess,
        requestError,
    }
)
class Establish extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    componentDidMount() {
        console.log(this.props)
    }

    goBack =()=>{
        this.props.history.replace('');
    }

    render() {
        const { userInfo } = this.props;
        return (
            <div className="um-win">
                
                { userInfo.allowTenants.length 
                    ? <div className="um-header" style={{background:"white"}}>
                        <Header onLeftClick={ this.goBack } iconName={"home"} >
                            <div>
                                <span>创建团队</span>
                            </div>
                        </Header>
                    </div> 
                    : null 
                }
                <div className="um-content">
                    <EstablishContent userInfo={ userInfo } />
                </div>
            </div>
        )

    }
}

export default Establish;
