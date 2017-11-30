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

      // document.documentElement.scrollTop = 4;
      // window.addEventListener('scroll', this.handleScroll); // 添加滚动事件
      // window.scrollTo(23,0);
      // window.removeEventListener('scroll', this.handleScroll); // 删除滚动事件
    }


    // handleScroll (e) {
    //     console.log('浏览器滚动事件');
    //     let scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    //     // if(scrollTop <= 110){
    //     //    document.documentElement.scrollTop = 110;
    //     // }
    //     console.log("scrollTop"+scrollTop);
    //   } 


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

    componentDidMount(){
      document.documentElement.scrollTop = 4;
    }

    render() {

        const containerStyle = {
            width: "100%",
            // margin: "6px 0 100px",
            marginTop:"10px",
            // paddingTop:"30px",
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

