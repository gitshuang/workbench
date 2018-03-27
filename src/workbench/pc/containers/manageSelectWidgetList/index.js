import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'pub-comp/icon';
import ButtonGroup from 'bee/button-group';
import Button from 'bee/button';
import ServiceItem from 'containers/serviceItem';
import FormControl from 'bee/form-control';
import {ButtonBrand,ButtonDefaultAlpha,ButtonDefaultLine} from 'pub-comp/button';

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
panel_left,footer_btn,title,search_tit,active,btn_active,btn_type,server_type
} from './style.css'


@connect(
  mapStateToProps(
    'applicationsMap',
    'manageList',
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
        data:{},//接口全部数据
        applications:[],
        value:"",
        edit:false
    })
  }

  componentDidMount() {
    this.getServices();
  }

  getServices(serviceName=""){
    const { requestError, requestSuccess, getAllServicesByLabelGroup } = this.props;
    getAllServicesByLabelGroup(serviceName).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      const {labelGroups} = payload;
      labelGroups.forEach((da,i)=>{
        i === 0?da.active = true:da.active = false;
        const {labels} = da;
        labels.splice(0, 0, {labelName:"全部",labelId:"all",active:true}); 
      });
      this.setState({
        data:payload,
        applications:payload.applications
      })
      requestSuccess();
    });
  }
  
  btnSearch=()=>{
    const {data:{applications},value} = this.state;
    let _applications = [];
    if(value == ""){
      _applications = applications;
    }else{
      applications.forEach((da)=>{ 
        console.log("--",da.applicationName);
        da.applicationName.indexOf(value)>=0?_applications.push(da):"";
      })
    }
    this.setState({
      applications:_applications
    })
  }

  onChange=(data,sele)=>{
    const {applications} = this.state;
    let selectObj = null;
    if(data.widgetTemplate.serviceType == "1"){//服务
      selectObj = applications.find((da)=>da.applicationId == data.applicationId);
      let _service = selectObj.service.find((da)=>da.serviceId == data.serviceId);
      _service.selected = sele;
    }if(data.widgetTemplate.serviceType == "2"){//应用
      selectObj = applications.find((da)=>da.applicationId == data.applicationId);
      selectObj.selected = sele;
    }

    let _edit = false;
    for (var da of applications) { 
      if(da.selected == "3"){ 
        _edit = true;break;
      }else{
        if(da.service.length == 0) continue; 
        let _ser = da.service.find((_da)=>_da.selected == "3");
        if(_ser){
          _edit = true;
          break;
        }
      }
    }
    this.setState({
      ...this.state,
        edit:_edit
    });
  }

  //输入框修改data数据源
  inputOnChange = (e) => {
    this.setState({
        value:e
    });
  }

  btnSave=()=>{
    console.log(this.state);
    const {applications} = this.state;
    const { requestError, requestSuccess, addDesk ,parentId} = this.props;
    let selectedList = [];
    for (var da of applications) { 
      if(da.selected == "3"){ 
         selectedList.push(da);
      }
      if(da.service.length == 0) continue;
      da.service.forEach((_da,j)=>{
        if(_da.selected == "3"){
          selectedList.push(_da);
        }
      });
    }
    addDesk({dataList:selectedList,parentId});
    this.setState({
      edit:false
    });
    this.props.close();
  }

  btnClose=()=>{
    this.props.close();
  }


  btnTypeClick = (da)=>{
    const {data:{labelGroups}} = this.state;
    labelGroups.forEach((_da,i)=>{
      _da.labelGroupName == da.labelGroupName?_da.active = true:_da.active = false;
    })
    this.setState({
      ...this.setState
    })
  }

  onBtnOnclick =(_data)=>{
    const {applicationsMap} = this.props;
    const {data,data:{labelGroups}} = this.state;
    let _applications = [];
    let activeLabelGroups = labelGroups.find((da)=>da.active);
    activeLabelGroups.labels.forEach((da)=>{da.active=false});
    if(_data.labelId == "all"){
      let allLabel = activeLabelGroups.labels.find((da)=>da.labelId == "all");
      allLabel.active = true;
      _applications = data.applications;
    }else{
      let labels = activeLabelGroups.labels.find((da)=>da.labelId == _data.labelId);
      labels.active = true;
      labels.appIds.forEach((appId)=>{
        _applications.push(applicationsMap[appId]);
      })
    }
    this.setState({
      ...this.state,
      applications:_applications
    })
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

  onKeyup=(e)=>{ 
    if(e.keyCode === 13){
      this.btnSearch(e);
    }
  }

  render() {
    const {data:{labelGroups=[]},applications} = this.state;
    let btns = [];
     labelGroups.forEach(({active,labels},i)=>{
      if(active){
        labels.forEach((da,j)=>{
          btns.push(<Button key={`button_li_${da.labelId}-${i}-${j}`} shape='border' 
          className={ da.active? 'active' : '' } onClick={()=>{this.onBtnOnclick(da)}}>{da.labelName}</Button>);
        })
      }
    })
    let list = [];
    applications.forEach((item, i) => {
      const {service,service:{serviceId: id, serviceName: name},widgetTemplate:{serviceType}} = item;
      let _b = item.extend;
      if(serviceType=="2"){
        item.serviceId = item.applicationId;
        item.serviceName = item.applicationName;
        item.serviceType = "2";//2应用
        item.serviceIcon = item.applicationIcon;
        item.serviceCode = item.applicationCode;
        item.widgettemplateId = item.widgetTemplate.widgettemplateId;
        // item.extend = false;
        list.push(<ServiceItem  key={`widget-title-${i}-${item.serviceId}`} onChange={this.onChange} data={item} packUp={this.btnUp} arrow={service && service.length>0?true:false} /> );
      }
      item.service.forEach((da,i)=>{
        da.extend = _b;
        list.push(<ServiceItem  key={`widget-${guid()}`} onChange={this.onChange} data={da} /> );
      });
    })
    return (<div className={select_widget_list}>
       {/* <div className={widget_left}>
          <div className={title}>添加服务</div>
       </div> */}
       <div className={widget_right}>
          <div className={searchPanel}>
              <FormControl className={form_control} placeholder="搜索内容..." value={this.state.value} onKeyDown={this.onKeyup}  onChange={this.inputOnChange}/>
              <div className={search_icon_con} >
                  <span>|</span>
                  <Icon type="search" className={search_icon} onClick={this.btnSearch} ></Icon>
                  <span className={search_tit} onClick={this.btnSearch} >搜索</span>
              </div>
           </div>
           <div className={panel} >
              <div className={panel_left}>
                <div className={btn_type}>
                  <ButtonGroup > 
                    { 
                      labelGroups.map((da,i)=><Button key={`type-${i}`} className={da.active?btn_active:null} shape='border' onClick={()=>{this.btnTypeClick(da)}}>{da.labelGroupName}</Button>)
                    }
                  </ButtonGroup>
                </div>
                <div className={server_type}>
                  <ButtonGroup vertical>
                    {btns}
                  </ButtonGroup>
                </div>
              </div>
              <div className={panel_right}>
                <div>{list}</div>
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
