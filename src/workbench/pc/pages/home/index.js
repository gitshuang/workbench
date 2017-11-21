import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from 'containers/header';
import PopDialog from 'components/pop';
import WidgeList from 'components/widge_list';
import WidgetArea from 'components/widgetArea';
import { mapStateToProps } from '@u';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
import baseStyles from 'assets/style/base.css';
import { page_home, button_group, selected, HeaderLeft ,navbar} from './style.css';
import Button from 'bee-button';
import ButtonGroup from 'bee-button-group';
import Icon from 'bee-icon';
import HeaderPage from './HeaderPage';
import Navbar, { ElementsWrapper } from 'components/scroll-nav';

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
            workList: [],
            showModal: false,
            modalData: []
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

    setLiSelected(id) {

        this.state.workList.map(function(da, i) {
            da.selected = false;
        })

        this.state.workList.map(function(da, i) {
            if ((da.id + "_" + i) == id) {
                da.selected = true;
            }
        })

        this.setState({
            ...this.state
        })
    }

    scrollToAnchor = (index, id) => {
        let anchorElement = document.getElementById(id);

        if (anchorElement) {
            anchorElement.scrollIntoView({
                block: "start",
                behavior: "smooth"
            });
        }
        if (index == 0) {
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

    changeModal = (e, da) => {
        let newDa = [];
        Object.assign(newDa, da);
        this.setState({
            showModal: e,
            modalData: newDa
        });
    }

    render() {

        const containerStyle = {
            width: "100%",
            margin: "70px 0 100px"
        }

        const {changeUserInfoDisplay, widgetList, changeTitleServiceDisplay} = this.props;

        let {workList} = this.state;
        let self = this;
        let lis = [];
        let conts = [];
 
        if (workList.length != 0) {

            workList.map(function(da, i) { 

                lis.push({label: da.name, target: "nav" + da.id });

                conts.push(<WidgeList key={'nav'+da.id} data={da} index={i} change={self.changeModal}  />);
            })
        }
        
        return (
        <div className={page_home}>

          <HeaderPage lis={lis}> </HeaderPage>
          
          <div className="content">
            <div style={containerStyle}>
                <ElementsWrapper items={lis}>
                    {conts}
                </ElementsWrapper>
            </div>
          </div>

          <PopDialog show = { self.state.showModal } close = { self.close }>
            {self.state.modalData.length != 0?<WidgetArea data={self.state.modalData} > </WidgetArea>:null}
          </PopDialog>

        </div>);
    }
}
export default Home;

