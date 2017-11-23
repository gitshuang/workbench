import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from 'containers/header';
import PopDialog from 'components/pop';
import WidgeList from 'components/widge_list';
import WidgetArea from 'containers/widgetArea';
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

const { wrap } = baseStyles;

const {changeUserInfoDisplay, getWorkList} = homeActions;

const {requestStart, requestSuccess, requestError} = rootActions;

@withRouter
@connect(
    mapStateToProps(
        'workList',
        {
            namespace: 'home',
        }
    ),
    {
        requestStart,
        requestSuccess,
        requestError,
        getWorkList,
        changeUserInfoDisplay,
    }
)

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalData: []
        }
    }

    componentWillMount() {
        const {requestStart, requestSuccess, requestError, getWorkList} = this.props;
        requestStart();
        getWorkList().then(({error, payload}) => {
            if (error) {
                requestError(payload);
            }
            requestSuccess();
        });
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    changeModal(da) {
        let _showModal = this.state.showModal?false:true;
        let newDa = [];
        Object.assign(newDa, da);
        this.setState({
            showModal: _showModal,
            modalData: newDa
        });
    }

    render() {

        const containerStyle = {
            width: "100%",
            margin: "70px 0 100px"
        }

        const { changeUserInfoDisplay, changeTitleServiceDisplay } = this.props;

        let { workList } = this.props;
        let lis = [];
        let conts = [];
        workList.forEach((da, i) => {
            const {
              widgetId: id,
              widgetName: name,
            } = da;
            lis.push({
              label: name,
              target: `nav${id}`,
            });
            conts.push(
              <WidgeList
                key={`nav${id}`}
                data={da}
                index={i}
                change={self.changeModal} />
            );
        })
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


        </div>);
    }
}
export default Home;

