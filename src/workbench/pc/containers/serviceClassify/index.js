import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';
import Button from 'bee-button';
import Icon from 'components/icon';
import InputGroup from 'bee-input-group';
import AutoComplete from 'bee-autocomplete';
import FormControl from 'bee-form-control';
import Menu from 'bee-menus';
import ButtonGroup from 'bee-button-group';
import GoTo from './goto';

import {
  bg,
  bg_wrap,
  wrap,
  clearfix,
  serviceSearch,
  ufSearch,
  appContent,
  menuBtnGroup,
  link,
  icon,
  search_tit,
  search_icon_con,
  searchPanel,
  um_content,
  icon_close,
  icon_open,
  topTabBtns,
  appsList,
  appItemImg,
  appItem_describe,
  appItem_tit,
  appItem_con
} from './style.css';

import applicationActions from 'store/root/application/actions';
// import manageActions from 'store/root/manage/actions';
import rootActions from 'store/root/actions';
// const {getSelectWidgetList} = manageActions;
const {getAllApplicationList} = applicationActions;
const {requestStart, requestSuccess, requestError} = rootActions;
@withRouter
@connect(
  mapStateToProps(
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
      value: "搜索应用",
      currentTab: 0,
      currentLabel: 0,
      currentApp: 0,
      labelsArr : [],
      allApplicationList:[],
      allLabelGroups:[],
    }
  }

  componentWillMount() {
    this.getServiceList("");
  }

  getServiceList(name){
    const {
      requestStart,
      requestSuccess,
      requestError,
      getAllApplicationList,
    } = this.props;
    // if(this.state.allApplicationList.length == 0){
      requestStart();
      getAllApplicationList(name).then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        // payload.forEach((da,i)=>{
        //   da.extend =false;
        // });
        this.setState({
          allApplicationList:payload.applications,
          allLabelGroups:payload.labelGroups
        })
        requestSuccess();
      });
    // }
  }

  handleChangeTab = (tabId) => () => {
    this.setState({
      currentTab: tabId,
      currentLabel:0,
      currentApp:0
    })
  }
  handleChangeLabel = (labelId,index) => ()=>{
    this.setState({
      currentLabel: index,
      currentApp: index
    })
  }
  // packUp = (data)=>{
  //   data.extend = data.extend?false:true;
  //   this.setState({
  //     ...this.state
  //   })
  // }

  btnSearch=()=>{
    // if(this.state.value != "搜索应用"){
      console.log(this.state.value);
      this.getServiceList(this.state.value);
    // }
  }

  onFormChange = (value) => {
    this.setState({
      value
    })
  }
  goToLink =(path)=>{
    this.props.history.push('/app/'+path);
  }

  renderList(){
    const lis = [];
    const appItems_obj = {};//应用列表map
    const {labelsArr,currentTab,currentApp,allApplicationList,allLabelGroups} = this.state; 
    if(allApplicationList.length>0){
      allApplicationList.map((
        {
          applicationId,
          applicationName,
          applicationIcon,
          applicationCode
        })=>{
          appItems_obj[applicationId] = {
            'name':applicationName,
            'icon':applicationIcon,
            'code':applicationCode
          };
      })
      const {appIds} = labelsArr[currentTab][currentApp];//当前选中tab
      appIds.map((item)=>{
        lis.push(
          <li key={appItems_obj[item].code}>
            <div className={appItemImg}><img src={appItems_obj[item].icon}/></div>
            <div className={appItem_describe}>
              <p className={appItem_tit}>{appItems_obj[item].name}</p>
              <p className={appItem_con}>沟通协作一步到位</p>
            </div>
          </li>
        )
      })
    }
    return lis;
  }
  renderBtns() {
    const btns = [];
    const { labelsArr,currentTab,currentLabel, allLabelGroups} = this.state;
    labelsArr.length = 0;
    allLabelGroups.map(({labels},index)=>{
      labelsArr.push(allLabelGroups[index].labels);
    })
    
    {
      labelsArr[currentTab] ? 
      (
        labelsArr[currentTab].map(({labelId,labelName},index)=>{
          btns.push(
            <Button className={ currentLabel === index ? 'active' : '' }
              onClick={this.handleChangeLabel(labelId,index)}
              key={labelId}>
              {labelName}
            </Button>
          )
        })
      ):null
    }
    return btns;
  }
  renderLabelGroups(){
    const labelbtns = [];
    const {currentTab,allLabelGroups} = this.state;
    allLabelGroups.map(({labelGroupName },index) =>{
      labelbtns.push(
        <Button className={ currentTab === index ? 'active' : '' }
          onClick={this.handleChangeTab(index)}
          shape="border"
          key={index}>
          {labelGroupName}
        </Button> 
      );
    });
    return labelbtns;
  }
  //输入框修改data数据源
  inputOnChange = (e) => {
    this.setState({
        value:e
    });
  }

  inputOnFocus = (e) => {
    let _value = e.target.value != "搜索应用"?e.target.value:"";
    this.setState({
        value:_value
    });
  }

  inputOnBlur = (e) => {
    if(e.target.value == ""){
      this.setState({
          value:"搜索应用"
      });
    }
  }

  render() {
    const { value, options, current } = this.state;
    const btns = this.renderBtns();
    const list = this.renderList();
    const labelGroups = this.renderLabelGroups();

    return (
      <div className={bg+" um-content um-vbox"}>
        <div className={bg_wrap+" um-content um-vbox"}>
          <div className={`${wrap} ${clearfix} um-content um-vbox`}>
            <div className={searchPanel}>
              <FormControl className={serviceSearch} value={this.state.value} onFocus={this.inputOnFocus} onBlur={this.inputOnBlur} onChange={this.inputOnChange}/>
              <div className={search_icon_con}>
                  <span>|</span>
                  <Icon type="search" className={ufSearch} onClick={this.btnSearch}></Icon>
                  <span className={search_tit} onClick={this.btnSearch}>搜索</span>
              </div>
            </div>
            <div className={topTabBtns}>
              <ButtonGroup>
                {labelGroups}
              </ButtonGroup>
            </div>
            <div className={um_content}>
              <div className={ menuBtnGroup}>
                <ButtonGroup vertical>
                  {btns}
                </ButtonGroup>
              </div>
              <div className={appContent+" um-bf1 um-content"}>
                <ul className={`${appsList} ${clearfix}`}>
                  {list}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default serviceClassify;
