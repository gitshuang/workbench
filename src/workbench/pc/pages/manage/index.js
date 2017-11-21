import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import manageActions from 'store/root/manage/actions';

import Header from 'containers/header';
import ManageGroup from 'containers/manageGroup';
import WidgetArea from 'components/widgetArea';

import 'assets/style/iuapmobile.um.css';
import { HeaderLeft } from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;
const {changeUserInfoDisplay, getWidgetList, getWorkList} = homeActions;
const {setInitList} = manageActions;

@withRouter
@connect(
  mapStateToProps(
    'widgetList',
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
    setInitList
  }
)

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workList: [], // 拷贝的worklist
    }
    this.getWorkService();
  }

  getWorkService() {
    const {requestStart, requestSuccess, requestError, getWorkList,setInitList} = this.props;
    getWorkList().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      } else {
        let workList = [];
        Object.assign(workList, payload);
        this.setState({
          workList
        });
        setInitList(workList);
        requestSuccess();
      }
    });
  }

  componentWillMount() {
    const {requestStart, requestSuccess, requestError, getWidgetList, widgetList, } = this.props;
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

  getLeftContent() {
    let logoUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510562718599&di=2c650c278296b97dcab3e594f49330f4&imgtype=0&src=http%3A%2F%2Fimage.it168.com%2Fcms%2F2008-2-25%2FImage%2F2008225113034.jpg";
    return (
      <div className={HeaderLeft}>
        <img src={logoUrl}/>
      </div>
    )
  }

  renderContent =() => {
    let workList = this.state.workList;
    let list = [];
    if(workList.length == 0) return;
    workList.map((item, index) =>{
      list.push(
        <ManageGroup manageList={item} index={index} key={index}/>
      )
    });
    return list;
  }

  render() {
    const { changeUserInfoDisplay, widgetList, } = this.props;
    return (
      <div className="um-win">
        <div className="um-header">
          <Header onLeftClick={ changeUserInfoDisplay } leftContent={this.getLeftContent()} iconName={'wode'}>
            <span>首页编辑</span>
          </Header>
        </div>
        <div className="um-content">
          {this.renderContent()}
        </div>
        <div className="um-footer">
          <div className="tr">
            <button className="btn btn-inline">保存</button>
            <button className="btn btn-inline">取消</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

