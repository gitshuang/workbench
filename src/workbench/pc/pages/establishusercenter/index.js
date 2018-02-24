import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import HeaderPage from './headerPage';
import Header from 'components/header';
import EstablishContent from 'containers/establishContent'
import { page_home } from './style.css';
import logoUrl from 'assets/image/wgt/yonyou_logo.svg';

const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
    mapStateToProps(
        'metaData',
        {
            namespace: 'home',
        },
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
class EstablishUserCenter extends Component {
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

    renderMetadata = (name) => {
        const {metaData} = this.props;
        return metaData && metaData.properties && metaData.properties[name];
    }

    render() {
        const headerData = this.renderMetadata("header");

        const { userInfo } = this.props;
        const leftContent = <img src = {logoUrl} style= {{ maxHeight: "27px" }} />
        return (
            <div className={`um-win ${page_home}`} >
                <div className="um-header" style={{background:"white"}}>
                    {/* <Header leftContent = { leftContent } /> */}
                    <HeaderPage headerData={headerData}/>
                </div>
                <div className="um-content">
                    <EstablishContent userInfo={ userInfo } />
                </div>
            </div>
        )
    }
}

export default EstablishUserCenter;
