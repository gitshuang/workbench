import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import ButtonGroup from 'bee-button-group';
import Button from 'bee-button';
import { Con, Row, Col } from 'bee-layout';
import ServiceItem from 'containers/serviceItem';
import FormControl from 'bee-form-control';
import {ButtonBrand,ButtonDefaultAlpha,ButtonDefaultLine} from 'components/button';

import { connect } from 'react-redux';
import { mapStateToProps,guid} from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {getAllServicesByLabelGroup,addDesk,setCurrentSelectWidgetMap,deleteFolder} = manageActions;
const {requestStart, requestSuccess, requestError, } = rootActions;

import { select_widget_list,
widget_left,widget_right,search_icon,search_icon_con,
  searchPanel,panel,left,panel_right,button_group,form_control,icon,
panel_left,footer_btn,title,search_tit,active,btn_active
} from './style.css'


@connect(
  mapStateToProps(
    'manageList',
    // 'currentSelectWidgetMap',

    'applicationsMap',
    'selectWidgetItem',
    'allServicesByLabelGroup',
    {
      namespace: 'manage',
    }
  ),
  {
    getAllServicesByLabelGroup,
    setCurrentSelectWidgetMap,
    deleteFolder,
    addDesk,
    requestSuccess,
    requestError,
  }
)
class SelectWidgetList extends Component {

  constructor(props) {
    super(props);
    
    this.state = ({
        activeKey: "1",
        // start: 0,
        value:"搜索内容...",
        data:{},//接口全部数据
        labelGroups:[],//类型
        labels:[],//菜单数据
        // serverList:[],//服务数据
        allAppList:[],

        currentAppId:"all",//当前点击的服务、应用

        // dataListBack:[],
        // dataMap:null,    //存放转换后数据Map
        selectedList:[],
        edit:false
    })
  }

  componentDidMount() {
    this.getServices("");
  }

  getServices(serviceName){
    const {selectWidgetItem} = this.props;
    if(!selectWidgetItem){
      let payload = this.props.allServicesByLabelGroup;
      this.setThisState(payload);
      return;
    };
    let self = this;
    const { requestError, requestSuccess, getAllServicesByLabelGroup } = this.props;
    getAllServicesByLabelGroup(serviceName).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      this.setThisState(payload);
      requestSuccess();
    });
  }

  setThisState=(payload)=>{
    payload.labelGroups[0].active = true;
    const {labels,allAppList,currentAppId} = this.setDefaultList(payload.labelGroups[0]);
      this.setState({
        data:payload,

        labelGroups:payload.labelGroups,
        labels,
        allAppList,
        selectedList:[]
        // currentAppId
    })
  }

  // componentWillReceiveProps(nextProps){
  // }

  btnSearch=()=>{
    // if(this.state.value != "搜索内容..."){
        this.getServices(this.state.value);
    // }
  }
  
  onChange=(data,sele)=>{
    data.selected = sele;
    let index = this.state.selectedList.findIndex(da=>da.serviceId == data.serviceId);
    if(index == -1 && sele == "3"){
      this.state.selectedList.push(data);
    }else{
      this.state.selectedList.splice(index,1);
    }
    console.log(this.state.selectedList);
    this.setState({
        ...this.state,
        edit:this.state.selectedList.length==0?false:true
    });
  }

  //输入框修改data数据源
  inputOnChange = (e) => {
    this.setState({
        value:e
    });
  }

  inputOnFocus = (e) => {
    let _value = e.target.value != "搜索内容..."?e.target.value:"";
    this.setState({
        value:_value
    });
  }

  inputOnBlur = (e) => {
    if(e.target.value == ""){
      this.setState({
          value:"搜索内容..."
      });
    }
  }

  btnSave=()=>{
    const { requestError, requestSuccess, setCurrentSelectWidgetMap } = this.props;
    setCurrentSelectWidgetMap(this.state.selectedList);

    this.props.addDesk({dataList:this.state.selectedList,parentId:this.props.parentId});
    this.setState({
      edit:false,
      selectedList:[]
    });
    this.props.close();
  }

  btnClose=()=>{
    console.log(this.state.selectedList);
    this.state.selectedList.forEach((da,i)=>{
      da.selected = "2";
    })
    this.setState({
      ...this.state
    });
    this.props.close();
  }

  setDefaultList=(da)=>{
    const {applicationsMap} = this.props;
    let allAppList = [];
    let currentAppId = "";
    da.labels.forEach((lab,j)=>{
      lab.appIds.forEach((app,i)=>{
        let appObj = applicationsMap[app];
        if(appObj){
          appObj.extend = false;
          // allService = [...allService,...appObj.service];
          allAppList.push(appObj);
          currentAppId = app;
        }
      })
    });
    return {
      labels:da.labels,
      allAppList,
      currentAppId
    }
  }

  btnTypeClick = (da)=>{
    const {labels,allAppList,currentAppId} = this.setDefaultList(da);
    this.state.labelGroups.forEach((da)=>{
        da.active = false;
    })
    da.active = true;
    this.setState({
      labelGroups:this.state.labelGroups,
      labels,
      allAppList,
      activeKey:""
    });
  }

  onBtnOnclick =(data)=>{
    const {applicationsMap} = this.props;
    const {allServicesByLabelGroup:{applications}} = this.props;
    let _data = [];
    if(data == "all"){
      applications.forEach((da,i)=>{
        _data.push(da);
      }); 
    }else{
      data.appIds.forEach((appId,i)=>{
        _data.push(applicationsMap[appId]); 
      })
    }
    console.log(" _data ");
    console.log(_data);
    this.setState({
      allAppList:_data,
      activeKey:''
    });
  }

  btnUp=(data)=>{
    this.state.allAppList.forEach((da,i)=>{
      if(da.applicationId == data.applicationId){
        da.extend = data.extend?false:true;
      }
    });
    this.setState({
      ...this.state.allAppList
    });
  }
 
  render() {
    let self = this;
    const {applicationsMap} = this.props;
    const {labelGroups,labels,activeKey,allAppList} = this.state;

    let btns = [];
    btns.push(<Button key="10012" shape='border' className={ activeKey ? 'active' : '' } onClick={()=>{this.onBtnOnclick("all")}}>全部</Button>);
    labels.map(function(da,i){
        btns.push(<Button key={`button_li_${da.labelId}-${i}`} shape='border' onClick={()=>{self.onBtnOnclick(da)}}>{da.labelName}</Button>);
    });

    let list = [];
    allAppList.forEach((item, i) => {
      const {service:{serviceId: id, serviceName: name},widgetTemplate:{serviceType}} = item;
      let _b = item.extend;
      if(serviceType=="2"){
        item.serviceId = item.applicationId;
        item.serviceName = item.applicationName;
        item.serviceType = "2";//2应用
        item.serviceIcon = item.applicationIcon;
        item.serviceCode = item.applicationCode;
        item.widgettemplateId = item.widgetTemplate.widgettemplateId;
        // item.extend = false;
        list.push(<ServiceItem  key={`widget-title-${i}-${item.serviceId}`} onChange={this.onChange} data={item} packUp={this.btnUp} /> );
      }
      item.service.forEach((da,i)=>{
        da.extend = _b;
        list.push(<ServiceItem  key={`widget-${guid()}`} onChange={this.onChange} data={da} /> );
      });
    })

    let btnGroup = [];
    labelGroups.forEach((da,i)=>{
      btnGroup.push(<Button key={`type-${i}`} className={da.active?btn_active:null} shape='border' onClick={()=>{this.btnTypeClick(da)}}>{da.labelGroupName}</Button>);
    })

    return (<div className={select_widget_list}>
       {/* <div className={widget_left}>
          <div className={title}>添加服务</div> 
       </div> */}
       <div className={widget_right}>
          <div className={searchPanel}>
              <FormControl className={form_control} value={this.state.value} onFocus={this.inputOnFocus} onBlur={this.inputOnBlur} onChange={this.inputOnChange}/>
              <div className={search_icon_con} >
                  <span>|</span>
                  <Icon type="search" className={search_icon} onClick={this.btnSearch} ></Icon>
                  <span className={search_tit} onClick={this.btnSearch} >搜索</span>
              </div>
           </div>
           <div className={panel} >
              <div className={panel_left}>
                <ButtonGroup className="btn_type">
                  {btnGroup}
                </ButtonGroup>
                <ButtonGroup vertical>
                  {btns}
                </ButtonGroup>
              </div>
              <div className={panel_right}>
                 {list}
              </div>
           </div>
           <div className={footer_btn}>
            {this.state.edit?<ButtonBrand onClick={this.btnSave} >添加</ButtonBrand>:<ButtonBrand onClick={this.btnSave} disabled={true} >添加</ButtonBrand>}
              <ButtonDefaultAlpha onClick={this.btnClose} >取消</ButtonDefaultAlpha>
          </div>
       </div>
    </div>);
  }
}

export default SelectWidgetList;
