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

import {bg,bg_wrap,wrap,clearfix,serviceSearch,ufSearch,hotService,classify,class1,class2,services,serviceInfo,serviceTit,describe,servicePic,singleService,appContent,menuBtnGroup } from './style.css';

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
    const {
      requestStart,
      requestError,
      requestSuccess,
      getAllApplicationList,
    } = this.props;
    let self = this;
    requestStart();
    return getAllApplicationList().then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      // self.setState({
      //   dataList:payload
      // })
      this.state.listAll = this.renderContent(payload);
      this.state.list2 = this.state.listAll;
      this.setState({...this.state})
      requestSuccess();
      return error;
    });
  }

  handleClick = (e,da) => {
    let { allApplicationList } = this.props;

    //选中了当前显示的
    // if (da.labelId === this.state.current) {
    //   return;
    // }

    this.state.current = da.labelId;
    this.state.list2 = [];
    if(typeof(da) === 'object'){
      let selected = allApplicationList.find(item => item.labelId == da.labelId);
      selected.children.forEach((app)=>{
        app.service.forEach((service)=>{
          this.state.list2.push(
            <div>
              <header>
                <Icon type=""></Icon>
                <span>{app.applicationName}</span>
              </header>
              <hgroup className={clearfix}>
                <div>
                  <Icon type=""></Icon>
                  <span>{service.serveName}</span>
                </div>
                <div>
                  <Icon type=""></Icon>
                  <span>{service.serveName}</span>
                </div>
                <div>
                  <Icon type=""></Icon>
                  <span>{service.serveName}</span>
                </div>
              </hgroup>
            </div>
          );
        })
      })
    }else{
      this.state.list2 = this.state.listAll;
    }
    this.setState({
       ...this.state
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
    selectWidgetList.map((tag) =>{
      tag.children.forEach((app)=>{
        app.service.forEach((service)=>{
          listAll.push(
            <div>
              <header>
                <Icon type=""></Icon>
                <span>{app.applicationName}</span>
              </header>
              <hgroup className={clearfix}>
                <div>
                  <Icon type=""></Icon>
                  <span>{service.serveName}</span>
                </div>
                <div>
                  <Icon type=""></Icon>
                  <span>{service.serveName}</span>
                </div>
                <div>
                  <Icon type=""></Icon>
                  <span>{service.serveName}</span>
                </div>
              </hgroup>
            </div>
          );
        })
      })
    });
    return listAll;
  }

  render() { 
    const { allApplicationList} = this.props;
    let {value ,options,placeholder,disabled, current } = this.state;

    let btns = [];
    btns.push(<Button  className={ current === 1000 ? 'active' : '' } onClick={ (e)=>{this.handleClick(e,"all")} } key="1000">全部</Button>);

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
                  <Icon type="search" className={ufSearch}></Icon>
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
            {/*<div className={classify}>
              <dl className={`${class1} ${clearfix}`}>
                <dt>分类一</dt>
                <ul className="clearfix">
                  {
                    serviceList.map(({
                      lebalId,
                      children,
                      lebalName,
                    }) => (
                      <dd>
                        <div key={lebalId} className={`${singleService} ${clearfix}`}>
                          {
                            children.map(({
                              applicationCode,
                              applicationIcon,
                              applicationId,
                              applicationName,
                            }) => (
                              <div>
                                <img src={applicationIcon} className={servicePic}></img>
                                <div className={`${services} ${clearfix}`}>
                                  <div className={`${serviceInfo}`}>
                                    <div className={serviceTit}>{lebalName}</div>
                                    <div className={describe}>{applicationName}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </dd>
                      ))
                    }
                </ul>
              </dl>
              <dl className={`${class2} ${clearfix}`}>
                <dt>分类二</dt>
                <ul className="clearfix">
                  {
                    serviceList.map(({
                      lebalId,
                      children,
                      lebalName,
                    }) => (
                      <dd>
                        <div key={lebalId} className={`${singleService} ${clearfix}`}>
                          {
                            children.map(({
                              applicationCode,
                              applicationIcon,
                              applicationId,
                              applicationName,
                            }) => (
                              <div>
                                <img src={applicationIcon} className={servicePic}></img>
                                <div className={`${services} ${clearfix}`}>
                                  <div className={`${serviceInfo}`}>
                                    <div className={serviceTit}>{lebalName}</div>
                                    <div className={describe}>{applicationName}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </dd>
                      ))
                    }
                </ul>
              </dl>
            </div>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default serviceClassify;