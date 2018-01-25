import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps ,guid} from '@u';
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
  ie_searchPanel,
  ie_um_content
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
      value: "",
      currentTab: 0,
      currentLabel: undefined,
      currentApp: 0,
      labelsArr : [], //存放labels
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
      currentLabel:undefined,
      currentApp:0
    })
  }
  handleChangeLabel = (index) => ()=>{
    this.setState({
      currentLabel: index,
      currentApp: index
    })
  }

  btnSearch=()=>{
    const { allApplicationList } = this.props;
    const { value } = this.state;
    const newArr = allApplicationList.applications.filter((item,index) => {
      return item.applicationName.indexOf(value) > -1 
     });
     this.setState({
      allApplicationList: newArr
    });
  }

  onFormChange = (value) => {
    this.setState({
      value
    })
  }

  renderList(){
    const lis = [];
    const appItems_obj = {};//转换后的数据Map
    const {labelsArr,currentTab,currentLabel,currentApp,allApplicationList,allLabelGroups} = this.state; 
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
      if(currentLabel===undefined){ //全部
        allApplicationList.map(({applicationCode,applicationIcon,applicationName})=>{
          lis.push(
            <GoTo
              key={`app-${guid()}`}
              code={applicationCode}
              icon={applicationIcon}
              appName={applicationName}
            />
          )
        })
      }else{ //其它
        const {appIds} = labelsArr[currentTab][currentApp];//当前需要显示的appId序列
        appIds.map((item)=>{
          lis.push(
            <GoTo
              key={`app-${guid()}`}
              code={appItems_obj[item].code}
              icon={appItems_obj[item].icon}
              appName={appItems_obj[item].name}
            />
          )
        })
      }
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
    btns.push(<Button className={ currentLabel === undefined ? 'active' : '' } key="all" onClick={this.handleChangeLabel()}>全部</Button>);
    {
      labelsArr[currentTab] ? 
      (
        labelsArr[currentTab].map(({labelId,labelName},index)=>{
          btns.push(
            <Button className={ currentLabel === index ? 'active' : '' }
              onClick={this.handleChangeLabel(index)}
              key={labelId}>
              {labelName}
            </Button>
          )
        })
      ):null
    }
    return btns;
  }
  //类别、领域
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

  // inputOnFocus = (e) => {
  //   if(e.target.value != ""){
  //     this.setState({
  //         value:e.target.value
  //     });
  //   }
  // }

  // inputOnBlur = (e) => { 
  // }

  render() {
    const { value,currentLabel } = this.state;
    const btns = this.renderBtns();
    const list = this.renderList();
    const labelGroups = this.renderLabelGroups();

    return (
      <div className={bg+" um-content um-vbox"}>
        <div className={bg_wrap+" um-content um-vbox"}>
          <div className={`${wrap} ${clearfix} um-content um-vbox`}>
            <div className={`${(!!window.ActiveXObject)?ie_searchPanel:searchPanel}`}>
              <FormControl className={serviceSearch} placeholder="搜索应用" value={this.state.value} onChange={this.inputOnChange}/>
              <div className={search_icon_con}>
                  <span>|</span>
                  <Icon type="search" className={ufSearch} onClick={this.btnSearch}></Icon>
                  <span className={search_tit} onClick={this.btnSearch}>搜索</span>
              </div>
            </div>
            
            <div className={`${(!!window.ActiveXObject)?ie_um_content:um_content}`}>
              <div>
                <div className={topTabBtns}>
                  <ButtonGroup>
                    {labelGroups}
                  </ButtonGroup>
                </div>
                <div className={ menuBtnGroup}>
                  <ButtonGroup vertical>
                    {btns}
                  </ButtonGroup>
                </div>
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
