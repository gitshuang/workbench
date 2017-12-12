import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ElementsWrapper } from 'components/scrollNav';
import Button from 'bee-button';
import ButtonGroup from 'bee-button-group';
import { mapStateToProps } from '@u';
import Header from 'containers/header';
import HomeFolderDialog from 'containers/homeFolderDialog';
import WidgeList from 'containers/homeWidgetList';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
import { wrap } from 'assets/style/base.css';
import HeaderPage from './headerPage';
import { page_home } from './style.css';
import ButtonDefault,{ButtonBrand, ButtonDefaultLine,ButtonDefaultAlpha,ButtonWarning,ButtonDanger,} from 'components/button';

const { getWorkList } = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions;

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
        const {
          workList,
        } = this.props;

        const list = [];
        const conts = [];
        workList.forEach((da, i) => {
            const {
              widgetId: id,
              widgetName: name,
            } = da;
            const props = {
              key: `nav${id}`,
              data: da,
              noTitle: !i
            };
            if (i === workList.length - 1) {
              props.style = {
                height: window.innerHeight,
              }
            }
            list.push({
              label: name,
              target: `nav${id}`,
            });
            conts.push(
              <WidgeList {...props} />
            );
        })
        return (
          <div className={page_home}>
            <HeaderPage list={list}/>
            <ElementsWrapper items={list}>
              {conts}
            </ElementsWrapper>
            <HomeFolderDialog />
          </div>
        );
    }
}
export default Home;

