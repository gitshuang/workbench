import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import teamActions from 'store/root/team/actions';
import homeActions from 'store/root/home/actions';

//
import { FormControl, Checkbox, Button } from 'tinper-bee';

const { requestStart, requestSuccess, requestError } = rootActions;
const { changeUserInfoDisplay, getUserInfo } = homeActions;
const { uploadApplication, createTeam} = teamActions;
import {
  wrap,
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
      backUrl : ""    // 上传成功后返回的url 
    }
  }

  componentWillMount() {

  }

  onChange = (e) => {
    //const { value } = this.state;
    const value = e.target.value;
    if( value.length > 60 ){
      alert("123");
      return false;
    }
    this.setState({
      value
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
    const { history, createTeam, requestStart, requestSuccess, requestError, changeUserInfoDisplay, getUserInfo } = this.props;
    const { value, backUrl } = this.state;
    if ( !value ){
      alert("请输入团队名称");
      return false;
    }
    let data = {
      tenantName: value
    };
    if (backUrl) {
      data.logo = backUrl;
    }
    requestStart();
    createTeam(data).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      } 
      requestSuccess();
      getUserInfo();
      history.replace('/');
      changeUserInfoDisplay();
    });
    
  }

  render() {
    const { value, imgUrl, imgWarning } = this.state;
    return (
      <div className={wrap}>
        <h5>创建团队</h5>  
        <div className="um-box">
          <label>团队名称<span>*</span>：</label> 
          <input
            className="um-bf1"
            placeholder="最多60个字符"
            value={ value }
            onChange={(e)=>{this.onChange(e)}}
          />
        </div>
        <div className="um-box" style={{margin:"20px 0"}}>
          <label>团队头像：</label>
          <div>
            <div>
              <img ref="imgSrc" src={ imgUrl } />
            </div>
            {
              imgWarning ? <p>{ imgWarning }</p> : null
            }
            <input type="file" ref="btn_file" onChange={(e)=>{ this.imgChange(e) }} />
          </div>
        </div>
        <div>
          <Button onClick={this.create}>创建</Button>
        </div>
      </div>  
    )
  }
}

export default CreateTeamContent;
