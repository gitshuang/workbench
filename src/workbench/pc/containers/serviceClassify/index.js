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
  icon_open
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
      current: undefined,
      listAll : [],
      allApplicationList:[]
    }
  }

  componentWillMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getAllApplicationList,
    } = this.props;
    if(this.state.allApplicationList.length == 0){
      requestStart();
      getAllApplicationList().then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        payload.forEach((da,i)=>{
          da.extend =false;
        });
        this.setState({
          allApplicationList:payload
        })
        requestSuccess();
      });
    }
  }

  handleClick = (labelId) => () => {
    this.setState({
      current: labelId,
    })
  }

  packUp = (data)=>{
    data.extend = data.extend?false:true;
    this.setState({
      ...this.state
    })
  }

  btnSearch=()=>{
    if(this.state.value != "搜索应用"){
      console.log(this.state.value);
    }
  }

  onFormChange = (value) => {
    this.setState({
      value
    })
  }
  goToLink =(path)=>{
    this.props.history.push('/app/'+path);
  }
  renderList() {
    let listAll = [];
    const { current ,extend} = this.state;
    const {
      allApplicationList
    } = this.state;
    if (current) {
      const label = allApplicationList.find(({
        labelId,
      }) => {
        return labelId === current;
      });
      listAll = label.children;
    } else {
      allApplicationList.forEach(({children}) => {
        listAll = listAll.concat(children);
      })
    }
    return listAll.map((app) => {
      const {
        applicationIcon,
        applicationName,
        applicationCode,
        service,
      } = app;

      return (
        <div key={applicationCode} >
          <header>
            <div onClick={ ()=>{this.goToLink(applicationCode)} }>
              <img src={applicationIcon}/>
              <span>{ applicationName }</span>
            </div>
            <Icon type={app.extend?"pull-down":"upward"} title={ app.extend ? '展开' : '收起' } onClick={()=>{this.packUp(app)}}></Icon>
          </header>
          {
            !app.extend?(
              <hgroup className="um-box">
                {
                  service.map(({
                    serveName,
                    serveCode,
                    serveIcon,
                  }) => {
                    return (
                      <GoTo
                        key={serveCode}
                        name={serveName}
                        icon={serveIcon}
                        to={`/serve/${serveCode}`} />
                    );
                  })
                }
              </hgroup>
            ):null
          }

        </div>
      )
    })
;
  }
  renderBtns() {
    const btns = [];
    const {
      current,
      allApplicationList,
    } = this.state;

    btns.push(
      <Button className={ current ? '' : 'active' }
        onClick={this.handleClick()}
        key="all">
        全部
      </Button>
    );

    allApplicationList.forEach(({ labelId, labelName }) =>{
      btns.push(
        <Button className={ current === labelId ? 'active' : '' }
          onClick={this.handleClick(labelId)}
          key={labelId}>
          {labelName}
        </Button>
      );
    });
    return btns;
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
            <div className={um_content}>
              <div className={menuBtnGroup}>
                <ButtonGroup vertical>
                  {btns}
                </ButtonGroup>
              </div>
              <div className={appContent+" um-bf1 um-content"}>
                {list}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default serviceClassify;
