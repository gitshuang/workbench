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
const {changeUserInfoDisplay} = homeActions;
const { getManageList } = manageActions;

@withRouter
@connect(
  mapStateToProps(
    'manageList',
    {
      namespace: 'manage',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    changeUserInfoDisplay,
    getManageList
  }
)

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { requestError, requestSuccess, getManageList } = this.props;
    getManageList().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      } else {
        requestSuccess();
      }
    });
    //let manageList = [];
    //Object.assign(manageList, workList);
    //this.setState({
      //manageList
    //});
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
    let { manageList } = this.props;
    let list = [];
    if(manageList.length == 0) return;
    manageList.map((item, index) =>{
      list.push(
        <ManageGroup manageData={item} index={index} key={index}/>
      )
    });
    return list;
  }

  render() {
    const { changeUserInfoDisplay, } = this.props;
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

