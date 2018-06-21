import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import Upload from 'containers/upload';
import rootActions from 'store/root/actions';
import teamActions from 'store/root/team/actions';
import homeActions from 'store/root/home/actions';
import FormControl from 'bee/form-control';
import Checkbox from 'bee/checkbox';
import Button from 'bee/button';
import Icon from 'pub-comp/icon';
import {check} from './checkTenantStatus'
import Progress from 'pub-comp/progress';
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
  opacityShow,
  loading_desc,
  submit_class,
  error_block,error_none
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
    this.state = {
      value: "",
      imgWarning: "",
      imgUrl: "",
      backUrl : "",    // 上传成功后返回的url
      logo:"",
      disabled:false,
      error:false,
      processValue:0,//0表示未开始，1表示开始progress
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

  // imgChange = (e) => {
  //   if(e.target.value.trim().length===0){
  //     return false;
  //   }
  //   const { uploadApplication, requestStart, requestSuccess, requestError } = this.props;
  //   let val = e.target.value && e.target.value.substr(e.target.value.lastIndexOf("."));
  //   if(val && !val.match( /.jpg|.gif|.png|.bmp|.svg/i ) ){
  //     this.setState({
  //       imgWarning: "必须是一个图片"
  //     });
  //     return false;
  //   }
  //   let obj = this.refs.btn_file.files[0];
  //   let imgUrl = window.URL.createObjectURL(obj);
  //   this.setState({
  //     imgUrl
  //   });
  //   const form = new FormData();
  //   form.append('btn_file', obj);

  //   requestStart();
  //   uploadApplication(form).then(({error, payload}) => {
  //     if (error) {
  //       requestError(payload);
  //     }
  //     const backUrl = payload.url;
  //     this.setState({
  //       backUrl: backUrl
  //     });
  //     requestSuccess();
  //   });
  // }

  setUrl(name,url){
    this.state[name] = url;
    this.setState({
      ...this.state
    })
  }

  create = () => {
    const { history, createTeam, requestStart, requestSuccess, requestError, changeUserInfoDisplay, getUserInfo } = this.props;
    const { value, logo } = this.state;
    if ( !value || value == ""){
      this.setState({
        error:true
      })
      return false;
    }
    let data = {
      tenantName: value
    };
    if (logo) {
      data.logo = logo;
    }
    this.setState({
      disabled: false
    })
    //this.setState({tenantId:"tenantId",processValue:1});//测试去掉
    requestStart();
    createTeam(data).then(({error, payload}) => {
      this.setState({
        disabled: true
      });
      if (error) {
        requestError(payload);
        return;
      }
      
      requestSuccess();
      
      // getUserInfo();
      // history.replace('/');
      // changeUserInfoDisplay();
      const tenantId = payload.tenantId;
      // window.location.href = "/?tenantId=" + tenantId + "&switch=true";
      localStorage.setItem('create', "1");
      this.setState({tenantId:tenantId,processValue:1});//把processValue变成1.那么就开是走progress
    });
  }
  
  render() {
    const {logo, value, imgUrl, imgWarning ,disabled,error} = this.state;
    // let _error = error?"block":"none";
    let _error = error?error_block:error_none;
    let now = this.state.processValue;
    return (
      <div className={wrap}>
        <h5>create team</h5>
        <hr />
        <div className={create_team_cont}>
          <div className={item+" um-box " }>
            <label>team name<span>&nbsp;*&nbsp;</span></label>
            <input
              placeholder="less than 60 bit"
              value={ value }
              onChange={(e)=>{this.onChange(e)}}
            />
          </div>
          <div className={`${name_error} ${_error}`}>
            name input
          </div>

          <div className={`${item} um-box ${upload}`}>
            <label>avatar&nbsp; &nbsp; </label>
            <div className={`${image}`}>
                <Upload name='logo' logo={logo?logo:""} onChange={(e)=>{this.setUrl("logo",e)}}  tip="" />
                {/* { imgUrl ? <img ref="imgSrc" src={ imgUrl } /> : null }
                <div>
                  <Icon type="copyreader" />
                <input type="file" ref="btn_file" accept="image/x-png,image/gif,image/jpeg,image/bmp" onChange={(e)=>{ this.imgChange(e) }} />
                </div> */}
                {/* <span className={titlp_lab}>{"size of image<=200K​"}</span> */}
              </div>
          </div>
        </div>
        <hr className={footer_hr}/>
        <div className={footer}>
          <div className={ now ?`${process_loading_content} ${opacityShow}`: process_loading_content }>
              <Progress check={check} tenantId={this.state.tenantId} startFlag={now} loadingDesc={'team info loading…'}/>
          </div>
          <Button className={`${now?opacityHidden:''} ${submit_class}`} onClick={this.create} disabled={disabled} >create</Button>
        </div>
      </div>
    )
  }
}

export default CreateTeamContent;
