import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import Icon from 'components/icon';
import { upload_page,appImg,appValidate,uploadImg} from './style.css';
const { requestStart, requestSuccess, requestError ,uploadApplication} = rootActions;
import { Upload, Button } from 'tinper-bee';
import ButtonDefault,{ButtonBrand, ButtonDefaultLine,ButtonDefaultAlpha,ButtonWarning,ButtonDanger,} from 'components/button';

@withRouter
@connect(
  mapStateToProps(
    'teamList',
    {
      namespace: 'home',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    uploadApplication
  }
)
class UploadPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      applicationIcon:"",
      imgWarning:false,
    }
  }

  uploadImage = ()=>{
    document.getElementById("btn_file").click();
  }
  imgChange = (e)=>{
    if(e.target.value.trim().length===0){
      this.setState({
        imgWarning: "请上传图片"
      });
    }
    let val = e.target.value && e.target.value.substr(e.target.value.lastIndexOf("."));
    if(val && !val.match( /.jpg|.gif|.png|.bmp|.svg/i ) ){
      this.setState({
        imgWarning: "必须是一个图片"
      });
      return false;
    }else {
      this.setState({
        imgWarning: false
      });
    }
    let obj= document.getElementById("btn_file").files[0];
    let imgUrl=window.URL.createObjectURL(obj);
    document.getElementById("imgSrc").src=imgUrl;
    const {uploadApplication} = this.props;
    const from = new FormData();
    from.append('btn_file', obj);
    uploadApplication(from).then(({error, payload}) => {
      if (error) {
        console.log(payload);
      } else if (payload && payload.url){
        let name = this.props.name;
        let obj = {name,value:payload.url}; 
        this.props.getUrl(obj)
        this.setState({
          applicationIcon: payload.url
        });
      }
    });
  }

	render(){
    const {applicationIcon,imgWarning} = this.state;
		return( 
		  <div className={upload_page}>
         {applicationIcon!=="" ? <img id="imgSrc" src={applicationIcon} className={appImg} /> : <img id="imgSrc" className={appImg} />}
         {imgWarning ? (<div className={appValidate}>{imgWarning}</div>) : null}
        <input type="file" id="btn_file" onChange={this.imgChange} style={{display:"none"}}/>
        <ButtonBrand className={uploadImg} onClick={(e)=>{this.uploadImage(e)}}>上传图片</ButtonBrand>
      </div>
		)
	}
}

export default UploadPage;