import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import ButtonGroup from 'bee-button-group';
import Button from 'bee-button';
import { Con, Row, Col } from 'bee-layout';
import ServerItem from 'containers/serverItem';
import FormControl from 'bee-form-control';
import {ButtonBrand,ButtonDefaultLine} from 'components/button';

import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
const {getSelectWidgetList,addDesk} = manageActions;
const {requestStart, requestSuccess, requestError, } = rootActions;

import { select_widget_list,
widget_left,widget_right,search_icon,search_icon_con,
  searchPanel,panel,left,panel_right,button_group,form_control,icon,
panel_left,footer_btn,title
} from './style.css'

@connect(
  mapStateToProps(
    'manageList',
    'selectWidgetList',
    {
      namespace: 'manage',
    }
  ),
  {
    getSelectWidgetList,
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
        start: 0,
        value:"搜索内容...",
        dataList:[],  //存放数据源
        dataListBack:[],
        dataMap:null,    //存放转换后数据Map
        selectedList:[],
        edit:false
    })
  }

  componentDidMount() {
    this.getServices();
  }

  getServices(parme){
    let self = this;
    const { requestError, requestSuccess, getSelectWidgetList } = this.props;

    getSelectWidgetList(parme).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      let _dataMap = self.getArrayToMap(payload,{},0);
      let _dataList = self.getDefaultSelectCheck(_dataMap,self.props.manageList,[]);
      let _allDataList = self.getFindByTypeId("all");
      self.setState({
           dataMap:_dataMap,
           dataList:_allDataList,
           dataListBack:_allDataList
      });
      requestSuccess();
    });
  }
 
  getArrayToMap(data,dataMap,parId){
    if(!dataMap){dataMap = {}};
    for(let i = 0;i<data.length;i++){
        parId == 0 ? data[i].parId = data[i].labelId : data[i].parId = parId;
        if(data[i].children && data[i].children.length != 0){
          this.getArrayToMap(data[i].children,dataMap,data[i].labelId);
        }else{
          dataMap[data[i].serveId] = data[i];
        }
    }
    return dataMap;
  }

  getDefaultSelectCheck(alllist,manageList,dataList) {
    if(!dataList){dataList = []};
    for(let i = 0;i<manageList.length;i++){
      if(manageList[i].children && manageList[i].children.length != 0){
        this.getDefaultSelectCheck(alllist,manageList[i].children,dataList);
      }else{
          let mapItem = alllist[manageList[i].serviceId];
          if(mapItem && manageList[i].type != 2){
            mapItem.selected  = "1";
          }
      }
    }
    return dataList;
  }

  //根据type进行查询合并数组子元素
  getFindByTypeId(type){
    const {selectWidgetList} = this.props;
    let newSelectWidgetList = selectWidgetList;
    let newDataList = [];
    //深度复制。
    if(type == "all"){
        newSelectWidgetList.map(function(da,i){
            newDataList = [...newDataList,...da.children];
        })
    }
    return newDataList;
  }

  onBtnOnclick =(id)=>{
    const {selectWidgetList} = this.props;
    let parme = {};//设置参数
    let _data = [];
    if(id == "all"){
        _data = this.state.dataListBack;
    }else{
        this.props.selectWidgetList.map(function(_da,i){
            const {labelId: _id, lebalName: name} = _da;
            if(_id == id){
               _data = _da.children;
            }
        })
    }
    let dataList = [];
    Object.assign(dataList,_data);
    this.setState({
      dataList:_data
    });
  }

  onChange =(data,sele)=>{
    // console.log(this.state.dataMap);
    this.state.selectedList.push(data);
    
    this.state.dataMap[data.serveId].selected = sele;
    // console.log(this.state.dataMap);
    // if(data.selected == "3"){
    //   this.state.dataMap[data.serveId].selected = "4";
    // }else{
    //   this.state.dataMap[data.serveId].selected = "3";
    // }
    this.setState({
        ...this.state,
        edit:true
    });
  }

  //输入框修改data数据源
  inputOnChange = (e) => {
      this.setState({
          value:e
      });
  }

  btnSave=()=>{
    // this.state.selectedList.push(data);
    this.props.addDesk({dataList:this.state.selectedList,parentId:this.props.parentId});
    this.setState({
      selectedList:[]
    })
    this.props.close();
  }

  render() {
    let self = this;
    const {selectWidgetList} = this.props;
    const {dataList} = this.state;

    let btns = [];
    btns.push(<Button key="10012" shape='border' onClick={()=>{this.onBtnOnclick("all")}}>全部</Button>);
    selectWidgetList.map(function(da,i){
        btns.push(<Button key={`button_li_${da.labelId}-${i}`} shape='border' onClick={()=>{self.onBtnOnclick(da.labelId)}}>{da.labelName}</Button>);
    });
    let list = [];
    list = dataList.map((item, i) => {
        const {serveId: id, serveName: name} = item;
        return (<ServerItem  key={`widget-${id}-${i}`} onChange={this.onChange} data={self.state.dataMap[id]} id={id} /> );
    })

    return (<div className={select_widget_list}>
       <div className={widget_left}>
          <div className={title}>添加服务</div> 
       </div>
       
       <div className={widget_right}>
          <div className={searchPanel}>
              <FormControl className={form_control} value={this.state.value} onChange={this.inputOnChange}/>
              <div className={search_icon_con}>
                  <span>|</span>
                  <Icon type="uf-search" size="lg"  className={search_icon}>  搜索</Icon>
              </div>
           </div>
           <div className={panel} >
              <div className={panel_left}>
                <ButtonGroup vertical>
                  {btns}
                </ButtonGroup>
              </div>

              <div className={panel_right}>
                 {list}
              </div>

              <div className={footer_btn}>
                {this.state.edit?<ButtonBrand onClick={this.btnSave} >添加</ButtonBrand>:<ButtonBrand onClick={this.btnSave} disabled={true} >添加</ButtonBrand>}
                 <ButtonDefaultLine onClick={this.props.close} >取消</ButtonDefaultLine>
              </div>
           </div>
       </div>
    </div>);
  }
}

export default SelectWidgetList;
