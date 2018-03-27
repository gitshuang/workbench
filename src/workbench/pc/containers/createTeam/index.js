import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import teamActions from 'store/root/team/actions';
import homeActions from 'store/root/home/actions';
import FormControl from 'bee/form-control';
import Checkbox from 'bee/checkbox';
import Button from 'bee/button';
import Icon from 'pub-comp/icon';

import {check} from './checkTenantStatus'
import ProgressBar from 'bee/progressbar';
const { requestStart, requestSuccess, requestError } = rootActions;
const { changeUserInfoDisplay, getUserInfo } = homeActions;
const { uploadApplication, createTeam} = teamActions;
import {
  wrap,
  item,
  image,
  footer,
  create_team_cont,footer_hr,
  upload,
  titlp_lab,
  name_error,
  process_loading,
  process_loading_content,
  opacityHidden,
  opacityShow
} from './index.css';

@withRouter
@connect(
  mapStateToProps(
    'teamData',
    {
      namespace: "team"
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    uploadApplication,
    createTeam,
    changeUserInfoDisplay,
    getUserInfo
  }
)

class CreateTeamContent extends Component {
  constructor(props) {
    super(props);
    this.imgObj = {};
    this.isClick = false;
    this.state = {
      value: "",
      imgWarning: "",
      imgUrl: "",
      backUrl : "",    // 上传成功后返回的url
      disabled:false,
      error:false,
      processValue:0,//定义一个进度条的value
      tenantId:'',//tenantId
    }
  }

  componentWillMount() {

  }

  onChange = (e) => {
    //const { value } = this.state;
    const value = e.target.value;
    if( value.length > 60 || value == ""){
      this.setState({
        value,
        error:true
      })
      return false;
    }
    this.setState({
      value,
      error:false
    })
  }

  imgChange = (e) => {
    if(e.target.value.trim().length===0){
      return false;
    }
    const { uploadApplication, requestStart, requestSuccess, requestError } = this.props;
    let val = e.target.value && e.target.value.substr(e.target.value.lastIndexOf("."));
    if(val && !val.match( /.jpg|.gif|.png|.bmp|.svg/i ) ){
      this.setState({
        imgWarning: "必须是一个图片"
      });
      return false;
    }
    let obj = this.refs.btn_file.files[0];
    let imgUrl = window.URL.createObjectURL(obj);
    this.setState({
      imgUrl
    });
    const form = new FormData();
    form.append('btn_file', obj);

    requestStart();
    uploadApplication(form).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      }
      const backUrl = payload.url;
      this.setState({
        backUrl: backUrl
      });
      requestSuccess();
    });
  }


  create = () => {
    
    if(this.isClick){
      return false;
    }
    const { history, createTeam, requestStart, requestSuccess, requestError, changeUserInfoDisplay, getUserInfo } = this.props;
    const { value, backUrl } = this.state;

    this.isClick = true;
    if ( !value ){
      // alert("请输入团队名称");
      this.setState({
        error:true
      })
      return false;
    }
    let data = {
      tenantName: value
    };
    if (backUrl) {
      data.logo = backUrl;
    }
    this.setState({
      disabled:true
    })
    requestStart();
    createTeam(data).then(({error, payload}) => {
      this.setState({
        disabled:false
      });
      requestSuccess();
      if (error) {
        requestError(payload);
        return;
      }
      // getUserInfo();
      // history.replace('/');
      // changeUserInfoDisplay();
      const tenantId = payload.tenantId;
      // window.location.href = "/?tenantId=" + tenantId + "&switch=true";
      localStorage.setItem('create', "1");
      this.setState({tenantId:tenantId})
    });

  }

  goToLoading = (tenantId) =>{
    let self = this;
    var loadingInterVal = setInterval(function () {
        if(self.state.processValue === 95) {
          self.setState({processValue:95})
        }else{
          self.setState({processValue:self.state.processValue+5})
        }
    },300);
    check(tenantId,this.goToLoadingAfter,loadingInterVal);
  }

  goToLoadingAfter = (loadingInterVal) =>{
    this.setState({processValue:100})//直接结束
    clearInterval(loadingInterVal);
    window.location.href  ="/?tenantId=" + this.state.tenantId + "&switch=true";
  }

  render() {
    const { value, imgUrl, imgWarning ,disabled,error} = this.state;
    let _error = error?"block":"none";
    let now = this.state.processValue;
    return (
      <div className={wrap}>
        <h5>创建团队</h5>
        <hr />
        <div className={create_team_cont}>
          <div className={item+" um-box " }>
            <label>团队名称<span>&nbsp;*&nbsp;</span></label>
            <input
              placeholder="最多60个字符"
              value={ value }
              onChange={(e)=>{this.onChange(e)}}
            />
          </div>
          <div className={`${name_error} `} style={{display:`${_error} `}}>
            请输入团队名称
          </div>

          <div className={`${item} um-box ${upload}`}>
            <label>团队头像&nbsp; &nbsp; </label>
            <div className={image}>
                { imgUrl ? <img ref="imgSrc" src={ imgUrl } /> : null }
                <div>
                  <Icon type="copyreader" />
                <input type="file" ref="btn_file" accept="image/x-png,image/gif,image/jpeg,image/bmp" onChange={(e)=>{ this.imgChange(e) }} />
                </div>
                <span className={titlp_lab}>{"图片大小<=200K​"}</span>
              </div>
          </div>
        </div>
        <hr className={footer_hr}/>
        <div className={footer}>
          <div className={ now ?`${process_loading_content} ${opacityShow}`: process_loading_content }>
              <ProgressBar   className={ process_loading } striped={false} now = {now} label={`${now}%`} ></ProgressBar>
              <Icon type="loading" />
          </div>
          <Button className={now?opacityHidden:''} onClick={this.create} disabled={disabled} >创建</Button>
        </div>
      </div>
    )
  }
}

export default CreateTeamContent;
