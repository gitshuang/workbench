import React, { Component } from 'react';
import { ButtonBrand } from 'pub-comp/button';
import { uploadApplication }from 'store/root/api';
import Icon from 'pub-comp/icon';
import { upload_page, appImg, appValidate, uploadImg ,edit,titlp_lab} from './style.css';

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
    let obj= this.refs.file.files[0];
    let imgUrl=window.URL.createObjectURL(obj);
    // this.setState({
    //   applicationIcon: imgUrl,
    // })
    // const {uploadApplication} = this.props;
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

	render(){
    const { applicationIcon, imgWarning } = this.state;
		return(
		  <div className={upload_page}>
        {
          applicationIcon == ""? (
            <div className={appImg} />
          ) : (
            <img id="imgSrc" src={applicationIcon} className={appImg} />
          )
        }
        {
          imgWarning ? (
            <div className={appValidate}>{imgWarning}</div>
          ) : null
        }
        <input type="file" ref="file" onChange={this.imgChange} style={{display:"none"}}/>
        <div className={edit} onClick={this.uploadImage} >
          <Icon type="copyreader"/>
        </div>
        {
          this.props.tip?<span className={titlp_lab}>{this.props.tip}</span>:''
        }

        {/* <ButtonBrand className={uploadImg} onClick={this.uploadImage}>上传图片</ButtonBrand> */}
      </div>
		)
	}
}

export default UploadPage;
