import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from 'containers/header';
import WidgetArea from 'components/widgetArea';
import { mapStateToProps } from '@u';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
import baseStyles from 'public/base.css';
import {page_home,button_group,selected,WidgetCont,WidgetTitle,HeaderLeft} from './style.css';
import Button from 'bee-button';
import ButtonGroup from 'bee-button-group';
import Icon from 'bee-icon';
import Modal from 'bee-modal';
import HeaderPage from './HeaderPage';

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

        this.state = {
            workList:[],
            showModal: false,
            modalData:[]
        }
        this.getWorkService();
    }

    getWorkService() {

        const {requestStart, requestSuccess, requestError, getWorkList} = this.props;

        getWorkList().then(({error, payload}) => {
          if (error) {
            requestError(payload);
          } else {
            let workList = [];
            Object.assign(workList, payload);
            workList[0].selected = true;
            this.setState({
              workList,
            });
            requestSuccess();
          }
        });

    }

    componentWillMount() {

        const {requestStart, requestSuccess, requestError, getWidgetList, getWorkList, widgetList, } = this.props;
        if (!widgetList.length) {
            requestStart();
            getWidgetList().then(({error, payload}) => {
              if (error) {
                requestError(payload);
              } else {
                requestSuccess();
              }
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

    scrollToAnchor = (index,id) => {

        let anchorElement = document.getElementById(id);

        if(anchorElement) { anchorElement.scrollIntoView({block: "start", behavior: "smooth"}); }
        if(index == 0 ){

            // scrollView.scrollTo(0, 0);

            // let top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
            scrollTo(0, 0);
        }
        this.setLiSelected(id);
    }

    close = () => {
        this.setState({
            showModal: false
        });
    }

    open = () => {
        this.setState({
            showModal: true
        });
    }

    changeModal = (e,da) => {
        let newDa = [];
        Object.assign(newDa,da);

        debugger;
         this.setState({
            showModal: e,
            modalData:newDa
        });
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

                let firstLi = i !=0 ? <div className={WidgetTitle} >{da.name}</div>:null;

                let selectedClass = da.selected ? selected : null;

                lis.push( <li key={da.id+i} onClick={()=>self.scrollToAnchor(i,_id)}><a className={selectedClass}>{da.name}</a></li>);

                conts.push(<div key={'WidgetArea'+da.id} id={da.id+"_"+i}>
                    {firstLi}
                    <div  className={WidgetCont} name={da.id} >
                        <WidgetArea data={da.widgeList} change={self.changeModal} > </WidgetArea>
                    </div>

                </div>);
            });
        }

        return (
        <div className={page_home}>

          <HeaderPage lis={lis}></HeaderPage>

          <div className="content">
             {conts}
          </div>


          <Modal show = { self.state.showModal } onHide = { self.close } >
              <Modal.Header>
                  <Modal.Title>文件夹类型</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className={WidgetCont} >
                    {
                        self.state.modalData.length != 0?<WidgetArea data={self.state.modalData} > </WidgetArea>:null
                    }
                </div>
              </Modal.Body>

              <Modal.Footer>

              </Modal.Footer>
          </Modal>

        </div>);
    }
}

export default Home;
