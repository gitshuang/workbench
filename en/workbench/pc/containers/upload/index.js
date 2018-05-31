import React, { Component } from 'react';
import { ButtonBrand } from 'pub-comp/button';
import { uploadApplication }from 'store/root/api';
import Icon from 'pub-comp/icon';
import {getHost} from '@u';
import { upload_page, appImg, appValidate, uploadImg ,edit,titlp_lab,
  hidden_form,icon
  ,form_btnFile,ie9_form,uploadImgIe9} from './style.css';

class UploadPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      applicationIcon:"",
      imgWarning:false,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.logo != this.state.applicationIcon){
        this.setState({
          applicationIcon: nextProps.logo
        })
    }
  }

  uploadImage = () => {
    this.refs.file.click();
  }
  imgChange = (e) => {
    if(e.target.value.trim().length===0){
      this.setState({
        imgWarning: "NoDictionary"
      });
    }
    let val = e.target.value && e.target.value.substr(e.target.value.lastIndexOf("."));
    if(val && !val.match( /.jpg|.gif|.png|.bmp|.svg/i ) ){
      this.setState({
        imgWarning: "NoDictionary"
      });
      return false;
    }else {
      this.setState({
        imgWarning: false
      });
    }
    //todu 
    if(navigator.userAgent.indexOf("MSIE 9.0")>0){
      let formVal = document.getElementById('upload-form')  ;  
      formVal.submit();  
      window.attachEvent ?
      document.getElementById('frameUpload').attachEvent('onload', this.handleOnLoad) :
      document.getElementById('frameUpload').addEventListener('load', this.handleOnLoad)
      return true;//NoDictionary  
    }

    let obj= this.refs.file.files[0];
    let imgUrl=window.URL.createObjectURL(obj);
    const from = new FormData();
    from.append('file', obj);
    uploadApplication(from).then(({url}) => {
      this.setState({
        applicationIcon: url
      });
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(url);
      }
    }, (e) => {
      console.log(e);
    });
  }

  handleOnLoad = () =>{
    const frame = document.getElementById('frameUpload')
    const resp = {}
    const content = frame.contentWindow ? frame.contentWindow.document.body : frame.contentDocument.document.body
    if(!content) throw new Error('Your browser does not support async upload')
    resp.responseText = content.innerHTML || 'null innerHTML'
    resp.json = JSON.parse(resp.responseText) || eval(`(${resp.responseText})`)
    let dataBack = resp.json || resp.responseText;
    if(dataBack) {
      this.props.onChange(dataBack.data.url);
      this.setState({
        applicationIcon: dataBack.data.url
      })
    }
  }

  getIe9Html=()=>{ 
    const { applicationIcon, imgWarning } = this.state;
    let _icon =  applicationIcon != ''?'ie9_cont':'ie9_form_cont';
    if(navigator.userAgent.indexOf("MSIE 9.0")>0){
      return (<div className={`${ie9_form} ${_icon}`}>
            <div className={`${hidden_form}`}  >
                <form id="upload-form" name="myform" action={`/manager/file/upload/oss/workbench-image-path-applicationIcon`} method="post" 
                target="frameUpload" acceptCharset="utf-8" encType="multipart/form-data" >
                    <input id="btn_file" className={form_btnFile} type="file" name="file" accept="image/x-png,image/gif,image/jpeg,image/bmp" onChange={(e)=>this.imgChange(e)}/>
                </form>
                <iframe id="frameUpload" name="frameUpload" style={{'width':0,'height':0,'opacity':0}}></iframe>
            </div>
            <Icon type="copyreader" className={icon}/>
      </div>)
    }else{
      return (<div>
        <input type="file" ref="file" accept="image/x-png,image/gif,image/jpeg,image/bmp" onChange={this.imgChange} style={{display:"none"}}/>
        <div className={edit} onClick={this.uploadImage} >
          <Icon type="copyreader"/>
        </div>

      </div>)
    }
  }


	render(){
    const { applicationIcon, imgWarning } = this.state;
		return(
		  <div className={upload_page}>
        {
          applicationIcon == ""? (
            <div className={`${appImg} imgsrc`} />
          ) : (
            <img id="imgSrc" src={applicationIcon} className={`${appImg} imgsrc`} />
          )
        }

        {
          imgWarning ? (
            <div className={appValidate}>{imgWarning}</div>
          ) : null
        }

        {this.getIe9Html()}

        {
          this.props.tip?<span className={titlp_lab}>{this.props.tip}</span>:''
        }
      </div>
		)
	}
}

export default UploadPage;