import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';

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
            loaded: false,
        };
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        const { userInfo } = this.props;
        return (
            <div>
                <EstablishContent userInfo={userInfo} />
            </div>
        )

    }
}

export default Establish;
