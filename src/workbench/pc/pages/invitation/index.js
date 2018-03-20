import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { noop,mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import inviteActions from 'store/root/invitation/actions';
import Header from 'containers/header';
import BreadcrumbContainer from 'components/breadcrumb';
import {ButtonBrand} from 'pub-comp/button';
import Button from 'bee/button';
import SuccessDialog from './successDialog';
import Tabs, { TabPane } from 'bee/tabs';
import FormControl from 'bee/form-control';
import TagsInput from 'components/tagsInput';
import Message from 'bee/message';

import {
  header,
  appBreadcrumb,
  wrap,
  content,
  urlArea,
  mailList,
  copyLinkBtn,
  addMailBtn,
  submitBtn,
  tabPane1,
  tabPane2,
  tabPane3,
  qrCode,
  printQrBtn,
  tootip,
  first_p
} from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;
const {getInviteUsersJoinAddress, sendMessage} = inviteActions;

const maxLength = 20;
const regMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

@withRouter
@connect(
  mapStateToProps(
    'inviteJoinAddress',
    {
      key: 'userInfo',
      value: (invitation,ownProps,root) => {
        return root.home.userInfo
      }
    },
    {
      namespace: 'invitation',
    },

  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getInviteUsersJoinAddress,
    sendMessage
  }
)
class Invitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      mails: [],
      successDialogShow: false,
      copy:false,
      userName:props.userInfo.userName,
      invitationDesc:''
    }
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    const {requestStart, requestSuccess, requestError,getInviteUsersJoinAddress} = this.props;
    requestStart();
    getInviteUsersJoinAddress().then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        this.setState({
          url:payload
        });
        this.refs['shortUrl'].select();
        requestSuccess();
    });
  }
  goBack() {
    this.props.history.goBack();
  }
  goHome = () => {
    this.props.history.replace('');
  }
  copyLink = () => {
    this.refs['shortUrl'].select();
    document.execCommand('copy');

    Message.create({content: '链接复制成功，赶快发送给你的小伙伴吧!',duration:1.5,position: 'topLeft', color: "success",style:{height:'auto',top: 270,left: 300}});
  }
  onMailChange = (i) => (e) => {
    const value = e.target.value;
    const mails = [...this.state.mails];
    mails[i] = value;
    this.setState({
      mails,
    });
  }
  addMail = () => {
    const mails = [...this.state.mails, ''];
    this.setState({
      mails,
    });
  }
  submit = () => {
    const {requestStart, requestSuccess, requestError,sendMessage} = this.props;
    const mails = this.state.mails.filter(mail => mail && regMail.test(mail));
    if (mails.length <= 0 ) {
      Message.create({content: '请输入正确的邮件地址!',duration:1.5,position: 'topLeft', color: "warning",style:{height:'auto',top: 270,left: 300}});
      return false;
    }
    requestStart();
    sendMessage(mails).then((data) => {
    requestSuccess();
    this.setState({
      mails: [],
      // successDialogShow: false,
    });
    }, (err)=>{
    requestError(err);
    });

    console.log(mails);
    this.setState({
      mails: ['', ''],
      successDialogShow: true,
    });
  }
  handleChange = (tags) => {
    this.setState({mails:tags})
  }
  printQr = () => {
    let newstr = document.getElementById("qrCode").innerHTML;
    let oldstr = document.body.innerHTML;
    document.body.innerHTML = newstr;
    window.print();
    document.body.innerHTML = oldstr;
    return false;
  }
  closeSuccessDialog = () => {
    this.setState({
      successDialogShow: false,
    })
  }

  setOptherData=(obj)=>{
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state
    })
  }

  render() {
    const {
      url,
      mails,
      errorDialogShow,
      successDialogShow,
      copy,
      userName,
      invitationDesc
    } = this.state;

    let tip = (
      <div className={tootip}>
        链接复制成功，赶快发送给你的小伙伴吧！
      </div>
  )

    return (
      <div className="um-win">
        <div className={header}>
          <div className="um-header">
            <Header onLeftClick={ this.goHome} iconName={"home"} >
              <div>
                <span>邀请成员</span>
              </div>
            </Header>
            <div className={appBreadcrumb}>
              <BreadcrumbContainer data={[{name:'邀请成员'}]} goback={this.goBack}/>
            </div>
          </div>
        </div>
        <div className={`${wrap} um-content`}>
          <div className={content}>
            <Tabs
              defaultActiveKey="1"
              onChange={this.callback}
              className="demo-tabs"
            >
              <TabPane tab='链接邀请' key="1" className={tabPane1}>
                <p>将链接发给小伙伴就可以啦</p>
                <div className={urlArea}>
                  <label>链接</label>
                  <input ref='shortUrl' type='text' value={url} readOnly/>
                </div>
                <ButtonBrand className={copyLinkBtn} onClick={this.copyLink} >复制链接</ButtonBrand>

                {/* <Tooltip trigger="click" rootClose placement="bottom" overlay={tip} onClick={this.copyLink} >
                  <ButtonBrand className={copyLinkBtn} onClick={this.copyLink} >复制链接f</ButtonBrand>
                </Tooltip> */}

              </TabPane>
              <TabPane tab='邮件邀请' key="2" className={tabPane2}>

                <p className={first_p}>给你的小伙伴捎句话吧:</p>
                <FormControl placeholder="友空间-赋能个人、激活组织" value={invitationDesc}
                onChange={(e)=>{this.setOptherData({name:"invitationDesc",value:e})} }/>

                <p>署名:</p>
                <FormControl value={userName} onChange={(e)=>{this.setOptherData({name:"userName",value:e})} }/>

                <p>输入邮箱地址并用 “;” 隔开</p>
                <TagsInput
                  value={this.state.mails}
                  addKeys={[13,186]} // enter,semicolon
                  addOnBlur
                  onlyUnique
                  addOnPaste
                  validationRegex={regMail}
                  pasteSplit={data => {
                    return data.replace(/[\r\n,;]/g, ' ').split(' ').map(d => d.trim())
                  }}
                  onChange={this.handleChange.bind(this)}
                />
                {/* <ul className={mailList}>
                {
                  mails.map((mail, i) => {
                    return (
                      <li key={i}>
                        <input type='text' value={mail} onChange={this.onMailChange(i)}/>
                        {
                          i + 1 === mails.length && mails.length < maxLength ? (
                            <button className={addMailBtn} onClick={this.addMail}>+</button>
                          ) : null
                        }
                      </li>
                    );
                  })
                }
                </ul> */}
                <ButtonBrand className={submitBtn} onClick={this.submit} >确定发送</ButtonBrand>
              </TabPane>
              <TabPane tab='二维码邀请' key="3" className={tabPane3}>
                <div>
                  <span>扫描二维码直接进入团队</span>
                  <div className={qrCode} id="qrCode">
                    <img src='/invite/getQRCode'/>
                  </div>
                  <ButtonBrand className={printQrBtn} >二维码</ButtonBrand>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <SuccessDialog show={successDialogShow} close={this.closeSuccessDialog} />
      </div>
    );
  }
}

export default Invitation;
