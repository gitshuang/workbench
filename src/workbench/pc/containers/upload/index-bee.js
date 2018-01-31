import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import Icon from 'components/icon';
import { upload_page} from './style.css';
const { requestStart, requestSuccess, requestError ,uploadApplication} = rootActions;
import { Upload, Button } from 'tinper-bee';

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

  // uploadImage = (file)=>{
  //   let {uploadApplication} = this.props;

  //   const from = new FormData();
  //   from.append('btn_file', file);
  //   uploadApplication(from).then(({error, payload}) => {
  //     debugger;
  //     if (error) {
  //       console.log(payload);
  //     } else if (payload && payload.url){
  //       this.setState({
  //         applicationIcon: payload.url
  //       })
  //     }
  //   });
  // }

  getDataProps=()=>{
    let self = this;
    return {
      name: 'file',
      action: 'https://pubapi.yonyoucloud.com/file/upload/oss/workbench-image-path-applicationIcon',
      headers: {
        authorization: 'authorization-text'
      },
      method: 'POST',
      credentials: 'include',
      cache: 'no-cache',
      mode: 'cors',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      // beforeUpload(file){
      //   debugger;
      //   self.uploadImage(file);
      // },
      onChange(info) {
        console.log("------------------");
        console.log("info",info);
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          console.log(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          console.log(`${info.file.name} file upload failed.`);
        }
      },
    };
  }

	render(){
		return( 
			<Upload {...this.getDataProps()}>
        <Button shape="border">
          <Icon type="uf-upload" /> Click to Upload
        </Button>
      </Upload>
		)
	}
}

export default UploadPage;