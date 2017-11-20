import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import manageActions from 'store/root/manage/actions';

import Header from 'containers/header';
import WidgetArea from 'components/widgetArea';
import baseStyles from 'assets/style/base.css';

import {
  page_home,
  button_group,
  selected,
  WidgetCont,
  WidgetTitle,
  HeaderLeft,
  header
} from './style.css';
import Modal from 'bee-modal';

const {requestStart, requestSuccess, requestError} = rootActions;
const {changeUserInfoDisplay, getWidgetList, getWorkList} = homeActions;
const { addGroup } = manageActions;


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
    addGroup
  }
)

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      workList: [],
      showModal: false,
      modalData: [],
      newGroup : {},
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

    this.state.workList.map(function (da, i) {
      da.selected = false;
    })

    this.state.workList.map(function (da, i) {
      if ((da.id + "_" + i) == id) {
        da.selected = true;
      }
    })

    this.setState({
      ...this.state
    })
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

  getLeftContent(){
    let logoUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510562718599&di=2c650c278296b97dcab3e594f49330f4&imgtype=0&src=http%3A%2F%2Fimage.it168.com%2Fcms%2F2008-2-25%2FImage%2F2008225113034.jpg";
    return (<div className={HeaderLeft}>
      <img src= {logoUrl} />
    </div>)
  }

  addGroup =()=> {
    const { addGroup } = this.props;
    debugger
    let workList = this.state.workList;
    //workList.push(this.state.newGroup)
    workList.push({
      "id":"1005",
      "name":"新增分组",
      "size":"sm",
      "widgeList":[{
        "id":"2001",
        "size":"sm",
        "title":"公司新闻一组件",
        "optionTitle":"查看"
      }]
    });
    this.setState({
      workList
    });
    addGroup(workList);
  }

  render() {

    const {
      changeUserInfoDisplay,
      widgetList,
      changeTitleServiceDisplay
      } = this.props;
    let {
      workList
      } = this.state;

    let self = this;
    let conts = [];

    if (workList.length != 0) {
      workList.map(function (da, i) {
        let _id = da.id + "_" + i;

        let firstLi = <div className={WidgetTitle}>{da.name}</div>;

        let selectedClass = da.selected ? selected : null;

        conts.push(<div key={'WidgetArea'+da.id} id={da.id+"_"+i}>
          {firstLi}
          <div className={WidgetCont} name={da.id}>
            <WidgetArea data={da.widgeList} change={self.changeModal}> </WidgetArea>
          </div>

        </div>);
      });
    }

    return (
      <div className={page_home}>
        <div className={header}>
          <Header onLeftClick={ changeUserInfoDisplay } leftContent={this.getLeftContent} iconName={'wode'}>
            <span>首页</span>
          </Header>
        </div>
        <div className="content">
          {conts}
          <button onClick={this.addGroup.bind(this)}>添加分组</button>
        </div>
        <Modal show={ self.state.showModal } onHide={ self.close }>
          <Modal.Header>
            <Modal.Title>文件夹类型</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className={WidgetCont}>
              {
                self.state.modalData.length != 0 ? <WidgetArea data={self.state.modalData}> </WidgetArea> : null
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

