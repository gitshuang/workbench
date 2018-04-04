import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import Header from 'components/header';
import EstablishContent from 'containers/establishContent'
import Icon from 'pub-comp/icon';
import logoUrl from 'assets/image/wgt/yonyou_logo.svg';
const { changeUserInfoDisplay,hideUserInfoDisplay, getUserInfo, changeRequestDisplay ,getSearchEnterOrTeam} = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions; 
import { logo,estab_lish,hidden,imgInner} from './style.css';

@withRouter
@connect(
    mapStateToProps(
        'searchEnterOrTeamList',
        'userInfoDisplay',
        'metaData', 
        {
            key: 'userInfo',
            value: (home,ownProps,root) => {
                return root.home.userInfo
            }
        },
        {
            namespace: 'home',
        }, 
    ),
    {
        getSearchEnterOrTeam,
        changeUserInfoDisplay,
        hideUserInfoDisplay,
        requestStart,
        requestSuccess,
        requestError,
    }
)
class Establish extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allowTenants:[],
        }
    }

    componentWillMount() {
        const {getSearchEnterOrTeam,requestError,requestSuccess} = this.props;
        getSearchEnterOrTeam().then(({error, payload}) => {
            if (error) {
                requestError(payload);
            }
            this.setState({
                allowTenants:payload
            })
            requestSuccess();
        });
    }

    goHome = () => {
        const {userInfoDisplay,hideUserInfoDisplay,changeUserInfoDisplay} = this.props;
        const {allowTenants} = this.state;
        if(allowTenants.length <= 0){ 
            if(userInfoDisplay){
                hideUserInfoDisplay();
            }else{
                changeUserInfoDisplay();
            }
        }else{
            this.props.history.replace('/');    
        }
    }

    goBack =()=>{
        this.props.history.replace('');
    }

    render() {
        const { userInfo } = this.props;
        const {allowTenants} = this.state;
        // const leftContent = <img src = {logoUrl} style= {{ maxHeight: "27px" }} />

        let img = this.props.userInfo.userAvator;
        let imgIcon = null;
        if(img){
            imgIcon = <img src={img} className={imgInner} />
        }else{
            imgIcon =  <Icon type="staff" />;
        }

        return (
            <div className={`um-win   ${estab_lish} ${allowTenants.length <= 0?'':hidden}`} >
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
                <div className="um-header" style={{background:"white",position:"relative"}}>
                    {/* <Header leftContent = { leftContent } /> */} 
                    <Header iconName={allowTenants.length <= 0?imgIcon:"home"} onLeftClick={ this.goHome }  />
                    <div className={logo}>
                        <img src = {logoUrl} style= {{ maxHeight: "27px" }} />
                    </div>
                </div> 
                <div className="um-content">
                    <EstablishContent userInfo={ userInfo } type="init"/>
                </div>
            </div>
        )

    }
}

export default Establish;
