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

import ButtonGroup from 'bee-button-group';
import Icon from 'bee-icon';

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

        this.state = {
            workList:[]
        }
        this.getWorkService();
    }

    getWorkService() {

        const {requestStart, requestSuccess, requestError, getWorkList} = this.props;

        getWorkList().then(({error, payload}) => {

            let workList = [];
            Object.assign(workList,payload);
            workList[0].selected = true;
            this.setState({
                workList
            })
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

    setLiSelected(id){

        this.state.workList.map(function(da,i){
            da.selected = false;
        })

        this.state.workList.map(function(da,i){
            if((da.id+"_"+i) == id){
                da.selected = true;
            }
        })

        this.setState({
            ...this.state
        })
    }

    scrollToAnchor = (id) => {
        
        let anchorElement = document.getElementById(id);
        if(anchorElement) { anchorElement.scrollIntoView(); }
        this.setLiSelected(id);
    }

    getLiClass(){


        return selectedClass;

    }

    render() {
        const {changeUserInfoDisplay, widgetList, changeTitleServiceDisplay} = this.props;
        let {workList} = this.state;

        let self = this;
        let lis = [];
        let conts = [];

        if (workList.length != 0 ) {
            workList.map(function(da,i) {
                let _id = da.id+"_"+i;

                let selectedClass = da.selected ? selected : null;
                
                lis.push(<a key={da.id+i} onClick={()=>self.scrollToAnchor(_id)}> <li className={selectedClass} key={da.id} >{da.name}</li></a>);
                
                let firstLi = i !=0 ? <div className={WidgetTitle} >{da.name}</div>:null;

                conts.push(<div key={'WidgetArea'+da.id} id={da.id+"_"+i}>
                    {firstLi}
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
            </div>
          </Header>

           <ul className={button_group}>
               {lis}
            </ul>
          </div>
          <div className="um-content"> 
             {conts}
          </div>
          <UserCenterContainer />
        </div>
        );
    }
}

export default Home;
