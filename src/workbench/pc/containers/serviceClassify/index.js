import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import FormControl from 'bee-form-control';
import Button from 'bee-button';
import Icon from 'components/icon';
import InputGroup from 'bee-input-group';
import AutoComplete from 'bee-autocomplete';
import Menu from 'bee-menus';
import ButtonGroup from 'bee-button-group';

import {bg,bg_wrap,wrap,clearfix,serviceSearch,ufSearch,services,serviceInfo,serviceTit,describe,singleService,appContent,menuBtnGroup } from './style.css';

import applicationActions from 'store/root/application/actions';
// import manageActions from 'store/root/manage/actions';
import rootActions from 'store/root/actions';
// const {getSelectWidgetList} = manageActions;
const {getAllApplicationList} = applicationActions;
const {requestStart, requestSuccess, requestError} = rootActions;

@connect(
  mapStateToProps(
    'quickServiceDisplay',
    'allApplicationList',
    {
      namespace: 'application',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getAllApplicationList,
  }
)

class serviceClassify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      options: ['友空间', '友人才', '友报账', '友报账','友报账'],
      placeholder: "搜索应用",
      disabled: false,
      current : 1000,
      list2 : [],
      listAll : [],
    }
    this.onFormChange = this.onFormChange.bind(this);
  }

  componentDidMount() {
    if(this.props.allApplicationList.length == 0){
      this.getAllApplicationList();
    }
  }

  getAllApplicationList() {
    const {requestStart,requestError,requestSuccess,getAllApplicationList} = this.props;
    let self = this;
    requestStart();
    return getAllApplicationList().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      let _dataList = this.renderContent(payload);
      this.setState({
        list2:_dataList,
        listAll:_dataList
      })
      requestSuccess();
      return error;
    });
  }

  handleClick = (e,da) => {
    let { allApplicationList } = this.props;

    this.state.current = da.labelId;
    let _dataList = [];
    if(da == "all"){
        _dataList = this.state.listAll;
    }else{
      let selectedObj = allApplicationList.find(item => item.labelId == da.labelId);
      _dataList = this.getApplicationItem(selectedObj.children);
    }
    this.setState({
        list2:_dataList
    })
  }

  onFormChange(value) {
    this.setState({
        value: value
    })
  }

  renderContent(selectWidgetList) {
    if(selectWidgetList.length == 0) return;
    let listAll = [];
    selectWidgetList.forEach((tag,i)=>{
      let itemArr = this.getApplicationItem(tag.children);
      listAll = [...listAll,...itemArr];
    })
    return listAll;
  }

  getApplicationItem(data){
    let listAll = [];
    data.forEach((_da,i)=>{
      if(_da){
        listAll.push(
          <header>
            <img src={_da.applicationIcon}></img>
            <span key={_da.applicationId+"_da"+i}>{_da.applicationName}</span>
          </header>
        );
        let serveArr = this.getServiceItem(_da.service);
        listAll = [...listAll,...serveArr];
      }
    })
    return listAll;
  }

  getServiceItem(data){
    let listAll = [];
    data.forEach((_service,i)=>{
      if(_service){
        listAll.push(
          <hgroup className={clearfix}>
            <div>
              <img src={_service.serveIcon}></img>
              <span key={_service.serveId+"_service"+i}>{_service.serveName}</span>
            </div>
          </hgroup>
        );
      }
    })
    return listAll;
  }

  render() {
    const { allApplicationList} = this.props;
    let {value ,options,placeholder,disabled, current } = this.state;

    let btns = [];
    btns.push(<Button  className={ current === undefined ? 'active' : '' } onClick={ (e)=>{this.handleClick(e,"all")} } key="1000">全部</Button>);

    allApplicationList.map((da,i) =>{
      btns.push(<Button className={ current === da.labelId ? 'active' : '' } onClick={(e)=>{this.handleClick(e,da)} }  key={da.labelId} >{da.labelName}</Button>);
    })

    return (
      <div className={bg}>
        <div className={bg_wrap}>
          <div className={`${wrap} ${clearfix}`}>
            <InputGroup className={serviceSearch}>
              <AutoComplete
                value={value}
                disabled={disabled}
                options={options}
                placeholder={placeholder}
                onValueChange={value => this.onFormChange(value)}
              />
              <InputGroup.Button>
                <Button>
                  <Icon title="搜索" type="search" className={ufSearch}></Icon>
                </Button>
              </InputGroup.Button>
            </InputGroup>
            <div className={menuBtnGroup}>
              <ButtonGroup vertical >
                {btns}
              </ButtonGroup>
            </div>
            <div className={appContent}>
              {this.state.list2}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default serviceClassify;
