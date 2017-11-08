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
import {button_group,selected} from './style.css';

import Button from 'bee-button';
//TUDO考虑是否去掉
import Icon from 'components/icon';

import ButtonGroup from 'bee-button-group';
import BeeIcon from 'bee-icon';

// import Tab from 'containers/homeTabs';

const {wrap, } = baseStyles;

const {changeUserInfoDisplay, getWidgetList, getWorkList} = homeActions;

const {requestStart, requestSuccess, requestError, changeTitleServiceDisplay} = rootActions;

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
        changeTitleServiceDisplay
    }
)

class Home extends Component {

    constructor(props) {
        super(props);

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
        console.log(" componentWillMount ");

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

    render() {
        const {changeUserInfoDisplay, widgetList, workList, changeTitleServiceDisplay} = this.props;

        let lis = [];
        let conts = [];

        if (workList) {
            workList.map(function(da,i) {
                let icon = da.icon ? <BeeIcon type={da.icon} /> : null;
                if(i == 0 ){
                  lis.push(<li className={selected} key={da.id} >{da.name}</li> );
                }else{
                  lis.push(<li  key={da.id} >{da.name}</li>);
                }

                conts.push(<div name={da.id} > </div>);
            });
        }

        return (<div className="um-win">
          <div className="um-header">
            <Header onLeftClick={ changeUserInfoDisplay } iconName={"wode"}>
              <div position="center" onClick={ changeTitleServiceDisplay }>
                <span>首页</span>
                <Icon type="xiala" style={{
                fontSize: "8px",
                marginLeft: "5px"
            }} />
              </div>
            </Header>
            { /* <Tab /> */ }
          </div>
          <div className="um-content">

             <ul className={button_group}>
               {lis}
             </ul>
             {conts}

          </div>
          <UserCenterContainer />
        </div>
        );
    }
}

export default Home;
