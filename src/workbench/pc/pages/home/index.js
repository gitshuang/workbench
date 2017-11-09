import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from 'containers/header';
import UserCenterContainer from 'containers/userCenter';
import WidgetArea from 'components/widgetArea';
import { mapStateToProps } from '@u';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
import baseStyles from 'public/base.css';
import {button_group,selected,WidgetCont,WidgetTitle} from './style.css';

import Button from 'bee-button';
//TUDO考虑是否去掉  暂时可以先去掉
//import Icon from 'components/icon';

import ButtonGroup from 'bee-button-group';
import BeeIcon from 'bee-icon';

// import Tab from 'containers/homeTabs';

const {wrap, } = baseStyles;

const {changeUserInfoDisplay, getWidgetList, getWorkList} = homeActions;

const {requestStart, requestSuccess, requestError} = rootActions;

@withRouter
@connect(
    mapStateToProps(
        'widgetList',
        'workList',
        {
            namespace: 'home',
        }
    ),
    {
        requestStart,
        requestSuccess,
        requestError,
        getWidgetList,
        getWorkList,
        changeUserInfoDisplay,
    }
)

class Home extends Component {

    constructor(props) {
        super(props);

        this.scrollToAnchor = this.scrollToAnchor.bind(this);

        this.getWorkService();
    }

    getWorkService() {

        const {requestStart, requestSuccess, requestError, getWorkList} = this.props;

        getWorkList().then(({error, payload}) => {
            if (error) {
                requestError(payload);
            }
            requestSuccess();
        });

    }

    componentWillMount() {

        const {requestStart, requestSuccess, requestError, getWidgetList, getWorkList, widgetList, } = this.props;
        if (!widgetList.length) {
            requestStart();
            getWidgetList().then(({error, payload}) => {
                if (error) {
                    requestError(payload);
                }
                requestSuccess();
            });
        }
    }

    callback = (e) => {


    }

    scrollToAnchor = (id) => {

        debugger;
        // if (id) return;
        let anchorElement = document.getElementById(id);

        if(anchorElement) { anchorElement.scrollIntoView(); }
    }

    scrollToAnchorddd(){

    }

    render() {
        const {changeUserInfoDisplay, widgetList, workList} = this.props;

        let lis = [];
        let conts = [];

        if (workList) {
            workList.map(function(da,i) {
                let icon = da.icon ? <BeeIcon type={da.icon} /> : null;
                let _id = da.id+"_"+i;

                let selectedClass = i == 0 ? selected : null;

                lis.push(<a key={da.id+i} onClick={()=>this.scrollToAnchor("1004_3")}> <li className={selectedClass} key={da.id} >{da.name}</li></a>);

                conts.push(<div key={'WidgetArea'+da.id} id={da.id+"_"+i}>
                    <div className={WidgetTitle} >{da.name}</div>
                    <div  className={WidgetCont} name={da.id} >
                        <WidgetArea data={da.widgeList} > </WidgetArea>
                    </div>
                </div>);
            });
        }

        return (<div className="um-win">
          <div className="um-header">
            <Header onLeftClick={ changeUserInfoDisplay } iconName={"wode"}>
              <div position="center">
                <span>首页</span>
                {/* <Icon type="xiala" style={{fontSize:"8px",marginLeft:"5px"}} /> */}
              </div>
            </Header>
            <ul className={button_group}>
              {lis}
            </ul>
            { /* <Tab /> */ }
          </div>
          <div className="um-content">



             <a onClick={()=>this.scrollToAnchor("1004_3")}> aaaa </a>

             {conts}

          </div>
          <UserCenterContainer />
        </div>
        );
    }
}

export default Home;
