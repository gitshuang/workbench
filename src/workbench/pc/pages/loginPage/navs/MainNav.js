
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import Select from 'bee/select';
import{
  MainNav,
  headerDesc,
  leftCon,
  middleCon,
  rightCon,
  languageClass,
} from './MainNav.css';
import LogoSvg from './logo.svg';
const { setCurrentNot, getAllEnableNot, getCurrentNot } = rootActions;
@withRouter
@connect(
    mapStateToProps(
      {
        namespace: 'home',
      },
    ),
    {
      setCurrentNot,
      getAllEnableNot,
      getCurrentNot,
    },
  )
class  MainNavPanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      defaultValue: 'zh_CN',
      languageList: [
        {
          value: 'zh_CN',
          context: '1'
        },
        {
          value: 'en_US',
          context: '2'
        },
        {
          value: 'zh_TW',
          context: '3'
        },
      ],
    }
  }
  componentDidMount() {
    //  //获取默认
    //  this.getCurrentLan();
    //新增 添加多语的所有语言
    this.getAllEnableFunc();
  }

  getAllEnableFunc = () => {
    const { getAllEnableNot } = this.props;
    getAllEnableNot().then(({ error, payload }) => {
      if (error) {
        return;
      }
      let languageListVal = [], item = {}, defaultValue;
      payload.map((item, index) => {
        item = { value: item.langCode, context: item.dislpayName }
        languageListVal.push(item);
      });
      this.setState({
        languageList: languageListVal
      },()=>{this.getCurrentLan();})
    });
  }

  getCurrentLan = () => {
    const { getCurrentNot,lanCallBack } = this.props;
    getCurrentNot().then(({ error, payload }) => {
      if (error) {
        return;
      }
      this.setState({
        defaultValue: payload.langCode,
      },()=>{
        lanCallBack(payload.langCode)
      });
    });
    
  }

  onChangeLanguage = (value) => {
    this.props.setCurrentNot(value).then(({ error, payload }) => {
      if (error) {
        return;
      }
      window.location.reload();
    });
  }
  open =(type)=>{
    if(type =='service'){
      this.props.activeIndex!=='2'&&  this.props.history.push('/service')
    }else if(type == 'aboutus'){
      this.props.activeIndex!=='4'&&this.props.history.push('/aboutus')
    }else if(type == 'login'){
      this.props.activeIndex!=='1' &&this.props.history.push('/')
    }else if(type == 'open'){
      window.open('https://open.diwork.com');
    }
  }
  goToHome = () =>{
    this.props.match && this.props.match.path!=='/'&&this.props.history.push('/');

  }
  handleChange =(value) =>{
    // const { onChangeLanguage } = this.props.language;
    this.onChangeLanguage(value);
  }
  render(){
    const {defaultValue, languageList}  = this.state;
    return(
      <div className={MainNav} id="MainNav">
          <div className={leftCon} onClick={this.goToHome} >
            <img src={LogoSvg} className="companylogoSvg"/>
            <span className={headerDesc}>数字化工作入口</span>
          </div>
          <div className={middleCon}>
            <a  className={`middleItem ${this.props.activeIndex*1 === 1?'actived':null}`} onClick={()=>{this.open('login')}}>首页</a>
            <a  className={`middleItem ${this.props.activeIndex*1 === 2?'actived':null}`} onClick={()=>{this.open('service')}}>服务支持</a>
            <a  className={`middleItem ${this.props.activeIndex*1 === 3?'actived':null}`} onClick={()=>{this.open('open')}}>开放平台</a>
            <a  className={`middleItem ${this.props.activeIndex*1 === 4?'actived':null}`} onClick={()=>{this.open('aboutus')}}>联系我们</a>
          </div>
          {
            this.props.btnShow ?
            (
            <div className={rightCon}>
                <a className="loginBtn" onClick={this.props.loginClick}>登录</a>
                <a className="registryBtn" target="_blank" href={this.props.registryUrl}>立即注册</a>
            </div>
            ):(
              <div className={`${rightCon} ${languageClass}`}>
                <Select
                      value={defaultValue}
                      onChange={this.handleChange}
                      dropdownClassName={"gnoreclass"}
                      style={{width:"90px"}}
                    >
                    {
                      languageList.map((item,index)=>{
                        return (
                          <Option value={item.value} key={index}>{item.context}</Option>
                        )
                      })
                    }
                </Select>
               
             
            </div>
            )

        }

          
          </div>
    )
  }

}


export default MainNavPanel;
