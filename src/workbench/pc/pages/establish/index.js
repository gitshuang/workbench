import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';

import Header from 'components/header';
import EstablishContent from 'containers/establishContent'

import logoUrl from 'assets/image/wgt/yonyou_logo.svg';

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
        const leftContent = <img src = {logoUrl} style= {{ maxHeight: "27px" }} />
        return (
            <div className="um-win">
                
                { /*userInfo.allowTenants.length 
                    ? <div className="um-header" style={{background:"white"}}>
                        <Header onLeftClick={ this.goBack } iconName={"home"} >
                            <div>
                                <span>创建团队</span>
                            </div>
                        </Header>
                    </div> 
                    : null 
                */}
                <div className="um-header" style={{background:"white"}}>
                    <Header leftContent = { leftContent } />
                </div> 
                <div className="um-content">
                    <EstablishContent userInfo={ userInfo } />
                </div>
            </div>
        )

    }
}

export default Establish;
