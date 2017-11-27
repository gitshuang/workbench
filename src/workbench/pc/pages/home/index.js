import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from 'containers/header';
import HomeFolderDialog from 'containers/homeFolderDialog';
import WidgeList from 'containers/homeWidgetList';
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

    render() {

        const containerStyle = {
            width: "100%",
            margin: "70px 0 100px"
        }

        const {
          changeUserInfoDisplay,
          workList,
        } = this.props;

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
            if (i) {
              conts.push(
                <WidgeList
                  key={`nav${id}`}
                  data={da} />
              );
            } else {
              conts.push(
                <WidgeList
                  key={`nav${id}`}
                  data={da}
                  noTitle />
              );
            }
        })
        return (
        <div className={page_home}>
          <HeaderPage lis={lis} />
          <div className="content">
            <div style={containerStyle}>
                <ElementsWrapper items={lis}>
                    {conts}
                </ElementsWrapper>
            </div>
          </div>
          <HomeFolderDialog />
        </div>);
    }
}
export default Home;

