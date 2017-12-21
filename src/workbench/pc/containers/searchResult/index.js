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
import Select from 'bee-select';
import Tabs, { TabPane } from 'bee-tabs';

import {
  bg,
  recently,
  promotion,
  tabPane1,
  tabPane2,
  tabContent,
  clearfix,
  mleft50,
  h_icon,
  h_name,
  h_contact,
  search_service,
  search_help,
  bg_wrap,
  wrap,
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
  icon_open
} from './style.css';
import _default_icon from 'assets/image/wgt/default.png';
import yonyouSpace1 from 'assets/image/wgt/yonyouSpace1.png';
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

class searchResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "关键词",
      isPackUp:false,
      current: undefined,
      list2 : [],
      listAll : [],
      dataList : [],
    }
  }

  componentWillMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getAllApplicationList,
      allApplicationList,
    } = this.props;
    if(allApplicationList.length == 0){
      requestStart();
      getAllApplicationList().then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        requestSuccess();
      });
    }
  }

  handleClick = (labelId) => () => {
    this.setState({
      current: labelId,
    })
  }



  btnSearch=()=>{
    if(this.state.value != "关键词"){
      console.log(this.state.value);
    }
  }

  onFormChange = (value) => {
    this.setState({
      value
    })
  }




  //输入框修改data数据源
  inputOnChange = (e) => {
    this.setState({
        value:e
    });
  }

  inputOnFocus = (e) => {
    let _value = e.target.value != "关键词"?e.target.value:"";
    this.setState({
        value:_value 
    });
  }

  inputOnBlur = (e) => {
    if(e.target.value == ""){
      this.setState({
          value:"关键词"
      });
    }
  }

  render() {
    const { value, options, current } = this.state;

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
            <div className={"um-content" + ` ${tabContent}`}>
            
              <Tabs
                defaultActiveKey="1"
                onChange={this.callback}
                className="demo-tabs"
              >
                <TabPane tab='通讯录(2)' key="1" className={tabPane1}>
                  <ul className={recently}>
                    <li >
                      <div className={h_icon}><img src={_default_icon}/></div>
                      <div className={h_name}>
                        <p><span>我<font >嘎嘎</font></span><span>市场部</span></p>
                        <p>办公电话 : 18372893749</p>
                      </div>
                      <div className={`${h_contact} ${mleft50}`}><Icon title="发邮件" type="e-mail" /></div>
                      <div className={h_contact}><Icon title="发消息" type="chat" /></div>
                    </li>
                    <li >
                      <div className={h_icon}><img src={_default_icon}/></div>
                      <div className={h_name}>
                        <p><span>我<font >嘎嘎</font></span><span>市场部</span></p>
                        <p>办公电话 : 18372893749</p>
                      </div>
                      <div className={`${h_contact} ${mleft50}`}><Icon title="发邮件" type="e-mail" /></div>
                      <div className={h_contact}><Icon title="发消息" type="chat" /></div>
                    </li>
                  </ul>
                  {this.state.dataList.length != 0 ?<Button onClick={this.handleClick}>清空列表</Button>:<Button>没有数据!</Button>}
                </TabPane>
                <TabPane tab='应用/服务(3)' key="2" className={tabPane1}>
                  <ul className={`${recently} ${clearfix}`}>
                    <li className={search_service}>
                      <div className={h_icon}><img src={yonyouSpace1}/></div>
                      <div className={h_name}>
                        <p><span>友<font >嘎嘎</font></span></p>
                        <p >办公协同、沟通协作等核心价值，高…</p>
                      </div>
                    </li>
                  </ul>
                </TabPane>
                <TabPane tab='其他内容(3)' key="3" className={tabPane1}>
                  <ul className={`${recently} ${clearfix}`}>
                    <li >
                      <div className={h_icon}><img src={_default_icon}/></div>
                      <div className={h_name}>
                        <p className={search_help}>报账产<font >嘎嘎</font>文档.word</p>
                      </div>
                      <div className={search_help}>800kb</div>
                    </li>
                  </ul>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default searchResult;
