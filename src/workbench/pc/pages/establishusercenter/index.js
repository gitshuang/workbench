import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
// import HeaderPage from './headerPage';
import Icon from 'pub-comp/icon';
import Header from 'containers/header';
import EstablishContent from 'containers/establishContent'
import { page_home ,appBreadcrumb,establis_page,hidden,imgInner} from './style.css';
import logoUrl from 'assets/image/wgt/yonyou_logo.svg';
import Breadcrumbs from 'components/breadcrumb';

const { changeUserInfoDisplay,hideUserInfoDisplay, getUserInfo, changeRequestDisplay ,getSearchEnterOrTeam} = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions;

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
class EstablishUserCenter extends Component {

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

    goBack =()=>{
        this.props.history.goBack();
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

    renderMetadata = (name) => {
        const {metaData} = this.props;
        return metaData && metaData.properties && metaData.properties[name];
    }

    render() {
        const headerData = this.renderMetadata("header");
        const {allowTenants} = this.state;
        const { userInfo } = this.props;
        // const leftContent = <img src = {logoUrl} style= {{ maxHeight: "27px" }} />

        let img = this.props.userInfo.userAvator;
        let imgIcon = null;
        if(img){
            imgIcon = <img src={img} className={imgInner} />
        }else{
            imgIcon =  <Icon type="staff" />;
        }
        
        return (
            <div className={`um-win ${page_home} ${establis_page} ${allowTenants.length <= 0?'':hidden}`} >
                <div className="um-header" style={{background:"white"}}> 
                    <Header
                    iconName={allowTenants.length <= 0?imgIcon:"home"}
                    onLeftClick={ this.goHome }  >
                        <div>
                            <span>创建团队/企业</span>
                        </div>
                    </Header>
                </div>
                <div className="um-content">
                    <div className={appBreadcrumb}>
                        <Breadcrumbs data={[{ name:"创建团队/企业" }]} goback={this.goBack}/>
                    </div>
                    <EstablishContent userInfo={ userInfo } />
                </div>
            </div>
        )
    }
}

export default EstablishUserCenter;
